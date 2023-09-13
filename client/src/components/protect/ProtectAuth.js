import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Protected({ children }) {
  const { isLoginSuccess } = useSelector((state) => state.auth);
  if (isLoginSuccess) {
    return children;
  }
  return <Navigate to="/login" />;
}

export default Protected;
