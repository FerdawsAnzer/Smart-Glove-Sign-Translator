import type { input, output } from "framer-motion/client";

//the authenticated user 
export interface User{
    id: string;
    email:string;
    fullName?: string;
}
// a row from gestures 
export interface Gestures {
    id:string ;
    gesture: string ;
    meanings:string ;
}
// a row from history 
export interface HistoryEntry{
    id: string ;
    user_id: string ;
    input: string ;
    output: string ;
    created_at: string ;
}
// raw sensor data coming from the glove 
export interface SensorData {
    flex: number[];
    imu:{ax:number; ay: number; az: number};
    timestamp: number ;
}
//auth store shape 
export interface AuthState {
    user:User | null;
    loading: boolean ;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    updateFullName: (name: string) => void;
    fetchUser : ()=> Promise<void>;
}

//history store shape

export interface HistoryState {
    entries: HistoryEntry[];
    loading: boolean ;
    fetchHistory: (userId: string)=> Promise<void>;
    addEntry: (userId: string , input: string,output: string) => Promise<void>;
}

//glove store shape (real-time sensor state)
export interface GloveState {
  sensorData: SensorData | null;
  currentGesture: string | null;
  translatedText: string | null;       // ✅ fixed
  isStreaming: boolean;
  setSensorData: (data: SensorData) => void;
  setTranslation: (gesture: string, text: string) => void; // ✅ fixed
  setStreaming: (val: boolean) => void;
}