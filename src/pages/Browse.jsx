import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";


import { useSelector } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../utils/firebase";

const Browse = () => {
  const [movies, setMovies] = useState([]);
  const [featured, setFeatured] = useState(null);


  const user = useSelector((state) => state.user);

 
  const fetchMovies = async () => {
    const res = await fetch(
      `https://www.omdbapi.com/?s=Avengers&apikey=87d98bc7`
    );
    const data = await res.json();

    if (data.Response === "True") {
      setMovies(data.Search);
      setFeatured(data.Search[0]);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

 const makePremium = async () => {
  try {
    if (!auth.currentUser) {
      alert("User not logged in");
      return;
    }

    await setDoc(
      doc(db, "users", auth.currentUser.uid),
      { isPremium: true },
      { merge: true }
    );

    alert("✅ Premium Activated");

  

  } catch (err) {
    console.error("Error:", err);
  }
};

  return (
    <div className="bg-black text-white min-h-screen">
      <Header showUserOptions />

      {/* ✅ PREMIUM BUTTON */}
      {!user?.isPremium && (
        <div className="text-center mt-4">
          <button
            onClick={() => {
            
              makePremium();
            }}
            className="bg-yellow-500 text-black px-6 py-2 rounded"
          >
            Upgrade to Premium 💳
          </button>
        </div>
      )}

      
      {featured && (
        <div className="relative h-[70vh] w-full">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/6ZfuNTqbHE8?autoplay=1&mute=1&controls=0&loop=1&playlist=6ZfuNTqbHE8"
            title="Trailer"
            allow="autoplay; encrypted-media"
          ></iframe>

          <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>

          <div className="relative z-10 p-10 max-w-xl">
            <h1 className="text-4xl font-bold mb-4">
              {featured.Title}
            </h1>

            <p className="mb-4">
              Experience action, drama and adventure like never before.
            </p>

            <Link to={`/movie/${featured.imdbID}`}>
              <button className="bg-red-600 px-6 py-2 rounded mr-3">
                ▶ Watch Now
              </button>
            </Link>

            <button className="bg-gray-700 px-6 py-2 rounded">
              + My List
            </button>
          </div>
        </div>
      )}

      
      <div className="p-6">
        <h2 className="text-2xl mb-4">Popular Movies</h2>

        <div className="flex overflow-x-scroll gap-4">
          {movies.map((movie) => (
            <Link key={movie.imdbID} to={`/movie/${movie.imdbID}`}>
              <div className="min-w-[150px] hover:scale-110 transition">
                <img
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://via.placeholder.com/150"
                  }
                  alt={movie.Title}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;