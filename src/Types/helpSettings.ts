export type HelpSettingsProps = {
   rating: number;
  feedback: string;
  onRatingChange: (value: number) => void;
  onFeedbackChange: (value: string) => void;
  onSubmitFeedback: () => void;
  onCancelFeedback: () => void;
}