import { createSlice } from "@reduxjs/toolkit";
import authService from "../services/authService";

const initialState = {
  username: null,
  userId: null,
  authStatus: false,
};
const userSlice = createSlice({
  name: "users",
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

// TODO : Persist User
// export const

export const login = (credentials) => {
  return async (dispatch) => {
    const data = await authService.login(credentials);
    console.log(data);
    if (data.status === 200) {
      dispatch(
        setUser({
          username: data.data.username,
          userId: data.data.userId,
          authStatus: true,
        })
      );
    } else {
      removeUser();
    }
  };
};

export default userSlice.reducer;
