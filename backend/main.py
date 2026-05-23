import asyncio
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from model import predict

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

frontend_connection: WebSocket | None = None
is_processing: bool = False


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
    global last_sent_letter, prediction_counter
    await websocket.accept()
    print("✅ Glove connected!")
    try:
        while True:
            data = await websocket.receive_json()

            if not is_processing:
                continue

            result = await predict(data)

                        prediction_counter = 0
                        print(f"📤 Sent: {letter}")

    except WebSocketDisconnect:
        print("❌ Glove disconnected")