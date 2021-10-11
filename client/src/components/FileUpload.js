import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";
import Navbar from "./Navbar";
import LinearProgress from "@mui/material/LinearProgress";
import { loadFileAsync, uploadFileAsync } from "../actions/uploadAction";
import VideoPanel from "./VideoPanel";
import Alert from "./Alert";
import VideoConverter from "convert-video";

const FileUpload = () => {
  const dispatch = useDispatch();

  const [uploadFile, setUploadFile] = useState({});
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [msg, setMsg] = useState("");

  const token = Cookies.get("token") || "";
  const authed = token !== undefined;

  const { files } = useSelector((state) => ({
    files: state.file,
  }));

  useEffect(() => {
    dispatch(loadFileAsync(token));
  }, []);

  useEffect(() => {
    if (files.uploadError) {
      setOpen(true);
      setAlertType("error");
    }
    if (files.uploadSuccess) {
      setOpen(true);
      setAlertType("success");
    }
  }, [files]);

  const handleChange = async (input) => {
    let sourceVideoFile = input.target.files[0];
    if (sourceVideoFile.type === "video/avi") {
      let targetVideoFormat = "mp4";
      let convertedVideoDataObj = await VideoConverter.convert(
        sourceVideoFile,
        targetVideoFormat
      );
      setUploadFile(convertedVideoDataObj);
    } else {
      setUploadFile(sourceVideoFile);
    }
    setOpen(false);
    setAlertType("");
    setMsg("");
    setAlertType("");
  };

  const upload = (e) => {
    e.preventDefault();
    const hasValue = uploadFile.name && uploadFile.name !== "";
    if (hasValue) {
      const formData = new FormData();
      formData.append("uploadFile", uploadFile);
      setUploadFile({});
      dispatch(uploadFileAsync(token,formData));
    } else {
      setOpen(true);
      setMsg("Please select a file to upload!");
      setAlertType("error");
    }
  };

  if (!authed) return <Redirect to="/" />;

  return (
    <React.Fragment>
      <Navbar />
      {files.percentage > 0 && files.percentage <= 100 && (
        <LinearProgress
          variant="determinate"
          color="secondary"
          value={files.percentage}
        />
      )}

      <Container maxWidth="md" component="main">
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ mt: 5 }}>
            <input
              name="uploadFile"
              type="file"
              accept=".mp4, .avi, .mov"
              onChange={(e) => handleChange(e)}
              id="contained-button-file"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <Button variant="contained" component="label" onClick={upload}>
              Upload
            </Button>
          </Grid>
        </Grid>
      </Container>
      <VideoPanel videos={files.fileArray} />
      {open && (
        <Alert
          setOpen={setOpen}
          type={alertType}
          errorMsg={
            msg
              ? msg
              : files.uploadError
              ? files.uploadError
              : "Successfully uploaded!"
          }
        />
      )}
    </React.Fragment>
  );
};

export default FileUpload;
