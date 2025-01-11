import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedLayout from "./components/ProtectedLayout";
import Login from "./Pages/Login.jsx";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("adminToken") !== null;
  });

  useEffect(() => {
    if (isAuthenticated) {
      // Ensure token-related state is correctly synchronized
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setIsAuthenticated(false); // If no token exists, logout user
      }
    }
  }, [isAuthenticated]);

  return (
    <Router>
      <Routes>
        {/* Redirect to dashboard if already logged in */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />

        {/* Root Route */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <ProtectedLayout setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
