import React from "react";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@mui/material/Container";

const useStyles = makeStyles((theme) => ({
    center: {
      textAlign: "center"
    },
  }));

const VideoPanel = ({ videos }) => {
    const classes = useStyles();
  return (
    <React.Fragment>
      <Container maxWidth="lg" component="main" sx={{ mt: 5 }}>
        <Grid container spacing={2} className={classes.center}>
          {videos &&
            videos.map((item) => {
              const url = `api/file/video/${item.filename}`;
              return (
                <Grid item xs={12} md={6} key={item._id}>
                  <video width="auto" height="240" controls>
                    <source src={url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default VideoPanel;
