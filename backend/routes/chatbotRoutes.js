const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");
const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post("/", verifyToken, async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `
You are a CampusMart support chatbot.

Rules:
- Reply like a chat assistant
- Use bullet points (•)
- Max 5 bullets
- Keep answers short
- End with a friendly question
          `,
        },
        { role: "user", content: message },
      ],
    });

    res.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Chatbot Error:", error.message);
    res.status(500).json({ message: "Chatbot failed" });
  }
});

module.exports = router;
