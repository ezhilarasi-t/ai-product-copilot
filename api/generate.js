import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { GoogleGenAI } from "@google/genai";
import { mobilePrompt } from "./mobilePrompt.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const app = express();
app.use(express.json());

// Simple CORS (dev only)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

app.post("/api/generate", async (req, res) => {
  try {
    console.log("Incoming request body:", req.body);

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
      return res.status(500).json({
        error: "No text returned from Gemini",
        raw: response,
      });
    }

    // Try JSON parse (optional)
    try {
      const parsed = JSON.parse(text);
      return res.status(200).json(parsed);
    } catch {
      return res.status(200).json({ result: text });
    }
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
});

// Export as Vercel handler
export default app;
