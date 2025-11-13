import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const user = localStorage.getItem("user");
  if (!user) {
    // Redirect to login if not logged in
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute;
