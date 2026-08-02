import "./MyList.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import api from "../../services/api";
import backendApi from "../../services/backendApi";

function MyList() {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const favRes = await backendApi.get("/favorites");

        const ids = favRes.data;

        if (ids.length === 0) {
          setMovies([]);
          setLoading(false);
          return;
        }

        const moviePromises = ids.map((id) =>
          api.get(`/movie/${id}`).then((res) => res.data)
        );

        const movieData = await Promise.all(moviePromises);

        setMovies(movieData);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchFavorites();
  }, []);

  return (
    <>
      <Navbar />

      <div className="my-list-page">

        <h1>My List</h1>

        {loading ? (
          <h2>Loading...</h2>
        ) : movies.length === 0 ? (
          <p>No movies added yet.</p>
        ) : (
          <div className="my-list-grid">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="my-list-card"
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />

                <h3>{movie.title}</h3>

                <span>⭐ {movie.vote_average.toFixed(1)}</span>
              </div>
            ))}
          </div>
        )}

      </div>

      <Footer />
    </>
  );
}

export default MyList;