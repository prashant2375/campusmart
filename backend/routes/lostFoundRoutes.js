const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { verifyToken } = require("../middleware/authMiddleware");
const multer = require("multer");

// =======================
// MULTER CONFIG
// =======================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/lostfound");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// =======================
// GET LOST / FOUND ITEMS (🔥 MISSING PART)
// =======================
router.get("/", (req, res) => {
  const sql = `
    SELECT *
    FROM lost_found
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to fetch items" });
    }

    res.status(200).json(results);
  });
});

// =======================
// ADD LOST / FOUND
// =======================
router.post(
  "/",
  verifyToken,
  upload.single("image"),
  (req, res) => {
    const { name, description, location, status } = req.body;
    const userId = req.user.id;

    const imagePath = req.file ? req.file.path : null;

    if (!name || !status || !location) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const sql = `
      INSERT INTO lost_found
      (title, description, location, status, image, user_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [name, description, location, status.toLowerCase(), imagePath, userId],
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Failed to add item" });
        }
        res.status(201).json({ message: "Item added successfully" });
      }
    );
  }
);

module.exports = router;
