import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout:20000,
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: "en-US",
   
  },
});

export default api;