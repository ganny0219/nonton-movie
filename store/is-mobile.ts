import { createSlice } from "@reduxjs/toolkit";

const isMobileSlice = createSlice({
  name: "isMobile",
  initialState: false,
  reducers: {
    setIsMobile: (state, action) => {
      return action.payload;
    },
  },
});

export const { setIsMobile } = isMobileSlice.actions;

export const isMobileReducer = isMobileSlice.reducer;
