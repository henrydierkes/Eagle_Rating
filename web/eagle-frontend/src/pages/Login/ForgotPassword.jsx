import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CssBaseline, TextField, Box, Typography, Container, Button, ThemeProvider, createTheme } from '@mui/material';
import axiosConfig from "../../axiosConfig.jsx";

const defaultTheme = createTheme();

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${axiosConfig.baseURL}/auth/reset-password`, null, { params: { email }});
      console.log("simim", response.data);
      setMessage("A new password has been sent to your email. Please use it to log in.");
      navigate('/signin'); // Redirect to sign-in page on successful password reset
    } catch (error) {
      console.error('Email failed:', error.response?.data || 'Unknown error');
      setMessage("Email failed. Please check your email and try again.");
    }
  };
  
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Enter Email to Get New Password
          </Typography>
          <Box component="form" onSubmit={handleEmailSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Get New Password
            </Button>
            {message && (
              <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                {message}
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default ForgotPassword;
