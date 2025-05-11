const destinationSchema = require('../db/models/destinationModel');

const createPlaces = async(req, res) => {
    try {
        const { name, description, image, location, latitude, longitude, rating, reviews, price, category } = req.body;
        const newDestination = new destinationSchema({
            name,
            description,
            image,
            location,
            latitude,
            longitude,
            rating,
            reviews,
            price,
            category
        });
        await newDestination.save();
        res.status(201).json({ message: 'Destination created successfully', data: newDestination });
    } catch (error) {
        res.status(500).json({ message: 'Error creating destination', error: error.message });
    }

}

const getAllPlaces = async (req, res) => {
    try {
        const destinations = await destinationSchema.find({ isDeleted: false });
        res.status(200).json({ message: 'Destinations fetched successfully', data: destinations });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching destinations', error: error.message });
    }
}

const getPlaceById = async (req, res) => {
    try {
        const { id } = req.params;
        const destination = await destinationSchema.findById(id);
        if (!destination || destination.isDeleted) {
            return res.status(404).json({ message: 'Destination not found' });
        }
        res.status(200).json({ message: 'Destination fetched successfully', data: destination });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching destination', error: error.message });
    }
}

const updatePlace = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, image, location, latitude, longitude, rating, reviews, price, category } = req.body;
        const destination = await destinationSchema.findById(id);
        if (!destination || destination.isDeleted) {
            return res.status(404).json({ message: 'Destination not found' });
        }
        destination.name = name || destination.name;
        destination.description = description || destination.description;
        destination.image = image || destination.image;
        destination.location = location || destination.location;
        destination.latitude = latitude || destination.latitude;
        destination.longitude = longitude || destination.longitude;
        destination.rating = rating || destination.rating;
        destination.reviews = reviews || destination.reviews;
        destination.price = price || destination.price;
        destination.category = category || destination.category;
        await destination.save();
        res.status(200).json({ message: 'Destination updated successfully', data: destination });
    } catch (error) {
        res.status(500).json({ message: 'Error updating destination', error: error.message });
    }
}

const deletePlace = async (req, res) => {
    try {
        const { id } = req.params;
        const destination = await destinationSchema.findById(id);
        if (!destination || destination.isDeleted) {
            return res.status(404).json({ message: 'Destination not found' });
        }
        destination.isDeleted = true;
        await destination.save();
        res.status(200).json({ message: 'Destination deleted successfully', data: destination });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting destination', error: error.message });
    }
}

const getPlacesByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const destinations = await destinationSchema.find({ category, isDeleted: false });
        if (destinations.length === 0) {
            return res.status(404).json({ message: 'No destinations found for this category' });
        }
        res.status(200).json({ message: 'Destinations fetched successfully', data: destinations });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching destinations', error: error.message });
    }
}
const getPlacesByLocation = async (req, res) => {
    try {
        const { location } = req.params;
        const destinations = await destinationSchema.find({ location, isDeleted: false });  
        if (destinations.length === 0) {
            return res.status(404).json({ message: 'No destinations found for this location' });
        }
        res.status(200).json({ message: 'Destinations fetched successfully', data: destinations });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching destinations', error: error.message });
    }
}
const getPlacesByRating = async (req, res) => {
    try {
        const { rating } = req.params;
        const destinations = await destinationSchema.find({ rating, isDeleted: false });
        if (destinations.length === 0) {
            return res.status(404).json({ message: 'No destinations found for this rating' });
        }
        res.status(200).json({ message: 'Destinations fetched successfully', data: destinations });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching destinations', error: error.message });
    }
}
const getPlacesByPrice = async (req, res) => {
    try {
        const { price } = req.params;
        const destinations = await destinationSchema.find({ price, isDeleted: false });
        if (destinations.length === 0) {
            return res.status(404).json({ message: 'No destinations found for this price' });
        }
        res.status(200).json({ message: 'Destinations fetched successfully', data: destinations });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching destinations', error: error.message });
    }
}
const getPlacesByName = async (req, res) => {
    try {
        const { name } = req.params;
        const destinations = await destinationSchema.find({ name, isDeleted: false });
        if (destinations.length === 0) {
            return res.status(404).json({ message: 'No destinations found for this name' });
        }
        res.status(200).json({ message: 'Destinations fetched successfully', data: destinations });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching destinations', error: error.message });
    }
}
const getPlacesByLocationAndCategory = async (req, res) => {
    try {
        const { location, category } = req.params;
        const destinations = await destinationSchema.find({ location, category, isDeleted: false });
        if (destinations.length === 0) {
            return res.status(404).json({ message: 'No destinations found for this location and category' });
        }
        res.status(200).json({ message: 'Destinations fetched successfully', data: destinations });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching destinations', error: error.message });
    }
}
const getPlacesByLocationAndRating = async (req, res) => {
    try {
        const { location, rating } = req.params;
        const destinations = await destinationSchema.find({ location, rating, isDeleted: false });
        if (destinations.length === 0) {
            return res.status(404).json({ message: 'No destinations found for this location and rating' });
        }
        res.status(200).json({ message: 'Destinations fetched successfully', data: destinations });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching destinations', error: error.message });
    }
}
const getPlacesByLocationAndPrice = async (req, res) => {
    try {
        const { location, price } = req.params;
        const destinations = await destinationSchema.find({ location, price, isDeleted: false });
        if (destinations.length === 0) {
            return res.status(404).json({ message: 'No destinations found for this location and price' });
        }
        res.status(200).json({ message: 'Destinations fetched successfully', data: destinations });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching destinations', error: error.message });
    }
}

const getPlacesByCategoryAndRating = async (req, res) => {
    try {
        const { category, rating } = req.params;
        const destinations = await destinationSchema.find({ category, rating, isDeleted: false });
        if (destinations.length === 0) {
            return res.status(404).json({ message: 'No destinations found for this category and rating' });
        }
        res.status(200).json({ message: 'Destinations fetched successfully', data: destinations });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching destinations', error: error.message });
    }
}

const getPlacesByCategoryAndPrice = async (req, res) => {
    try {
        const { category, price } = req.params;
        const destinations = await destinationSchema.find({ category, price, isDeleted: false });
        if (destinations.length === 0) {
            return res.status(404).json({ message: 'No destinations found for this category and price' });
        }
        res.status(200).json({ message: 'Destinations fetched successfully', data: destinations });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching destinations', error: error.message });
    }
}

const getPlacesByRatingAndPrice = async (req, res) => {
    try {
        const { rating, price } = req.params;
        const destinations = await destinationSchema.find({ rating, price, isDeleted: false });
        if (destinations.length === 0) {
            return res.status(404).json({ message: 'No destinations found for this rating and price' });
        }
        res.status(200).json({ message: 'Destinations fetched successfully', data: destinations });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching destinations', error: error.message });
    }
}
const getPlacesByNameAndCategory = async (req, res) => {
    try {
        const { name, category } = req.params;
        const destinations = await destinationSchema.find({ name, category, isDeleted: false });
        if (destinations.length === 0) {
            return res.status(404).json({ message: 'No destinations found for this name and category' });
        }
        res.status(200).json({ message: 'Destinations fetched successfully', data: destinations });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching destinations', error: error.message });
    }
}

module.exports = {
    createPlaces,
    getAllPlaces,
    getPlaceById,
    updatePlace,
    deletePlace,
    getPlacesByCategory,
    getPlacesByLocation,
    getPlacesByRating,
    getPlacesByPrice,
    getPlacesByName,
    getPlacesByLocationAndCategory,
    getPlacesByLocationAndRating,
    getPlacesByLocationAndPrice,
    getPlacesByCategoryAndRating,
    getPlacesByCategoryAndPrice,
    getPlacesByRatingAndPrice,
    getPlacesByNameAndCategory
}
