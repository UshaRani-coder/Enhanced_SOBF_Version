import React, { useState, useEffect, Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import loader from './assets/loader.webp';
const ProtectedLayout = lazy(() => import('./components/ProtectedLayout'));
const Login = lazy(() => import('./pages/Login.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('adminToken') !== null;
  });

  useEffect(() => {
    if (isAuthenticated) {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setIsAuthenticated(false); // If no token exists, logout user
      }
    }
  }, [isAuthenticated]);

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <p>{<img src={loader} alt="Loader" className="w-[100px]" />}</p>{' '}
            {/* Customize the fallback with a spinner if needed */}
          </div>
        }
      >
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

          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
