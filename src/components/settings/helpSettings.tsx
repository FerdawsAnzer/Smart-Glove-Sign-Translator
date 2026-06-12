import { useState } from "react";
import { ChevronDown, Star } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useTranslation } from "react-i18next"; 

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
  const { t } = useTranslation();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

 const faqs = [
    { question: t("faq.q1"), answer: t("faq.a1") },
    { question: t("faq.q2"), answer: t("faq.a2") },
    { question: t("faq.q3"), answer: t("faq.a3") },
    { question: t("faq.q4"), answer: t("faq.a4") },
  ];

  const handleStarClick = (star: number) => {
    onRatingChange(rating === star ? 0 : star);
  };

  return (
    <div className="grid grid-cols-2 gap-8">

      {/* FAQ */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">FAQ</h3>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <button
              key={index}
              onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
              className="w-full text-left"
            >
              <div className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${expandedFaq === index ? "rotate-180" : ""}`} />
                </div>
                {expandedFaq === index && (
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Feedback */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {t("help.title")} 
        </h3>
        <div className="space-y-6">

          {/* Star Rating */}
          <div className="space-y-2">
            <Label>{t("help.rating")}</Label> 
            <p className="text-sm text-gray-500">{t("help.subtitle")}</p> 
            <div className="flex gap-2 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => handleStarClick(star)} className="transition-transform hover:scale-110">
                  <Star className={`w-8 h-8 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div className="space-y-2">
            <Label htmlFor="feedback">{t("help.feedback")}</Label> 
            <Textarea
              id="feedback"
              value={feedback}
              onChange={(e) => onFeedbackChange(e.target.value)}
              placeholder={t("help.feedbackPlaceholder")} 
              rows={6}
              className="resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onCancelFeedback}>
              {t("help.cancel")} 
            </Button>
            
<Button
  onClick={onSubmitFeedback}
  className="text-white border-0"
  style={{
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    boxShadow: "0 4px 12px rgba(99,102,241,0.3)",
  }}
>
  {t("help.submit")}
</Button>
           
          </div>
        </div>
      </div>
    </div>
  );
}