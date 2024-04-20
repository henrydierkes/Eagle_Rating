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
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  console.log(currentUser);

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

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

  const handleUploadAvatar = async () => {
    try {
      if (!avatar) {
        setError("No avatar selected.");
        return;
      }
      const reader = new FileReader();
      reader.onload = async () => {
        const binaryData = reader.result;
        // Send binary data to the backend for storage in MongoDB
        await axios.post(`${axiosConfig.baseURL}/api/user/uploadAvatar`, {
          userId: currentUser.userId,
          avatar: binaryData,
        });
        setSuccessMessage("Avatar uploaded successfully.");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000); // Clear message after 3 seconds
      };
      reader.onerror = () => {
        setError("Failed to read the avatar file.");
      };
      reader.readAsArrayBuffer(avatar);
    } catch (error) {
      setError("Failed to upload avatar");
      setTimeout(() => {
        setError("");
      }, 3000); // Clear message after 3 seconds
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
        <input
          accept="image/*"
          id="contained-button-file"
          type="file"
          style={{ display: "none" }}
          onChange={handleAvatarChange}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Upload Avatar
          </Button>
        </label>
        {/* Display the uploaded avatar if available */}
        {avatar && (
          <div className={classes.avatarContent}>
            <Avatar alt="Uploaded Avatar" src={URL.createObjectURL(avatar)} className={classes.large} />
            <Typography variant="body1" color="textSecondary">
              Avatar ready to be stored.
            </Typography>
          </div>
        )}
        {/* Save Avatar Button */}
        {avatar && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleUploadAvatar}
            style={{ marginTop: '20px', marginBottom: '20px', background: 'linear-gradient(to right, #5ea5fc, #6379fe)'}} 
          >
            Save Avatar
          </Button>
        )}
        {/* Existing inputs for username and password */}
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="New Username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
        {/* Change Username Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleUsernameChange}
          style={{ marginTop: '20px', marginBottom: '20px', background: 'linear-gradient(to right, #5ea5fc, #6379fe)'}} 
        >
          Change Username
        </Button>
        {/* New Password and Confirm Password Inputs */}
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
        {/* Change Password Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handlePasswordChange}
          style={{ marginTop: '20px', marginBottom: '20px', background: 'linear-gradient(to right, #5ea5fc, #6379fe)'}} 
        >
          Change Password
        </Button>
        {/* Error and Success Messages */}
        {error && <Typography color="error">{error}</Typography>}
        {successMessage && <Typography style={{ color: "green" }}>{successMessage}</Typography>}
      </Container>
      <Footer />
    </div>
  );
  
};

export default Profile;
