import React, { useState } from "react";
import styles from "./createMovie.module.css";

import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import API from "../../../../API/api";
import { convertToBase64 } from "../../../../untill";

interface IMovie {
  title: string;
  image: string | File | null;
  startTime: string | null;
}

const WBAPI = new API();
const CreateMovie: React.FC = () => {
  const [movie, setMovie] = useState<IMovie>({
    title: "",
    startTime: null,
    image: null,
  });
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setMovie((prevMovie) => ({
        ...prevMovie,
        image: file,
      }));
    }
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate =
        date.getFullYear() +
        "-" +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + date.getDate()).slice(-2) +
        " " +
        ("0" + date.getHours()).slice(-2) +
        ":" +
        ("0" + date.getMinutes()).slice(-2);

      setMovie((prevMovie) => ({
        ...prevMovie,
        startTime: formattedDate,
      }));
    } else {
      setMovie((prevMovie) => ({
        ...prevMovie,
        startTime: null,
      }));
    }
  };

  async function handleCreateMovie() {
    try {
      let base64String: string = "";
      if (movie.image instanceof File) {
        base64String = await convertToBase64(movie.image);
      }
      await WBAPI.createMovie({
        title: movie.title,
        id,
        image: base64String,
        start_time: movie.startTime,
      }).then((res) => {
        toast.success(res.success);
        navigate("/");
      });
    } catch (e: any) {
      toast.error(e.response.data.error);
    }
  }

  return (
    <div className={styles.createUserWrapper}>
      <input
        type="text"
        name="title"
        placeholder="Enter movie title"
        className={styles.input}
        value={movie.title}
        onChange={handleChange}
      />
      <DatePicker
        selected={movie.startTime ? new Date(movie.startTime) : null}
        onChange={handleDateChange}
        showTimeSelect
        timeFormat="HH:mm"
        // timeIntervals={60}
        dateFormat="Pp"
        placeholderText="Select start time"
        className={styles.datePicker}
      />
      <input type="file" defaultValue="" onChange={handleFileChange} />
      <div className={styles.buttonContainer}>
        <button className={styles.addUser} onClick={handleCreateMovie}>
          Add Movie
        </button>
        <Link to="/" className={styles.backLink}>
          Back
        </Link>
      </div>
    </div>
  );
};

export default CreateMovie;
