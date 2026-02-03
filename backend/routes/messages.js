const express = require("express");
const router = express.Router();
const db = require("../config/db");

/**
 * ✅ GET messages by item/chat ID
 * GET /api/messages/:itemId
 */
router.get("/:itemId", (req, res) => {
  const { itemId } = req.params;

  const sql = `
    SELECT id, message, sender_id, created_at
    FROM messages
    WHERE chat_id = ?
    ORDER BY created_at ASC
  `;

  db.query(sql, [itemId], (err, results) => {
    if (err) {
      console.error("❌ Fetch messages error:", err);
      return res.status(500).json({ error: "DB error" });
    }

    res.json(results);
  });
});

/**
 * ✅ POST new message
 * POST /api/messages
 * Body: { itemId, message }
 */
router.post("/", (req, res) => {
  const { itemId, message } = req.body;

  if (!itemId || !message) {
    return res.status(400).json({
      error: "itemId and message required",
    });
  }

  // TEMP: sender_id = 1 (later from JWT)
  const senderId = 1;

  const sql = `
    INSERT INTO messages (chat_id, sender_id, message)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [itemId, senderId, message], (err, result) => {
    if (err) {
      console.error("❌ Insert message error:", err);
      return res.status(500).json({ error: "DB error" });
    }

    res.json({
      success: true,
      messageId: result.insertId,
    });
  });
});

module.exports = router;
