const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const products = [];

app.get("/products", (req, res) => {
  res.json(products);
});

// Accept image + video
app.post(
  "/products",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  (req, res) => {
    const { name, category, price, source } = req.body;

    const newProduct = {
      id: products.length + 1,
      name,
      category,
      price,
      source,
      image: req.files.image[0].filename,
      video: req.files.video[0].filename,
    };

    products.push(newProduct);
    res.json(newProduct);
  }
);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
