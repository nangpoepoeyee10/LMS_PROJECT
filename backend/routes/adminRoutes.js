const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middlewares/authMiddleware");

const providerController = require("../controllers/admin/providerController");
const adminController = require("../controllers/admin/adminController");
const categoryController = require("../controllers/admin/categoryController");
const courseController = require("../controllers/admin/courseController");
const userController = require("../controllers/admin/userController");
const appController = require("../controllers/admin/appController");

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
router.post("/users", userController.createUser);
router.get("/users", userController.getAllUsers);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

// User progress
router.get("/users/:id/progress", userController.getUserProgress);

// App CRUD
router.post("/apps", appController.createApp);
router.get("/apps", appController.getAllApps);
router.put("/apps/:id", appController.updateApp);
router.delete("/apps/:id", appController.deleteApp);

// Add comment
router.post("/apps/:id/comments", appController.addComment);
module.exports = router;

