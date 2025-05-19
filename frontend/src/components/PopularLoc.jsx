import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PopularLoc.css';
import { useNavigate } from 'react-router-dom';

function PopularLoc({ onClose }) {
  const [locations, setLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/destination/places')
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.data;
        if (Array.isArray(data)) {
          setLocations(data);
        } else {
          throw new Error('Invalid response format');
        }
      })
      .catch((err) => {
        console.error('Failed to fetch locations:', err);
        setError('Could not load destinations.');
      });
  }, []);

  const filteredLocations = locations.filter((loc) =>
    loc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDestinationClick = (destinationId) => {
    onClose();
    navigate(`/destinations/${destinationId}/packages`);
  };

  return (
    <div className="location-popup">
      <button 
        className="close-btn" 
        onClick={onClose}
        aria-label="Close"
      >
        &times;
      </button>
      <h2 className="location-title">Pick your destination</h2>
      <input 
        type="text" 
        className="location-search" 
        placeholder="Search Indian cities..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {error && <p className="error">{error}</p>}

      <ul className="location-list">
        {filteredLocations.map((loc, index) => (
          <li key={index} className="location-item" onClick={() => handleDestinationClick(loc._id)}>
            <span className="location-name">{loc.name}</span>
            {loc.tag && (
              <span className={`tag ${loc.tag.toLowerCase().replace(/\s+/g, '-')}`}>{loc.tag}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PopularLoc;
