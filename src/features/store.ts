import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { cinemaSliceReducer } from "../pages/Cinema/store/cinemaSlice";

export const store = configureStore({
  reducer: {
    cinema: cinemaSliceReducer,
  },
  devTools: true,
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const usedispatch: () => AppDispatch = useDispatch;
