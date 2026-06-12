import type { AlpahbetData } from "@/Data/alphabetData";

export type MainLetterCardProps = {
  currentIndex: number;
  onNext: () => void;
  onPrevious: () => void;
  total: number;
  data: typeof AlpahbetData; // accepts any data array
};