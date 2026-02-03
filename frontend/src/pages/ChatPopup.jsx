import { useEffect, useState } from "react";
import API from "../api/api";

function ChatPopup({ item, onClose }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const senderId = Number(localStorage.getItem("userId")); // ✅ REQUIRED

  // 🔹 LOAD PREVIOUS MESSAGES
  useEffect(() => {
    if (!item?.id) return;

    const fetchMessages = async () => {
      try {
        const res = await API.get(`/messages/${item.id}`);

        const formatted = res.data.map((msg) => ({
          text: msg.message,
          sender: msg.sender_id === senderId ? "me" : "other",
        }));

        setMessages(formatted);
      } catch (err) {
        console.error("❌ Failed to load messages");
      }
    };

    fetchMessages();
  }, [item, senderId]);

  // 🔹 SEND MESSAGE
  const sendMessage = async () => {
    if (!message.trim()) return;

    const newMessage = {
      text: message,
      sender: "me",
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");

    try {
      await API.post("/messages", {
        chatId: item.id,     // ✅ FIXED
        senderId: senderId,  // ✅ FIXED
        message: newMessage.text,
      });
    } catch (err) {
      console.error("❌ Message failed", err);
    }
  };

  // 🔹 ENTER KEY
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="chat-modal">
        <span className="chat-close" onClick={onClose}>✖</span>

        <h3>Chat about: {item.name}</h3>

        <div className="chat-body">
          {messages.length === 0 && (
            <p className="chat-empty">No messages yet</p>
          )}

          {messages.map((msg, index) => (
            <div key={index} className={`chat-msg ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Type message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatPopup;
