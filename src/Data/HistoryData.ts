import type { HistoryItem } from "@/Types/HistoryItems";

export const historyData: HistoryItem[] = [
  {
   id: 1,
    language: "Spanish",
    date: "Feb 10, 02:30 PM",
    aslText: "Hello, how are you?",
    translation: "Hola, ¿cómo estás?",
    starred: true,
  },
  {
    id: 2,
    language: "French",
    date: "Feb 10, 01:15 PM",
    aslText: "Nice to meet you",
    translation: "Enchanté",
    starred: false,
  },
  {
    id: 3,
    language: "German",
    date: "Feb 10, 12:45 PM",
    aslText: "Thank you very much",
    translation: "Vielen Dank",
    starred: true,
  },
  {
    id: 4,
    language: "Italian",
    date: "Feb 10, 11:20 AM",
    aslText: "What is your name?",
    translation: "Come ti chiami?",
    starred: false,
  },
];