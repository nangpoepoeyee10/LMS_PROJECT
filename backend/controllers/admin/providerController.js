const User = require("../../models/User");
const bcrypt = require("bcryptjs");

// ✅ Create Provider
exports.createProvider = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields required" });

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const provider = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "provider"
    });

    res.status(201).json({
      message: "Provider created successfully",
      provider: {
        id: provider._id,
        name: provider.name,
        email: provider.email
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get All Providers
exports.getProviders = async (req, res) => {
  try {
    const providers = await User.find({ role: "provider" })
      .select("-password")
      .sort({ createdAt: -1 });

    res.json(providers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update Provider
exports.updateProvider = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const provider = await User.findOne({ _id: id, role: "provider" });
    if (!provider)
      return res.status(404).json({ message: "Provider not found" });

    if (email && email !== provider.email) {
      const exists = await User.findOne({ email });
      if (exists)
        return res.status(400).json({ message: "Email already in use" });
    }

    provider.name = name ?? provider.name;
    provider.email = email ?? provider.email;

    await provider.save();

    res.json({ message: "Provider updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete Provider
exports.deleteProvider = async (req, res) => {
  try {
    const { id } = req.params;

    const provider = await User.findOneAndDelete({
      _id: id,
      role: "provider"
    });

    if (!provider)
      return res.status(404).json({ message: "Provider not found" });

    res.json({ message: "Provider deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
