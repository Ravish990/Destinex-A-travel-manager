import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/Home';
import PopularDestinationsIndia from './components/PopularDestinationsIndia';
import PlannerPage from './components/PlannerPage';
// import PopularDestinationsIndia from './components/PopularDestinationsIndia';
import AuthPage from './pages/AuthPage';
import HeroSection from './components/HeroSection';
import DestinationPage from './components/DestinationPage';//this is new i have done
function App() {

  return (
   // App.js
<Router>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/planner/:locationId" element={<PlannerPage />} />
    <Route path="/destination/:cityName" element={<DestinationPage />} />
    <Route path="/login" element={<AuthPage />} />
  </Routes>
</Router>

    
  );
}

export default App;
