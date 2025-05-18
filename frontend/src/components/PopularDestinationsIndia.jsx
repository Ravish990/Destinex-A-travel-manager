import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PopularDestinationsIndia.css';

const destinations = [
  { title: 'Royal Heritage', name: 'Rajasthan', image: '/images/rajasthan.jpg' },
  { title: 'Spiritual Vibes', name: 'Varanasi', image: '/images/varanasi.webp' },
  { title: 'Snowy Escape', name: 'Himachal Pradesh', image: '/images/himachal.jpg' },
  { title: 'Tropical Bliss', name: 'Goa', image: '/images/goa.jpg' },
  { title: 'Tea Gardens', name: 'Kerala', image: '/images/kerala.jpg' },
  { title: 'Cultural Capital', name: 'Kolkata', image: '/images/kolkata.png' },
  { title: 'Historical Marvels', name: 'Delhi', image: '/images/delhi.png' },
  { title: 'Desert Oasis', name: 'Jaisalmer', image: '/images/jaisalmer.avif' },
  { title: 'Wildlife Adventure', name: 'Jim Corbett', image: '/images/jim-corbett.jpg' },
  { title: 'Beach Paradise', name: 'Andaman Islands', image: '/images/andaman.webp' },
];

function PopularDestinationsIndia() {
  const navigate = useNavigate();

  const handleClick = (destinationName) => {
    const formattedName = destinationName.toLowerCase().replace(/ /g, '-');
    navigate(`/planner/${formattedName}`);
  };

  return (
    <div className="destinations-container">
      <h2>Popular Destinations in India</h2>
      <div className="cards-wrapper">
        {destinations.map((place, index) => (
          <div className="card" key={index} onClick={() => handleClick(place.name)}>
            <img src={place.image} alt={place.name} />
            <div className="card-overlay">
              <p>{place.title.toUpperCase()}</p>
              <h3>{place.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularDestinationsIndia;
