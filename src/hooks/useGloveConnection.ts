import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

export const useGloveConnection = () => {
  const [connected, setConnected] = useState<boolean>(false);
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

    socketRef.current = ws;
  };

  const disconnect = () => {
    socketRef.current?.close();
    socketRef.current = null;
    setConnected(false);
  };

  useEffect(() => {
    return () => {
      socketRef.current?.close();
    };
  }, []);

  return { connected, connect, disconnect };
};