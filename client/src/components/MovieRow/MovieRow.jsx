import { useEffect, useRef, useState } from "react";
import "./MovieRow.css";
import MovieCard from "../MovieCard/MovieCard";
import api from "../../services/api";

function MovieRow({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);

  // Ye check karega ki row screen me aayi hai ya nahi
  const [isVisible, setIsVisible] = useState(false);

  // Row ko observe karne ke liye ref
  const rowRef = useRef(null);

  // Sirf ek baar API call ho iske liye
  const hasFetched = useRef(false);

  // Row screen me aate hi isVisible true ho jayega
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Agar row screen me dikh rahi hai
        if (entries[0].isIntersecting) {
          setIsVisible(true);

          // Observe karna band kar do
          observer.disconnect();
        }
      },
      {
        threshold: 0.2, // 20% row dikhte hi call hoga
      }
    );

    if (rowRef.current) {
      observer.observe(rowRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Jab tak row visible na ho tab tak API call mat karo
    if (!isVisible || hasFetched.current) return;

    async function fetchData() {
      try {
        // API call
        const response = await api.get(fetchUrl);

        // Movies set karo
        setMovies(response.data.results);

        // Dubara API call na ho
        hasFetched.current = true;
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }

    fetchData();
  }, [fetchUrl, isVisible]);

  return (
    <div className="movie-row" ref={rowRef}>
      <h2>{title}</h2>

      <div className="movies">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>
    </div>
  );
}

export default MovieRow;