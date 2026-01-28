const router = require("express").Router();

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const {
  createProvider,
  getProviders,
  updateProvider,
  deleteProvider
} = require("../controllers/admin/providerController");

// 🔐 Admin-only
router.use(authMiddleware, roleMiddleware("admin"));

router.post("/providers", createProvider);
router.get("/providers", getProviders);
router.put("/providers/:id", updateProvider);
router.delete("/providers/:id", deleteProvider);

module.exports = router;
