import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import "./BookMovieForm.css";

const recducer = (state, action) => {
  switch (action.type) {
    case "name":
      return {
        ...state,
        name: action.value
      };
    case "ticket":
      return { ...state, noOfticket: action.value };
    case "date":
      return { ...state, date: action.value };
    case "time":
      return { ...state, time: action.value };
    default:
      return state;
  }
};

export default function BookMovieForm() {
  // form data
  const [form, dispatch] = useReducer(recducer, {
    name: "",
    noOfticket: 1,
    date: "",
    time: ""
  });

  const { id } = useParams();

  const [booked, setBooked] = useState(false);

  // frtch movie name by the id
  const fetchMovieName = async () => {
    const data1 = await axios.get("https://api.tvmaze.com/shows/" + id);
    const data = data1.data.name;
    dispatch({ type: "name", value: data });
  };

  const onTicketChangeHandler = (e) => {
    dispatch({ type: "ticket", value: e.target.value });
  };

  const onDateChangeHandler = (e) => {
    dispatch({ type: "date", value: e.target.value });
  };

  const onTimeChangeHandler = (e) => {
    dispatch({ type: "time", value: e.target.value });
  };

  useEffect(() => {
    fetchMovieName();
  }, []);

  // on form submit
  const onSubmitHandler = (e) => {
    setBooked(false);
    e.preventDefault();
    console.log(form);
    setBooked(true);
  };

  return (
    <form className="movie-form" onSubmit={onSubmitHandler}>
      <h1>Book Movie</h1>
      <input
        defaultValue={form.name}
        type="text"
        placeholder="Movie name"
        readOnly
      />
      <input
        value={form.noOfticket}
        type="number"
        min="1"
        max="5"
        placeholder="No of tickets"
        onChange={onTicketChangeHandler}
      />
      <input
        value={form.date}
        type="date"
        placeholder="Select date"
        onChange={onDateChangeHandler}
        required
      />
      <input
        type="time"
        placeholder="Time"
        onChange={onTimeChangeHandler}
        required
      />
      <button type="submit">Submit</button>
      {booked && <p className="msg">Ticket booked Successfully</p>}
    </form>
  );
}
