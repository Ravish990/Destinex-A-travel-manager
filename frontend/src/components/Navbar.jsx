import React, { useState, useEffect, useRef } from 'react';
import { Button } from './Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownClicked, setDropdownClicked] = useState(false);
  const [cities, setCities] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [activeCityId, setActiveCityId] = useState(null);
  const [loadingDest, setLoadingDest] = useState(false);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => setButton(window.innerWidth > 960);

  const toggleDropdown = () => {
    setDropdownClicked((prev) => !prev);
    setShowDropdown((prev) => !prev);
  };

  // Fetch all cities for Explore dropdown
  useEffect(() => {
    axios.get('http://localhost:8000/cities')
      .then(res => setCities(res.data.data || []))
      .catch(() => setCities([]));
  }, []);

  // Fetch destinations for a city when hovered/clicked
  const handleCityHover = (cityId) => {
    setActiveCityId(cityId);
    setLoadingDest(true);
    axios.get(`http://localhost:8000/cities/${cityId}/destinations`)
      .then(res => {
        setDestinations(res.data.data || []);
        setLoadingDest(false);
      })
      .catch(() => {
        setDestinations([]);
        setLoadingDest(false);
      });
  };

  const handleDestinationClick = (destinationId) => {
    setShowDropdown(false);
    setDropdownClicked(false);
    closeMobileMenu();
    navigate(`/destinations/${destinationId}/packages`);
  };

  useEffect(() => {
    showButton();
    window.addEventListener("resize", showButton);
    return () => window.removeEventListener("resize", showButton);
  }, []);

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          Destinex
          <img src="/images/logo.png" alt="Destinex Logo" className="navbar-logo-img" />
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'><Link to='/' className='nav-links' onClick={closeMobileMenu}>Home</Link></li>
          <li className='nav-item'><Link to='/services' className='nav-links' onClick={closeMobileMenu}>Services</Link></li>
          <li className='nav-item'><Link to='/products' className='nav-links' onClick={closeMobileMenu}>Products</Link></li>
          <li
            className="nav-item relative"
            onMouseEnter={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
              setShowDropdown(true);
            }}
            onMouseLeave={() => {
              if (!dropdownClicked) {
                timeoutRef.current = setTimeout(() => setShowDropdown(false), 150);
              }
              setActiveCityId(null);
              setDestinations([]);
            }}
          >
            <button
              className="nav-links explore-btn"
              onClick={toggleDropdown}
            >
              Explore Destinations <i className="fas fa-chevron-down"></i>
            </button>
            {showDropdown && cities.length > 0 && (
              <div className="destinations-dropdown absolute left-1/2 -translate-x-1/2 top-12 w-[700px] max-h-[600px] overflow-y-auto z-50">
                <div className="destinations-grid">
                  {cities.map((city) => (
                    <div
                      key={city._id}
                      className="destination-item"
                      onMouseEnter={() => handleCityHover(city._id)}
                    >
                      <span className='destination-list-dropdown'>{city.name}</span>
                      {/* Show destinations for this city if active */}
                      {activeCityId === city._id && (
                        <div className="mt-2 ml-2 bg-white rounded-lg shadow-md p-2 w-56 max-h-60 overflow-y-auto border border-gray-100">
                          {loadingDest ? (
                            <div className="text-xs text-gray-400">Loading...</div>
                          ) : destinations.length > 0 ? (
                            destinations.map(dest => (
                              <div
                                key={dest._id}
                                className="flex items-center justify-between px-2 py-1 hover:bg-blue-50 rounded cursor-pointer"
                                onClick={() => handleDestinationClick(dest._id)}
                              >
                                <span className='text-gray-800'>{dest.name}</span>
                                <span className="destination-category">
                                  {dest.category}
                                </span>
                              </div>
                            ))
                          ) : (
                            <div className="text-xs text-gray-400">No destinations</div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </li>
          <li><Link to='/login' className='nav-links-mobile' onClick={closeMobileMenu}>Login</Link></li>
        </ul>
        {button && <Button buttonStyle='btn--outline'>Login</Button>}
      </div>
    </nav>
  );
}

export default Navbar;
