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
  const [destinations, setDestinations] = useState([]);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => setButton(window.innerWidth > 960);

  const toggleDropdown = () => {
    setDropdownClicked((prev) => !prev);
    setShowDropdown((prev) => !prev);
  };

  const handleDestinationClick = (destName) => {
    navigate("/explore", { state: { destination: destName } });
    setShowDropdown(false);
    setDropdownClicked(false);
    closeMobileMenu();
  };

  useEffect(() => {
    showButton();
    window.addEventListener("resize", showButton);
    return () => window.removeEventListener("resize", showButton);
  }, []);

  useEffect(() => {
  axios.get('http://localhost:8000/destination/places')
    .then(res => {
      console.log('Fetched destinations:', res.data);
      if (Array.isArray(res.data)) {
        setDestinations(res.data);
      } else if (Array.isArray(res.data.data)) {
        setDestinations(res.data.data); // fallback for common backend pattern
      } else {
        console.error("Unexpected response format:", res.data);
        setDestinations([]);
      }
    })
    .catch(err => {
      console.error("Failed to fetch destinations:", err);
      setDestinations([]);
    });
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
            }}
          >
            <button
              className="nav-links bg-gradient-to-r from-pink-200 via-pink-100 to-green-200 text-green-700 font-small px-3 py-1 rounded-full transition-all text-sm"
              onClick={toggleDropdown}
            >
              Explore Destinations <i className="fas fa-chevron-down ml-1 text-xs"></i>
            </button>
            {showDropdown && destinations.length > 0 && (
              <div className="absolute left-1/2 -translate-x-1/2 top-12 bg-white rounded-lg shadow-lg w-[600px] max-h-[600px] overflow-y-auto z-50 p-4 grid grid-cols-3 gap-4">
                {destinations.map((dest) => (
                  <div
                    key={dest._id}
                    className="flex items-center justify-between px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
                    onClick={() => handleDestinationClick(dest.name)}
                  >
                    <span className='destination-list-dropdown'>{dest.name}</span>
                    <span className={`text-xs font-medium px-2 py-1 rounded bg-gray-200 text-gray-700`}>
                      {dest.category}
                    </span>
                  </div>
                ))}
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
