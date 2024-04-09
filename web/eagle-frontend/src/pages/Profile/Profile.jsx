import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { useAuth } from "../../contexts/AuthContext";
import axiosConfig from "../../axiosConfig.jsx";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  profileContainer: {
    marginTop: theme.spacing(4),
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginBottom: theme.spacing(2),
  },
}));

const Profile = () => {
  const classes = useStyles();
  const { currentUser } = useAuth();

  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  const handleUsernameChange = async () => {
    try {
      await axios.post(`${axiosConfig.baseURL}/api/user/updateUsername`, {
        userId: currentUser.userId,
        newUsername: newUsername,
      });
      setNewUsername("");
    } catch (error) {
      setError("Failed to update username");
    }
  };

  const handlePasswordChange = async () => {
    try {
      await axios.post("/api/user/updatePassword", {
        userId: currentUser.userId, // Replace with the user's ID
        newPassword: newPassword,
      });
      setNewPassword("");
    } catch (error) {
      setError("Failed to update password");
    }
  };

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return (
    <div>
      <NavBar />
      <Container className={classes.profileContainer}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Avatar className={classes.avatar}>
              {currentUser ? currentUser.username.toUpperCase() : ""}
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
        <Button
          variant="contained"
          color="primary"
          onClick={handlePasswordChange}
        >
          Change Password
        </Button>
        {error && <Typography color="error">{error}</Typography>}
      </Container>
      <Footer />
    </div>
  );
};

export default Profile;
