import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthRouter = () => {
  const token = localStorage.getItem("token");
  if (!token || token === undefined) {
    return <Navigate to="/signin" replace />;
  }
  return <Outlet />;
};

export default AuthRouter;
