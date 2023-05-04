import Movies from "./components/Movies/Movies";
import "./styles.css";
import { Routes, Route } from "react-router-dom";
import MovieData from "./components/Movies/MovieData";
import BookMovieForm from "./components/form/BookMovieForm";

export default function App() {
  return (
    <div className="App">
      <header>
        <h1>MOVIES</h1>
      </header>
      <Routes>
        {/* All movies route  */}
        <Route path="/" element={<Movies />} />
        {/* Single movie data route */}
        <Route path="/movie/:id" element={<MovieData />} />
        {/* form route */}
        <Route path="/book/:id" element={<BookMovieForm />} />
      </Routes>
    </div>
  );
}
