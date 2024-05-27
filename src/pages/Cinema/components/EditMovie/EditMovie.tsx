import React, { FC, useState } from "react";
import styles from "./editMovie.module.css";
import API from "../../../../API/api";
import { convertToBase64 } from "../../../../untill";

interface IMovie {
  title: string;

  film_poster?: string | File | null;
}

interface IEditMovieProps {
  movie: IMovie | any;
  onClose: () => void;
}

const WBAPI = new API();
const EditMovie: FC<IEditMovieProps> = ({ movie, onClose }) => {
  const [data, setData] = useState<IMovie>({
    title: movie.title,
    film_poster: movie.film_poster,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let base64String: string = "";

      if (file instanceof File) {
        base64String = await convertToBase64(file);

        setData((prevUser) => ({
          ...prevUser,
          film_poster: base64String,
        }));
      }
    }
  };

  const handleSave = async () => {
    if (
      typeof data.film_poster === "string" &&
      data.film_poster.length > 2000
    ) {
      const editMovieData: any = {
        id: movie.room_id,
        film_poster: data.film_poster,
        movieId: movie.id,
      };
      if (data.title !== movie.title) {
        editMovieData.title = data.title;
      }
      await WBAPI.editMovie({
        id: movie.room_id,
        movieId: movie.id,
        title: editMovieData.title,
        image: editMovieData.film_poster,
      });
    } else {
      const editMovieData: any = {
        id: movie.room_id,
        movieId: movie.id,
      };
      if (movie.title !== data.title) {
        editMovieData.title = data.title;
        await WBAPI.editMovie({
          id: movie.room_id,
          movieId: movie.id,
          title: editMovieData.title,
        });
      }
    }
  };
  return (
    <div className={styles.editMovieWrapper}>
      <input
        type="text"
        name="title"
        value={data.title}
        className={styles.input}
        onChange={handleChange}
      />
      <input type="file" defaultValue="" onChange={handleFileChange} />
      <div className={styles.buttonWrapper}>
        <button className={styles.save} onClick={handleSave}>
          Save
        </button>
        <button
          onClick={() => {
            onClose();
          }}
          className={styles.close}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EditMovie;
