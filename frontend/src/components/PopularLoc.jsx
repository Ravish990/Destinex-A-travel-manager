// src/components/PopularLoc.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PopularLoc.css';

const indianLocations = [
  { name: 'Goa', tag: 'POPULAR' },
  { name: 'Kerala', tag: 'IN SEASON' },
  { name: 'Rishikesh', tag: 'BUDGET' },
  { name: 'Jaipur', tag: 'POPULAR' },
  { name: 'Darjeeling', tag: 'HONEYMOON' },
  { name: 'Udaipur', tag: 'HONEYMOON' },
  { name: 'Shimla', tag: 'HONEYMOON' },
  { name: 'Leh-Ladakh', tag: 'TRENDING' },
  { name: 'Andaman Islands', tag: 'HONEYMOON' },
  { name: 'Kolkata', tag: 'POPULAR' },
  { name: 'Delhi', tag: 'POPULAR' },
  { name: 'Mumbai', tag: 'POPULAR' },
  { name: 'Bangalore', tag: 'POPULAR' },
  { name: 'Hyderabad', tag: 'POPULAR' },
  { name: 'Chennai', tag: 'POPULAR' },
  { name: 'Pune', tag: 'POPULAR' },
  { name: 'Ahmedabad', tag: 'POPULAR' },
  { name: 'Lucknow', tag: 'POPULAR' },
  { name: 'Varanasi', tag: 'POPULAR' },
  { name: 'Hampi', tag: 'TRENDING' }
];

function PopularLoc({ onClose }) {
  const navigate = useNavigate(); // ✅ use it here

  const handleLocationClick = (city) => {
    navigate(`/destination/${city}`);
    onClose(); // Optional: close popup after navigation
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
      />
      <ul className="location-list">
        {indianLocations.map((loc, index) => (
          <li 
            key={index} 
            className="location-item" 
            onClick={() => handleLocationClick(loc.name)} // ✅ Add click handler
            style={{ cursor: 'pointer' }} // Optional: improve UX
          >
            <span className="location-name">{loc.name}</span>
            {loc.tag && (
              <span className={`tag ${loc.tag.toLowerCase().replace(/\s+/g, '-')}`}>
                {loc.tag}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default PopularLoc;