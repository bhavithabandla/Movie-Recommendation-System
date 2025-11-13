import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: { "Content-Type": "application/json" },
});

// AUTH
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

// MOVIES
export const recommendMovies = (data) => API.post("/movies/recommend", data);

// ✅ Correct naming to match MovieCard.js
export const addToHistory = (userId, movie) => API.post(`/movies/history/${userId}`, movie);
export const getHistory = (userId) => API.get(`/movies/history/${userId}`);

export const addToWatchLater = (userId, movie) => API.post(`/movies/watchlater/${userId}`, movie);
export const getWatchLater = (userId) => API.get(`/movies/watchlater/${userId}`);

export const removeFromHistory = (userId, movie) =>
    API.delete(`/movies/history/${userId}`, { data: movie });
  
  export const removeFromWatchLater = (userId, movie) =>
    API.delete(`/movies/watchlater/${userId}`, { data: movie });
  
