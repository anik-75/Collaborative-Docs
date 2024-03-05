import { createSlice } from "@reduxjs/toolkit";

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
export default userSlice.reducer;
