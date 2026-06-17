import type { HistoryItem } from "./HistoryItems";

export type HistoryCardProps = {
  item: HistoryItem;
  onStar: (id: number) => void;
  onDelete: (id: number) => void;
};