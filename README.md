# Smart-Glove-Sign-Translator
Project Overview
The Sign Language Translator is a real-time system that translates hand gestures captured by a sensor glove into text. It is designed to assist people who communicate through sign language by converting gestures into written words. Recognized gestures are displayed instantly on the frontend and stored in a database for history and logging.
  
### DetailedSteps
1. **Glove Sensors**  
   - The glove captures data such as finger/flex positions, hand motion, orientation.  
   - Sends raw sensor data to the AI script running on your PC.
2. **AI Model (Python + TensorFlow / PyTorch)**  
   - Processes sensor data to recognize gestures.  
   - Converts recognized gestures into **text**.  
   - Immediately sends this text to two places:  
     - **Frontend** :for instant display  
     - **Supabase** :to store translation history asynchronously  
3. **Frontend (React + Vite + TypeScript)**  
   - Receives predicted text (via WebSocket) and shows it live.  
   - Subscribes to Supabase updates if you want to show gesture history or logs.
4. **Supabase**  
   - Stores each recognized gesture with metadata (e.g. user ID, timestamp, gesture text).  
   - Optionally handles user authentication if multiple users will use the glove.  
   - Enables real‑time subscriptions for history/log features.

---

## Technology-stack
    ``` bash
    | Component / Role                 Technology / Tool                            |
    |--------------------------------|----------------------------------------------|
    | Sensor Glove (hardware)        | Custom sensors / IMU / flex sensors          |
    | Gesture Recognition (AI)       | Python + TensorFlow or PyTorch               |
    | Real‑time communication        | WebSocket (Python server ↔ React frontend)   |
    | Frontend UI                    | React + Vite + TypeScript                    |
    | Database & Auth & Storage      | Supabase                                     |



## What (Software) Will Do

- Read sensor data from the glove on the PC  
- Run trained AI model for gesture → text translation  
- Send recognized text immediately to the frontend (WebSocket)  
- Insert recognized text into Supabase asynchronously for history/logging  
- Build a frontend UI to:  
-Displays recognized gestures in real-time as text and/or speech.
 
### Folder-structure
    ```
    smart-glove-sign-translator/
    │
    ├── frontend/                # React + Vite + TS app
    │   ├── src/
    │   │   ├── client.ts       # Supabase client
    │   │   ├── App.tsx
    │   │   └── components/
    │   └── package.json
    │
    ├── ai/                     # AI script + model
    │   ├── gesture_ai.py       # Reads glove, predicts gestures, sends to frontend & Supabase
    │   └── model/              # Trained AI model files
    │
    └── README.md               # Project documentation



## Getting-started

### Prerequisites
- Node.js & npm / yarn  
- Python 3.x  
- Supabase account & project (get your `URL` and `API key`)  
- Sensor Glove (hardware, connected correctly)  

### Steps

1. Clone the repo  
   ```bash
   git clone https://github.com/FerdawsAnzer/Smart-Glove-Sign-Translator.git
   cd Smart-Glove-Sign-Translator

2. Setup frontend 
   ```bash
   cd frontend
   npm install
   npm run dev
3. Setup AI script
   ```bash
   cd ../ai
   pip install -r requirements.txt
   python gesture_ai.py

### license
Feel free to contribute! Open an issue or a pull request.
If you use this project, please mention the original repository.

   
