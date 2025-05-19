import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

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

            <li>
              {!isAuthenticated ? (
                <Link
                  to='/login'
                  className='nav-links-mobile'
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              ) : (
                <button
                  className='nav-links-mobile'
                  onClick={() => {
                    closeMobileMenu();
                    handleLogout();
                  }}
                >
                  Logout
                </button>
              )}
            </li>
          </ul>
          {button && (
            isAuthenticated ? (
              <Button buttonStyle='btn--outline' onClick={handleLogout}>Logout</Button>
            ) : (
              <Button buttonStyle='btn--outline'>Login</Button>
            )
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
// // The Navbar component is a responsive navigation bar that includes links to different sections of the website.