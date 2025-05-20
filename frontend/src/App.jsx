import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/Home';

import PlannerPage from './components/PlannerPage';
import Explore from './pages/Explore';
import AuthPage from './pages/AuthPage';
import CityList from './pages/CityList';
import Packages from './pages/Packages';
import Booking from './pages/Booking';
import Payment from './pages/Payment';
import { AuthProvider } from './context/AuthContext';
import CityDestinations from './pages/CityDestinations';
import PackageDetail from './pages/PackageDetail';
import PopularDestinationsIndia from './components/PopularDestinationsIndia';

const AppContent = () => {


  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/popular-destinations" element={<PopularDestinationsIndia />} />
        <Route path="/cities" element={<CityList />} />
        <Route path="/planner/:locationId" element={<PlannerPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path='/explore' element={<Explore />} />
        <Route path="/packages/:destinationId" element={<Packages />} />
        <Route path="/booking/:packageId" element={<Booking />} />
        <Route path="/payment/:packageId" element={<Payment />} />
        <Route path="/city/:cityId/destinations" element={<CityDestinations />} />
        <Route path="/destinations/:destinationId/packages" element={<Packages />} />
        <Route path="/package/:id" element={<PackageDetail />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
