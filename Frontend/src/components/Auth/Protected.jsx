import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Navigate } from "react-router-dom";
import { UserState } from "../../recoil/UserAtom";
function Protected() {
  const user = useRecoilValue(UserState);
  return (
    <Fragment>
      {user !== null ? <Outlet /> : <Navigate to="/login" replace />}
    </Fragment>
  );
}

export default Protected;
