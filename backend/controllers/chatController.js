const db = require("../config/db");

// CREATE OR GET CHAT
exports.createOrGetChat = (req, res) => {
  const { itemId } = req.body;
  const finderId = req.user.id;

  // 1️⃣ Get item owner
  const itemQuery = "SELECT user_id FROM lost_found WHERE id = ?";

  db.query(itemQuery, [itemId], (err, itemResult) => {
    if (err) return res.status(500).json(err);
    if (itemResult.length === 0)
      return res.status(404).json({ message: "Item not found" });

    const ownerId = itemResult[0].user_id;

    if (ownerId === finderId) {
      return res
        .status(400)
        .json({ message: "You cannot chat with yourself" });
    }

    // 2️⃣ Check if chat already exists
    const checkChatQuery = `
      SELECT * FROM chats
      WHERE item_id = ? AND finder_id = ?
    `;

    db.query(
      checkChatQuery,
      [itemId, finderId],
      (err, chatResult) => {
        if (err) return res.status(500).json(err);

        // ✅ Chat exists
        if (chatResult.length > 0) {
          return res.json(chatResult[0]);
        }

        // 3️⃣ Create new chat
        const createChatQuery = `
          INSERT INTO chats (item_id, owner_id, finder_id)
          VALUES (?, ?, ?)
        `;

        db.query(
          createChatQuery,
          [itemId, ownerId, finderId],
          (err, result) => {
            if (err) return res.status(500).json(err);

            res.status(201).json({
              id: result.insertId,
              item_id: itemId,
              owner_id: ownerId,
              finder_id: finderId,
              status: "open",
            });
          }
        );
      }
    );
  });
};
