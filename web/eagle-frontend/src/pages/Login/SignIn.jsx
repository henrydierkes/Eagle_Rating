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

const defaultTheme = createTheme();

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      console.log('Request data:', { email, password });
      const response = await axios.post('http://localhost:8080/auth/sign-in', {
        email,
        password,
      });
      console.log('Login successful:', response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/dashboard');
      // Handle successful login, e.g., redirect to dashboard
    } catch (error) {
      console.error('Login failed:', error.response.data);
      setError(error.response.data.message);
    }
  };

  const navigate = useNavigate();

  const navigateToFrontPage = () => {
    navigate('/home');
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
          <div id="bg"></div>
          <div id="bg_mask"></div>
          <div className="loginHolder">
            <h1 className="logo button logo-bold" onClick={navigateToFrontPage} style={{ marginTop: '25px', fontSize: '25px', display: 'inline-block' }}>EagleRating</h1>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                  sx={{
                    marginTop: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
              >
                <Typography component="h1" variant="h5" className='muititle'>
                  Sign In
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
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
                  {error && (
                      <Typography variant="body2" color="error">
                        {error}
                      </Typography>
                  )}
                  <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                  />
                  <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
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
