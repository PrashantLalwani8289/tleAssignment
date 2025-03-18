// import React from "react";
// import { Navigate } from "react-router-dom";
// import home from "../pages/home/home";
// import { ROUTES } from "../constants/routes";

interface PublicRouteProps {
  isAuthenticated: boolean;
  element?: React.ReactElement;
}

const PublicRoutes: React.FC<PublicRouteProps> = ({ isAuthenticated, element }) => {
  return isAuthenticated ? element : element ;
};

export default PublicRoutes;
