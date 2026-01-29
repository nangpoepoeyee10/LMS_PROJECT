const HomepageBlock = require("../../models/HomepageBlock");
const mongoose = require("mongoose");

// Create block
exports.createBlock = async (req, res) => {
  try {
    const { title, type, items } = req.body;

    const count = await HomepageBlock.countDocuments();
    if (count >= 5) {
      return res
        .status(400)
        .json({ message: "Maximum 5 homepage blocks allowed" });
    }

    const block = new HomepageBlock({ title, type, items });
    await block.save();
    res.status(201).json({ message: "Homepage block created", block });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all blocks
exports.getAllBlocks = async (req, res) => {
  try {
    const blocks = await HomepageBlock.find().populate("items");
    res.json(blocks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update block
exports.updateBlock = async (req, res) => {
  try {
    const { title, type, items } = req.body;

    const block = await HomepageBlock.findById(req.params.id);
    if (!block) return res.status(404).json({ message: "Block not found" });

    if (title) block.title = title;
    if (type) block.type = type;

    if (items) {
      // Only map valid 24-character hex strings to ObjectId
      block.items = items
        .filter((id) => mongoose.Types.ObjectId.isValid(id))
        .map((id) => new mongoose.Types.ObjectId(id));
    }

    await block.save();
    res.json({ message: "Homepage block updated", block });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete block
exports.deleteBlock = async (req, res) => {
  try {
    const block = await HomepageBlock.findById(req.params.id);
    if (!block) return res.status(404).json({ message: "Block not found" });

    await block.deleteOne();
    res.json({ message: "Homepage block deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
