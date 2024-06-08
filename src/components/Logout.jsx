import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";

export default function Logout({ setToken }) {
  setToken("");
  localStorage.clear("token");
  return (
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
          You have logged out, Go to Home{" "}
          <Link color="primary" variant="inherit" component="a" href="/">
            Home
          </Link>
        </Alert>
      </Box>
    </Container>
  );
}
