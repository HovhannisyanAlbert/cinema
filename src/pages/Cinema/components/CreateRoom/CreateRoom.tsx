import React, { useState } from "react";
import styles from "./createRoom.module.css";

import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import API from "../../../../API/api";

const WBAPI = new API();
const CreateRoom = () => {
  const [room, setRoom] = useState("");
  const navigate = useNavigate();
  const handleCreateRoom = async () => {
    if (room.length < 3) {
      toast.error("Length musht be 3");
    } else {
      await WBAPI.createRoom({ name: room }).then((res) => {
        toast.success(res.message);
        navigate("/");
      });
    }
  };
  return (
    <div className={styles.createWrapperRoom}>
      <div className={styles.title}>
        <h4> You can create room </h4>
      </div>

      <input
        type="text"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        placeholder="Enter Room name"
        className={styles.room}
      />
      <div className={styles.bttnWrapper}>
        <button onClick={handleCreateRoom}> Create room</button>
        <Link to="/" className={styles.link}>
          Back
        </Link>
      </div>
    </div>
  );
};

export default CreateRoom;
