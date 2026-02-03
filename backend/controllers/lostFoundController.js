const LostFound = require("../models/LostFound");

/* ADD LOST/FOUND */
exports.addLostFound = async (req, res) => {
  try {
    const item = await LostFound.create({
      ...req.body,
      user: req.user.id,
      approved: false,
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: "Failed to add item" });
  }
};

/* GET APPROVED */
exports.getApprovedLostFound = async (req, res) => {
  try {
    const items = await LostFound.find({ approved: true });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch items" });
  }
};

/* USER ITEMS */
exports.getUserLostFound = async (req, res) => {
  try {
    const items = await LostFound.find({ user: req.user.id });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user items" });
  }
};

/* APPROVE (ADMIN) */
exports.approveLostFound = async (req, res) => {
  try {
    const item = await LostFound.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Approval failed" });
  }
};

/* DELETE */
exports.deleteLostFound = async (req, res) => {
  try {
    await LostFound.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};
