import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import type { UseGloveConnectionProps, PredictionData } from "src/Types/glove";

export const useGloveConnection = ({ onPrediction }: UseGloveConnectionProps) => {
  const [connected, setConnected] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const socketRef = useRef<WebSocket | null>(null);

  const connect = () => {
    if (socketRef.current) return;

    const ws = new WebSocket("ws://localhost:8000/ws/ui");

    ws.onopen = () => {
      setConnected(true);
      toast.success("Glove Connected", {
        description: "Successfully connected to the backend",
      });
    };

    ws.onclose = () => {
      setConnected(false);
      socketRef.current = null;
      toast.error("Glove Disconnected", {
        description: "Connection to backend closed",
      });
    };

    ws.onerror = () => {
      toast.error("Connection Failed", {
        description: "Is the backend server running?",
      });
    };

    // receives prediction from backend and sends it up
    ws.onmessage = (event: MessageEvent) => {
      const data: PredictionData = JSON.parse(event.data);
      console.log("Prediction received:", data.letter);
      onPrediction(data.letter);
    };

    socketRef.current = ws;
  };

  const disconnect = () => {
    socketRef.current?.close();
    socketRef.current = null;
    setConnected(false);
  };

  const startProcessing = async () => {
    try {
      await fetch("http://localhost:8000/start", { method: "POST" });
      setIsProcessing(true);
      toast.success("Started!", {
        description: "Glove is now translating",
      });
    } catch {
      toast.error("Failed to start", {
        description: "Is the backend running?",
      });
    }
  };

  const stopProcessing = async () => {
    try {
      await fetch("http://localhost:8000/stop", { method: "POST" });
      setIsProcessing(false);
      toast.success("Stopped!", {
        description: "Glove stopped translating",
      });
    } catch {
      toast.error("Failed to stop", {
        description: "Is the backend running?",
      });
    }
  };

  useEffect(() => {
    return () => {
      socketRef.current?.close();
    };
  }, []);

  return { connected, isProcessing, connect, disconnect, startProcessing, stopProcessing };
};