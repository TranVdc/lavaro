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

function App() {
  const [mode, setMode] = useState("light");
  const [showCustomTheme, setShowCustomTheme] = useState(true);

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
              <Navbar mode={mode} toggleColorMode={toggleColorMode} />{" "}
              <Features />
            </>
          }
        />
        <Route
          path="/sign-up"
          element={
            <>
              <Navbar mode={mode} toggleColorMosde={toggleColorMode} />{" "}
              <SignUp />
            </>
          }
        />
        <Route
          path="/sign-in"
          element={
            <>
              <Navbar mode={mode} toggleColorMosde={toggleColorMode} />{" "}
              <SignIn />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
