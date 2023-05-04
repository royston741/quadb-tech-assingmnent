import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./MovieData.css";

export default function MovieData() {
  // store the data of the movie
  const [movie, setMovie] = useState({});

  // get the id
  const { id } = useParams();

  const navigate = useNavigate();

  // fetch the data for the given id
  const fetchMovieData = async () => {
    const data1 = await axios.get("https://api.tvmaze.com/shows/" + id);
    const data = data1.data;
    let obj = {
      id: data.id,
      name: data.name,
      language: data.language,
      genres: data.genres.join(", "),
      premiered: data.premiered ? data.premiered : "NA",
      rating: data.rating.average,
      image: data?.image?.original,
      summary: data.summary
        .replace("</p>", "")
        .replace("<p>", "")
        .replace("</b>", "")
        .replace("<b>", "")
    };
    // set the data
    setMovie(obj);
  };

  const onBook = () => {
    navigate("/book/" + id);
  };

  useEffect(() => {
    fetchMovieData();
  }, []);

  return (
    <div className="movie-data">
      <img src={movie.image} alt={movie.name} />
      <div className="movie-details">
        <div>
          <h1>{movie.name}</h1>
          <p>&#9733; {movie.rating ? movie.rating : "NA"}</p>
          <p>
            <span>Language : </span>
            {movie.language}
          </p>
          <p>
            <span>Genre : </span>
            {movie.genres}
          </p>
          <p>
            <span>Premiered : </span>
            {movie.premiered}
          </p>
          <p className="summary">{movie.summary}</p>
        </div>
        <button onClick={onBook}>Book</button>
      </div>
    </div>
  );
}
