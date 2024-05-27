import React, { useEffect } from "react";
import { usedispatch } from "../../../features/store";
import { GetAllRooms } from "../store/thunk";
import Room from "../components/Room/Room";
import styles from "./cinema.module.css";
import { Link } from "react-router-dom";
const Cinema = () => {
  const dispatch = usedispatch();
  useEffect(() => {
    dispatch(GetAllRooms());
  }, []);
  return (
    <div className={styles.cinema}>
      <div className={styles.welcome}>
        <h4> Welcome to the Cinema</h4>
      </div>
      <Room />

      <div className={styles.linkContainer}>
        <Link to="/create-room"> Create Room </Link>
      </div>
    </div>
  );
};

export default Cinema;
