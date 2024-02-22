import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Navigate } from "react-router-dom";
import { UserState } from "../../recoil/UserAtom";
function Authorized() {
  const user = useRecoilValue(UserState);
  console.log(user);
  return (
    <Fragment>{user === null ? <Outlet /> : <Navigate to="/" />}</Fragment>
  );
}

export default Authorized;
