import type { HistoryItem } from "./HistoryItems";

export type HistoryCardProps = {
  item: HistoryItem;
  onStar: (id: string) => void;
  onDelete: (id: string) => void;
};