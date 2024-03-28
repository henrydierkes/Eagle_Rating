import React, { useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import './SignUp.css'; // Make sure this imports your CSS with the background styles

const defaultTheme = createTheme();

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/sign-up', { email, password });
      console.log('Sign up successful:', response.data);
      navigate('/signin'); // Navigate to the signin page on successful signup
    } catch (error) {
      console.error('Sign up failed:', error.response.data);
      setError(error.response.data.message);
    }
  };

  const navigateToFrontPage = () => {
    navigate('/home');
  };

  useEffect(() => {
    const root = document.querySelector(":root");
    
    const handlePointer = (e) => {
      root.style.setProperty("--y", `${e.clientY}px`);
    };

    window.addEventListener("pointermove", handlePointer);
    window.addEventListener("pointerdown", handlePointer);

    return () => {
      window.removeEventListener("pointermove", handlePointer);
      window.removeEventListener("pointerdown", handlePointer);
    };
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="Signin">
        <div id="bg"></div> {/* Background with blur */}
        <div id="bg_mask"></div> {/* Mask for focus effect */}
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'white',
              padding: 3,
              borderRadius: 2,
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {error && (
                <Typography variant="body2" color="error">
                  {error}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link component={RouterLink} to="/signin" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
        <h1 className="logo button" onClick={navigateToFrontPage} style={{ marginTop: '25px', fontSize: '25px', position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' }}>EagleRating</h1>
      </div>
    </ThemeProvider>
  );
}
<Box
  sx={{
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white', // Ensures white background
    padding: 3, // Consistent padding
    borderRadius: 2, // Consistent border radius
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Consistent shadow for depth
    width: '100%', // Ensures the Box takes up the width it needs based on its parent (Container maxWidth="xs")
    maxWidth: 400, // Optional: Ensures the Box does not grow beyond 400px, adjust as needed
  }}
></Box>