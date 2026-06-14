export interface UseGloveConnectionProps {
    onPrediction: (letter: string) => void
}

export interface AslInputCardProps {
    onPrediction: (letter: string) => void
}

export interface TranslationCardProps {
    translation: string
}

export interface PredictionData {
    prediction: string;
    confidence: number;
    mode?: "static" | "dynamic";
}