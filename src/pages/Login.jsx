import { useState, useRef } from "react";
import Header from "../components/Header";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [error, setError] = useState("");

  const email = useRef(null);
  const password = useRef(null);

  const navigate = useNavigate();

  const handleAuth = async () => {
    setError("");

    try {
      if (isSignIn) {
        await signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );
      } else {
        await createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );
      }

      navigate("/browse");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="relative h-screen w-full">
      
      
<div className="absolute top-0 left-0 w-full h-full grid grid-cols-3 md:grid-cols-5 gap-2 overflow-hidden scale-110 animate-slowZoom">

  {[
    "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    "https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg",
    "https://image.tmdb.org/t/p/w500/5YZbUmjbMa3ClvSW1Wj3D6XGolb.jpg",
    "https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg",
    "https://image.tmdb.org/t/p/w500/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg",
    "https://image.tmdb.org/t/p/w500/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg",
    "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    "https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    "https://image.tmdb.org/t/p/w500/rSPw7tgCH9c6NqICZef4kZjFOQ5.jpg",
    "https://image.tmdb.org/t/p/w500/2TeJfUZMGolfDdW6DKhfIWqvq8y.jpg"
  ].map((img, i) => (
    <img
      key={i}
      src={img}
      alt="movie"
      className="w-full h-full object-cover opacity-60 hover:opacity-100 transition duration-500"
    />
  ))}
</div>
     
      <div className="absolute w-full h-full bg-black/70"></div>

      <div className="absolute top-0 left-0 w-full z-10">
        <Header />
      </div>

     
      <div className="flex justify-center items-center h-full relative z-10">
        <div className="bg-black bg-opacity-75 p-10 rounded w-96 shadow-lg">
          
          <h1 className="text-white text-3xl font-bold mb-6">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h1>

          <input
            ref={email}
            type="text"
            placeholder="Email or phone number"
            className="w-full p-3 mb-4 bg-gray-800 text-white rounded outline-none focus:ring-2 focus:ring-red-600"
          />

          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 bg-gray-800 text-white rounded outline-none focus:ring-2 focus:ring-red-600"
          />

          {error && (
            <p className="text-red-500 text-sm mb-3">{error}</p>
          )}

          <button
            onClick={handleAuth}
            className="w-full bg-red-600 py-3 rounded text-white font-semibold hover:bg-red-700 transition"
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>

          {/* Extra UI */}
          <div className="flex justify-between items-center text-gray-400 text-sm mt-4">
            <label>
              <input type="checkbox" className="mr-1" />
              Remember me
            </label>
            <span className="cursor-pointer hover:underline">
              Need help?
            </span>
          </div>

      
          <p
            className="text-gray-400 mt-6 cursor-pointer"
            onClick={() => setIsSignIn(!isSignIn)}
          >
            {isSignIn
              ? "New to NetflixGPT? Sign up now."
              : "Already registered? Sign in now."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;