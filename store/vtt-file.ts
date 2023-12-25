import { createSlice } from "@reduxjs/toolkit";

const vttfileSlice = createSlice({
  name: "vttFile",
  initialState: [] as File[],
  reducers: {
    setVttFile: (state, action) => {
      return action.payload;
    },
  },
});

export const { setVttFile } = vttfileSlice.actions;
export const vttFileReducer = vttfileSlice.reducer;
