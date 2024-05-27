import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./movie.module.css";

import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import EditMovie from "../EditMovie/EditMovie";
import API from "../../../../API/api";
import { RootState, usedispatch } from "../../../../features/store";
import { GetAllMovies } from "../../store/thunk";
import { cinemaMovie } from "../../store/cinemaSlice";
import ModalContainer from "../../../../components/ModalContainer";
import { getDateTimeDetails, getImagePath } from "../../../../untill";
import { IMovie } from "../../store";

const WBAPI = new API();
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface IElem {
  id: number;
  name: string;
  movie_name: string;
  movie_image: string;
  start_time: string;
  title: string;
}

const Movie = () => {
  const { id } = useParams();
  const dispatch = usedispatch();
  const [checkId, setCheckId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { movies } = useSelector((state: RootState) => state.cinema);

  useEffect(() => {
    dispatch(GetAllMovies({ id }));
  }, [id]);

  const isCheckId = Number(id) > 0 ? true : false;

  const handleDeleteMove = async (movieId: number, image: string) => {
    const urlImage = getImagePath(image);

    await WBAPI.deleteMovie({ id, movieId, urlImage })
      .then((res) => {
        dispatch(cinemaMovie(res.data));
        toast.success(res.success);
      })
      .catch((e) => {
        toast.error(e.error);
      });
  };
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles.movieWrapper}>
      {isCheckId ? (
        <div className={styles.movieContainer}>
          {movies.map((elem: IElem) => (
            <div key={elem.id} className={styles.moviesCinemaWrapper}>
              <div className={styles.movieDescription}>
                <Link to={`/seat/${elem.id}`} className={styles.link}>
                  {elem.title}
                </Link>
                <span className={styles.time}>
                  Time start film {getDateTimeDetails(elem.start_time)}
                </span>
              </div>

              <img
                src={`http://127.0.0.1:8000/media/${elem.movie_image}`}
                alt="image"
                className={styles.img}
              />
              <button
                onClick={() => handleDeleteMove(elem.id, elem.movie_image)}
                className={styles.detete}
              >
                {" "}
                Delete{" "}
              </button>
              <button
                className={styles.edit}
                onClick={() => {
                  setCheckId(elem.id);
                  openModal();
                }}
              >
                {" "}
                Edit
              </button>
              {checkId === elem.id && (
                <ModalContainer
                  isOpen={isModalOpen}
                  onClose={closeModal}
                  style={style}
                >
                  <EditMovie
                    movie={movies.find((user) => user.id === checkId)}
                    onClose={closeModal}
                  />
                </ModalContainer>
              )}
            </div>
          ))}

          <div className={styles.movieCreateWrapper}>
            <Link to={`/create-movie/${id}`} className={styles.createlink}>
              Create Movie
            </Link>
            <Link to="/" className={styles.back}>
              {" "}
              Back
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.dontHaveRoom}>
          <h4>
            You can not create Movie becouse You dont have Room,first step you
            create room{" "}
          </h4>
          <Link to="/create-room" className={styles.createRoom}>
            {" "}
            Create Room
          </Link>
        </div>
      )}
    </div>
  );
};

export default Movie;
