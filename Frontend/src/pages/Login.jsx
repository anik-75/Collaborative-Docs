import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, setUser } from "../store/auth.slice";
import { jwtDecode } from "jwt-decode";

const initialState = {
  email: "",
  password: "",
};
function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState(initialState);
  const [query] = useSearchParams();
  const dispatch = useDispatch();

  function loginHandler(e) {
    e.preventDefault();
    const loginInfo = credentials;
    setCredentials(initialState);
    dispatch(
      login(loginInfo, () => {
        navigate("/");
      })
    );
  }
  const token = query.get("token");
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      console.log(decoded);
      dispatch(
        setUser({
          userId: decoded.userId,
          username: decoded?.user.username,
        })
      );
      localStorage.setItem("token", token);
      navigate("/");
    }
  }, [dispatch, navigate, token]);

  return (
    <Fragment>
      <div className="flex flex-row h-screen box-border items-center justify-center ">
        <div className="shadow-2xl py-14 pl-20 rounded">
          <div className="flex flex-col">
            <div className="mb-3">
              <h1 className="text-4xl font-bold ">Login</h1>
              <p className="pt-1 ">
                {"Doesn't have an account yet?"}
                <Link
                  to="/register"
                  className="underline text-blue-900  font-bold pl-2"
                >
                  SignUp
                </Link>
              </p>
            </div>

            <div className="flex flex-col w-5/12">
              <form onSubmit={loginHandler}>
                <div>
                  <label htmlFor="email" className="text-sm font-bold ">
                    Email Address
                  </label>
                  <input
                    className="border pr-14 py-2 px-3 w-72 rounded-md border-blue-700 text-blue-600"
                    placeholder="test@test.com"
                    type="email"
                    id="email"
                    name="email"
                    required
                    onChange={(e) => {
                      setCredentials((prev) => {
                        return { ...prev, email: e.target.value };
                      });
                    }}
                  />
                </div>
                <div className="my-4">
                  <label htmlFor="password" className="text-sm font-bold ">
                    Password
                  </label>
                  <input
                    className="border pr-14 py-2 px-3 w-72 rounded-md border-blue-700 text-blue-600"
                    placeholder="Enter password"
                    type="password"
                    id="password"
                    name="password"
                    required
                    onChange={(e) => {
                      setCredentials((prev) => {
                        return { ...prev, password: e.target.value };
                      });
                    }}
                  />
                </div>
                <div className="my-5">
                  <button
                    type="submit"
                    className="bg-blue-400 rounded-md py-2 w-72 text-white "
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>

            <div className="my-5">
              <h2
                className="border-b-2 w-72 'mt-2 mb-5 text-center"
                style={{ lineHeight: "0" }}
              >
                <span className="bg-white px-1 font-semibold text-gray-500">
                  or login with
                </span>
              </h2>

              <div className="my-8">
                <a
                  href={`https://github.com/login/oauth/authorize?client_id=${
                    import.meta.env.VITE_GITHUB_CLIENT_ID
                  }&scope=user`}
                >
                  <button className=" rounded-md py-2 w-72 text-black border-2 border-black ">
                    Github
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Login;
