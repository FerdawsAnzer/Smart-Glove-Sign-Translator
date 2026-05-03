import asyncio
import json
import websockets

# fake data that looks like ESP32 data
fake_data = {
    "flex1": 218,    # FLEX_THUMB
    "flex2": 214,    # FLEX_INDEX
    "flex3": 215,    # FLEX_MIDDLE
    "flex4": 206,    # FLEX_RING
    "flex5": 199,    # FLEX_LITTLE
    "acc_x": -0.826,
    "acc_y": 0.916,
    "acc_z": -2.040,
    "gyro_x": 0.324,
    "gyro_y": 2.674,
    "gyro_z": 0.072
}

async def simulate_glove():
    async with websockets.connect("ws://localhost:8000/ws/glove") as websocket:
        print("🧤 Fake glove connected!")
        odlValue={}
        for i in range(1):
           #oldValue = fake_data.copy()
            await websocket.send(json.dumps(fake_data))
            #if oldValue != fake_data:
                #print(f"📤 Sent snapshot {i+1}")
            print(f"📤 Sent snapshot {i+1}")
            await asyncio.sleep(0.05)

asyncio.run(simulate_glove())