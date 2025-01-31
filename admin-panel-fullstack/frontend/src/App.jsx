// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import ProtectedLayout from "./components/ProtectedLayout";
// import Login from "./Pages/Login.jsx";
// import NotFound from "./Pages/NotFound.jsx";

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(() => {
//     return localStorage.getItem("adminToken") !== null;
//   });

//   useEffect(() => {
//     if (isAuthenticated) {
//       // Ensure token-related state is correctly synchronized
//       const token = localStorage.getItem("adminToken");
//       if (!token) {
//         setIsAuthenticated(false); // If no token exists, logout user
//       }
//     }
//   }, [isAuthenticated]);

//   return (
//     <Router>
//       <Routes>
//         {/* Redirect to dashboard if already logged in */}
//         <Route
//           path="/login"
//           element={
//             isAuthenticated ? (
//               <Navigate to="/dashboard" replace />
//             ) : (
//               <Login setIsAuthenticated={setIsAuthenticated} />
//             )
//           }
//         />

//         {/* Root Route */}
//         <Route
//           path="/"
//           element={
//             isAuthenticated ? (
//               <Navigate to="/dashboard" replace />
//             ) : (
//               <Navigate to="/login" replace />
//             )
//           }
//         />

//         {/* Protected Routes */}
//         <Route
//           path="/*"
//           element={
//             isAuthenticated ? (
//               <ProtectedLayout setIsAuthenticated={setIsAuthenticated} />
//             ) : (
//               <Navigate to="/login" replace />
//             )
//           }
//         />
//          {/* Catch-all route for 404 */}
//         <Route path="*" element={<NotFound/>} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import React, { useState, useEffect, Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import loader from './assets/loader.webp';
// Lazy loading components
const ProtectedLayout = lazy(() => import('./components/ProtectedLayout'));
const Login = lazy(() => import('./Pages/Login.jsx'));
const NotFound = lazy(() => import('./Pages/NotFound.jsx'));

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
    <Router>
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
