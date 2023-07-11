import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik, Field } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  signupUserAction,
  signupUserHandler,
} from "../../redux/slices/signup-slice";

const theme = createTheme();

const SignUp = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const [isToasting, setIsToasting] = useState(false);
  const [getPassword, setPassword] = useState(false);
  const [getConPassword, setConPassword] = useState(false);

  const loginToken = JSON.parse(localStorage.getItem("token"));

  const signUpUser = useSelector((state) => state?.signup);

  useEffect(() => {
    if (signUpUser?.data?.statusCode === 200) {
      toast.success(signUpUser?.data?.message);
      setTimeout(() => {
        Navigate("/");
        dispatch(signupUserAction.signupSliceReset());
      }, 2000);
      closeToast();
    } else if (signUpUser?.msg?.statusCode === 400) {
      toast.error(signUpUser?.msg?.message);
      setTimeout(() => {
        Navigate("/signup");
        dispatch(signupUserAction.signupSliceReset());
      }, 2000);
      closeToast();
    }
  }, [signUpUser]);

  const closeToast = () => {
    setTimeout(() => {
      setIsToasting(false);
    }, 2000);
  };

  const handleSubmit = async (values, { resetForm }) => {
    values.name =
      values?.name?.trim().charAt(0).toUpperCase() +
      values?.name?.trim()?.slice(1);
    values.email = values?.email?.trim();
    values.password = values?.password?.trim();
    values.conpassword = values?.conpassword?.trim();

    const trimData = {
      ...values,
    };

    if (loginToken === null) {
      dispatch(signupUserHandler(trimData));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        style={{
          background: "rgb(240 247 255)",
          border: "1px solid rgb(0 119 250)",
          borderRadius: "10px",
          marginTop: "16px",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#114077" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <Formik
            enableReinitialize
            initialValues={{
              name: "",
              email: "",
              password: "",
              conpassword: "",
            }}
            validate={(values) => {
              const errors = {};
              const nameRegex = /^[A-Za-z0-9_-]*$/;
              const emailRegex =
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              const passwordRegex =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

              if (!values.name.trim()) {
                errors.name = "name is required!";
              } else if (!nameRegex.test(values.name.trim())) {
                errors.name = "Please enter only  letters or number in name";
              }

              if (!values.email.trim()) {
                errors.email = "email is required!";
              } else if (!emailRegex.test(values.email.trim())) {
                errors.email = "Invalid email address";
              }
              if (!values.password.trim()) {
                errors.password = "password is required!";
              } else if (!passwordRegex.test(values.password.trim())) {
                errors.password =
                  "Please enter a valid password, length of password between 8-12 characters, at least one uppercase letter, at least one lowercase letter, at least one number and one special character";
              }
              if (!values.conpassword.trim()) {
                errors.conpassword = "confirm password is required!";
              } else if (values.password.trim() !== values.conpassword.trim()) {
                errors.conpassword = "confirm password dose not match";
              }

              return errors;
            }}
            onSubmit={handleSubmit}
          >
            {({
              setFieldValue,
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              formProps,
            }) => (
              <form
                onSubmit={handleSubmit}
                style={{
                  marginTop: "35px",
                }}
              >
                <ToastContainer autoClose={2000} />
                {console.log(values, "values")}
                <Grid container spacing={2} className="login">
                  <Grid item xs={15}>
                    <TextField
                      id="name1"
                      type="text"
                      name="name"
                      maxLength={30}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      value={
                        values?.name?.trim().charAt(0).toUpperCase() +
                        values?.name?.trim()?.slice(1)
                      }
                      placeholder="Enter Username"
                    />
                  </Grid>
                  <span className="span" style={{ color: "red" }}>
                    {errors.name && touched.name && errors.name}
                  </span>

                  <>
                    <Grid item xs={15}>
                      <TextField
                        id="email"
                        type="text"
                        name="email"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        value={values.email}
                        placeholder="Enter your email"
                      />
                    </Grid>
                    <span className="span" style={{ color: "red" }}>
                      {errors.email && touched.email && errors.email}
                    </span>
                    <Grid item xs={15}>
                      <TextField
                        id="password"
                        type={getPassword ? "text" : "password"}
                        name="password"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        value={values.password}
                        placeholder="Enter your password"
                        inputProps={{ maxLength: 12 }}
                      />

                      {!getPassword && (
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={() => setPassword(true)}
                        >
                          <VisibilityIcon />
                        </button>
                      )}
                      {getPassword && (
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={() => setPassword(false)}
                        >
                          <VisibilityOffIcon />
                        </button>
                      )}
                    </Grid>
                    <span className="span" style={{ color: "red" }}>
                      {errors.password && touched.password && errors.password}
                    </span>
                    <Grid item xs={15}>
                      <TextField
                        id="password"
                        type={getConPassword ? "text" : "password"}
                        name="conpassword"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        value={values.conpassword}
                        placeholder="Enter your confirm password"
                        inputProps={{ maxLength: 12 }}
                      />

                      {!getConPassword && (
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={() => setConPassword(true)}
                        >
                          <VisibilityIcon />
                        </button>
                      )}
                      {getConPassword && (
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={() => setConPassword(false)}
                        >
                          <VisibilityOffIcon />
                        </button>
                      )}
                    </Grid>
                    <span className="span" style={{ color: "red" }}>
                      {errors.conpassword &&
                        touched.conpassword &&
                        errors.conpassword}
                    </span>
                  </>
                </Grid>

                <div className="Buttons">
                  <div className="Buttons1">
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      SignUp
                    </Button>
                  </div>
                </div>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link to="/">Already have an account? Sign in</Link>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default SignUp;
