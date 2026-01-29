const db = require("../config/db");

// ADD PRODUCT
exports.addProduct = (req, res) => {
  const { name, category, source, price, description } = req.body;
  const userId = req.user.id;

  const imageUrl = req.files?.image
    ? req.files.image[0].path
    : null;
  const videoUrl = req.files?.video
    ? req.files.video[0].path
    : null;

  if (!name || !category || !price) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  const query = `
    INSERT INTO products
    (name, category, source, price, description, image_url, video_url, user_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [name, category, source, price, description, imageUrl, videoUrl, userId],
    (err) => {
      if (err) return res.status(500).json(err);

      res.status(201).json({ message: "Product added successfully" });
    }
  );
};

// GET ALL PRODUCTS (Approved only)
exports.getProducts = (req, res) => {
  db.query(
    "SELECT * FROM products WHERE status='approved'",
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
};

// GET PRODUCTS BY USER
exports.getUserProducts = (req, res) => {
  db.query(
    "SELECT * FROM products WHERE user_id = ?",
    [req.user.id],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
};

// ADMIN: APPROVE PRODUCT
exports.approveProduct = (req, res) => {
  db.query(
    "UPDATE products SET status='approved' WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Product approved" });
    }
  );
};

// DELETE PRODUCT
exports.deleteProduct = (req, res) => {
  db.query(
    "DELETE FROM products WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Product deleted" });
    }
  );
};
