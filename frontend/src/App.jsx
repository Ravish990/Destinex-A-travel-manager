import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import SignUp from './components/pages/SignUp';
import PopularDestinationsIndia from './components/PopularDestinationsIndia';
import PlannerPage from './components/PlannerPage';
// import PopularDestinationsIndia from './components/PopularDestinationsIndia';
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
      </Routes>
    </Router>
  );
}

export default App;
