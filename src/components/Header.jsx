import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

const Header = ({ showUserOptions }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="flex justify-between p-4 bg-black text-white">
      <h1 className="text-xl font-bold">NetflixGPT</h1>

      {showUserOptions && (
        <div>
          <button onClick={() => navigate("/gpt")} className="mr-4">
            GPT Search
          </button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Header;