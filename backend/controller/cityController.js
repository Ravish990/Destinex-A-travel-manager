const City = require('../db/models/cityModel');
const Destination = require('../db/models/destinationModel');

// Get all cities
const getAllCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.status(200).json({ message: 'Cities fetched successfully', data: cities });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cities', error: error.message });
  }
};

// Get destinations for a city
const getDestinationsByCity = async (req, res) => {
  try {
    const { cityId } = req.params;
    const destinations = await Destination.find({ city: cityId, isDeleted: false });
    res.status(200).json({ message: 'Destinations fetched successfully', data: destinations });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching destinations', error: error.message });
  }
};

module.exports = {
  getAllCities,
  getDestinationsByCity,
}; 