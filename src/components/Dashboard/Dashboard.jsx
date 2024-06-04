import React, { useEffect } from "react";
import SignIn from "../SignIn";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ token }) {
  const navigate = new useNavigate();

  useEffect(() => {
    if (!token) {
      return navigate("/sign-in");
    }
  }, []);
  return <div>This is dasboard page</div>;
}
