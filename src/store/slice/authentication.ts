import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
// import PopupNotification from "@helpers/popup-notification";
import { authenticationType, inforUser } from "@utils/types/auth_type";

const initialState: authenticationType = {
  user: null,
};
export const authentication = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    initCMS: () => {},
    loginSuccess: (state, action: PayloadAction<inforUser>) => {
      const {} = action.payload;
      console.log("action,", action.payload);
      return {
        ...state,
        user: action.payload,
      };
    },
    changeToken: (state, action: PayloadAction<string | null>) => {
      return {
        ...state,
        token: action.payload,
      };
    },
    logoutCMS: (state) => {
      return {
        ...state,
        user: null,
      };
    },
  },
});
export const { initCMS, loginSuccess, changeToken, logoutCMS } = authentication.actions;
export const selectCount = (state: RootState) => state.authentication;
export default authentication.reducer;
