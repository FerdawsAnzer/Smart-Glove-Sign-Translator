<div align="center">

# 🧤 SignBridge-Smart Glove Sign Language Translator
### Real-time ASL recognition, powered by a smart glove and deep learning.

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)
![ESP32](https://img.shields.io/badge/ESP32--S3-E7352C?style=for-the-badge&logo=espressif&logoColor=white)

> A real-time American Sign Language (ASL) recognition system bridging communication between the deaf community and hearing users built as a Human-Centered AI capstone project.

</div>

## 🎯 What is SignBridge?

SignBridge is an **assistive AI system** that translates hand gestures into text and speech in real time. A user wears a smart glove equipped with **flex sensors** and an **MPU6050 IMU**, performs an ASL sign, and the system immediately displays the recognized word as **text and audio output**.

The system also includes an **interactive learning platform** for hearing users to practice and learn ASL- covering the alphabet, numbers, colors, pronouns, verbs, and everyday phrases, with support for multiple UI languages (English, Arabic, French, Turkish).

This is a **Human-Centered AI system by design** , the human is always in the loop, the AI assists communication, it never replaces the user's intent. If a gesture is misrecognized, the user simply redoes it. Control stays with the person.

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
Deep Learning-based Gesture Recognition
Sensor data → normalization/scaling → window segmentation → deep learning inference
(static: 1D CNN + Global Average Pooling, dynamic: 1D CNN + LSTM) → gesture prediction
        │
        ▼
[React / TypeScript Frontend]
  Real-time gesture display · Text + Speech output · ASL Learning Platform
```

## ✨ Highlights
- ✔️ Real-time gesture recognition over WebSocket (glove ↔ backend ↔ frontend)
- ✔️ Dual deep learning models static gestures (CNN) and dynamic gestures (CNN + LSTM)
- ✔️ Text-to-speech output for recognized signs
- ✔️ Full interactive ASL learning platform (alphabet, numbers, colors, pronouns, verbs, phrases)
- ✔️ Multi-language UI (i18next:EN, AR, FR, TR)
- ✔️ Supabase-backed auth, gesture data, and translation history
- ✔️ Backend integration tests with pytest

## 🚀 Built With

| Technology | Purpose |
|---|---|
| ⚛️ React 19 + TypeScript | Frontend framework |
| ⚡ Vite | Build tool |
| 🎨 Tailwind CSS + shadcn/ui | Styling & UI components |
| 🗂 Zustand | State management |
| 🌍 i18next | Internationalization (EN/AR/FR/TR) |
| 🔐 Supabase | Auth, gesture data & history storage |
| 🐍 FastAPI + WebSockets | Real-time backend |
| 🧠 TensorFlow / Keras | Deep learning gesture recognition (CNN, CNN+LSTM) |
| 🔧 ESP32-S3 + Flex Sensors + MPU6050 | Smart glove hardware |
| ✅ Pytest | Backend integration testing |

## 📂 Project Structure
```
backend/
├── main_new.py            # FastAPI app, WebSocket endpoints, session buffering
├── model_new.py            # Model loading & prediction
├── preprocessing_new.py     # Sensor data normalization / windowing
├── artifacts/               # Trained Keras models + label maps + norm params
└── tests/                   # Integration tests

src/
├── components/               # Layout, settings, shared UI (shadcn/ui)
├── features/
│   ├── dashboard/             # Live interpretation, translation cards
│   ├── history/                # Translation history
│   ├── learningAlphabet/        # ASL alphabet learning
│   ├── LearningNumbers/          # Number signs
│   ├── LearningColors/            # Color signs
│   ├── LearningEssentials/         # Pronouns, time, quantities
│   └── LearningWords/               # Verbs, social words, utility words
├── hooks/useGloveConnection.ts    # Glove WebSocket connection hook
├── store/                         # Zustand stores (auth, glove, history)
├── lib/supabase/                   # Supabase client, auth, gestures, history
├── i18n/ & locales/                 # Translations (en, ar, fr, tr)
├── pages/                            # Sign in / sign up / settings / history
└── App.tsx
```

## ⚙️ Installation

**Clone the repository**
```bash
git clone https://github.com/FerdawsAnzer/Smart-Glove-Sign-Translator.git
cd Smart-Glove-Sign-Translator
```

**Frontend setup**
```bash
npm install
npm run dev
```

**Backend setup**
```bash
cd backend
pip install -r requirements.txt
uvicorn main_new:app --reload
```

**Run backend tests**
```bash
cd backend
pytest
```

Add a `.env` file in the project root and in `backend/` with your Supabase and any required environment values 

## 🧑‍🤝‍🧑 Team
Built by the SignBridge Team at Cyprus International University as a capstone project, supervised by Prof. Dr. Melike Şah Direkoğlu. Six members across hardware, machine learning, backend, and frontend.

## 🔗 Related Project
The public-facing landing page for this project:
👉 [LandPageASL](https://github.com/FerdawsAnzer/LandPageASL) · [Live demo](https://signbridgeee.netlify.app/)


---
> ⚠️ **Original Repository**: This is the official and original repository of SignBridge, developed by the SignBridge Team at Cyprus International University. Any copies or forks are not the original work.

## 📜 License
© 2026 SignBridge Team. All rights reserved.
