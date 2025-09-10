/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";

// Get API URL from environment variables or fallback
const API_URL = import.meta.env.VITE_API_URL || "https://glowcare-2yik.onrender.com";

export default function SkincareChat() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 👋 I’m your personal skincare assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Ref to scroll to the bottom
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
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

  const formatText = (text) => {
    if (!text) return "";
    let formatted = text.replace(/\n/g, "<br/>");
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
    <section className="bg-gradient-to-b from-white to-gray-100 text-gray-900 py-4 px-4 min-h-screen flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-blue-600">
        Your AI Skincare Companion
      </h2>
      <p className="text-gray-600 mb-4 text-center max-w-2xl">
        Get instant, science-backed advice for healthier, glowing skin.
      </p>

      {/* Chat Container */}
      <div className="flex flex-col bg-white border border-gray-200 rounded-2xl shadow-lg max-w-2xl w-full h-[80vh] sm:h-[70vh] md:h-[60vh]">
        
        {/* Messages Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 min-h-0">
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
          <div ref={messagesEndRef} />
        </div>

        {/* Input Section */}
        <div className="border-t border-gray-200 p-4 flex items-center gap-2 bg-white">
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

      <div className="mt-4 text-sm text-gray-500 text-center max-w-2xl px-4">
        Please wait patiently while I search for the best answers. This may take a few moments.
      </div>
    </section>
  );
}
