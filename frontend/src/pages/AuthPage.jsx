import React, { useState } from 'react';
import LoginPage from './Login';
import Signup from '../components/Signup';
import './Login.css';

const loginBgImage = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80';
const signupBgImage = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80';

const AuthPage = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  return (
    <div className={`auth-super-container${isRightPanelActive ? ' right-panel-active' : ''}`}> 
      {/* Login Form */}
      <div className="form-container sign-in-container">
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
            <h1 className='overlay-title'>Welcome Back!</h1>
            <p style={{color: 'white'}} >Ready for your next adventure? Sign in now.</p>
            <button className="ghost-login" onClick={() => setIsRightPanelActive(false)}>
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1 className='overlay-title'>Hello, Friend!</h1>
            <p style={{color: 'white'}} >Your journey begins here. Register now!</p>
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