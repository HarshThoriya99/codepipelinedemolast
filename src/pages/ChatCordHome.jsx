import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, Link } from "react-router-dom";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { getChatRoomHandler } from "../redux/slices/get-chat-room";
import io from "socket.io-client";
import { TbLogout } from "react-icons/tb";

const theme = createTheme();
const ChatCordHome = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const name11 = JSON.parse(localStorage.getItem("name"));

  const getchatroom = useSelector((state) => state?.getchatroom);

  useEffect(() => {
    dispatch(getChatRoomHandler());
  }, [getchatroom?.data?.data?.name]);

  const logout = () => {
    localStorage.clear();
    Navigate("/");
  };

  const handleSubmit = (values) => {
    const filterid = getchatroom?.data?.data.filter(
      (id) => id._id === values.topicname
    );
    localStorage.setItem("topicid", JSON.stringify(values.topicname));
    localStorage.setItem("topicname", JSON.stringify(filterid[0].name));
    Navigate("/dashboard");
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container
          component="main"
          maxWidth="xs"
          style={{
            background: "rgb(108 131 141)",
            border: "1px solid white",
            borderRadius: " 12px",
          }}
        >
          {" "}
          <div className="lbtn1">
            <button
              onClick={() => logout()}
              style={{
                border: "0px",
                fontWeight: "bold",
                textAlign: "center",
                display: "flex",
              }}
              className="logout2"
            >
              <TbLogout />
            </button>
          </div>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{ m: 1, bgcolor: "secondary.main", background: "#001c4a" }}
            >
              {name11[0]}
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                fontFamily: " emoji",
              }}
            >
              Chat Cord
            </Typography>
            <Formik
              initialValues={{
                name: name11,
                topicname: "",
              }}
              validate={(values) => {
                console.log("values", values);

                const errors = {};

                if (!values.topicname) {
                  errors.topicname = "Please select Room";
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
              }) => (
                <form
                  onSubmit={handleSubmit}
                  style={{
                    marginTop: "20px",
                  }}
                >
                  <Grid container spacing={2} className="login">
                    <Grid item xs={12}>
                      <label>
                        <h6>Username</h6>
                      </label>
                      <TextField
                        disabled
                        id="username"
                        type="name"
                        name="name"
                        // onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        placeholder="Enter your email address"
                      />
                    </Grid>

                    <span className="span">
                      {errors.name && touched.name && errors.name}
                    </span>

                    <Grid item xs={12}>
                      <label>
                        <h6>
                          Room<span style={{ color: "red" }}>*</span>
                        </h6>
                      </label>
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        onChange={handleChange}
                        value={values.topicname}
                        name="topicname"
                        id="topicname"
                      >
                        <option selected disabled value="">
                          select room
                        </option>
                        {getchatroom?.data?.data.map((names, index) => {
                          return (
                            <>
                              <option key={index} value={names._id}>
                                {names.name}
                              </option>
                            </>
                          );
                        })}
                      </select>
                      <span style={{ color: "red" }}>{errors.topicname}</span>
                    </Grid>
                  </Grid>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    style={{ background: "#001b4c" }}
                  >
                    Join Chat
                  </Button>
                </form>
              )}
            </Formik>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default ChatCordHome;
