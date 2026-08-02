import "./MovieCard.css";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

function MovieCard({ movie }) {
  const navigate = useNavigate();

  if (!movie || !movie.poster_path) return null;

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handlePlay = (e) => {
    e.stopPropagation();

    const movieName = movie.title || movie.name;

    window.open(
      `https://www.youtube.com/results?search_query=${encodeURIComponent(
        `${movieName} official trailer`
      )}`,
      "_blank"
    );
  };

  return (
    <div className="movie-card" onClick={handleCardClick}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title || movie.name}
        loading="lazy"
      />

     
    </div>
  );
}

export default MovieCard;