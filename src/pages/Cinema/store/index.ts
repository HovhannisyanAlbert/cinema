export interface IRoom {
  name: string;
  id: number;
}

export interface IMovie {
  id: number;
  name: string;
  movie_name: string;
  movie_image: string;
  title: string;
  start_time: string;
}

export interface IInitialState {
  rooms: IRoom[];
  movies: IMovie[];
  seats: any;
}
