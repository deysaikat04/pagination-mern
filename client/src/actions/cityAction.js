import axios from "axios";
import { GET_CITIES, GET_CITIES_ERROR } from "./action-types";

export const getAllCities = (token, page, rowsperPage, sortField, sortOrder, fieldFilter, filterValue, flag = true)=> {
  let field, url;
  
  fieldFilter === 'city' ? field = 'city' : field = 'state' ;

  flag ? url = `/api/cities?page=${page}&limit=${rowsperPage}&sortField=${sortField}&sortOrder=${sortOrder}&${field}=${filterValue}` : url = `/api/cities?page=${page}&limit=${rowsperPage}`

  return (dispatch) => {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch(getCities(res.data));
      })
      .catch((error) => {
        if (error.response) {
          dispatch(getCitiesError(error.response.data.message));
        } else {
          dispatch(getCitiesError(error.message));
        }
      });
  };
};

export const getCities = (data) => {
  return {
    type: GET_CITIES,
    payload: data,
  };
};

export const getCitiesError = (error) => {
  return {
    type: GET_CITIES_ERROR,
    payload: error,
  };
};
