import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, Link } from "react-router-dom";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { loginUserHandler } from "../../redux/slices/login-slice";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { loginUserAction } from "../../redux/slices/login-slice";

const theme = createTheme();

const Login = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const [validation, setValidation] = useState("");
  const [validationn, setValidationn] = useState("");
  const [valuesData, setValuesData] = useState({});
  const [isToasting, setIsToasting] = useState(false);
  const [getPassword, setPassword] = useState(false);

  const oldtoken = localStorage.getItem("token");
  const topicName = JSON.parse(localStorage.getItem("topicname"));

  const loginUser = useSelector((state) => state?.login);

  useEffect(() => {
    setValidation("");
    setValidationn("");
  }, [valuesData]);

  useEffect(() => {
    if (loginUser?.data?.statusCode === 200) {
      localStorage.setItem(
        "token",
        JSON.stringify(loginUser?.data?.data?.token)
      );
      localStorage.setItem("name", JSON.stringify(loginUser?.data?.data?.name));
      localStorage.setItem("id", JSON.stringify(loginUser?.data?.data?.id));
      toast.success(loginUser?.data?.message);
      setTimeout(() => {
        Navigate("/chatcord");
        dispatch(loginUserAction.loginSliceReset());
      }, 2000);
      closeToast();
    } else if (loginUser?.message?.response?.data?.statusCode === 400) {
      toast.error(loginUser.message?.response?.data?.message);
      setTimeout(() => {
        Navigate("/");
        dispatch(loginUserAction.loginSliceReset());
      }, 2000);
      closeToast();
    } else if (loginUser.message?.response?.data?.statusCode === 412) {
      toast.error(loginUser.message?.response?.data?.message);
      setTimeout(() => {
        Navigate("/");
        dispatch(loginUserAction.loginSliceReset());
      }, 2000);
      closeToast();
    } else if (oldtoken && !topicName) {
      Navigate("/chatcord");
    } else if (oldtoken && topicName) {
      Navigate("/dashboard");
    }
  }, [loginUser]);

  const closeToast = () => {
    setTimeout(() => {
      setIsToasting(false);
    }, 2000);
  };

  const handleSubmit = (values) => {
    dispatch(loginUserHandler(values));
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
          marginTop: "65px",
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
            Sign in
          </Typography>
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              console.log("values", values);
              setValuesData(values);
              const passwordRegex =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
              const errors = {};

              if (!values.email.trim()) {
                errors.email = "email is  required!";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                  values.email.trim()
                )
              ) {
                errors.email = "invalid email address";
              }
              if (!values.password.trim()) {
                errors.password = "password is  required!";
              } else if (!passwordRegex.test(values.password.trim())) {
                errors.password = "Username and password are incorrect";
              }

              return errors;
            }}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form
                onSubmit={handleSubmit}
                style={{
                  marginTop: "50px",
                }}
              >
                <ToastContainer autoClose={2000} />

                <Grid container spacing={2} className="login">
                  <Grid item xs={15}>
                    <TextField
                      id="email"
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      placeholder="Enter your email address"
                    />
                  </Grid>
                  <span className="span">
                    {" "}
                    {errors.email
                      ? errors.email && touched.email && errors.email
                      : validation}
                  </span>

                  <Grid item xs={12}>
                    <TextField
                      id="password"
                      name="password"
                      type={getPassword ? "text" : "password"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      placeholder="Enter your password"
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

                  <span className="span">
                    {errors.password
                      ? errors.password && touched.password && errors.password
                      : validationn}
                  </span>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link to="/signup">Sign up</Link>
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
export default Login;
