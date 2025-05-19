const express = require('express');
const router = express.Router();
const {
    createPackage,
    getPackages,
    getPackageById,
    updatePackage,
    deletePackage,
    getPackagesByCategory,
    getPackagesByDifficulty,
} = require('../controllers/packageController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.route('/')
    .get(getPackages)
    .post(protect, admin, createPackage);

router.route('/:id')
    .get(getPackageById)
    .put(protect, admin, updatePackage)
    .delete(protect, admin, deletePackage);

router.route('/category/:category')
    .get(getPackagesByCategory);

router.route('/difficulty/:difficulty')
    .get(getPackagesByDifficulty);

router.route('/destination/:destinationId')
    .get(require('../controllers/packageController').getPackagesByDestination);

module.exports = router; 