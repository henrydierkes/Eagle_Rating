import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CssBaseline, TextField, Box, Typography, Container, Button, ThemeProvider, createTheme } from '@mui/material';
import Cookies from 'js-cookie';

const defaultTheme = createTheme();

function EmailVerification() {
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const email = Cookies.get('email'); // Read email from cookies
  const [message, setMessage] = useState('');

  const handleVerificationSubmit = async (event) => {
    event.preventDefault();
    console.log('Verifying email with code:', code); // Log the code being submitted

    try {
      const response = await axios.post('http://localhost:8080/api/user/verify', { email, code });
      console.log(response.data);
      setMessage("Verification successful. You can now log in.");
      navigate('/signin'); // Redirect to sign-in page on successful verification
    } catch (error) {
      console.error('Verification failed:', error.response?.data || 'Unknown error');
      setMessage("Verification failed. Please check the code and try again.");
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
            Email Verification
          </Typography>
          <Box component="form" onSubmit={handleVerificationSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="verification-code"
              label="Verification Code"
              name="code"
              autoFocus
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Verify Email
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

export default EmailVerification;
