import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const useStyles = makeStyles((theme) => ({
  button: {
    float: "right",
    top: "1.5rem",
  },
  buttonClear: {
    float: "right",
    top: "1.5rem",
    marginRight: "0.5rem",
  },
}));

export default function Form({
  setPage,
  rowsperPage,
  setRowsPerPage,
  fieldSort,
  setFieldSort,
  sortOrder,
  setSortOrder,
  fieldFilter,
  filterValue,
  setFieldFilter,
  setFilterValue,
  getCities,
  callClear,
}) {
  const classes = useStyles();

  const btnDisabled = fieldFilter === "" && fieldSort === "";

  const callGetCities = () => {
    if (fieldFilter && filterValue) setPage(1);
    getCities();
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">
          Rows per page
        </InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={rowsperPage}
          onChange={(e) => setRowsPerPage(e.target.value)}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
          <MenuItem value={500}>500</MenuItem>
          <MenuItem value={1000}>1000</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">Sort Field</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={fieldSort}
          onChange={(e) => setFieldSort(e.target.value)}
        >
          <MenuItem value={""}>None</MenuItem>
          <MenuItem value={"_id"}>ID</MenuItem>
          <MenuItem value={"city"}>City</MenuItem>
          <MenuItem value={"state"}>State</MenuItem>
          <MenuItem value={"pop"}>Population</MenuItem>
        </Select>
      </FormControl>
      {fieldSort !== "" && (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-filled-label">
            Sort Order
          </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <MenuItem value={"asc"}>Ascending</MenuItem>
            <MenuItem value={"desc"}>Descending </MenuItem>
          </Select>
        </FormControl>
      )}
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">Filter</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={fieldFilter}
          onChange={(e) => setFieldFilter(e.target.value)}
        >
          <MenuItem value={""}>None</MenuItem>
          <MenuItem value={"_id"}>ID</MenuItem>
          <MenuItem value={"city"}>City</MenuItem>
          <MenuItem value={"state"}>State</MenuItem>
        </Select>
      </FormControl>
      {fieldFilter !== "" && (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <TextField
            required
            fullWidth
            id="filter"
            label="Field name"
            name="filter"
            autoComplete="filter"
            variant="standard"
            onChange={(e) => setFilterValue(e.target.value)}
            value={filterValue}
          />
        </FormControl>
      )}
      <FormControl variant="standard" className={classes.button}>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={callGetCities}
          disabled={btnDisabled}
        >
          Go
        </Button>
      </FormControl>
      <FormControl
        variant="standard"
        color="primary"
        className={classes.buttonClear}
      >
        <Button
          variant="outlined"
          size="small"
          onClick={callClear}
          disabled={btnDisabled}
        >
          Clear
        </Button>
      </FormControl>
    </div>
  );
}
