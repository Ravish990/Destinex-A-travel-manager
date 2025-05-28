import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import axios from '../utils/axios';
import './PlannerPage.css';

const PlannerPage = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'destination';
  const { locationId } = useParams();
  const formattedLocation = locationId.replace(/-/g, ' ');
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [tripSelections, setTripSelections] = useState([]);
  const [currentSelection, setCurrentSelection] = useState({
    destination: formattedLocation,
    duration: '',
    groupType: '',
  });
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch packages for the destination when component mounts
  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log('Fetching destination:', formattedLocation);
        
        // First get all destinations
        const destResponse = await axios.get(`/destination/places`);
        console.log('All destinations:', destResponse.data);
        
        if (destResponse.data.data && destResponse.data.data.length > 0) {
          // Find the destination that matches our search term (case-insensitive)
          const destination = destResponse.data.data.find(
            dest => dest.name.toLowerCase().includes(formattedLocation.toLowerCase())
          );
          
          if (destination) {
            console.log('Found destination:', destination);
            const destinationId = destination._id;
            
            // Then get packages for this destination
            const packagesResponse = await axios.get(`/destination/destinations/${destinationId}/packages`);
            console.log('Packages response:', packagesResponse.data);
            
            if (packagesResponse.data && packagesResponse.data.data) {
              console.log('Setting packages:', packagesResponse.data.data);
              setPackages(packagesResponse.data.data);
            } else {
              console.log('No packages in response');
              setError('No packages found for this destination');
            }
          } else {
            setError('Destination not found. Available destinations: ' + 
              destResponse.data.data.map(d => d.name).join(', '));
          }
        } else {
          setError('No destinations available');
        }
      } catch (error) {
        console.error('Error fetching packages:', error);
        setError('Failed to fetch packages');
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [formattedLocation]);

  const handleDurationClick = (value) => {
    setCurrentSelection((prev) => ({
      ...prev,
      duration: value,
    }));
    setStep(2);
  };

  const handleGroupClick = (value) => {
    setCurrentSelection((prev) => ({
      ...prev,
      groupType: value,
    }));
    setStep(3);
  };

  const latestTrip = tripSelections[tripSelections.length - 1] || currentSelection;

  // Filter packages based on duration and group type
  const filteredPackages = packages.filter(pkg => {
    console.log('Filtering package:', pkg);
    let durationMatch = true;
    if (currentSelection.duration) {
      // Extract numbers from the duration string (e.g., "3-4 Days" -> [3, 4])
      const durationNumbers = currentSelection.duration.match(/(\d+)(?:-(\d+))?/);
      if (durationNumbers) {
        const min = parseInt(durationNumbers[1]);
        const max = durationNumbers[2] ? parseInt(durationNumbers[2]) : null;
        console.log('Duration range:', { min, max, packageDuration: pkg.duration });
        
        if (currentSelection.duration.includes('+')) {
          durationMatch = pkg.duration >= min;
        } else {
          durationMatch = pkg.duration >= min && (!max || pkg.duration <= max);
        }
      }
    }
    const groupTypeMatch = !currentSelection.groupType || pkg.groupType === currentSelection.groupType;
    console.log('Filter results:', { durationMatch, groupTypeMatch, package: pkg });
    return durationMatch && groupTypeMatch;
  });

  console.log('Current Selection:', currentSelection);
  console.log('Available Packages:', packages);
  console.log('Filtered Packages:', filteredPackages);

  const handleBookNow = (packageId) => {
    navigate(`/package/${packageId}`);
  };

  return (
    <div className="planner-page">
      <h2>Now planning your holiday to {formattedLocation}</h2>

      {step === 1 && (
        <>
          <h3>What's the duration of your holiday?</h3>
          <div className="card-options">
            {[
              { label: '1-2 Days', icon: '🌗' },
              { label: '3-4 Days', icon: '🌖' },
              { label: '5-6 Days', icon: '🌕' },
              { label: '7+ Days', icon: '🌞', ourPick: true },
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

          {loading ? (
            <div className="text-center py-10">Loading packages...</div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">{error}</div>
          ) : filteredPackages.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No packages found matching your criteria. Please try different duration or group type.
            </div>
          ) : (
            <div className="results-section">
              <h3>Available Packages for {latestTrip.destination}</h3>
              <div className="card-list">
                {filteredPackages.map((pkg) => (
                  <div className="info-card" key={pkg._id}>
                    <div className="card-icon">🎒</div>
                    <div className="card-content">
                      <h4 className="font-semibold">{pkg.name}</h4>
                      <p className="text-sm text-gray-600">{pkg.description}</p>
                      <div className="mt-2 flex gap-2">
                        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {pkg.duration} Days
                        </span>
                        <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                          ₹{pkg.price.toLocaleString()}
                        </span>
                        <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded">
                          Max {pkg.maxGroupSize} People
                        </span>
                      </div>
                      <button
                        onClick={() => handleBookNow(pkg._id)}
                        className="mt-4 w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white px-4 py-2 rounded hover:from-blue-600 hover:to-pink-600 transition font-semibold shadow"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PlannerPage;
