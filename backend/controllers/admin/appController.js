const App = require("../../models/AppModel");

// CREATE APP
exports.createApp = async (req, res) => {
  try {
    const { name, description, version } = req.body || {};

    if (!name) return res.status(400).json({ message: "App name is required" });

    const newApp = new App({
      name,
      description,
      version,
    });

    await newApp.save();
    res.status(201).json({ message: "App created successfully", app: newApp });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL APPS
exports.getAllApps = async (req, res) => {
  try {
    const apps = await App.find().populate("comments.user", "name email");
    res.json(apps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE APP
exports.updateApp = async (req, res) => {
  try {
    const { name, description, version, rating, downloads } = req.body || {};

    const app = await App.findById(req.params.id);
    if (!app) return res.status(404).json({ message: "App not found" });

    if (name) app.name = name;
    if (description) app.description = description;
    if (version) app.version = version;
    if (rating !== undefined) app.rating = rating;
    if (downloads !== undefined) app.downloads = downloads;

    await app.save();
    res.json({ message: "App updated successfully", app });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE APP
exports.deleteApp = async (req, res) => {
  try {
    const app = await App.findById(req.params.id);
    if (!app) return res.status(404).json({ message: "App not found" });

    await app.deleteOne();
    res.json({ message: "App deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ADD COMMENT
exports.addComment = async (req, res) => {
  try {
    const { userId, comment } = req.body || {};
    if (!userId || !comment)
      return res.status(400).json({ message: "User and comment are required" });

    const app = await App.findById(req.params.id);
    if (!app) return res.status(404).json({ message: "App not found" });

    app.comments.push({ user: userId, comment });
    await app.save();

    res.json({ message: "Comment added", app });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
