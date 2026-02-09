module.exports = {
  mobilePrompt: (data) => `
You are an expert smartphone recommendation engine.

User preferences:
- Budget: ${data.budget}
- Usage: ${data.usage}
- Priorities: ${data.priorities?.join(", ")}
- Additional Preference: ${data.additionalPreference}

Return ONLY valid JSON.

Rules:
- image must be a public product image URL
- confidence should be a percentage like "85%"

JSON format:
{
  "bestMatch": {
    "name": "",
    "price": "",
    "image": "",
    "confidence": "",
    "why": "",
    "pros": [],
    "cons": []
  },
  "alternatives": [
    { "name": "", "reason": "" },
    { "name": "", "reason": "" }
  ],
  "summary": ""
}
`
};
