const mongoose = require('mongoose');  

const bookingSchema = new mongoose.Schema({ 
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    destinationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Destination',
        required: true
    },
    bookingDate: {
        type: Date,
        default: Date.now
    },
    numberOfPeople: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    cancelledAt: {
        type: Date,
        default: null
    },
    cancellationReason: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('Booking', bookingSchema);
