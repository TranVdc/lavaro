import * as React from "react";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import Alert from "@mui/material/Alert";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
} from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Lavaro
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });
  const [isSignupSucess, setIsSignUpSucess] = useState(false);
  const [isLoadingSpiner, setIsLoadingSpiner] = useState(false);
  const [isUniqueEmail, setIsUniqueEmail] = useState(false);

  const watchEmail = watch("email", "");
  useEffect(() => {
    if (isLoadingSpiner === false) {
      setIsUniqueEmail(false);
    }
  }, [watchEmail]);
  const onSubmit = async (data) => {
    try {
      setIsLoadingSpiner(true);
      const isUniqueEmailRespone = await axios.get(
        `http://127.0.0.1:8000/api/lavaro-users/search-by-email/${data.email}`
      );

      if (isUniqueEmailRespone.data.status === 1) {
        setIsUniqueEmail(true);
        setIsLoadingSpiner(false);
        return false;
      }

      const respone = await axios.post(
        "http://127.0.0.1:8000/api/lavaro-users/store/",
        {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          password: data.password,
          role: "student",
        }
      );
      setIsSignUpSucess(true);
      setIsLoadingSpiner(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      {isSignupSucess ? (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 16,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Alert severity="success">
              Sign up successful! To sign in, click in{" "}
              <Link
                color="primary"
                variant="inherit"
                component="a"
                href="/sign-in/"
              >
                Sign in
              </Link>
            </Alert>
          </Box>
        </Container>
      ) : (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 16,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            {isLoadingSpiner && (
              <Box sx={{ display: "flex" }}>
                <CircularProgress color="secondary" />
              </Box>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <Box noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="firstName"
                      control={control}
                      rules={{ required: "First Name is required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          autoComplete="given-name"
                          fullWidth
                          id="firstName"
                          label="First Name *"
                          autoFocus
                        />
                      )}
                    />
                    {errors.firstName?.message && (
                      <Alert severity="error">
                        {errors.firstName?.message}
                      </Alert>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="lastName"
                      control={control}
                      rules={{ required: "Last Name is required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          id="lastName"
                          label="Last Name *"
                          autoComplete="family-name"
                        />
                      )}
                    />
                    {errors.lastName?.message && (
                      <Alert severity="error">{errors.lastName?.message}</Alert>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="email"
                      control={control}
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Entered value does not match email format",
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          autoComplete="email"
                          fullWidth
                          id="email"
                          label="Email Address *"
                        />
                      )}
                    />
                    {errors.email?.message && (
                      <Alert severity="error">{errors.email?.message}</Alert>
                    )}
                    {isUniqueEmail && (
                      <Alert severity="error">
                        This Email is exsting already
                      </Alert>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="password"
                      control={control}
                      rules={{ required: "Password is required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          autoComplete="password"
                          fullWidth
                          type="password"
                          id="password"
                          label="Password *"
                        />
                      )}
                    />
                    {errors.password?.message && (
                      <Alert severity="error">{errors.password?.message}</Alert>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value="allowExtraEmails"
                          color="primary"
                          name="allowExtraEmails"
                          {...register("allowExtraEmails", {
                            required: "Please check on receive inspiration",
                          })}
                        />
                      }
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                    {errors.allowExtraEmails?.message && (
                      <Alert severity="error">
                        {errors.allowExtraEmails?.message}
                      </Alert>
                    )}
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="#" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </form>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      )}
    </ThemeProvider>
  );
}
