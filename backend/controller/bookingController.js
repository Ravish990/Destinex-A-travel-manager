const bookingSchema = require('../db/models/bookingModel');  

const createBooking = async (req, res) => {
    const { userId, destinationId, bookingDate } = req.body;

    try {
        const newBooking = new bookingSchema({
            userId,
            destinationId,
            bookingDate
        });

        await newBooking.save();

        res.status(201).json({ success: true, message: 'Booking created successfully', booking: newBooking });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating booking', error: error.message });
    }
}

const getBooking = async(req, res) => {
    const {userId} = req.params;

    if (!userId) {
        return res.status(400).json({success : false, message : "userId is required"});
    }
    try {
            const booking = await bookingSchema.find({userId : userId}).populate('userId').populate('destinationId');    


            if (!booking)  {
                return res.status(404).json({success : false, message : "No booking found"});
            }
            res.status(200).json({success : true, message : "Booking fetched successfully", booking : booking});
            } catch (error) {
        res.status(500).json({success : false, message : "Error fetching booking", error : error.message});
    }
}

const updateBooking = async (req, res) => {
    const { bookingId } = req.params;
    const { status } = req.body;

    try {
        const updatedBooking = await bookingSchema.findByIdAndUpdate(bookingId, { status }, { new: true });

        if (!updatedBooking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        res.status(200).json({ success: true, message: 'Booking updated successfully', booking: updatedBooking });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating booking', error: error.message });
    }
}

const cancelBooking = async (req, res) => {
    const { bookingId } = req.params;

    try {
        const cancelledBooking = await bookingSchema.findByIdAndUpdate(
            bookingId,
            { status: 'cancelled' }, 
            { new: true }
        );

        if (!cancelledBooking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        res.status(200).json({ success: true, message: 'Booking cancelled successfully', data: cancelledBooking });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error cancelling booking', error: error.message });
    }
};


module.exports = {
    createBooking,
    getBooking,
    updateBooking,
    cancelBooking,
}