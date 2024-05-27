import React, { useState } from "react";
import styles from "./room.module.css";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

import toast from "react-hot-toast";
import API from "../../../../API/api";
import { RootState, usedispatch } from "../../../../features/store";
import { cinemaRoom } from "../../store/cinemaSlice";
interface IElem {
  name: string;
  id: number;
}
const WBAPI = new API();
const Room = () => {
  const { rooms = [] } = useSelector((state: RootState) => state.cinema);
  const [editId, setEditId] = useState<null | number>(null);
  const [editRoom, setEditRoom] = useState<string>("");
  const dispatch = usedispatch();
  const handleDeleteRoom = async (id: number) => {
    await WBAPI.deleteRoom({ id })
      .then((res) => {
        dispatch(cinemaRoom(res.data));
        toast.success(res.message);
      })
      .catch((e) => {
        toast.error(e.error);
      });
  };

  const handleEdit = (id: number, currentName: string) => {
    setEditId(id);
    setEditRoom(currentName);
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditRoom("");
  };

  const handleSaveEdit = async (id: number, name: string) => {
    if (editRoom === name) {
      setEditId(null);
    } else {
      await WBAPI.editRoom({
        name: editRoom,
        id,
      }).then((res) => {
        toast.success(res.message);
        dispatch(cinemaRoom(res.data));
        setEditId(null);
      });
    }
  };

  return (
    <div className={styles.cinemaRoomWrapper}>
      {rooms.map((elem: IElem) => (
        <div key={elem.id} className={styles.room}>
          <div className={styles.formContainer}>
            {editId === elem.id ? (
              <input
                type="text"
                value={editRoom}
                onChange={(e) => setEditRoom(e.target.value)}
                className={styles.editInput}
              />
            ) : (
              <div className={styles.linkWrapper}>
                <Link to={`/${elem.id}`} className={styles.name}>
                  {elem.name}
                </Link>
              </div>
            )}

            {editId === elem.id ? (
              <div className={styles.buttonContainer}>
                <button
                  className={styles.save}
                  onClick={() => handleSaveEdit(elem.id, elem.name)}
                >
                  Save
                </button>
                <button className={styles.cancel} onClick={handleCancelEdit}>
                  Cancel
                </button>
              </div>
            ) : (
              <div className={styles.actionButtons}>
                <button
                  className={styles.edit}
                  onClick={() => handleEdit(elem.id, elem.name)}
                >
                  Edit
                </button>
                <button
                  className={styles.delete}
                  onClick={() => handleDeleteRoom(elem.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Room;
