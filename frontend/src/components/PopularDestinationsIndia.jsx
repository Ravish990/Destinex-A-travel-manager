import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PopularDestinationsIndia.css';

function PopularDestinationsIndia() {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get('http://localhost:8000/destination/places/popular');
        // Limit to 8 destinations
        setDestinations(response.data.data.slice(0, 8));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching destinations:', error);
        setError('Failed to load destinations');
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const handleClick = (destinationName) => {
    const formattedName = destinationName.toLowerCase().replace(/ /g, '-');
    navigate(`/planner/${formattedName}`);
  };

  if (loading) {
    return (
      <div className="destinations-container">
        <h2>Popular Destinations in India</h2>
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading destinations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="destinations-container">
        <h2>Popular Destinations in India</h2>
        <div className="error-message">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="destinations-container">
      <h2>Popular Destinations in India</h2>
      <div className="cards-wrapper">
        {destinations.map((place) => (
          <div className="card" key={place._id} onClick={() => handleClick(place.name)}>
            <img src={place.image || 'https://via.placeholder.com/400x300?text=No+Image'} alt={place.name} />
            <div className="card-overlay">
              <p>{place.category?.toUpperCase() || 'EXPLORE'}</p>
              <h3>{place.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularDestinationsIndia;
