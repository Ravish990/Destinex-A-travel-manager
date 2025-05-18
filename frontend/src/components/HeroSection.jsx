import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/video-1.mp4' autoPlay loop muted />
      <h1>ADVENTURE AWAITS</h1>
      
      {/* Search bar replaces the paragraph */}
      <div className='search-bar'>
        <input
          type='text'
          placeholder='Search countries, cities'
          className='search-input'
        />
        <i className='fas fa-search search-icon'></i>
      </div>

      <div className='hero-btns'>
        <div className="hero-tags">
  <p>✈️ Discover new horizons • 🏔️ Explore hidden gems • 🏝️ Plan your next escape</p>
  <div className="hashtags">
    <span>#Wanderlust</span>
    <span>#ExploreTheWorld</span>
    <span>#TravelMore</span>
  </div>
</div>

        {/* <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GET STARTED
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={() => console.log('hey')}
        >
          WATCH TRAILER <i className='far fa-play-circle' />
        </Button> */}
      </div>
    </div>
  );
}

export default HeroSection;

// // The HeroSection component is a visually appealing section of the webpage that includes a video background, a heading, a subheading, and two buttons.
// // It uses the Button component to create the buttons, which can be styled and sized.