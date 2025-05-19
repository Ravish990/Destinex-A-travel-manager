import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react'; // Import the back symbol from lucide-react
import LoginPage from './Login';
import Signup from '../components/Signup';
import './Login.css';

const AuthPage = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleBackButtonClick = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className={`auth-super-container${isRightPanelActive ? ' right-panel-active' : ''}`}>
      {/* Login Form */}
      <div className="form-container sign-in-container">
        {/* Back Button for Sign In Page */}
        <button 
          className="lucid-back-button" 
          onClick={handleBackButtonClick} // Navigate to the home page
        >
          <ArrowLeft size={24} /> {/* Back symbol from lucide-react */}
        </button>
        <LoginPage setIsActive={() => setIsRightPanelActive(true)} showForgotPassword={true} />
      </div>

      {/* Signup Form */}
      <div className="form-container sign-up-container">
        <Signup setIsActive={() => setIsRightPanelActive(false)} />
      </div>

      {/* Overlay Panel */}
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1 className="overlay-title">Welcome Back!</h1>
            <p style={{ color: 'white' }}>Ready for your next adventure? Sign in now.</p>
            <button className="ghost-login" onClick={() => setIsRightPanelActive(false)}>
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1 className="overlay-title">Hello, Friend!</h1>
            <p style={{ color: 'white' }}>Your journey begins here. Register now!</p>
            <button className="ghost-login" onClick={() => setIsRightPanelActive(true)}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;