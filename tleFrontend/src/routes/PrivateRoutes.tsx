import React from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";

interface PrivateRouteProps {
  isAuthenticated: boolean;
  element?: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticated, element }) => {
  return  isAuthenticated ? element : <Navigate to={ROUTES.SIGN_IN} />;
};

export default PrivateRoute;
