import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { removeUser } from "../../store/auth.slice";

function Protected({ authentication, children }) {
  const user = useSelector((store) => {
    return store.user;
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateToken = useCallback(
    function validateToken(token) {
      const decoded = jwtDecode(token);
      if (decoded.exp && decoded.exp * 1000 <= Date.now()) {
        dispatch(removeUser());
      }
      return;
    },
    [dispatch]
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      validateToken(token);
    } else {
      dispatch(removeUser())
    }

    if (authentication && user.authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && user.authStatus !== authentication) {
      navigate("/");
    }
  }, [user, authentication, navigate, validateToken, dispatch]);

  return <>{children}</>;
}

export default Protected;
