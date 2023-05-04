import { useEffect, useState } from "react";
import axios from "axios";
import Movie from "./Movie";
import "./Movies.css";

export default function Movies() {
  // state to store all movies
  const [movies, setMovies] = useState([]);

  // fetch all movies
  const fetchAllMovies = async () => {
    // get all movies from the api
    const data = await axios.get("https://api.tvmaze.com/search/shows?q=all");

    // for every movies get only selected data
    const arr = data.data.map((data) => {
      let movie = data.show;
      let m = {
        id: movie.id,
        name: movie.name,
        language: movie.language,
        rating: movie.rating.average,
        image: movie.image
      };
      return m;
    });
    // set the movies
    setMovies(arr);
  };

  useEffect(() => {
    // call fetchAll moves function
    fetchAllMovies();
  }, []);

  return (
    <>
      <div className="movies">
        {/* display all the movies */}
        {movies.map((movie) => {
          return (
            <Movie
              key={movie.id}
              id={movie.id}
              image={movie.image}
              name={movie.name}
              language={movie.language}
              rating={movie.rating}
            />
          );
        })}
      </div>
    </>
  );
}
