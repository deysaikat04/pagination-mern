import axios from "axios";
import {
  UPLOAD_FILE,
  UPLOAD_FILE_ERR,
  SET_UPLAOD_PERCENTAGE,
  LOAD_FILES,
  LOAD_FILES_ERR,
} from "./action-types";

export const uploadFileAsync = (token, data) => {
  return (dispatch) => {
    axios
      .post(`api/file/upload`, data, {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress: (progressEvent) => {
          dispatch(
            setUploadPercentage(
              parseInt(
                Math.round(progressEvent.loaded * 100) / progressEvent.total
              )
            )
          );
          setTimeout(() => {
            dispatch(setUploadPercentage(0));
          }, 10000);
        },
      })
      .then((res) => {
        dispatch(uploadFile(res.data));
        dispatch(loadFileAsync(token));
      })
      .catch((error) => {
        if (error.response) {
          dispatch(
            uploadFileErr(
              error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        } else {
          dispatch(uploadFileErr(error.message));
        }
      });
  };
};

export const loadFileAsync = (token) => {
  return (dispatch) => {
    axios
      .get(`api/file/files`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(loadFiles(res.data));
      })
      .catch((error) => {
        if (error.response) {
          dispatch(loadFilesErr(error.response.data.message));
        } else {
          dispatch(loadFilesErr(error.message));
        }
      });
  };
};

export const uploadFile = (data) => {
  return {
    type: UPLOAD_FILE,
    payload: data,
  };
};

export const uploadFileErr = (error) => {
  return {
    type: UPLOAD_FILE_ERR,
    payload: error,
  };
};

export const setUploadPercentage = (percentage) => {
  return {
    type: SET_UPLAOD_PERCENTAGE,
    payload: percentage,
  };
};

export const loadFiles = (data) => {
  return {
    type: LOAD_FILES,
    payload: data,
  };
};

export const loadFilesErr = (data) => {
  return {
    type: LOAD_FILES_ERR,
    payload: data,
  };
};
