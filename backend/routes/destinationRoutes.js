const destinationController = require('../controller/destinationController');
const express = require('express'); 
const router = express.Router();


router.get('/places', destinationController.getAllPlaces);

router.post('/places/add', destinationController.createPlaces);


module.exports = router;