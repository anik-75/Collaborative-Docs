import { createSlice } from "@reduxjs/toolkit";
import authService from "../services/authService";

const initialState = {
  username: null,
  userId: null,
  authStatus: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_state, action) => {
      return {
        username: action.payload.username,
        userId: action.payload.userId,
        authStatus: true,
      };
    },
    removeUser: () => {
      localStorage.removeItem("token");
      return initialState;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export const login = (credentials, successCallback) => {
  return async (dispatch) => {
    try {
      const response = await authService.login(credentials);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        dispatch(
          setUser({
            username: response.data.username,
            userId: response.data.userId,
            authStatus: true,
          })
        );
        successCallback();
      }
    } catch (err) {
      console.log(err);
      dispatch(logout());
    }
  };
};

export const logout = (successCallback) => {
  return (dispatch) => {
    dispatch(removeUser());
    localStorage.removeItem("persist:root");
    successCallback("/login");
  };
};

export default userSlice.reducer;
