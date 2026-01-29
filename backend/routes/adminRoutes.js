const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middlewares/authMiddleware");

const providerController = require("../controllers/admin/providerController");
const adminController = require("../controllers/admin/adminController");
const categoryController = require("../controllers/admin/categoryController");
const courseController = require("../controllers/admin/courseController");
const userController = require("../controllers/admin/userController");
const appController = require("../controllers/admin/appController");
const sliderController = require("../controllers/admin/sliderController");
const homepageBlockController = require("../controllers/admin/homepageBlockController");

// PROVIDER CRUD
router.post("/providers", protect, admin, providerController.createProvider);
router.get("/providers", protect, admin, providerController.getAllProviders);
router.put("/providers/:id", protect, admin, providerController.updateProvider);
router.delete("/providers/:id", protect, admin, providerController.deleteProvider);

// ADMIN CRUD
router.post("/admins", protect, admin, adminController.createAdmin);
router.get("/admins", protect, admin, adminController.getAllAdmins);
router.put("/admins/:id", protect, admin, adminController.updateAdmin);
router.delete("/admins/:id", protect, admin, adminController.deleteAdmin);

// CATEGORY CRUD
router.post("/categories", protect, admin, categoryController.createCategory);
router.get("/categories", protect, admin, categoryController.getAllCategories);
router.put("/categories/:id", protect, admin, categoryController.updateCategory);
router.delete("/categories/:id", protect, admin, categoryController.deleteCategory);

// COURSE CRUD
router.post("/courses", protect, admin, courseController.createCourse);
router.get("/courses", protect, admin, courseController.getAllCourses);
router.put("/courses/:id", protect, admin, courseController.updateCourse);
router.delete("/courses/:id", protect, admin, courseController.deleteCourse);

// User CRUD
router.post("/users", protect, admin, userController.createUser);
router.get("/users", protect, admin, userController.getAllUsers);
router.put("/users/:id", protect, admin, userController.updateUser);
router.delete("/users/:id", protect, admin, userController.deleteUser);

// User progress
router.get("/users/:id/progress", protect, admin, userController.getUserProgress);

// App CRUD
router.post("/apps", protect, admin, appController.createApp);
router.get("/apps", protect, admin, appController.getAllApps);
router.put("/apps/:id", protect, admin, appController.updateApp);
router.delete("/apps/:id", protect, admin, appController.deleteApp);

// Add comment
router.post("/apps/:id/comments", protect, admin, appController.addComment);

// Slider CRUD
router.post("/sliders", protect, admin, sliderController.createSlider);
router.get("/sliders", protect, admin, sliderController.getAllSliders);
router.put("/sliders/:id", protect, admin, sliderController.updateSlider);
router.delete("/sliders/:id", protect, admin, sliderController.deleteSlider);

// Homepage block CRUD (max 5)
router.post("/homepage-blocks", protect, admin, homepageBlockController.createBlock);
router.get("/homepage-blocks", protect, admin, homepageBlockController.getAllBlocks);
router.put("/homepage-blocks/:id", protect, admin, homepageBlockController.updateBlock);
router.delete("/homepage-blocks/:id", protect, admin, homepageBlockController.deleteBlock);

module.exports = router;

