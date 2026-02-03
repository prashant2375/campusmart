// const express = require("express");
// const router = express.Router();
// const db = require("../config/db");
// const jwt = require("jsonwebtoken");

// // LOGIN
// router.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   const sql = "SELECT * FROM users WHERE email = ?";

//   db.query(sql, [email], (err, results) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ message: "Server error" });
//     }

//     if (results.length === 0) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const user = results[0];

//     // ⚠️ (plain password check — OK for learning)
//     if (user.password !== password) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // ✅ IMPORTANT: include `id`
//     const token = jwt.sign(
//       { id: user.id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({
//       token,
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   });
// });

// module.exports = router;
