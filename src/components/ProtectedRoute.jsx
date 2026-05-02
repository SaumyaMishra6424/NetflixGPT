import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, premiumOnly = false }) => {
  const user = useSelector((state) => state.user);

  if (!user) return <Navigate to="/" />;

  if (premiumOnly && !user.isPremium) {
    return <Navigate to="/browse" />;
  }

  return children;
};

export default ProtectedRoute; // 🔥 MUST EXIST