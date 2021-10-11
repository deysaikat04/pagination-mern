import {
  UPLOAD_FILE,
  UPLOAD_FILE_ERR,
  SET_UPLAOD_PERCENTAGE,
  LOAD_FILES,
  LOAD_FILES_ERR,
} from "../actions/action-types";

const initState = {
  data: {},
  fileArray: [],
  percentage: 0,
  getError: "",
  uploadError: "",
  uploadSuccess: false,
};

export default function uploadReducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPLOAD_FILE:
      return {
        ...state,
        data: { ...payload },
        getError: "",
        uploadError: "",
        uploadSuccess: true,
      };
    case SET_UPLAOD_PERCENTAGE:
      return {
        ...state,
        percentage: payload,
        getError: "",
        uploadError: "",
      };
    case UPLOAD_FILE_ERR:
      return {
        ...state,
        data: {},
        getError: "",
        uploadError: payload,
        uploadSuccess: false,
      };
    case LOAD_FILES:
      return {
        ...state,
        fileArray: [...payload],
        getError: "",
        uploadError: "",
        uploadSuccess: false,
      };
    case LOAD_FILES_ERR:
      return {
        ...state,
        fileArray: [],
        getError: payload,
        uploadError: "",
        uploadSuccess: false,
      };

    default:
      return {
        ...state,
      };
  }
}
