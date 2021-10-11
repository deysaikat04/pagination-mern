import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link, Redirect } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from './Alert';
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from "js-cookie";
import { loginUser } from "../actions/userAction";


const Signin = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const token = Cookies.get("token");
  const authed = token !== undefined;

  const initialState = {
    email: "",
    pin: 0,
  };

  const [form, setForm] = useState(initialState);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({
    user: state.user,
  }));

  useEffect(() => {
    user.error ? setOpen(user.error) : setOpen(false);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value !== "") {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    dispatch(loginUser(form));

    setTimeout(() => {
      history.push("/home");
    }, 1000);
  };

  if (authed) {
    return <Redirect to="/home" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => handleChange(e)}
                value={form.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="pin"
                label="Pin"
                type="password"
                id="pin"
                inputProps={{ maxLength: 4 }}
                autoComplete="new-pin"
                onChange={(e) => handleChange(e)}
                value={form.pin}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? <CircularProgress color="inherit" /> : "Sign in"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/signup" variant="body2">
                New user? Sign up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {open && (
        <Alert
          setOpen={setOpen}
          type={"error"}
          errorMsg={user.errorMsg ? user.errorMsg : "Network error!"}
        />
      )}
    </Container>
  );
};

export default Signin;
