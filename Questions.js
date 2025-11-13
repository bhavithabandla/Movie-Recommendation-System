import { useEffect, useState } from "react";
import "../styles/Pages.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Questions() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({
    mood: "",
    genre: "",
    duration: "",
    language: "",
    type: "",
  });

  const [options, setOptions] = useState({
    moods: [],
    genres: [],
    durations: [],
    languages: [],
    types: [],
  });

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/movies/metadata").then((res) => {
      setOptions(res.data);
    });
  }, []);

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/movies/recommend", answers);
      localStorage.setItem("recommendations", JSON.stringify(res.data));
      navigate("/recommendations");
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      alert("Something went wrong. Please try again!");
    }
  };
  
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2>Movie Preference Quiz 🎬</h2>

        {/* Mood Dropdown */}
        <label>Mood</label>
        <select name="mood" value={answers.mood} onChange={handleChange} required>
          <option value="">Select Mood</option>
          {options.moods.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        {/* Genre Dropdown */}
        <label>Genre</label>
        <select name="genre" value={answers.genre} onChange={handleChange} required>
          <option value="">Select Genre</option>
          {options.genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        {/* Duration Dropdown */}
        <label>Duration</label>
        <select name="duration" value={answers.duration} onChange={handleChange} required>
          <option value="">Select Duration</option>
          {options.durations.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        {/* Language Dropdown */}
        <label>Language</label>
        <select name="language" value={answers.language} onChange={handleChange} required>
          <option value="">Select Language</option>
          {options.languages.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>

        {/* Type Dropdown */}
        <label>Type</label>
        <select name="type" value={answers.type} onChange={handleChange} required>
          <option value="">Select Type</option>
          {options.types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <button type="submit">Get Recommendations</button>
      </form>
    </div>
  );
}

export default Questions;
