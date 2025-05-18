import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/Home';


import AuthPage from './pages/AuthPage'
// import PopularDestinationsIndia from './components/PopularDestinationsIndia';
function App() {

  return (
    <Router>

      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/services' element={<Services />} />
        <Route path='/products' element={<Products />} /> */}
      
        {/* <Route path='/popular-destinations-india' element={<PopularDestinationsIndia />} /> */}
        {/* Add more routes as needed */}
  

      <Route 
        path="/login" 
        element={
            <AuthPage />
        } 
      />
      </Routes>
    </Router>
  );
}

export default App;
