import { useState } from "react";
import "../styles/MovieCard.css";
import { addToHistory, addToWatchLater } from "../api/movieApi";

function MovieCard({ movie }) {
  const [watched, setWatched] = useState(false);
  const [added, setAdded] = useState(false);

  // Get logged-in user info (assuming stored during login)
  const user = JSON.parse(localStorage.getItem("user"));

  const handleImageError = (e) => {
    e.target.style.display = "none";
    e.target.parentElement.style.background = "#fff";
    e.target.parentElement.style.height = "300px";
  };

  const handleWatch = async () => {
    setWatched(true);
    try {
      await addToHistory(user.email, movie); // use email as user ID
    } catch (err) {
      console.error("Error adding to history:", err);
    }
  };

  const handleWatchLater = async () => {
    setAdded(true);
    try {
      await addToWatchLater(user.email, movie);
    } catch (err) {
      console.error("Error adding to watch later:", err);
    }
  };

  return (
    <div className="movie-card">
      <div className="image-wrapper">
        <img src={movie.poster} alt={movie.title} onError={handleImageError} />
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.genre}</p>
        <div className="buttons">
          <button
            onClick={handleWatch}
            disabled={watched}
            className={watched ? "watched" : ""}
          >
            {watched ? "Watched" : "Watch"}
          </button>
          <button
            onClick={handleWatchLater}
            disabled={added}
            className={added ? "added" : ""}
          >
            {added ? "Added" : "Watch Later"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
