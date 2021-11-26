import React, { Fragment, useEffect } from "react";
import { Navigate, Outlet, Route } from "react-router";

export default function PrivateRoute() {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/signin" />;
  }

  
  return <Outlet />;
}
