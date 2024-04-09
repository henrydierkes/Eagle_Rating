import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { useAuth } from "../../contexts/AuthContext";
import "./Profile.css";

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
  console.log(currentUser)

  useEffect(() => {
    
  }, [currentUser]);

  return (
    <div>
      <NavBar />
      <Container className={classes.profileContainer}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Avatar className={classes.avatar}>
              {/* You can replace the below line with the logic to display the user's profile picture */}
              {currentUser ? currentUser.username.toUpperCase() : ""}
            </Avatar>
          </Grid>
          <Grid item>
            <Typography variant="h4">
              {/* You can replace the below line with the logic to display the user's profile name */}
              {currentUser ? currentUser.username : "Profile Name"}
            </Typography>
          </Grid>
        </Grid>
        {/* Add any additional profile information here */}
      </Container>
      <Footer />
    </div>
  );
};

export default Profile;
