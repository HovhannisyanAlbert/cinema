import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../API/api";
import { cinemaMovie, cinemaRoom, cinemaSeat } from "./cinemaSlice";

const WBAPI = new API();
interface FetchMoviesArgs {
  id: string | undefined;
}
export const GetAllRooms = createAsyncThunk(
  "get/rooms",
  async (_, { dispatch }) => {
    try {
      const response = await WBAPI.getRooms();
      dispatch(cinemaRoom(response));
    } catch (e) {
      console.error(e);
    }
  }
);

export const GetAllMovies = createAsyncThunk(
  "get/movies",
  async ({ id }: FetchMoviesArgs, { dispatch }) => {
    try {
      const response = await WBAPI.getMovies({ id });
      dispatch(cinemaMovie(response));
    } catch (error: any) {
      return error.response.data;
    }
  }
);

export const GetAllSeats = createAsyncThunk(
  "get/seat",
  async ({ id }: any, { dispatch }) => {
    const response = await WBAPI.getSeats({ id });
    dispatch(cinemaSeat(response));
    return response;
  }
);
