import axios from "axios";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";


const Chatbot = () => {
  const { token, isAuthenticated } = useAuth();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 👋 How can I help you?" },
  ]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/chatbot",
        { message: input },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: res.data.reply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: isAuthenticated
            ? "Something went wrong 😢"
            : "Please login to use the chatbot 🔐",
        },
      ]);
    }

    setInput("");
  };

  return (
    <div className="chatbot-page">
      <div className="chatbot-card">
        <div className="chatbot-header">
          <h3>CampusMart Help Bot 🤖</h3>
          <p>Your assistant for buying, selling & lost items</p>
        </div>

        <div className="chatbot-body">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`chatbot-msg ${
                msg.sender === "user" ? "user" : "bot"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="chatbot-input">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Ask your doubt..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
