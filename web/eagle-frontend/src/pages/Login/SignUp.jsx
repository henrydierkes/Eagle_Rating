import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
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
import './SignUp.css'; // Ensure this file contains any additional styles needed for the page
import axiosConfig from "../../axiosConfig.jsx";
import Cookies from 'js-cookie';

const defaultTheme = createTheme(); // You can customize this theme to match your app's design

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^[a-zA-Z0-9._-]+@emory\.edu$/
      );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValidEmail(email)) {
      setError('Please enter a valid Emory University email address.');
      return; // Stop the form submission
    }
    try {
      const response = await axios.post(`${axiosConfig.baseURL}/auth/sign-up`, { email, password });
      Cookies.set('email', email, { expires: 1 }); // Expires in 1 day
      navigate('/verify', { state: { email } });
    } catch (error) {
      setError(error.response.data.message);
    }
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
      <div className="SignUp">
        <CssBaseline />
        <div id="bg"></div>
        <div id="bg_mask"></div>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 1,
              width: '100%',
              maxWidth: '400px',
              p: 3,
              position: 'relative',
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              onClick={() => navigate('/')}
              sx={{ cursor: 'pointer', fontSize: '25px', marginTop: '25px' }}
              style={{ marginTop: '25px', fontSize: '25px', display: 'inline-block' }}
              className="logo button logo-bold"
            >
              EagleRating
            </Typography>
            <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
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
                <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                sx={{ mt: 2 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2 }}
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
      </div>
    </ThemeProvider>
  );
}
