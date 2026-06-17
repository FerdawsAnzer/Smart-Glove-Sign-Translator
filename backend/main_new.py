import asyncio
import numpy as np
from collections import deque
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from model_new import predict

app = FastAPI()
app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_credentials=True,
    allow_methods=["*"], allow_headers=["*"],
)

frontend_connection: WebSocket | None = None
is_processing: bool = False

class SessionBuffer:
    """
    Buffer between the raw ESP32 stream and predict().

    ring (deque maxlen=10): last 10 raw rows, used to measure motion.
    quiet_count:            consecutive quiet rows (for static capture).
    lockout_remaining:      rows ignored after a static prediction.
    sign_buffer:            rows accumulated during a dynamic sign.
    in_dynamic:             True while collecting a dynamic gesture.
    """
    # Motion thresholds (from static vs dynamic dataset analysis) 
    DYNAMIC_START  = 1500   # gz_std above this  -> hand moving (enter dynamic)
    ACC_START      = 1100   # accmag_std above this -> translational motion (OR-rule)
    DYNAMIC_END    = 600    # gz_std below this    -> rotation settling
    ACC_END        = 700    # accmag_std below this -> translation settling
    DYNAMIC_MIN    = 40     # min rows before a dynamic sign can complete
    DYNAMIC_MAX    = 100    # hard cap so a never-quiet hand still fires

    STATIC_QUIET   = 1000   # gz_std below this -> row counts as quiet (held sign)
    STATIC_NEEDED  = 10     # consecutive quiet rows needed to capture a static sign
    STATIC_LOCKOUT = 20     # rows ignored after a static prediction

    def __init__(self):
        self.ring              = deque(maxlen=10)
        self.quiet_count       = 0
        self.lockout_remaining = 0
        self.sign_buffer       = []
        self.in_dynamic        = False

    @staticmethod
    def _motion(recent: np.ndarray):
        """(gz_std, accmag_std) over the current 10-row window."""
        gz_std  = float(recent[:, 10].std())                       # col 10 = gz
        amag    = np.sqrt(recent[:, 5] ** 2 +                      # ax
                          recent[:, 6] ** 2 +                      # ay
                          recent[:, 7] ** 2)                       # az
        acc_std = float(amag.std())
        return gz_std, acc_std

    def push(self, sample: np.ndarray) -> dict | None:
        """One raw row (shape (11,)). Returns a prediction dict or None."""
        self.ring.append(sample)
        if len(self.ring) < 10:
            return None

        recent = np.array(self.ring)
        gz_std, acc_std = self._motion(recent)

        # Hand is moving if EITHER rotation or translation is high.
        moving = (gz_std >= self.DYNAMIC_START) or (acc_std >= self.ACC_START)

        # ── 1. Already collecting a dynamic sign ─────────────────────
        if self.in_dynamic:
            self.sign_buffer.append(sample)

            # Sign has settled only when BOTH motion channels are quiet.
            settling   = (gz_std < self.DYNAMIC_END) and (acc_std < self.ACC_END)
            sign_ended = settling and len(self.sign_buffer) >= self.DYNAMIC_MIN
            timed_out  = len(self.sign_buffer) >= self.DYNAMIC_MAX

            if sign_ended or timed_out:
                raw    = np.array(self.sign_buffer, dtype=np.float32)
                result = predict(raw)
                print(f"⏹️ Dynamic sign complete — {len(self.sign_buffer)} rows")
                self.in_dynamic  = False
                self.sign_buffer = []
                return result
            return None  # still collecting

        # 2. Not in a sign yet did motion just start?
        if moving:
            # Enter dynamic. Seed with the ring so the lead-in isn't lost.
            # Cancel any pending static state (the user moved).
            self.in_dynamic        = True
            self.sign_buffer       = list(recent)
            self.quiet_count       = 0
            self.lockout_remaining = 0
            print(f"▶️ Dynamic sign started (gz_std={gz_std:.0f}, acc_std={acc_std:.0f})")
            return None

        # 3. Hand is not moving → STATIC path 
        # During lockout, ignore everything so a held sign doesn't refire.
        if self.lockout_remaining > 0:
            self.lockout_remaining -= 1
            self.quiet_count        = 0
            return None

        # Count consecutive quiet rows (gz_std below the quiet floor).
        if gz_std < self.STATIC_QUIET:
            self.quiet_count += 1
        else:
            # Transition zone: not loud enough for dynamic, not quiet
            # enough to be a held sign. Reset and wait.
            self.quiet_count = 0
            return None

        # Enough consecutive quiet rows → capture the static sign.
        if self.quiet_count >= self.STATIC_NEEDED:
            raw    = np.array(list(self.ring), dtype=np.float32)
            result = predict(raw)
            print("📸 Static sign captured")
            self.lockout_remaining = self.STATIC_LOCKOUT
            self.quiet_count       = 0
            return result

        return None  # still building up quiet rows

    def reset(self):
        """Clear everything — call at the start of a new session."""
        self.ring.clear()
        self.quiet_count       = 0
        self.lockout_remaining = 0
        self.sign_buffer       = []
        self.in_dynamic        = False


_session_buffer = SessionBuffer()


@app.websocket("/ws/ui")
async def ui_endpoint(websocket: WebSocket):
    global frontend_connection
    await websocket.accept()
    frontend_connection = websocket
    print("✅ Frontend connected!")
    try:
        while True:
            await asyncio.sleep(1)
    except WebSocketDisconnect:
        frontend_connection = None
        print("❌ Frontend disconnected")


@app.post("/start")
async def start_processing():
    global is_processing
    is_processing = True
    print("▶️ Started processing glove data")
    return {"message": "Processing started"}


@app.post("/stop")
async def stop_processing():
    global is_processing
    is_processing = False
    print("⏹️ Stopped processing glove data")
    return {"message": "Processing stopped"}


@app.websocket("/ws/glove")
async def glove_endpoint(websocket: WebSocket):
    await websocket.accept()
    print("✅ Glove connected!")
    try:
        while True:
            data = await websocket.receive_json()
            if not is_processing:
                continue

            # ESP32 must send keys: flex1-5, ax, ay, az, gx, gy, gz
            try:
                sample = np.array([
                    data["flex1"], data["flex2"], data["flex3"],
                    data["flex4"], data["flex5"],
                    data["ax"],    data["ay"],    data["az"],
                    data["gx"],    data["gy"],    data["gz"],
                ], dtype=np.float32)
            except KeyError as e:
                print(f"⚠️ Missing key in glove data: {e}")
                continue

            result = _session_buffer.push(sample)
            if result and frontend_connection:
                await frontend_connection.send_json({
                    "letter":     result["prediction"],
                    "confidence": result["confidence"],
                })
                print(f"📤 Sent to frontend: {result['prediction']}")
    except WebSocketDisconnect:
        print("❌ Glove disconnected")

