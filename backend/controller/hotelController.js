const hotelSchema = require('../db/models/hotelModel');

const createHotel = async (req, res) => {
    const { name, location, price, rating } = req.body;

    try {
        const newHotel = new hotelSchema({
            name,
            location,
            price,
            rating
        });

        await newHotel.save();

        res.status(201).json({ success: true, message: 'Hotel created successfully', hotel: newHotel });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating hotel', error: error.message });
    }
}
const getHotel = async (req, res) => {
    try {
        const hotels = await hotelSchema.find();

        if (!hotels) {
            return res.status(404).json({ success: false, message: 'No hotels found' });
        }

        res.status(200).json({ success: true, message: 'Hotels fetched successfully', hotels });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching hotels', error: error.message });
    }
}

const updateHotel = async (req, res) => {
    const { hotelId } = req.params;
    const { name, location, price, rating } = req.body;

    try {
        const updatedHotel = await hotelSchema.findByIdAndUpdate(hotelId, { name, location, price, rating }, { new: true });

        if (!updatedHotel) {
            return res.status(404).json({ success: false, message: 'Hotel not found' });
        }

        res.status(200).json({ success: true, message: 'Hotel updated successfully', hotel: updatedHotel });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating hotel', error: error.message });
    }
}

const deleteHotel = async (req, res) => {
    const { hotelId } = req.params;

    try {
        const deletedHotel = await hotelSchema.findByIdAndDelete(hotelId);
        if (!deletedHotel) {
            return res.status(404).json({ success: false, message: 'Hotel not found' });
        }   
        res.status(200).json({ success: true, message: 'Hotel deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting hotel', error: error.message });
    }
}
const getHotelById = async (req, res) => {
    const { hotelId } = req.params;

    try {
        const hotel = await hotelSchema.findById(hotelId);

        if (!hotel) {
            return res.status(404).json({ success: false, message: 'Hotel not found' });
        }

        res.status(200).json({ success: true, message: 'Hotel fetched successfully', hotel });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching hotel', error: error.message });
    }
}

module.exports = {
    createHotel,
    getHotel,
    updateHotel,
    deleteHotel,
    getHotelById
}