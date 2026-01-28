const User = require("../../models/UserModel");
const bcrypt = require("bcryptjs");

// CREATE PROVIDER
exports.createProvider = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const provider = new User({
      name,
      email,
      password: hashedPassword,
      role: "provider",
    });

    await provider.save();

    res
      .status(201)
      .json({ message: "Provider created successfully", provider });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL PROVIDERS
exports.getAllProviders = async (req, res) => {
  try {
    const providers = await User.find({ role: "provider" }).select("-password");
    res.json(providers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET SINGLE PROVIDER
exports.getProvider = async (req, res) => {
  try {
    const provider = await User.findById(req.params.id).select("-password");
    if (!provider || provider.role !== "provider")
      return res.status(404).json({ message: "Provider not found" });

    res.json(provider);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE PROVIDER 
exports.updateProvider = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};

    const provider = await User.findById(req.params.id);
    if (!provider || provider.role !== "provider")
      return res.status(404).json({ message: "Provider not found" });

    if (name) provider.name = name;
    if (email) provider.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      provider.password = hashedPassword;
    }

    await provider.save();

    res.json({ message: "Provider updated successfully", provider });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE PROVIDER
exports.deleteProvider = async (req, res) => {
  try {
    const provider = await User.findById(req.params.id);
    if (!provider || provider.role !== "provider")
      return res.status(404).json({ message: "Provider not found" });

    await provider.deleteOne();

    res.json({ message: "Provider deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
