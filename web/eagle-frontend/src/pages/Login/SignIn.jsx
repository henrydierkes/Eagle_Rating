import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import './SignIn.css';
import { useAuth } from '../../contexts/AuthContext.jsx';
import axiosConfig from "../../axiosConfig.jsx";

const defaultTheme = createTheme();

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      // console.log('Request data:', { email, password });
      const response = await axios.post(`${axiosConfig.baseURL}/auth/sign-in`, {
        email,
        password,
      });
      console.log('Login successful:', { email });
      // console.log(response.data);
      login(response.data, email); // Update the context with the token
      navigate('/');
      // Handle successful login, e.g., redirect to dashboard
    } catch (error) {
      setError('Invalid email or password. Please try again.');
      console.error('Login failed:', error.response.data);
    }
  };

  const navigate = useNavigate();

  const navigateToFrontPage = () => {
    navigate('/');
  };

  useEffect(() => {
    const root = document.querySelector(":root");

    const handlePointer = (e) => {
      root.style.setProperty("--y", e.pageY + "px");
    };

    window.addEventListener("pointermove", handlePointer);
    window.addEventListener("pointerdown", handlePointer);

    return () => {
      window.removeEventListener("pointermove", handlePointer);
      window.removeEventListener("pointerdown", handlePointer);
    };
  }, []);

  return (
      <div className="Signin">
        <ThemeProvider theme={defaultTheme}>
          <div className="Signin">
            <div id="bg"></div>
            <div id="bg_mask"></div>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  bgcolor: 'background.paper', // This uses the theme's paper color, which is usually white
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  borderRadius: 2, // This applies a border-radius
                  boxShadow: 1, // This applies a theme-based shadow
                  width: '100%', // This ensures the Box fills the Container
                  maxWidth: '400px', // This restricts the Box's maximum width to 400px
                  p: 3, // This applies padding within the Box
                  mt: 8, // This applies margin on top of the Box
                  position: 'relative' // Added to position the Box
                }}
              >
                <Typography className="logo button logo-bold" component="h1" variant="h5" onClick={navigateToFrontPage} sx={{ marginTop: '25px', fontSize: '25px', cursor: 'pointer' }}  style={{ marginTop: '25px', fontSize: '25px', display: 'inline-block' }}eagle>
                  EagleRating
                </Typography>
                <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
                  Sign In
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address or Username"
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
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    Sign In
                  </Button>
                  <Grid container sx={{ mt: 1 }}>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link component={RouterLink} to="/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </div>
        </ThemeProvider>
      </div>
  );
}
<Box
  sx={{
    marginTop: 5,
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
