import asyncio
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# allows frontend to connect from localhost
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# creating endpoint to store the frontend connection
frontend_connection: WebSocket | None = None

@app.websocket("/ws/ui")
async def ui_endpoint(websocket: WebSocket):
    global frontend_connection
    await websocket.accept()
    frontend_connection = websocket
    print("✅ Frontend connected!")
    try:
        while True:
            # keep connection open
            await asyncio.sleep(1)  
    except WebSocketDisconnect:
        frontend_connection = None
        print("❌ Frontend disconnected")