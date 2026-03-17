import { useState } from "react";
import { ChevronDown, Star } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

interface HelpSettingsProps {
  rating: number;
  feedback: string;
  onRatingChange: (value: number) => void;
  onFeedbackChange: (value: string) => void;
  onSubmitFeedback: () => void;
  onCancelFeedback: () => void;
}

export function HelpSettings({
  rating,
  feedback,
  onRatingChange,
  onFeedbackChange,
  onSubmitFeedback,
  onCancelFeedback,
}: HelpSettingsProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I connect the glove?",
      answer:
        "To connect the glove, turn on Bluetooth on your device, then press the power button on the glove for 3 seconds until the LED blinks blue. Select 'SignGlove' from your device's Bluetooth menu.",
    },
    {
      question: "What if the gesture is not recognized?",
      answer:
        "Ensure the glove is properly fitted and charged. Try repositioning your hand or recalibrating the glove in settings. Make sure there's no interference from other Bluetooth devices.",
    },
    {
      question: "How can I change the language?",
      answer:
        "Go to the Languages tab in Settings and select your preferred sign language and translation language from the dropdown menus.",
    },
    {
      question: "How do I enable or disable voice output?",
      answer:
        "Voice output can be toggled in the main translator screen by tapping the speaker icon, or you can set it as default in the Notifications settings.",
    },
  ];

  const handleStarClick = (star: number) => {
    onRatingChange(rating === star ? 0 : star);
  };

  return (
    
   <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
      {/* FAQ Section */}
      <div className="min-w-0">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">FAQ</h3>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <button
              key={index}
              onClick={() =>
                setExpandedFaq(expandedFaq === index ? null : index)
              }
              className="w-full text-left"
            >
              <div className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform ${
                      expandedFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {expandedFaq === index && (
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Help / Feedback Section */}
      <div className="min-w-0">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Help / Feedback
        </h3>
        <div className="space-y-6">
          {/* Star Rating */}
          <div className="space-y-2">
            <Label>Share your experience</Label>
            <p className="text-sm text-gray-500">Rate your experience with the app</p>
            <div className="flex gap-2 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleStarClick(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div className="space-y-2">
            <Label htmlFor="feedback">Your Comments</Label>
          <Textarea
  id="feedback"
  value={feedback}
  onChange={(e) => onFeedbackChange(e.target.value)}
  placeholder="Add your comments..."
  rows={6}
  className="resize-none w-full max-w-full min-w-0"
/>
          </div>

          {/* Submit + Cancel buttons */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onCancelFeedback}>
              Cancel
            </Button>
            <Button onClick={onSubmitFeedback}>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
}