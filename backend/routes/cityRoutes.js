const express = require('express');
const router = express.Router();
const cityController = require('../controller/cityController');

// Get all cities
router.get('/', cityController.getAllCities);

// Get destinations for a city
router.get('/:cityId/destinations', cityController.getDestinationsByCity);

module.exports = router; 