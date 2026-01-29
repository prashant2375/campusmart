const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

/* CORS CONFIG */
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* MIDDLEWARE */
app.use(express.json());
app.use("/uploads", express.static("uploads"));

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

/* TEST ROUTE */
app.get("/", (req, res) => {
  res.send("CampusMart backend running");
});

/* START SERVER */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
