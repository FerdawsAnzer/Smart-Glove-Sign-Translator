"""
test_integration.py
────────────────────────────────────────────────────────────
Integration tests for SignBridge backend.
Tests REST endpoints and WebSocket connections.

Before running make sure backend is running:
    uvicorn main:app --reload --host 0.0.0.0 --port 8000

Run with:
    pytest tests/test_integration.py -v
────────────────────────────────────────────────────────────
"""

import asyncio
import json
import pytest
import httpx
import websockets

BASE_HTTP = "http://localhost:8000"
BASE_WS   = "ws://localhost:8000"

# ── Valid sensor data that matches ESP32 format ───────────────
VALID_DATA = {
    "flex1": 500, "flex2": 400, "flex3": 300,
    "flex4": 600, "flex5": 450,
    "ax": -500,   "ay": 800,   "az": 200,
    "gx": 100,    "gy": 50,    "gz": 30
}

# REST ENDPOINT TESTS

def test_start_endpoint():
    """POST /start returns success message"""
    response = httpx.post(f"{BASE_HTTP}/start")
    assert response.status_code == 200
    assert response.json()["message"] == "Processing started"

def test_stop_endpoint():
    """POST /stop returns success message"""
    response = httpx.post(f"{BASE_HTTP}/stop")
    assert response.status_code == 200
    assert response.json()["message"] == "Processing stopped"




