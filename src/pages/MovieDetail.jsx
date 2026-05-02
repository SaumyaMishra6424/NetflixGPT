import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(
        `https://www.omdbapi.com/?i=${id}&apikey=87d98bc7`
      );
      const data = await res.json();
      setMovie(data);
    };

    fetchMovie();
  }, [id]);

  if (!movie) return <div className="text-white">Loading...</div>;

  return (
    <div className="text-white p-10 bg-black min-h-screen text-center">
      <h1 className="text-3xl text-red-500">
        {movie.Title} ({movie.Year})
      </h1>

      <img
        src={movie.Poster}
        alt={movie.Title}
        className="mx-auto mt-4"
      />

      <p className="mt-4">⭐ Rating: {movie.imdbRating}</p>
      <p className="mt-2 max-w-xl mx-auto">{movie.Plot}</p>
    </div>
  );
};

export default MovieDetail;