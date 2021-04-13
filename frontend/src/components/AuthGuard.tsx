import * as React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {Routes} from "../constants/links";
import {RootState} from "../store";

interface AuthGuardType {
  children: React.ReactNode;
}

function AuthGuard({ children }: AuthGuardType) {
  const auth = useSelector((state: RootState) => state.auth);

  if (!Object.keys(auth.data)?.length) {
    return <Redirect to={Routes.Login} />;
  }

  return children;
}

export default AuthGuard;
