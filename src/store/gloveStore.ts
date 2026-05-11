import { create } from "zustand";
import type { GloveState, SensorData } from "../Types"; // ✅ only import, no local type

export const useGloveStore = create<GloveState>((set) => ({
  sensorData: null,
  currentGesture: null,
  translatedText: null,
  isStreaming: false,

  setSensorData: (data: SensorData) => set({ sensorData: data }),

  setTranslation: (gesture: string, text: string) =>
    set({ currentGesture: gesture, translatedText: text }),

  setStreaming: (val: boolean) => set({ isStreaming: val }),
}));