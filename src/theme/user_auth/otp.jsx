import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Container, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // For navigation after OTP submission
import Cookies from 'js-cookie'; // Import js-cookie
import { otpAPI, sendOtp } from '../../api/auth_user/index'; // Import OTP API function and sendOtp function
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

function OtpPage() {
  const [otp, setOtp] = useState(['', '', '', '']); // State for OTP fields (4 digits)
  const [loading, setLoading] = useState(false); // Loading state for OTP verification
  const [countdown, setCountdown] = useState(30); // Countdown timer state
  const [showResendButton, setShowResendButton] = useState(false); // To show/hide resend button
  const navigate = useNavigate();

  // Handle OTP change and auto-focus on next input field
  const handleOtpChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;

    // Move to next field automatically if the current one is filled
    if (e.target.value.length === 1 && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }

    // Set the updated OTP state
    setOtp(newOtp);
  };

  // Handle OTP submission
  const handleSubmit = async () => {
    const otpString = otp.join('');
    
    if (otpString.length === 4) {
      setLoading(true); // Start loading
      toast.info('Verifying OTP...'); // Show verifying message

      try {
        const userId = Cookies.get('userId'); // Get userId from cookies

        // If userId is not found, redirect to the login page
        if (!userId) {
          navigate('/'); // Redirect to the login page
          return;
        }

        // Call the otpAPI to verify OTP
        const response = await otpAPI(userId, otpString);

        if (response) {
          toast.success('OTP Verified Successfully!'); // Show success message
          Cookies.set('isLoggedIn', 'true', { expires: 7 }); // Set login status in cookies
          setLoading(false); // Stop loading
          
          // Delay before redirecting to home page
          setTimeout(() => {
            navigate('/home'); // Redirect to home page after 2 seconds
          }, 2000); // 2-second delay
        }
      } catch (error) {
        toast.error(error.message || 'Invalid OTP'); // Show error message
        setLoading(false); // Stop loading
      }
    } else {
      // Show error message if OTP is invalid
      toast.warning('Please enter a valid 4-digit OTP'); // Show warning message
    }
  };

  // Countdown Timer Effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);

      return () => clearInterval(timer); // Clean up timer when countdown is done
    } else {
      setShowResendButton(true); // Show "Resend OTP" button when countdown reaches 0
    }
  }, [countdown]);

  // Handle Resend OTP button click
  const handleResendOtp = async () => {
    setLoading(true);
    toast.info('Sending OTP...'); // Show sending OTP message

    try {
      // Simulating sending OTP via API
      await sendOtp();
      toast.success('OTP Sent Again!'); // Show success message
      setCountdown(30); // Restart the countdown
      setShowResendButton(false); // Hide resend button again
    } catch (error) {
      toast.error('Failed to send OTP'); // Show error message
    }

    setLoading(false);
  };

  // Check if the user is logged in when the component is mounted
  useEffect(() => {
    const userId = Cookies.get('userId'); // Get userId from cookies
    if (!userId) {
      navigate('/'); // Redirect to the login page if userId is not found
    }
  }, [navigate]);

  return (
    <div
      style={{
        backgroundImage: 'url("https://img.freepik.com/free-vector/white-abstract-wallpaper_23-2148830027.jpg")', // Set your background image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            backgroundColor: 'white',
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" align="center" sx={{ mb: 3 }}>
            Enter OTP
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              marginBottom: 2,
            }}
          >
            {/* OTP Input Fields */}
            {otp.map((digit, index) => (
              <TextField
                key={index}
                id={`otp-${index}`}
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                type="number"
                inputProps={{
                  maxLength: 1,
                  style: { textAlign: 'center' },
                  min: '0', // No up/down buttons for number input
                  max: '9',
                  pattern: '[0-9]*', // Allows only number input
                }}
                variant="outlined"
                fullWidth
                sx={{ width: '20%', marginRight: 1 }}
              />
            ))}
          </Box>

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            sx={{ mt: 2 }}
            disabled={loading} // Disable the button while loading
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Verify OTP'} {/* Show loading spinner if loading */}
          </Button>

          {/* Resend OTP Button (Appears after countdown ends) */}
          {showResendButton && !loading && (
            <Button
              variant="text"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleResendOtp}
            >
              Resend OTP
            </Button>
          )}

          {/* Countdown Timer */}
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            {countdown > 0
              ? `Resend OTP in ${countdown}s`
              : 'You can resend OTP now.'}
          </Typography>
        </Box>
      </Container>

      {/* ToastContainer for Toast messages */}
      <ToastContainer
        position="top-right"
        autoClose={3000} // Auto-hide after 3 seconds
        hideProgressBar
        closeButton={false}
        rtl={false}
      />
    </div>
  );
}

export default OtpPage;
