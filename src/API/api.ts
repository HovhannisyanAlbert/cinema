import { ISeat } from ".";
import request from "../service/request";

class API {
  async getRooms() {
    const response = await request({
      url: "/cinema/",
      method: "GET",
    });
    return response.data.data;
  }
  async getMovies({ id }: { id: string | undefined }) {
    const response = await request({
      url: `/cinema/${id}/movie/`,
      method: "GET",
    });
    return response.data.data;
  }
  async createRoom({ name }: { name: string }) {
    const response = await request({
      url: "/cinema/",
      method: "post",
      data: {
        name,
      },
    });
    return response.data;
  }
  async deleteRoom({ id }: { id: number }) {
    const response = await request({
      url: `/cinema/${id}/`,
      method: "delete",
    });
    return response.data;
  }
  async editRoom({ name, id }: { id: number; name: string }) {
    const response = await request({
      url: `/cinema/${id}/`,
      method: "put",
      data: {
        name,
      },
    });
    return response.data;
  }
  async createMovie({
    title,
    image,
    id,
    start_time,
  }: {
    title: string;
    image: string;
    id: string | undefined;
    start_time: string | null;
  }) {
    const response = await request({
      url: `/cinema/${id}/movie/`,
      method: "POST",
      data: {
        title,
        image,
        start_time,
      },
    });
    return response.data;
  }
  async deleteMovie({
    id,
    movieId,
    urlImage,
  }: {
    id: string | undefined;
    movieId: number;
    urlImage: string;
  }) {
    const response = await request({
      url: `/cinema/${id}/movie/`,
      method: "delete",
      data: {
        movieId,
        url_image: urlImage,
      },
    });
    return response.data;
  }
  async editMovie({
    title,
    image,
    id,
    movieId,
  }: {
    title?: string;
    id: number;
    image?: string;
    movieId: string | undefined;
  }) {
    const respone = await request({
      url: `/cinema/${id}/movie/`,
      method: "PUT",
      data: {
        title,
        image,
        movieId,
      },
    });
    return respone.data;
  }
  async getSeats({ id }: { id: string | undefined }) {
    const response = await request({
      url: `/cinema/${id}/seat/`,

      method: "GET",
    });
    return response.data.data;
  }
  async createSeat({
    seats,
    movie_id,
  }: {
    seats: ISeat[];

    movie_id: string | undefined;
  }) {
    const respone = await request({
      url: `/cinema/${movie_id}/create-seat/`,
      method: "POST",
      data: {
        data: seats,
      },
    });
    return respone.data;
  }
}

export default API;
