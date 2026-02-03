const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  addProduct,
  getProducts,
  getUserProducts,
  getPendingProducts,
  approveProduct,
  deleteProduct,
} = require("../controllers/productController");

const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

// =======================
// MULTER CONFIG
// =======================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// =======================
// ROUTES (ORDER MATTERS)
// =======================

// ➕ Add product (user)
router.post(
  "/",
  verifyToken,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  addProduct
);

// 🔐 ADMIN: get pending products
router.get(
  "/admin/pending",
  verifyToken,
  isAdmin,
  getPendingProducts
);

// 🔐 ADMIN: approve product
router.put(
  "/:id/approve",
  verifyToken,
  isAdmin,
  approveProduct
);

// 👤 User: delete own product
router.delete(
  "/:id",
  verifyToken,
  deleteProduct
);

// 👤 User: own products
router.get(
  "/mine",
  verifyToken,
  getUserProducts
);

// 🌍 Public: approved products
router.get(
  "/",
  getProducts
);

module.exports = router;
