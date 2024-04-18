import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useAuth } from "../../contexts/AuthContext";
import axiosConfig from "../../axiosConfig.jsx";
import axios from "axios";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

const useStyles = makeStyles((theme) => ({
  profileContainer: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(10),
    padding: theme.spacing(3),

  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginBottom: theme.spacing(5),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(1),
  },
  shiftedUpGrid: {
    transform: 'translateY(-16px)', // Properly defining the transformation
  },
  avatarContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}));

const Profile = () => {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const { updateUsername } = useAuth();
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleUsernameChange = async () => {
    try {
      updateUsername(newUsername);
      await axios.post(`${axiosConfig.baseURL}/api/user/updateUsername`, null, {
        params: {
          userId: currentUser.userId,
          newUsername: newUsername,
        },
      });
      setNewUsername("");
      setSuccessMessage("Username updated successfully.");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000); // Clear message after 3 seconds
    } catch (error) {
      setError("Failed to update username");
      setTimeout(() => {
        setError("");
      }, 3000); // Clear message after 3 seconds
    }
  };

  const handlePasswordChange = async () => {
    try {
      if (newPassword !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      await axios.post(`${axiosConfig.baseURL}/api/user/updatePassword`, null, {
        params: {
          userId: currentUser.userId,
          newPassword: newPassword,
        },
      });
      setNewPassword("");
      setConfirmPassword("");
      setSuccessMessage("Password updated successfully.");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000); // Clear message after 3 seconds
    } catch (error) {
      setError("Failed to update password");
    }
  };

  return (
    <div>
      <NavBar />
      <Container className={classes.profileContainer}>
        <Grid container alignItems="center" spacing={2} className={classes.shiftedUpGrid}>
          <Grid item>
            <Avatar className={classes.avatar}>
              <span style={{ margin: '15px' }}>
              {currentUser ? currentUser.username.toUpperCase() : ""}
              </span>
            </Avatar>
          </Grid>
          <Grid item>
            <Typography variant="h4">
              {currentUser ? currentUser.username : "Profile Name"}
            </Typography>
          </Grid>
        </Grid>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="New Username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleUsernameChange}
          style={{ marginTop: '20px', marginBottom: '20px', background: 'linear-gradient(to right, #5ea5fc, #6379fe)'}} 
        >
          Change Username
        </Button>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Confirm New Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handlePasswordChange}
          style={{ marginTop: '20px', marginBottom: '20px', background: 'linear-gradient(to right, #5ea5fc, #6379fe)'}} 
        >
          Change Password
        </Button>
        {error && <Typography color="error">{error}</Typography>}
        {successMessage && <Typography style={{ color: "green" }}>{successMessage}</Typography>}
      </Container>
      <Footer />
    </div>
  );
};

export default Profile;
