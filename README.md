# 🧤SignBridge — Smart Glove Sign Language Translator

> A real-time American Sign Language (ASL) recognition system bridging communication between the deaf community and hearing users — built as a Human-Centered AI capstone project.

---

## 🎯 What is SignBridge?

> SignBridge is an **assistive AI system** that translates hand gestures into text and speech in real time. A user wears a smart glove equipped with **flex sensors** and an **MPU6050 IMU**, performs an ASL sign, and the system immediately displays the recognized word as **text and audio output**.

The system also includes an **interactive learning platform** for hearing users to practice and learn ASL signs.

This is a **Human-Centered AI system by design** — the human is always in the loop, the AI assists communication, it never replaces the user's intent. If a gesture is misrecognized, the user simply redoes it. Control stays with the person.

---

## 🏗️ System Architecture

```
[Smart Glove]
  Flex Sensors + MPU6050 (ESP32-S3)
        │  WebSocket
        ▼
[FastAPI Backend]
  ├── /ws/glove   ← receives sensor data from glove
  ├── /ws/ui      ← streams recognition results to frontend
  ├── /start      ← REST: begin recognition session
  └── /stop       ← REST: end recognition session
        │
        ▼
[ML Classifier — KNN prototype / KNN+LSTM hybrid in development]
  Sensor data → IQR filtering → scaling → gesture prediction
        │
        ▼
[React / TypeScript Frontend]
  Real-time gesture display · Text + Speech output · ASL Learning Platform
```
## ✨ Features
- 🤝 **Real-time ASL gesture recognition** via smart glove hardware
- 📡 **WebSocket streaming** for low-latency, bidirectional communication
- 🧠 **KNN prototype / KNN+LSTM hybrid in development** — interpretable and scalable ML pipeline
- 🔊 **Text + Speech output** for recognized signs
- 📚 **Interactive learning platform** for hearing users to learn ASL
- 🔁 **Human-in-the-Loop** — user performs gesture → AI responds → user corrects if neede
---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Hardware | ESP32-S3, Flex Sensors, MPU6050 IMU |
| Backend | Python, FastAPI, WebSockets |
| ML Model | scikit-learn (KNN), TensorFlow/Keras (LSTM — in dev), pandas, numpy |
| Frontend | React, TypeScript, Tailwind CSS, shadcn/ui |
| Build Tool | Vite |

---

## 🤖 Why KNN?
The current implementation uses KNN with a Kaggle dataset to validate the backend pipeline and WebSocket communication. The production model will be a KNN+LSTM hybrid — combining KNN for spatial gesture pattern recognition with LSTM for temporal sequence modeling. This architecture is currently in development by the team's ML engineers.

This is an applied **Explainable AI (XAI)** decision.

---

## 📁 Project Structure

```
Smart-Glove-Sign-Translator/
├── backend/
│   ├── main.py                      # FastAPI app — WebSocket + REST endpoints
│   ├── model/
│   │   ├── test_model_knn.pkl       # Trained KNN classifier
│   │   ├── test_scaler.pkl          # Feature scaler
│   │   ├── test_feature_columns.json
│   │   └── test_iqr_bounds.json     # IQR outlier filtering bounds
│   └── requirements.txt
├── src/
│   ├── components/                  # Reusable React UI components
│   ├── pages/                       # Translator page + Learning platform
│   └── main.tsx
└── README.md

---

## 🚀 Getting Started

### Backend



## 👥 Team

| Name | Contribution |
|---|---|
| **Ferdaws Anzer** | FastAPI backend, WebSocket layer, ML integration, Learning & Practice platform frontend |
|** Imane Sayd** | ML Model | scikit-learn (KNN), TensorFlow/Keras (LSTM — in dev) |
| ** Ibtissame Arrassi ** | Authentication, Settings(Frontend),SignIn/SignOut Pages , SplashScreen |
| **Ketsia Winner Nyembo** |Hardware & glove implementation |
| **Logance Musese Mwamba** | Hardware & glove implementation |
| **Chadrack Zeka Tshiwewe** | ESP32-S3 firmware & WebSocket transmission to backend |

**Supervisor:** Prof. Dr. Melike Şah Direkoğlu  
**Institution:** Cyprus International University — Software Engineering  
**Conference:** DGFC 2026 *(paper submitted)*

---

