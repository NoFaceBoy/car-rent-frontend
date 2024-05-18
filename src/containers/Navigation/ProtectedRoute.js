import React from "react";
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({
  isAuthenticated: auth,
  component: Component
}) => {

  if (!auth) {
    return <Navigate to="/login" replace />;
  }
  return <Component />;
}

export default ProtectedRoute;
