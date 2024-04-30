import React, { useState, useEffect } from "react";
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
    padding: theme.spacing(0.2),
  },
  shiftedUpGrid: {
    transform: 'translateY(-16px)',
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
  const [currentUserInitialized, setCurrentUserInitialized] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [byteLength, setByteLength] = useState();

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${axiosConfig.baseURL}/api/user/avatar/${currentUser.userId}`, {
        responseType: 'arraybuffer'
      });

      if (response.status === 200) {
        const contentType = response.headers['content-type'];
        if (contentType.includes('image')) {
          // Data received successfully, and it's an image
          const imageUrl = URL.createObjectURL(new Blob([response.data], { type: contentType }));
          console.log(imageUrl);
          setByteLength(response.data.byteLength);
          setImageUrl(imageUrl); // Set imageUrl state variable
        } else {
          console.error('Unexpected content type:', contentType);
        }
      } else {
        console.error('Failed to fetch user profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchUserProfile();
    }
  }, [currentUser]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    
    // Check if file size exceeds the limit (in bytes)
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSizeInBytes) {
      setError("File size exceeds the limit (5MB). Please upload a smaller image.");
      return;
    }
  
    setAvatar(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      setAvatarPreview(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const [avatarPreview, setAvatarPreview] = useState(null);

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
      const formData = new FormData();
      formData.append("avatar", avatar);
      formData.append("userId", currentUser.userId);
      await axios.post(`${axiosConfig.baseURL}/api/user/uploadAvatar`, formData);
      setSuccessMessage("Avatar uploaded successfully.");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      window.location.reload(); // Reload the page after successful upload
    } catch (error) {
      setError("Failed to upload avatar");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };


  return (
      <div>
        <NavBar />
        <Container className={classes.profileContainer}>
          <Grid container alignItems="center" spacing={2} className={classes.shiftedUpGrid}>
            <Grid item>
              <Avatar className={classes.avatar}>
                {currentUser && byteLength !== 0 ? (
                    // If imageUrl is available and not empty, display the avatar image
                    < img src={imageUrl} alt="Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                ) : (
                    // If imageUrl is not available or empty, display the username
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ margin: '15px' }}>
                  {currentUser ? currentUser.username.toUpperCase() : ""}
                </span>
                    </div>
                )}
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
            <Button variant="contained" color="primary" component="span"
             style={{ marginTop: '20px', marginBottom: '20px', background: 'linear-gradient(to right, #5ea5fc, #6379fe)'}}>
              Upload Avatar
            </Button>
          </label>
          {/* Display the uploaded avatar if available */}
          {avatar && (
              <div className={classes.avatarContent}>
                <Avatar
                    alt="Uploaded Avatar"
                    src={avatarPreview} // Use avatarPreview as the source for the Avatar
                    className={classes.large}
                />
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