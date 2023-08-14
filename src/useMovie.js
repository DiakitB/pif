import { useEffect, useState } from "react";
const Key = "bed289e0";
export function useMovie(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState("");
  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsloading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${Key}&s=${query}`
          );

          if (!res.ok)
            throw new Error("Ops! cant find the movie check your spelling ");

          const data = await res.json();
          if (data.Response === "False")
            throw new Error(
              `Ops! can't find a movie with the name ${query} please check your spelling`
            );

          setMovies(data.Search);
        } catch (err) {
          if (err.name !== "AbortError") setError(err.message);
        } finally {
          setIsloading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      fetchMovies();
    },
    [query]
  );
  return { movies, isLoading, error };
}
