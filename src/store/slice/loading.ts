import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

const initialState: { loading: boolean } = {
  loading: false,
};
export const loading = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
  },
});
export const { setLoading } = loading.actions;
export const selectCount = (state: RootState) => state.loading;
export default loading.reducer;
