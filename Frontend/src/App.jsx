import { Fragment } from "react";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Homepage from "./components/pages/Homepage";
import TextEditor from "./components/pages/TextEditor";
import Protected from "./components/Auth/Protected";
import Authorized from "./components/Auth/Authorized";
export const url = "http://localhost:3000";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
function App() {
  const router = createBrowserRouter([
    {
      path: "/signup",
      element: <Authorized />,
      children: [
        {
          path: "/signup",
          element: <Signup />,
        },
      ],
    },
    {
      path: "/login",
      element: <Authorized />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
    {
      path: "/",
      element: <Protected />,
      children: [
        {
          index: true,
          element: <Homepage />,
        },
        {
          path: "/document/:documentId",
          element: <TextEditor />,
        },
        {
          path: "/document/:documentId/share/:shareId",
          element: <TextEditor />,
        },
      ],
    },
  ]);
  return (
    <Fragment>
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </Fragment>
  );
}

export default App;
