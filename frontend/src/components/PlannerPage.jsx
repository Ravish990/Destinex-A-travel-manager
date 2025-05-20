import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './PlannerPage.css';

const PlannerPage = () => {
  const { locationId } = useParams();
  const formattedLocation = locationId.replace(/-/g, ' ');

  const [step, setStep] = useState(1); // Step 1 = duration, 2 = group, 3 = show data
  const [tripSelections, setTripSelections] = useState([]);
  const [currentSelection, setCurrentSelection] = useState({
    destination: formattedLocation,
    duration: '',
    groupType: '',
  });

  const touristData = {
    varanasi: {
      places: ['Ganga Aarti', 'Kashi Vishwanath Temple', 'Sarnath'],
      hotels: ['BrijRama Palace', 'Taj Ganges'],
    },
    rajasthan: {
      places: ['Hawa Mahal', 'City Palace', 'Jaisalmer Fort'],
      hotels: ['Umaid Bhawan Palace', 'Taj Lake Palace'],
    },
  };

  const handleDurationClick = (value) => {
    setCurrentSelection((prev) => ({
      ...prev,
      duration: value,
    }));
    setStep(2);
  };

  const handleGroupClick = (value) => {
    const finalSelection = {
      ...currentSelection,
      groupType: value,
    };
    setCurrentSelection(finalSelection);
    setTripSelections((prev) => [...prev, finalSelection]);
    setStep(3);
  };
  

  const data = touristData[locationId.toLowerCase()] || { places: [], hotels: [] };
  const latestTrip = tripSelections[tripSelections.length - 1] || currentSelection;

  return (
    <div className="planner-page">
      <h2>Now planning your holiday to {formattedLocation}</h2>

      {step === 1 && (
        <>
          <h3>What's the duration of your holiday?</h3>
          <div className="card-options">
            {[
              { label: '6–9 Days', icon: '🌗' },
              { label: '10–12 Days', icon: '🌖' },
              { label: '13–15 Days', icon: '🌕', ourPick: true },
              { label: '15–20 Days', icon: '🌞' },
            ].map(({ label, icon, ourPick }, index) => {
              const isSelected = currentSelection.duration === label;
              return (
                <div
                  key={index}
                  className={`card-option ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleDurationClick(label)}
                >
                  {ourPick && <div className="badge-top-left">OUR PICK</div>}
                  {isSelected && <div className="checkmark">✔</div>}
                  <div className="card-image-circle">
                    <span className="icon">{icon}</span>
                  </div>
                  <div className="card-label">{label}</div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h3>Who is travelling with you?</h3>
          <div className="card-options">
            {[
              { label: 'Couple', icon: '❤️' },
              { label: 'Family', icon: '👨‍👩‍👧‍👦' },
              { label: 'Friends', icon: '🧑‍🤝‍🧑' },
              { label: 'Solo', icon: '🧍‍♂️' },
            ].map(({ label, icon }, i) => {
              const isSelected = currentSelection.groupType === label;
              return (
                <div
                  key={i}
                  className={`card-option ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleGroupClick(label)}
                >
                  {isSelected && <div className="checkmark">✔</div>}
                  <div className="card-image-circle">
                    <span className="icon">{icon}</span>
                  </div>
                  <div className="card-label">{label}</div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {step === 3 && (
        <div className="results-wrapper">
          <div className="results-heading">
            <h2>Holiday Plan Summary</h2>
            <p>
              Destination: <strong>{latestTrip.destination}</strong> <br />
              Duration: <strong>{latestTrip.duration}</strong> <br />
              Group: <strong>{latestTrip.groupType}</strong>
            </p>
          </div>

          <div className="results-section">
            <h3>Top Tourist Places in {formattedLocation}</h3>
            <div className="card-list">
              {data.places.map((place, idx) => (
                <div className="info-card" key={idx}>
                  <div className="card-icon">📍</div>
                  <div className="card-content">{place}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="results-section">
            <h3>Recommended Hotels</h3>
            <div className="card-list">
              {data.hotels.map((hotel, idx) => (
                <div className="info-card" key={idx}>
                  <div className="card-icon">🏨</div>
                  <div className="card-content">{hotel}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlannerPage;
