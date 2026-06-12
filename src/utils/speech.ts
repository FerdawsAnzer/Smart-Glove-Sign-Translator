export const speak = (text: string) => {
    if (!text) return
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "en-US"
    utterance.rate = 1
    utterance.pitch = 1
    window.speechSynthesis.speak(utterance)
}

export const copy = (text: string) => {
    if (!text) return
    navigator.clipboard.writeText(text)
}