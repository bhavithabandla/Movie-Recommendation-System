import { useEffect, useState } from "react";
import { getHistory, removeFromHistory } from "../api/movieApi";
import "../styles/Pages.css";

function History() {
  const [movies, setMovies] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    async function fetchData() {
      const res = await getHistory(user.email);
      setMovies(res.data);
    }
    fetchData();
  }, [user.email]);

  const handleRemove = async (movie) => {
    await removeFromHistory(user.email, movie);
    setMovies(movies.filter((m) => m.title !== movie.title));
  };

  return (
    <div className="page-container">
      <h2>Your Watch History 🎥</h2>
      <div className="movie-grid">
        {movies.length === 0 ? (
          <p>No watched movies yet.</p>
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
                <button
                  className="remove-btn"
                  onClick={() => handleRemove(movie)}
                >
                  Remove from History
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default History;
