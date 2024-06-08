import Dashboard from "./components/Dashboard/Dashboard";
import Features from "./components/Features";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import logo from "./logo.svg";
// import "./App.css";
import Alert from "@mui/material/Alert";
import React, { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import UseToken from "./components/UseToken";
import Logout from "./components/Logout";

function App() {
  const [mode, setMode] = useState("light");
  const [showCustomTheme, setShowCustomTheme] = useState(true);
  const { token, setToken } = UseToken();

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar
                mode={mode}
                toggleColorMode={toggleColorMode}
                token={token}
              />{" "}
              <Features />
            </>
          }
        />
        {!token && (
          <>
            <Route
              path="/sign-up"
              element={
                <>
                  <Navbar
                    mode={mode}
                    toggleColorMosde={toggleColorMode}
                    token={token}
                  />{" "}
                  <SignUp />
                </>
              }
            />
            <Route
              path="/sign-in"
              element={
                <>
                  <Navbar
                    mode={mode}
                    toggleColorMosde={toggleColorMode}
                    token={token}
                  />{" "}
                  <SignIn setToken={setToken} />
                </>
              }
            />
          </>
        )}

        <Route
          path="/dashboard"
          element={
            <>
              <Navbar
                mode={mode}
                toggleColorMosde={toggleColorMode}
                token={token}
              />{" "}
              <Dashboard token={token} />
            </>
          }
        />

        <Route
          path="/logout"
          element={
            <>
              <Navbar
                mode={mode}
                toggleColorMosde={toggleColorMode}
                token={token}
              />{" "}
              <Logout setToken={setToken} />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
