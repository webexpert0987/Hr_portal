import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // For navigation
import Cookies from 'js-cookie'; // For cookies
import { loginAPI } from '../../api/auth_user/index'; // Import loginAPI from the API path
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

// Regular Expression for email validation
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

// Regular Expression for strong password validation
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false); // To track loading state for button
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    // Validation
    let formErrors = { email: '', password: '' };
    let formValid = true;

    // Email validation
    if (!email) {
      formErrors.email = 'Email is required';
      formValid = false;
    } else if (!emailRegex.test(email)) {
      formErrors.email = 'Please enter a valid email address';
      formValid = false;
    }

    // Password validation
    if (!password) {
      formErrors.password = 'Password is required';
      formValid = false;
    } else if (!passwordRegex.test(password)) {
      formErrors.password =
        'Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character';
      formValid = false;
    }

    setErrors(formErrors);

    // If form is valid, call the API for login
    if (formValid) {
      setLoading(true); // Show loading spinner in button
      try {
        const response = await loginAPI(email, password); // API call
        if (response.success) {
          // Store userId in cookies
          Cookies.set('userId', response.userId, { expires: 1 / 1440 });
          setLoading(false); // Hide loading spinner
          toast.success('Login successful! Check your email for OTP'); // Show success message

          // Wait for 2 seconds before navigating to OTP page
          setTimeout(() => {
            navigate('/otp'); // Redirect to OTP page after 2 seconds delay
          }, 2000);
        }
      } catch (error) {
        toast.error(error.message || 'Login Failed'); // Show error message
        setLoading(false);
      }
    }
  };

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
          }}
        >
          <Typography component="h1" variant="h5" align="center">
            Sign In
          </Typography>
          <Box
            component="form"
            onSubmit={handleLogin}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 2,
            }}
          >
            {/* Email Input */}
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />

            {/* Password Input */}
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={Boolean(errors.password)}
              helperText={errors.password}
            />

            {/* Submit Button with Loader */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading} // Disable button while loading
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>
          </Box>
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

export default Login;
