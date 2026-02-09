import GoogleGenAI from "@google/genai";
import { mobilePrompt } from "../mobilePrompt.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const prompt = mobilePrompt(req.body);

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const text = response?.text;

    if (!text) {
      return res.status(500).json({ error: "No text returned from Gemini" });
    }

    try {
      return res.status(200).json(JSON.parse(text));
    } catch {
      return res.status(200).json({ result: text });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
