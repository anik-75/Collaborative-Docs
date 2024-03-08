import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Protected({ authentication, children }) {
  const user = useSelector((store) => {
    return store.user;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (authentication && user.authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && user.authStatus !== authentication) {
      navigate("/");
    }
  }, [user, authentication, navigate]);

  return <>{children}</>;
}

export default Protected;
