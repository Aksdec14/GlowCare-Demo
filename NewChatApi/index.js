/* eslint-disable no-undef */
import express from "express";
import https from "https";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({ origin: "https://glow-care-tcmk.vercel.app" })); // allow Vite frontend

// Health check
app.get("/", (req, res) => {
  res.send("🚀 Skincare Chatbot Backend is running. Use POST /api/chat");
});

// Chat endpoint
app.post("/api/chat", (req, res) => {
  const userMessage = req.body.message || "Hello";

  const data = JSON.stringify({
    model: "deepseek/deepseek-r1-0528:free",
    messages: [{ role: "user", content: userMessage }],
  });

  const options = {
    hostname: "openrouter.ai",
    path: "/api/v1/chat/completions",
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`, // ✅ secure key
      "HTTP-Referer": "https://glow-care-tcmk.vercel.app", // your frontend URL
      "X-Title": "My Skincare Chatbot",
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(data),
    },
  };

  const apiReq = https.request(options, (apiRes) => {
    let response = "";

    apiRes.on("data", (chunk) => {
      response += chunk;
    });

    apiRes.on("end", () => {
      try {
        const parsed = JSON.parse(response);
        const answer =
          parsed.choices?.[0]?.message?.content || "No answer found.";
        res.json({ reply: answer });
      } catch (err) {
        console.error(`Error parsing response ${err}`, response);
        res.status(500).json({ reply: "Invalid response from API." });
      }
    });
  });

  apiReq.on("error", (e) => {
    console.error("Request error:", e);
    res.status(500).json({ reply: "Request error." });
  });

  apiReq.write(data);
  apiReq.end();
});

app.listen(port, () => {
  console.log(`✅ Backend running at http://localhost:${port}`);
});
