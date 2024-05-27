// Seat.jsx

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import styles from "./seat.module.css";
import toast from "react-hot-toast";
import { RootState, usedispatch } from "../../../../features/store";
import { GetAllSeats } from "../../store/thunk";
import API from "../../../../API/api";
import { cinemaSeat } from "../../store/cinemaSlice";
const WBAPI = new API();

interface iSeat {
  id: number;
  row: number;
  is_booked: boolean;
  column: number;
}

const Seat: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = usedispatch();
  const { seats, movies } = useSelector((state: RootState) => state.cinema);
  const [selectedSeats, setSelectedSeats] = useState<iSeat[]>([]);

  useEffect(() => {
    dispatch(GetAllSeats({ id }));
  }, [id, dispatch]);

  const isBooked = (rowIndex: number, colIndex: number): boolean => {
    return seats.reduce((isBooked: boolean, seat: iSeat) => {
      if (
        seat.row - 1 === rowIndex &&
        seat.column - 1 === colIndex &&
        seat.is_booked
      ) {
        return true;
      }
      return isBooked;
    }, false);
  };

  const rowLabels = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  const handleSeatClick = (row: number, column: number) => {
    const seatIndex = selectedSeats.findIndex(
      (seat) => seat.row === row + 1 && seat.column === column + 1
    );
    if (seatIndex !== -1) {
      const updatedSeats = [...selectedSeats];
      updatedSeats.splice(seatIndex, 1);
      setSelectedSeats(updatedSeats);
    } else {
      setSelectedSeats([
        ...selectedSeats,
        { id: -1, row: row + 1, column: column + 1, is_booked: false },
      ]);
    }
  };

  const isSeatSelected = (rowIndex: number, colIndex: number): boolean => {
    return selectedSeats.some(
      (seat) => seat.row - 1 === rowIndex && seat.column - 1 === colIndex
    );
  };

  const handleSave = async () => {
    try {
      const response = await WBAPI.createSeat({
        movie_id: id,
        seats: selectedSeats.map((seat) => ({
          row: seat.row,
          column: seat.column,
        })),
      });
      toast.success(response.success);
      dispatch(cinemaSeat(response.data));
      setSelectedSeats([]);
    } catch (error: any) {
      toast.error(error.error);
    }
  };

  return (
    <div className={styles.gridContainer}>
      <div className={styles.description}>
        <h4 className={styles.welcome}>Welcome Cinema You can watch the</h4>
        <span className={styles.enter}> Enter Seats</span>
      </div>
      {rowLabels.map((rowLabel: string, rowIndex: number) => (
        <div key={rowIndex} className={styles.row}>
          {Array.from({ length: 8 }).map((_, colIndex: number) => (
            <button
              key={colIndex}
              className={`${styles.seat} ${
                isBooked(rowIndex, colIndex) ? styles.bookedSeat : ""
              } ${isSeatSelected(rowIndex, colIndex) ? styles.selected : ""}`}
              onClick={() => handleSeatClick(rowIndex, colIndex)}
              disabled={isBooked(rowIndex, colIndex)}
            >
              <span className={styles.rowLabel}> {rowLabel}</span>
              <span className={styles.colIndex}> {colIndex + 1} </span>
            </button>
          ))}
        </div>
      ))}
      {selectedSeats.length > 0 && (
        <div className={styles.saveWrapper}>
          <button className={styles.save} onClick={handleSave}>
            Save
          </button>
        </div>
      )}
      <Link to="/" className={styles.back}>
        Back
      </Link>
    </div>
  );
};

export default Seat;
