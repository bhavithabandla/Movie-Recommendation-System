import { useEffect, useState } from "react";
import {
  getWatchLater,
  removeFromWatchLater,
  addToHistory,
} from "../api/movieApi";
import "../styles/Pages.css";

function WatchLater() {
  const [movies, setMovies] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch the watch-later list
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getWatchLater(user.email);
        setMovies(res.data);
      } catch (err) {
        console.error("Error fetching watch later:", err);
      }
    }
    fetchData();
  }, [user.email]);

  // When user clicks "Remove"
  const handleRemove = async (movie) => {
    try {
      await removeFromWatchLater(user.email, movie);
      setMovies((prev) => prev.filter((m) => m.title !== movie.title));
    } catch (err) {
      console.error("Error removing from watch later:", err);
    }
  };

  // When user clicks "Watch"
  const handleWatch = async (movie) => {
    try {
      await addToHistory(user.email, movie);
      await removeFromWatchLater(user.email, movie);
      setMovies((prev) => prev.filter((m) => m.title !== movie.title));
    } catch (err) {
      console.error("Error moving movie to history:", err);
    }
  };

  return (
    <div className="page-container">
      <h2>Your Watch Later List ⏳</h2>

      <div className="movie-grid">
        {movies.length === 0 ? (
          <p>No movies added yet.</p>
        ) : (
          movies.map((movie, i) => (
            <div key={i} className="movie-card">
              <div className="image-wrapper">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.style.background = "#fff";
                    e.target.parentElement.style.height = "300px";
                  }}
                />
              </div>

              <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.genre}</p>
                <div className="buttons">
                  <button onClick={() => handleWatch(movie)}>Watch ✅</button>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(movie)}
                  >
                    Remove ❌
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default WatchLater;
