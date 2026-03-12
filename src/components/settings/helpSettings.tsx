import { useState } from "react";
import { ChevronDown, Star } from "lucide-react";

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
        "To connect the glove, turn on Wifi on your device, then press the power button on the glove for 3 seconds until the LED blinks blue. Select 'SignGlove' from your device's Bluetooth menu.",
    },
    {
      question: "What if the gesture is not recognized?",
      answer:
        "Ensure good lighting and that your hands are fully visible. Try repositioning your hand or recalibrating the glove in settings. Make sure the glove is properly fitted and charged.",
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

  return (
    <div className="grid grid-cols-2 gap-8">
      {/* FAQ Section */}
      <div>
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

      {/* Help/Feedback Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Help / Feedback
        </h3>
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-600 mb-4">
              Share your experience in auditing
            </p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => onRatingChange(star)}
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

          <div>
            <textarea
              value={feedback}
              onChange={(e) => onFeedbackChange(e.target.value)}
              placeholder="Add your comments..."
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-sm"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={onCancelFeedback}
              className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onSubmitFeedback}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
