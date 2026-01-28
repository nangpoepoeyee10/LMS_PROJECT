const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const providerController = require('../controllers/admin/providerController');

// All routes protected
router.use(authMiddleware);

// CRUD for providers
router.post('/providers', providerController.createProvider);
router.get('/providers', providerController.getAllProviders);
router.get('/providers/:id', providerController.getProvider);
router.put('/providers/:id', providerController.updateProvider);
router.delete('/providers/:id', providerController.deleteProvider);

module.exports = router;
