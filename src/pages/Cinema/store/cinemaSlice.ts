import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitialState, IMovie, IRoom } from ".";

const initialState: IInitialState = {
  rooms: [],
  movies: [],
  seats: [],
};

const cinemaSlice = createSlice({
  name: "cinema",
  initialState,
  reducers: {
    cinemaRoom: (state, action: PayloadAction<IRoom[]>) => {
      state.rooms = action.payload;
    },
    cinemaMovie: (state, action: PayloadAction<IMovie[]>) => {
      state.movies = action.payload;
    },
    cinemaSeat: (state, action) => {
      state.seats = action.payload;
    },
  },
});

export const { cinemaRoom, cinemaMovie, cinemaSeat } = cinemaSlice.actions;
export const cinemaSliceReducer = cinemaSlice.reducer;
