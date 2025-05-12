const express = require('express');
const hotelController = require('../controller/hotelController');
const router = express.Router();


router.post('/add', hotelController.createHotel);
router.get('/', hotelController.getHotel);
router.get('/:id', hotelController.getHotelById);
router.put('/:id', hotelController.updateHotel);
router.delete('/:id', hotelController.deleteHotel);

module.exports = router;