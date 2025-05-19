import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>Quick Links</h2>
            <Link to='/cities'>Cities</Link>
            <Link to='/explore'>Destinations</Link>
            <Link to='/'>Popular Places</Link>
            <Link to='/'>Travel Packages</Link>
          </div>
          <div className='footer-link-items'>
            <h2>Support</h2>
            <Link to='/'>Contact Us</Link>
            <Link to='/'>FAQs</Link>
            <Link to='/'>Privacy Policy</Link>
            <Link to='/'>Terms of Service</Link>
          </div>
        </div>
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/' className='social-logo'>
              Destinex
              <img src="/images/logo.png" alt="Destinex Logo" className="footer-logo-img" />
            </Link>
          </div>
          <small className='website-rights'>Destinex © {new Date().getFullYear()}</small>
          <div className='social-icons'>
            <Link
              className='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i className='fab fa-instagram' />
            </Link>
            <Link
              className='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i className='fab fa-facebook-f' />
            </Link>
            <Link
              className='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i className='fab fa-twitter' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
// The Footer component is a functional React component that renders a footer section for a website.
// It includes a subscription form, links to various pages, and social media icons.