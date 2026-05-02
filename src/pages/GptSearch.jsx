import { useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const GptSearch = () => {
  const [input, setInput] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchGptMovies = async () => {
    if (!input) return;

    setLoading(true);
    setMovies([]);
    setError("");

    let movieNames = [];

    try {
    
      const aiRes = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "mistralai/mistral-7b-instruct",
            messages: [
              {
                role: "system",
                content:
                  "Return exactly 5 movie names separated by commas. No numbering.",
              },
              {
                role: "user",
                content: `Suggest 5 ${input} movies`,
              },
            ],
          }),
        }
      );

      const aiData = await aiRes.json();
      const text = aiData?.choices?.[0]?.message?.content || "";

      console.log("AI RAW:", text);

      movieNames = text
        .replace(/\n/g, ",")
        .replace(/\d+\./g, "")
        .split(",")
        .map((m) => m.trim())
        .filter(Boolean);

    } catch (err) {
      console.log("AI failed, using fallback...");
    }

   
    if (movieNames.length === 0) {
   const fallbackMap = {
  action: ["Mad Max", "John Wick", "Gladiator", "Die Hard"],
  comedy: ["The Mask", "Superbad", "Hangover", "Step Brothers"],
  horror: ["The Conjuring", "Insidious", "Annabelle", "It"],
  default: ["Inception", "Interstellar", "Avatar", "Joker"]
};

movieNames =
  fallbackMap[input.toLowerCase()] || fallbackMap.default;
    }

    console.log("Final movie list:", movieNames);

    try {
      // 🔹 2) Fetch from OMDb using SEARCH (important)
      const results = await Promise.all(
        movieNames.map(async (name) => {
          const res = await fetch(
            `https://www.omdbapi.com/?s=${encodeURIComponent(
              name
            )}&apikey=87d98bc7`
          );

          const data = await res.json();

          if (data?.Search?.length > 0) {
            // get full details
            const detailRes = await fetch(
              `https://www.omdbapi.com/?i=${data.Search[0].imdbID}&apikey=87d98bc7`
            );
            return await detailRes.json();
          }

          return null;
        })
      );

      const validMovies = results.filter(Boolean);

      setMovies(validMovies);

      if (validMovies.length === 0) {
        setError("No movies found.");
      }

    } catch (err) {
      console.error(err);
      setError("Movie fetch failed.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header showUserOptions />

      {/* Search */}
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold mb-4">
          AI Movie Search 🤖
        </h1>

        <input
          className="p-2 w-64 text-black rounded"
          placeholder="e.g. horror, comedy"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchGptMovies()}
        />

        <button
          onClick={fetchGptMovies}
          disabled={loading}
          className="ml-2 bg-red-600 px-4 py-2 rounded"
        >
          {loading ? "Thinking..." : "Search"}
        </button>
      </div>

      {error && (
        <p className="text-center mt-5 text-red-500">{error}</p>
      )}

      <div className="flex flex-wrap justify-center mt-6 gap-4">
        {movies.map((movie) => (
          <Link key={movie.imdbID} to={`/movie/${movie.imdbID}`}>
            <div className="w-40 hover:scale-105 transition text-center">
              <img
                className="rounded"
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/150"
                }
                alt={movie.Title}
              />
              <p className="text-sm mt-2">{movie.Title}</p>
              <p className="text-xs text-gray-400">
                ⭐ {movie.imdbRating}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GptSearch;