export type TargetLang = "FR" | "EN" | "AR";

export default async function translateText(
  text: string,
  targetLang: TargetLang
): Promise<string> {
  if (!text || targetLang === "FR") return text;

  try {
    const res = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        source: "fr",
        target: targetLang.toLowerCase(),
        format: "text",
      }),
    });

    const data = await res.json();
    return data.translatedText ?? text;
  } catch (e) {
    console.warn("Translate error:", e);
    return text;
  }
}
