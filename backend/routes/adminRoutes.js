const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const providerController = require("../controllers/admin/providerController");
const adminController = require("../controllers/admin/adminController");
const categoryController = require("../controllers/admin/categoryController");
const courseController = require("../controllers/admin/courseController");

// All routes protected
router.use(authMiddleware);

// Providrer CRUD
router.post("/providers", providerController.createProvider);
router.get("/providers", providerController.getAllProviders);
router.put("/providers/:id", providerController.updateProvider);
router.delete("/providers/:id", providerController.deleteProvider);

// Admin CRUD
router.post("/admins", adminController.createAdmin);
router.get("/admins", adminController.getAllAdmins);
router.put("/admins/:id", adminController.updateAdmin);
router.delete("/admins/:id", adminController.deleteAdmin);

// Category CRUD
router.post("/categories", categoryController.createCategory);
router.get("/categories", categoryController.getAllCategories);
router.put("/categories/:id", categoryController.updateCategory);
router.delete("/categories/:id", categoryController.deleteCategory);

// Course CRUD
router.post("/courses", courseController.createCourse);
router.get("/courses", courseController.getAllCourses);
router.put("/courses/:id", courseController.updateCourse);
router.delete("/courses/:id", courseController.deleteCourse);

module.exports = router;
