import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/Homepage"; 

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route 
        path="/login" 
        element={
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
            <AuthPage />
          </div>
        } 
      />

      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
};

export default App;
