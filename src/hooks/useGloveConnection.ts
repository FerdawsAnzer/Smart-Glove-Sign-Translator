import { useState, useRef, useEffect } from "react";


export const useGloveConnection = () => {
  const [connected, setConnected] = useState<boolean>(false);
  const socketRef = useRef<WebSocket | null>(null);
  const { toast } = useToast();

  const connect = () => {
    if (socketRef.current) return;

    const ws = new WebSocket("ws://localhost:8000/ws/ui");

    ws.onopen = () => {
      setConnected(true);
      toast({
        title: "Glove Connected ✅",
        description: "Successfully connected to the backend",
      });
    };

    ws.onclose = () => {
      setConnected(false);
      socketRef.current = null;
      toast({
        title: "Glove Disconnected",
        description: "Connection to backend closed",
        variant: "destructive",
      });
    };

    ws.onerror = () => {
      toast({
        title: "Connection Failed ❌",
        description: "Is the backend server running?",
        variant: "destructive",
      });
    };

    socketRef.current = ws;
  };

  const disconnect = () => {
    socketRef.current?.close();
    socketRef.current = null;
    setConnected(false);
  };

  // cleanup when component unmounts
  useEffect(() => {
    return () => {
      socketRef.current?.close();
    };
  }, []);

  return { connected, connect, disconnect };
};