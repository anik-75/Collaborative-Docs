import { Fragment } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import TextEditor from "./pages/TextEditor";
import Protected from "./components/auth/Protected";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import SocketProvider from "./components/context/socket.context";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Protected authentication={true}>
          <Homepage />
        </Protected>
      ),
    },
    {
      path: "/documents/:documentId",
      element: (
        <Protected authentication={true}>
          <SocketProvider>
            <TextEditor />,
          </SocketProvider>
        </Protected>
      ),
    },
    {
      path: "/documents/:documentId/share/:shareId",
      element: (
        <Protected authentication={true}>
          <TextEditor />,
        </Protected>
      ),
    },
    {
      path: "/register",
      element: (
        <Protected authentication={false}>
          <Register />
        </Protected>
      ),
    },
    {
      path: "/login",
      element: (
        <Protected authentication={false}>
          <Login />
        </Protected>
      ),
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
