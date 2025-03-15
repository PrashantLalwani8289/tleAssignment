import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { ROUTES } from "../constants/routes";
import PublicRoutes from "./PublicRoutes";

import SignUp from "../pages/signup/SignUp";
import SignIn from "../pages/signin/SignIn";
import Contests from "../pages/contests/Contest";

interface RoutesConfigProps {
  isAuthenticated: boolean;
}

const RoutesConfig: React.FC<RoutesConfigProps> = ({ isAuthenticated }) => {
  return (
    <Routes>
     
      <Route
        path={ROUTES.SIGN_UP}
        element={
          <PublicRoutes
            isAuthenticated={isAuthenticated}
            element={<SignUp />}
          />
        }
      />

      <Route
        path={ROUTES.SIGN_IN}
        element={
          <PublicRoutes
            isAuthenticated={isAuthenticated}
            element={<SignIn />}
          />
        }
      />
     

      <Route path={ROUTES.CONTESTS} element={<Contests />} />
      <Route path="*" element={<Navigate to={ROUTES.CONTESTS}></Navigate>} />
    </Routes>
  );
};

export default RoutesConfig;
