import "./Movie.css";
import { Link } from "react-router-dom";

export default function Movie({ id, image, name, language, rating }) {
  const link = "movie/" + id;
  return (
    <>
      <div className="movie">
        <div>
          <img src={image ? image.medium : ""} alt={name} />
          <p className="rating"> &#9733; {rating ? rating : "NA"}</p>
          <h3 className="name">{name}</h3>
          <p className="language">Language : {language}</p>
        </div>
        <Link to={link} className="view-link">
          <button className="view-btn">Viev details</button>
        </Link>
      </div>
    </>
  );
}
