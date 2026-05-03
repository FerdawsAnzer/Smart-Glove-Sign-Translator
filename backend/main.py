import asyncio
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from model import predict

app = FastAPI()# create the server

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
    await websocket.accept()# approved the connection(accepting teh connection and upgrade to websocket)
    frontend_connection = websocket # we store the connection so we can use it later 
    print("✅ Frontend connected!")
    try:#we use it to try catch any error and here if the user(clinet) disconnect we will catch it  and set teh conection to null
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

            result = await predict(data)

            if result and frontend_connection:
                await frontend_connection.send_json({
                    "letter": result[0],
                    "confidence": result[1]
                })
                print(f"📤 Sent to frontend: {result[0]}")

    except WebSocketDisconnect:
        print("❌ Glove disconnected")