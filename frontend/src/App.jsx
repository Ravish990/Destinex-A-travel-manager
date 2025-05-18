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
function App() {

  return (
    <Router>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/" element={<PopularDestinationsIndia />} />
        <Route path="/planner/:locationId" element={<PlannerPage />} />
        {/* <Route path='/services' element={<Services />} />
        <Route path='/products' element={<Products />} /> */}
      
        {/* <Route path='/popular-destinations-india' element={<PopularDestinationsIndia />} /> */}
        {/* Add more routes as needed */}
        <Route path='/login' element={<AuthPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
