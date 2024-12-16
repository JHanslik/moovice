import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";

function Popular() {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    fetchPopular();
  }, []);

  const fetchPopular = async () => {
    const request = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=f38a269d5ab6751378c9a42f54ecf63a&page=1&region=FR`
    );
    const response = await request.json();
    setPopularMovies(response.results);
  };

  return (
    <div className="row mb-5">
      {popularMovies.map((movie) => {
        return <Cards key={movie.title} movie={movie} />;
      })}
    </div>
  );
}

export default Popular;
