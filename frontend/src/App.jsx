import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/Home';
import PopularDestinationsIndia from './components/PopularDestinationsIndia';
import PlannerPage from './components/PlannerPage';
import Explore from './pages/Explore';
// import PopularDestinationsIndia from './components/PopularDestinationsIndia';
import AuthPage from './pages/AuthPage';
import CityList from './pages/CityList';
import Packages from './pages/Packages';
import Booking from './pages/Booking';
import Payment from './pages/Payment';
import CityDestinations from './pages/CityDestinations';
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
        <Route path="/cities" element={<CityList />} />
         <Route path='/explore' element={<Explore />} />
        <Route path="/packages/:destinationId" element={<Packages />} />
        <Route path="/booking/:packageId" element={<Booking />} />
        <Route path="/payment/:packageId" element={<Payment />} />
        <Route path="/city/:cityName/destinations" element={<CityDestinations />} />
        <Route path="/destinations/:destinationId/packages" element={<Packages />} />
      </Routes>
    </Router>
  );
}

export default App;
