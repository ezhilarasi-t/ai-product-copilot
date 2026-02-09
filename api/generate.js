// server.js
require("dotenv").config();
const express = require("express");
const { GoogleGenAI } = require("@google/genai");
const { mobilePrompt } = require("./mobilePrompt");

const app = express();
const PORT = process.env.PORT || 8000;

// Gemini client (API key auto picked from env)
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

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
          parts: [{ text: prompt }]
        }
      ]
    });

    const text = response?.text;

    if (!text) {
      return res.status(500).json({
        error: "No text returned from Gemini",
        raw: response
      });
    }

    // Try JSON parse (optional)
    try {
      const parsed = JSON.parse(text);
      return res.status(200).json(parsed);
    } catch {
      return res.status(200).json({
        result: text
      });
    }

  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({
      error: err.message || "Internal Server Error"
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
