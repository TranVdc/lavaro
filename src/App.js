import Features from "./components/Features";
import Navbar from "./components/Navbar";
import logo from "./logo.svg";
// import "./App.css";
import Alert from "@mui/material/Alert";
import React, { useState } from "react";

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
      <Navbar mode={mode} toggleColorMode={toggleColorMode} />
      <Features />
    </div>
  );
}

export default App;
