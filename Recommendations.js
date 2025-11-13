import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import "../styles/Pages.css";

function Recommendations() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Load recommendations from localStorage (saved by Questions.js)
    const stored = localStorage.getItem("recommendations");
    if (stored) {
      setMovies(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="page-container">
      <h2>Recommended Movies 🎬</h2>

      {movies.length === 0 ? (
        <p>No recommendations yet. Please answer the questions first.</p>
      ) : (
        <div className="movie-grid">
          {movies.map((movie, index) => (
            <MovieCard
              key={index}
              movie={{
                title: movie.title,
                genre: movie.combined || "N/A",
                rating: movie.vote_average || "-",
                poster:
                  "https://via.placeholder.com/200x300.png?text=Movie",
              }}
              onWatch={() => alert(`You watched ${movie.title}`)}
              onWatchLater={() => alert(`Added ${movie.title} to Watch Later`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Recommendations;
