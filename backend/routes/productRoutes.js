const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  addProduct,
  getProducts,
  getUserProducts,
  approveProduct,
  deleteProduct,
} = require("../controllers/productController");

const {
  verifyToken,
  isAdmin,
} = require("../middleware/authMiddleware");

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Routes
router.post(
  "/",
  verifyToken,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  addProduct
);

router.get("/", getProducts);
router.get("/mine", verifyToken, getUserProducts);
router.put("/:id/approve", verifyToken, isAdmin, approveProduct);
router.delete("/:id", verifyToken, deleteProduct);

module.exports = router;
