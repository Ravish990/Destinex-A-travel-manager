const express = require('express');
const router = express.Router();
const bookingController = require('../controller/bookingController');


router.post('/bookings', bookingController.createBooking);

router.get('/bookings/:userId', bookingController.getBooking);

router.put('/bookings/:bookingId', bookingController.updateBooking);

router.delete('/bookings/:bookingId', bookingController.deleteBooking);


module.exports = router;