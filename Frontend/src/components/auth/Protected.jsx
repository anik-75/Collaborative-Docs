import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { UserState } from "../../recoil/UserAtom";

function Protected({ authentication, children }) {
  const user = useRecoilValue(UserState);
  const navigate = useNavigate();

  useEffect(() => {
    if (authentication && user === null) {
      navigate("/login");
    } else if (!authentication && user !== null) {
      navigate("/");
    }
  }, [user, authentication, navigate]);
  console.log(user);
  return <>{children}</>;
}

export default Protected;
