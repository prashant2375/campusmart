const db = require("../config/db");

/* ============================
   ADD PRODUCT (USER)
============================ */
exports.addProduct = (req, res) => {
  const { name, category, source, price, description } = req.body;
  const userId = req.user.id;

  const imageUrl = req.files?.image ? req.files.image[0].path : null;
  const videoUrl = req.files?.video ? req.files.video[0].path : null;

  if (!name || !category || !price) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  const sql = `
    INSERT INTO products
    (name, category, source, price, description, image_url, video_url, user_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, category, source, price, description, imageUrl, videoUrl, userId],
    (err) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: "Product added successfully" });
    }
  );
};

/* ============================
   GET PRODUCTS (PUBLIC)
============================ */
exports.getProducts = (req, res) => {
  const { status } = req.query;

  let sql = "SELECT * FROM products";
  let params = [];

  if (status) {
    sql += " WHERE status = ?";
    params.push(status);
  } else {
    sql += " WHERE status = 'approved'";
  }

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

/* ============================
   GET PRODUCTS BY USER
============================ */
exports.getUserProducts = (req, res) => {
  const userId = req.user.id;

  db.query(
    "SELECT * FROM products WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
};

/* ============================
   ADMIN: GET PENDING PRODUCTS
============================ */
exports.getPendingProducts = (req, res) => {
  db.query(
    "SELECT * FROM products WHERE status = 'pending'",
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
};

/* ============================
   ADMIN: APPROVE PRODUCT
============================ */
exports.approveProduct = (req, res) => {
  const productId = req.params.id;

  db.query(
    "UPDATE products SET status = 'approved' WHERE id = ?",
    [productId],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ message: "Product approved successfully" });
    }
  );
};

/* ============================
   DELETE PRODUCT (OWNER)
============================ */
exports.deleteProduct = (req, res) => {
  const productId = req.params.id;
  const userId = req.user.id;

  db.query(
    "DELETE FROM products WHERE id = ? AND user_id = ?",
    [productId, userId],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.affectedRows === 0) {
        return res
          .status(403)
          .json({ message: "Not authorized to delete this product" });
      }
      res.json({ message: "Product deleted successfully" });
    }
  );
};

exports.getPendingProducts = (req, res) => {
  db.query(
    "SELECT * FROM products WHERE status = 'pending'",
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
};



