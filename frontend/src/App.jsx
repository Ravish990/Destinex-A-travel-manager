import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/Home';
import AuthPage from './pages/AuthPage';
import { AuthProvider } from './context/AuthContext';

// import PopularDestinationsIndia from './components/PopularDestinationsIndia';

// Wrapper component to conditionally render Navbar
const AppContent = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      {!isLoginPage && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/services' element={<Services />} />
        <Route path='/products' element={<Products />} /> */}
      
        {/* <Route path='/popular-destinations-india' element={<PopularDestinationsIndia />} /> */}
        {/* Add more routes as needed */}

        <Route path="/login" element={<AuthPage />} />
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
