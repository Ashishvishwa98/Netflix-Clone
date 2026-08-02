import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import SearchResults from "./pages/SearchResults/SearchResults";
import TVShows from "./pages/TVShows/TVShows";
import Movies from "./pages/Movies/Movies";
import NewPopular from "./pages/NewPopular/NewPopular";
import MyList from "./pages/MyList/MyList";

function App() {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
      />

      <Route
        path="/tv"
        element={isLoggedIn ? <TVShows /> : <Navigate to="/login" />}
      />

      <Route
        path="/movies"
        element={isLoggedIn ? <Movies /> : <Navigate to="/login" />}
      />

      <Route
        path="/new-popular"
        element={isLoggedIn ? <NewPopular /> : <Navigate to="/login" />}
      />

      <Route
        path="/my-list"
        element={isLoggedIn ? <MyList /> : <Navigate to="/login" />}
      />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/movie/:id"
        element={isLoggedIn ? <MovieDetails /> : <Navigate to="/login" />}
      />

      <Route
        path="/search"
        element={isLoggedIn ? <SearchResults /> : <Navigate to="/login" />}

      />
      <Route path="/movie/:id" element={<MovieDetails />} />
     
    </Routes>
  );
}

export default App;