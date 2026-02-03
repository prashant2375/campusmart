const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const { createOrGetChat } = require("../controllers/chatController");

// CREATE / GET CHAT
router.post("/", verifyToken, createOrGetChat);

module.exports = router;
