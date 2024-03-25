import { Fragment } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import TextEditor from "./pages/TextEditor";
import Protected from "./components/auth/Protected";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SocketProvider from "./context/socket.context";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  // router config
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
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </Fragment>
  );
}

export default App;
