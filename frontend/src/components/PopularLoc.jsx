// src/components/PopularLoc.jsx
import React from 'react';
import './PopularLoc.css';

const indianLocations = [
  { name: 'Goa', tag: 'HONEYMOON' },
    { name: 'Kerala', tag: 'HONEYMOON' },
    { name: 'Rishikesh', tag: 'HONEYMOON' },
    { name: 'Jaipur', tag: 'HONEYMOON' },
    { name: 'Darjeeling', tag: 'HONEYMOON' },
    { name: 'Udaipur', tag: 'HONEYMOON' },
    { name: 'Shimla', tag: 'HONEYMOON' },
    { name: 'Leh-Ladakh', tag: 'HONEYMOON' },
    { name: 'Andaman Islands', tag: 'HONEYMOON' },
    { name: 'Kolkata', tag: 'HONEYMOON' },
    { name: 'Delhi', tag: 'HONEYMOON' },
    { name: 'Mumbai', tag: 'HONEYMOON' },
    { name: 'Bangalore', tag: 'HONEYMOON' },
    { name: 'Hyderabad', tag: 'HONEYMOON' },
    { name: 'Chennai', tag: 'HONEYMOON' },
    { name: 'Pune', tag: 'HONEYMOON' },
    { name: 'Ahmedabad', tag: 'HONEYMOON' },
    { name: 'Lucknow', tag: 'HONEYMOON' },
    { name: 'Varanasi', tag: 'HONEYMOON' },             
  { name: 'Manali', tag: 'TRENDING' },
  { name: 'Goa', tag: 'POPULAR' },
  { name: 'Kerala', tag: 'IN SEASON' },
  { name: 'Rishikesh', tag: 'BUDGET' },
  { name: 'Jaipur', tag: 'POPULAR' },
  { name: 'Darjeeling' },
  { name: 'Udaipur' },
  { name: 'Hampi' },
 { name: 'Shimla' },
    { name: 'Leh-Ladakh' },
    { name: 'Andaman Islands' },
    { name: 'Kolkata' },
    { name: 'Delhi' },
    { name: 'Mumbai' },
    { name: 'Bangalore' },
    { name: 'Hyderabad' },
    { name: 'Chennai' },
    { name: 'Pune' },
    { name: 'Ahmedabad' },
    { name: 'Lucknow' },
    { name: 'Varanasi' }        

];

function PopularLoc({ onClose }) {
  return (
    <div className="location-popup">
      <span className="close-btn" onClick={onClose}>&times;</span>
      <h2>Pick your destination</h2>
      <input type="text" className="location-search" placeholder="Search Indian cities..." />
      <ul className="location-list">
        {indianLocations.map((loc, index) => (
          <li key={index}>
            {loc.name}
            {loc.tag && <span className={`tag ${loc.tag.toLowerCase().replace(/\s+/g, '-')}`}>{loc.tag}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PopularLoc;
