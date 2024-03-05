import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Protected({ authentication, children }) {
  const user = useSelector((store) => store.users);
  const navigate = useNavigate();

  useEffect(() => {
    if (authentication && user.authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && user.authStatus !== authentication) {
      navigate("/");
    }
  }, [user, authentication, navigate]);
  console.log(user);
  return <>{children}</>;
}

export default Protected;
