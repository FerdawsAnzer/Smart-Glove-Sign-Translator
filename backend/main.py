import asyncio
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware #imported here to allow the frontend(port 3000) to connect to the backend(port 8000) without teh browser blocks teh connection

app = FastAPI()# create the server

# allows frontend to connect from localhost
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# store the frontend connection
frontend_connection: WebSocket | None = None # store the current client conn if none then it will be null
is_processing: bool = False
@app.websocket("/ws/ui")
async def ui_endpoint(websocket: WebSocket):
    global frontend_connection
    await websocket.accept()# approved the connection(accepting teh connection and upgrade to websocket)
    frontend_connection = websocket # we store the connection so we can use it later 
    print("✅ Frontend connected!")
    try:#we use it to try catch any error and here if the user(clinet) disconnect we will catch it  and set teh conection to null
        while True:
            await asyncio.sleep(1)  # keep connection open
    except WebSocketDisconnect:# webSocketDisconnet is for the error that occurs when a clinet disconnects from the websocket or closes browser refresh teh page or loses internet
        frontend_connection = None
        print("❌ Frontend disconnected")

# rest endpoint that listen for Post requests . we used restendpoint to start and stop the processing of the data from the glove. so when user clicks start glove button  it will send a rquest to the start endpoint and chnage the isprocessing to true and when click stop glove button it will send a request to change isprocessing to false 
@app.post("/start") 
async def start_processing():
    global is_processing
    is_processing = True
    print("Started processing data from the glove...")
    return {"message": "Processing started"}

@app.post("/stop")
async def stop_processing():
    global is_processing
    is_processing = False
    print("Stopped processing data from the glove.")
    return {"message": "Processing stopped"}

@app.websocket("/ws/glove")
async def glove_endpoint(websocket: WebSocket):
    await websocket.accept()
    print("Glove connected!")
    try:
        while True:
         data=await websocket.recieve_json()
         
         #if the user didn't click start glove button teh json data will be reacive it but we will not process it 
         if not is_processing:
            continue #continue throws teh data away in microseconds so is faster than the  esp32 sending data ()

        #result = await predict(data)
        