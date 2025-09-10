/* eslint-disable no-unused-vars */
import { useState } from "react";

export default function SkincareChat() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 👋 I’m your personal skincare assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botMessage = data.reply || "Sorry, I couldn't understand that.";

      // Typing effect
      let reply = "";
      const chars = botMessage.split("");
      chars.forEach((char, index) => {
        setTimeout(() => {
          reply += char;
          setMessages((prev) => {
            const last = [...prev];
            if (last[last.length - 1]?.sender === "bot" && last[last.length - 1].typing) {
              last[last.length - 1].text = reply;
              return [...last];
            } else {
              return [...prev, { sender: "bot", text: reply, typing: true }];
            }
          });
        }, index * 20);
      });
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "bot", text: "⚠️ Error: Unable to connect." }]);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  // Helper to format bot text
  const formatText = (text) => {
    if (!text) return "";
    // replace line breaks with <br>
    let formatted = text.replace(/\n/g, "<br/>");
    // replace bullets "🔹" with <li>
    if (formatted.includes("🔹")) {
      formatted = formatted
        .split("🔹")
        .filter((t) => t.trim() !== "")
        .map((t) => `<li>${t.trim()}</li>`)
        .join("");
      formatted = `<ul>${formatted}</ul>`;
    }
    return formatted;
  };

  return (
    <section className="bg-gradient-to-b from-white to-gray-100 text-gray-900 py-12 px-4 min-h-screen flex flex-col items-center">
      {/* Headline */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-blue-600">
        Your AI Skincare Companion
      </h2>
      <p className="text-gray-600 mb-8 text-center max-w-2xl">
        Get instant, science-backed advice for healthier, glowing skin.
      </p>

      {/* Chat box */}
      <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-2xl shadow-lg p-6 flex flex-col space-y-4">
        <div className="flex flex-col space-y-3 max-h-[400px] overflow-y-auto">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-[80%] whitespace-pre-wrap ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-900"
                }`}
              >
                {msg.sender === "bot" ? (
                  <span dangerouslySetInnerHTML={{ __html: formatText(msg.text) }} />
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="px-4 py-2 rounded-2xl bg-gray-200 text-gray-500 italic">
                Thinking...
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex mt-4">
          <input
            type="text"
            className="flex-1 px-4 py-2 rounded-l-2xl bg-gray-50 border border-gray-300 focus:outline-none"
            placeholder="Ask about skincare..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-r-2xl hover:bg-blue-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    </section>
  );
}
