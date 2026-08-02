import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaTimes } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import "./Hero.css";
import api from "../../services/api";

function Hero() {
  // Hero movie ko store 
  const [movie, setMovie] = useState(null);

  // Trailer ki YouTube key store 
  const [trailerKey, setTrailerKey] = useState(null);

  // Trailer modal open/close 
  const [showTrailer, setShowTrailer] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {

    // TMDB se trending movie fetch func
    const fetchHeroMovie = async () => {
      try {

        // Trending movies aur TV shows fetch karo
        const response = await api.get("/trending/all/week");

        // Person type ko hata do (sirf movies aur TV chahiye)
        const movies = response.data.results.filter(
          (item) => item.media_type !== "person"
        );

        // Random movie select karo
        setMovie(
          movies[Math.floor(Math.random() * movies.length)]
        );

      } catch (err) {
        console.log(err);
      }
    };

    // Component load hote hi ek baar movie fetch karo
    fetchHeroMovie();

    // Agar trailer open hai to hero movie change mat karo
    if (showTrailer) return;

    // Har 10 second me nayi random movie 
    const interval = setInterval(fetchHeroMovie, 50000);

    // Component destroy hone par interval hata do
    return () => clearInterval(interval);

  }, [showTrailer]);

  // Play button click hone par trailer fetch hoga
  const handlePlay = async () => {

    if (!movie) return;

    try {

      // Check karo movie hai ya TV show
      const type = movie.media_type === "tv" ? "tv" : "movie";

      // Trailer videos fetch karo
      const res = await api.get(`/${type}/${movie.id}/videos`);

      // Sabse pehle YouTube Trailer dhoondo
      const trailer =
        res.data.results.find(
          (video) =>
            video.site === "YouTube" &&
            video.type === "Trailer"
        ) ||

        // Agar Trailer nahi mila to koi bhi YouTube video le lo
        res.data.results.find(
          (video) => video.site === "YouTube"
        );

      if (trailer) {

        // Trailer key save karo
        setTrailerKey(trailer.key);

        // Trailer modal open karo
        setShowTrailer(true);

      } else {

        alert("Trailer not available.");

      }

    } catch (err) {

      console.log(err);

    }
  };

  // More Info button se details page open hoga
  const handleMoreInfo = () => {

    if (!movie) return;

    navigate(`/movie/${movie.id}`);
  };

  // Jab tak movie load na ho kuch mat dikhao
  if (!movie) return null;

  return (
    <>
      <section
        className="hero"
        style={{
          // Hero background image
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="hero-content">

          {/* Movie Title */}
          <h1>{movie.title || movie.name}</h1>

          {/* Movie Overview */}
          <p>
            {movie.overview?.length > 180
              ? movie.overview.substring(0, 180) + "..."
              : movie.overview}
          </p>

          <div className="hero-buttons">

            {/* Trailer Play Button */}
            <button
              className="hero-play-btn"
              onClick={handlePlay}
            >
              <FaPlay />
              <span>Play</span>
            </button>

            {/* Movie Details Page */}
            <button
              className="hero-info-btn"
              onClick={handleMoreInfo}
            >
              <AiOutlineInfoCircle />
              <span>More Info</span>
            </button>

          </div>
        </div>
      </section>

      {/* Trailer Popup */}
      {showTrailer && (
        <div className="trailer-overlay">

          <div className="trailer-modal">

            {/* Trailer Close Button */}
            <button
              className="close-trailer"
              onClick={() => {
                setShowTrailer(false);
                setTrailerKey(null);
              }}
            >
              <FaTimes />
            </button>

            {/* YouTube Trailer */}
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
              title="Trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />

          </div>

        </div>
      )}
    </>
  );
}

export default Hero;