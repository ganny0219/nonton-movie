import { configureStore } from "@reduxjs/toolkit";
import { movieReducer } from "./movie";
import { vttFileReducer } from "./vtt-file";
import { isMobileReducer } from "./is-mobile";

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    vttFile: vttFileReducer,
    isMobile: isMobileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
