import './App.css';
import LoginForm from './theme/user_auth/login';
import OTPPage from './theme/user_auth/otp';  
import Home from './theme/layout/home/home';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie
import { useState, useEffect } from 'react';
import { CircularProgress, Box } from '@mui/material'; // Import CircularProgress for loader

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Initially set to null to indicate loading state
  const [loading, setLoading] = useState(true); // To handle initial loading state

  // Check if user is logged in based on cookies
  useEffect(() => {
    const checkLoginStatus = () => {
      const loginStatus = Cookies.get('isLoggedIn') === 'true'; // Get cookie value
      setIsLoggedIn(loginStatus); // Set state to trigger re-render when cookie changes
      setLoading(false); // Set loading to false after cookie is checked
    };

    // Check login status when the component mounts
    checkLoginStatus();

    // Optionally, set up a cookie change listener if necessary (for advanced cases)
    const intervalId = setInterval(() => {
      checkLoginStatus(); // Recheck every 1 second
    }, 100);

    // Cleanup the interval on unmount
    return () => clearInterval(intervalId);
  }, []); // Run once on component mount

  // If still loading, show nothing (or a loading spinner, if preferred)
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress /> {/* Loading spinner */}
      </Box>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Define the routes with conditional redirects */}
        <Route 
          path="/" 
          element={isLoggedIn ? <Navigate to="/home" /> : <LoginForm />} 
        />
        <Route 
          path="/otp" 
          element={isLoggedIn ? <Navigate to="/home" /> : <OTPPage />} 
        />
        <Route 
          path="/home" 
          element={isLoggedIn ? <Home /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
