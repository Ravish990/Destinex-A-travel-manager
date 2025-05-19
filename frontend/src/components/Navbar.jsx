import React, { useState, useEffect, useRef } from 'react';
import { Button } from './Button';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../context/AuthContext';
import axios from '../utils/axios';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownClicked, setDropdownClicked] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [destinations, setDestinations] = useState([]);
  const [avatarEmoji, setAvatarEmoji] = useState('👤');
  const timeoutRef = useRef(null);
  const profileTimeoutRef = useRef(null);
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();

  const emojis = ['😊', '🌟', '🎯', '🎨', '🎭', '🎪', '🎡', '🎢', '🎠', '🎪', '🎨', '🎭', '🎪', '🎡', '🎢', '🎠'];

  useEffect(() => {
    // Set a random emoji when component mounts
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    setAvatarEmoji(randomEmoji);
  }, []);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => setButton(window.innerWidth > 960);

  const toggleDropdown = () => {
    setDropdownClicked(prev => !prev);
    setShowDropdown(prev => !prev);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(prev => !prev);
  };

  const handleDestinationClick = (destName) => {
    navigate("/explore", { state: { destination: destName } });
    setShowDropdown(false);
    setDropdownClicked(false);
    closeMobileMenu();
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowProfileDropdown(false);
  };

  useEffect(() => {
    showButton();
    window.addEventListener("resize", showButton);
    return () => window.removeEventListener("resize", showButton);
  }, []);

  useEffect(() => {
    axios.get('/destination/places')
      .then(res => {
        if (Array.isArray(res.data)) {
          setDestinations(res.data);
        } else if (Array.isArray(res.data.data)) {
          setDestinations(res.data.data);
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
                    <span className="text-xs font-medium px-2 py-1 rounded bg-gray-200 text-gray-700">
                      {dest.category}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </li>
        </ul>
        <div className="navbar-right">
          {isAuthenticated ? (
            <div
              className="profile-avatar"
              onClick={toggleProfileDropdown}
              onMouseEnter={() => {
                if (profileTimeoutRef.current) clearTimeout(profileTimeoutRef.current);
                setShowProfileDropdown(true);
              }}
              onMouseLeave={() => {
                profileTimeoutRef.current = setTimeout(() => setShowProfileDropdown(false), 150);
              }}
            >
              <div className="avatar-circle">
                {avatarEmoji}
              </div>
              {showProfileDropdown && (
                <div className="profile-dropdown">
                  <div className="profile-menu">
                    <button onClick={handleLogout} className="profile-menu-item text-red-500">
                      <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            button && (
              <Link to="/login"><Button buttonStyle='btn--outline'>Login</Button></Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
