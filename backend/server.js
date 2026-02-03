require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

/* ✅ MIDDLEWARE FIRST */
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

/* ✅ STATIC FILES (IMAGES) */
app.use("/uploads", express.static("uploads"));

/* ROUTES */
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");
const lostFoundRoutes = require("./routes/lostFoundRoutes");
const messageRoutes = require("./routes/messages");

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/lostfound", lostFoundRoutes);
app.use("/api/messages", messageRoutes);

/* TEST */
app.get("/", (req, res) => {
  res.send("CampusMart backend running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
