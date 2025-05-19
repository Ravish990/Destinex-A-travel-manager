const express = require('express');
const router = express.Router();
const destinationController = require('../controller/destinationController');

// Create
router.post('/places/add', destinationController.createPlaces);

// Read
router.get('/places', destinationController.getAllPlaces);
router.get('/places/:id', destinationController.getPlaceById);

// Update
router.put('/places/:id', destinationController.updatePlace);

// Delete (soft delete)
router.delete('/places/:id', destinationController.deletePlace);

// Filters
router.get('/places/category/:category', destinationController.getPlacesByCategory);
router.get('/places/location/:location', destinationController.getPlacesByLocation);
router.get('/places/rating/:rating', destinationController.getPlacesByRating);
router.get('/places/price/:price', destinationController.getPlacesByPrice);
router.get('/places/name/:name', destinationController.getPlacesByName);

// Combined Filters
router.get('/places/location/:location/category/:category', destinationController.getPlacesByLocationAndCategory);
router.get('/places/location/:location/rating/:rating', destinationController.getPlacesByLocationAndRating);
router.get('/places/location/:location/price/:price', destinationController.getPlacesByLocationAndPrice);
router.get('/places/category/:category/rating/:rating', destinationController.getPlacesByCategoryAndRating);
router.get('/places/category/:category/price/:price', destinationController.getPlacesByCategoryAndPrice);
router.get('/places/rating/:rating/price/:price', destinationController.getPlacesByRatingAndPrice);
router.get('/places/name/:name/category/:category', destinationController.getPlacesByNameAndCategory);

// Get all unique cities (locations)
router.get('/cities', destinationController.getAllCities);

module.exports = router;
