const Slider = require("../../models/SliderModel");

// CREATE SLIDER
exports.createSlider = async (req, res) => {
  try {
    const { title, subtitle, image, link, order } = req.body || {};

    if (!title || !image)
      return res.status(400).json({ message: "Title and image are required" });

    const slider = new Slider({ title, subtitle, image, link, order });
    await slider.save();

    res.status(201).json({ message: "Slider created successfully", slider });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL SLIDERS
exports.getAllSliders = async (req, res) => {
  try {
    const sliders = await Slider.find().sort({ order: 1 });
    res.json(sliders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE SLIDER
exports.updateSlider = async (req, res) => {
  try {
    const { title, subtitle, image, link, order } = req.body || {};

    const slider = await Slider.findById(req.params.id);
    if (!slider) return res.status(404).json({ message: "Slider not found" });

    if (title) slider.title = title;
    if (subtitle) slider.subtitle = subtitle;
    if (image) slider.image = image;
    if (link) slider.link = link;
    if (order !== undefined) slider.order = order;

    await slider.save();
    res.json({ message: "Slider updated successfully", slider });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE SLIDER
exports.deleteSlider = async (req, res) => {
  try {
    const slider = await Slider.findById(req.params.id);
    if (!slider) return res.status(404).json({ message: "Slider not found" });

    await slider.deleteOne();
    res.json({ message: "Slider deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
