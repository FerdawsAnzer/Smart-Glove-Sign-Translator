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
    letter: string
    confidence: number
}