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
    setUser: (state, action) => {
      return {
        username: action.payload.username,
        userId: action.payload.userId,
        authStatus: true,
      };
    },
    removeUser: () => {
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
