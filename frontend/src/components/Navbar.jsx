import React, { useState, useEffect, useRef } from 'react';
import { Button } from './Button';
import { Link , useNavigate } from 'react-router-dom';
import './Navbar.css';

const destinations = [
  { name: "Maldives", tag: "Honeymoon", color: "bg-pink-200 text-pink-700" },
  { name: "Bali", tag: "Trending", color: "bg-red-200 text-red-700" },
  { name: "India", tag: "Budget", color: "bg-yellow-200 text-yellow-800" },
  { name: "Abu Dhabi", tag: "Popular", color: "bg-indigo-200 text-indigo-700" },
  { name: "Europe", tag: "In Season", color: "bg-green-200 text-green-700" },
  { name: "Dubai", tag: "Luxury", color: "bg-gray-200 text-gray-700" },
  { name: "Vietnam", tag: "Adventure", color: "bg-blue-200 text-blue-700" },
  { name: "Singapore", tag: "Modern", color: "bg-purple-200 text-purple-700" },
  { name: "Thailand", tag: "Budget", color: "bg-yellow-200 text-yellow-800" },
  { name: "Switzerland", tag: "Luxury", color: "bg-gray-200 text-gray-700" },
  { name: "Sri-lanka", tag: "Adventure", color: "bg-blue-200 text-blue-700" },
  { name: "Mauritius", tag: "Luxury", color: "bg-gray-200 text-gray-700" },
  { name: "Italy", tag: "Romantic", color: "bg-red-200 text-red-700" },
  { name: "New Zealand", tag: "Adventure", color: "bg-blue-200 text-blue-700" },
  { name: "Australia", tag: "Luxury", color: "bg-gray-200 text-gray-700" },
];

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownClicked, setDropdownClicked] = useState(false);
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


  return (
    <>
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
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/services'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Services
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/products'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Products
              </Link>
            </li>
            <li
            className="nav-item relative"
            onMouseEnter={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
              setShowDropdown(true);
            }}
            onMouseLeave={() => {
              if (!dropdownClicked) {
                timeoutRef.current = setTimeout(
                  () => setShowDropdown(false),
                  150
                );
              }
            }}
          >
            <button
        className="nav-links bg-gradient-to-r from-pink-200 via-pink-100 to-green-200 text-green-700 font-small px-3 py-1 rounded-full transition-all text-sm"
        onClick={toggleDropdown}
      >
        Explore Destinations{" "}
        <i className="fas fa-chevron-down ml-1 text-xs"></i>
      </button>

            {showDropdown && (
              <div className="absolute left-1/2 -translate-x-1/2 top-12 bg-white rounded-lg shadow-lg w-[600px] max-h-[600px] overflow-y-auto z-50 p-4 grid grid-cols-3 gap-4">
                {destinations.map((dest) => (
                  <div
                    key={dest.name}
                    className="flex items-center justify-between px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
                    onClick={() => handleDestinationClick(dest.name)}
                  >
                    <span className='destination-list-dropdown'>{dest.name}</span>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded ${dest.color}`}
                    >
                      {dest.tag}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </li>

            <li>
              <Link
                to='/login'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Login
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle='btn--outline'>Login</Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
// // The Navbar component is a responsive navigation bar that includes links to different sections of the website.