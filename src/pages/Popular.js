import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";

function Popular() {
    const [popularMovies, setPopularMovies] = useState([]);

    useEffect(() => {
        fetchPopular();
    }, []);

    const fetchPopular = async () => {
        const request = await fetch(
            `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c553055e26e069d72e96bea7b56dc984`
        );
        const response = await request.json();
        setPopularMovies(response.results);
    };

    console.log();
    return (
        <div className="row mb-5">
            {popularMovies.map((movie) => {
                return <Cards key={movie.title} movie={movie} />;
            })}
        </div>
    );
}

export default Popular;
