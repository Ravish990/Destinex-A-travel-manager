import React from 'react';
import './UniqueExperiences.css';

const destinations = [
  {
    title: 'Meghalaya',
    subtitle: 'Living Root Bridges',
    image: '/images/megha.webp',
  },
  {
    title: 'Uttarakhand',
    subtitle: 'Valley of Flowers',
    image: '/images/valley-of-flowers-national-park-uttarakhand-images-gallery.jpg',
  },
  {
    title: 'Assam',
    subtitle: 'Majuli Island',
    image: '/images/Assam.jpeg',
  },
  {
    title: ' Manipur',
    subtitle: 'Loktak Lake',
    image: '/images/Loktak-Lake-Manipur.webp',
  },
  {
    title: ' Tamil Nadu',
    subtitle: ' Auroville',
    image: '/images/Tamil Nadu.webp',
  },
];

const UniqueExperiences = () => {
  return (
    <div className="unique-experiences">
      <h2>FOR UNIQUE EXPERIENCES</h2>
      <div className="experience-slider">
        {destinations.map((dest, index) => (
          <div className="card" key={index}>
            <img src={dest.image} alt={dest.title} />
            <div className="overlay">
              <p>{dest.subtitle}</p>
              <h3>{dest.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UniqueExperiences;
