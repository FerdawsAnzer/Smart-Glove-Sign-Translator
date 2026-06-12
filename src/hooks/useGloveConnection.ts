import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import type { UseGloveConnectionProps, PredictionData } from "src/Types/glove";

export const useGloveConnection = ({ onPrediction }: UseGloveConnectionProps) => {
  const [connected, setConnected] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const socketRef = useRef<WebSocket | null>(null);

  //  CONNECT TO GLOVE WEBSOCKET 
  const connect = () => {
    if (socketRef.current) return;

    const ws = new WebSocket("ws://localhost:8000/ws/glove");

    ws.onopen = () => {
      setConnected(true);
      toast.success("Glove Connected", {
        description: "Successfully connected to backend",
      });
      console.log(" Glove WebSocket connected");
    };

    ws.onclose = () => {
      setConnected(false);
      socketRef.current = null;
      toast.error("Glove Disconnected", {
        description: "Connection closed",
      });
      console.log(" Glove WebSocket closed");
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
      toast.error("Connection Failed", {
        description: "Backend not reachable",
      });
    };

    // Receive prediction from backend
    ws.onmessage = (event) => {
      try {
        const data: PredictionData = JSON.parse(event.data);

        console.log(" Prediction received:", data);

       
        onPrediction(data.prediction);

      } catch (err) {
        console.error("Invalid message:", event.data);
      }
    };

    socketRef.current = ws;
  };

  //  sending sensor data to the backend
  const sendSensorData = (data: any) => {
    if (!socketRef.current) return;
    if (socketRef.current.readyState !== WebSocket.OPEN) return;

    socketRef.current.send(JSON.stringify(data));
  };

  //  DISCONNECT
  const disconnect = () => {
    socketRef.current?.close();
    socketRef.current = null;
    setConnected(false);
  };

  //  START PROCESSING (HTTP)
  const startProcessing = async () => {
    try {
      await fetch("http://localhost:8000/start", { method: "POST" });

      setIsProcessing(true);

      toast.success("Started!", {
        description: "Glove is now translating",
      });

      console.log(" Processing started");
    } catch (err) {
      console.error(err);
      toast.error("Failed to start", {
        description: "Backend not running",
      });
    }
  };

  //  STOP PROCESSING 
  const stopProcessing = async () => {
    try {
      await fetch("http://localhost:8000/stop", { method: "POST"});

      setIsProcessing(false);

      toast.success("Stopped!", {
        description: "Translation stopped",
      });

      console.log(" Processing stopped");
    } catch (err) {
      console.error(err);
      toast.error("Failed to stop", {
        description: "Backend not running",
      });
    }
  };

  
  useEffect(() => {
    return () => {
      socketRef.current?.close();
    };
  }, []);

  return {
    connected,
    isProcessing,
    connect,
    disconnect,
    startProcessing,
    stopProcessing,
    sendSensorData, // sending sensor data
  };
};