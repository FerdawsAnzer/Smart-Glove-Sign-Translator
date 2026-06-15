# 🧤SignBridge — Smart Glove Sign Language Translator
> A real-time American Sign Language (ASL) recognition system bridging communication between the deaf community and hearing users built as a Human-Centered AI capstone project.
---

## 🎯 What is SignBridge?

> SignBridge is an **assistive AI system** that translates hand gestures into text and speech in real time. A user wears a smart glove equipped with **flex sensors** and
>  an **MPU6050 IMU**, performs an ASL sign, and the system immediately displays the recognized word as **text and audio output**.

The system also includes an **interactive learning platform** for hearing users to practice and learn ASL signs.

This is a **Human-Centered AI system by design** the human is always in the loop, the AI assists communication, 
it never replaces the user's intent. If a gesture is misrecognized, the user simply redoes it. Control stays with the person.

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
Deep Learning-based Gesture Recognition
Sensor data → normalization/scaling → window segmentation → deep learning inference (static: 1D CNN + Global Average Pooling,
dynamic: 1D CNN + LSTM) → gesture prediction
        │
        ▼
[React / TypeScript Frontend]
  Real-time gesture display · Text + Speech output · ASL Learning Platform









---
> ⚠️ **Original Repository**: This is the official and original repository of SignBridge, developed by 
the SignBridge Team at Cyprus International University. Any copies or forks are not the original work.

---

## 📜 License

© 2026 SignBridge Team. All rights reserved.
