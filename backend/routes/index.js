const router = require("express").Router();

router.use("/auth", require("./authRoutes"));
router.use("/admin", require("./adminRoutes"));

module.exports = router;
