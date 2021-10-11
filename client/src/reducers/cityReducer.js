import { GET_CITIES, GET_CITIES_ERROR } from "../actions/action-types";

const initState = {
  data: [],
  totalPages: 0,
  error: false,
};

export default function cityReducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CITIES:
      return {
        ...state,
        data: [...payload.results],
        totalPages: payload.totalPages,
        error: false,
      };
    case GET_CITIES_ERROR:
      return {
        ...state,
        data: [],
        totalPages: 0,
        error: payload,
      };

    default:
      return {
        ...state,
      };
  }
}
