function isSingleCharOrNumber(text: string): boolean {
  const cleaned = text.trim();
  return (
    cleaned.length === 1 ||
    /^\d+$/.test(cleaned) ||
    /^[a-zA-Z]$/.test(cleaned)
  );
}

export async function translateText(
  text: string,
  targetLang: string
): Promise<string> {
  if (!text) return "";
  if (targetLang === "en") return text;
  if (isSingleCharOrNumber(text)) return text;

  //  trim to avoid query length issues
  const trimmed = text.trim().slice(0, 200);

  try {
    //  Google Translate unofficial API — most accurate free option
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(trimmed)}`;

    const response = await fetch(url);

    if (!response.ok) return text;

    const data = await response.json();


    const translated = data?.[0]
      ?.map((item: any) => item?.[0])
      .filter(Boolean)
      .join("");

    console.log("Google Translate:", { text: trimmed, targetLang, translated });

    if (translated && translated.trim()) {
      return translated;
    }

  } catch (err) {
    console.log("Translation error:", err);
  }

  return text; 
}