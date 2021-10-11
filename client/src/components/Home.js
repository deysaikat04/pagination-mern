import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Cookies from "js-cookie";
import Form from "./Form";
import CityTable from "./CityTable";
import Pagination from "@mui/material/Pagination";
import { getAllCities } from "../actions/cityAction";
import Navbar from "./Navbar";

const Home = () => {
  const dispatch = useDispatch();

  const [rowsperPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  const [fieldSort, setFieldSort] = useState("");
  const [sortOrder, setSortOrder] = useState(1);

  const [fieldFilter, setFieldFilter] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const token = Cookies.get("token");
  const authed = token !== undefined;

  const { cities } = useSelector((state) => ({
    cities: state.city,
  }));

  useEffect(() => {
    setTotalPages(Math.ceil(cities.totalPages / rowsperPage));
    dispatch(
      getAllCities(
        token,
        page,
        rowsperPage,
        fieldSort,
        sortOrder,
        fieldFilter,
        filterValue
      )
    );
  }, [cities.totalPages, page, rowsperPage]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };
 

  const getCities = (flag) => {
    dispatch(
      getAllCities(
        token,
        page,
        rowsperPage,
        fieldSort,
        sortOrder,
        fieldFilter,
        filterValue,
        flag
      )
    );
  };

  const callClear = () => {
    setFieldSort("");
    setSortOrder("");
    setFieldFilter("");
    setFilterValue("");
    setPage(1);
    getCities(false);
  };

  if (!authed) {
    return <Redirect to="/" />;
  }
  return (
    <React.Fragment>
      <Navbar/>

      <Container
        disableGutters
        maxWidth="md"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Form
              setPage={setPage}
              rowsperPage={rowsperPage}
              setRowsPerPage={setRowsPerPage}
              fieldSort={fieldSort}
              sortOrder={sortOrder}
              setFieldSort={setFieldSort}
              setSortOrder={setSortOrder}
              fieldFilter={fieldFilter}
              filterValue={filterValue}
              setFieldFilter={setFieldFilter}
              setFilterValue={setFilterValue}
              getCities={getCities}
              callClear={callClear}
            />
            <CityTable city={cities.data} />
          </Grid>
          <Grid item xs={12}>
            <Pagination
              count={totalPages}
              color="primary"
              page={page}
              onChange={handlePageChange}
            />
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end"></Grid>
      </Container>
    </React.Fragment>
  );
};

export default Home;
