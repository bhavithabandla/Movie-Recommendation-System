import "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("recommendations");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2>MovieMood</h2>
      <div>
        {user ? (
          <>
            <button onClick={() => navigate("/questions")}>Questions</button>
            <button onClick={() => navigate("/recommendations")}>Recommendations</button>
            <button onClick={() => navigate("/watchlater")}>Watch Later</button>
            <button onClick={() => navigate("/history")}>History</button>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/register")}>Register</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
