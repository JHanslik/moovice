import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";
import Header from "../components/Header";

function Popular(props) {
    const [popularMovies, setPopularMovies] = useState(null);
    useEffect(() => {
        fetchPopular();
    }, []);

    const fetchPopular = async () => {
        const request = await fetch(
            `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c553055e26e069d72e96bea7b56dc984`
        );
        const response = await request.json();
        setPopularMovies(response);
    };
    if (!popularMovies) {
        return <div>Loading ...</div>;
    }

    const handleClickFavorite = (id) => {
        let favorites = localStorage.getItem("favoriteIds");
        let favoriteIds;
        if (favorites) {
            favoriteIds = JSON.parse(favorites);
        } else {
            favoriteIds = [];
        }
        if (!favoriteIds.includes(id)) {
            favoriteIds.push(id);
            const favoritesStringified = JSON.stringify(favoriteIds);
            localStorage.setItem("favoriteIds", favoritesStringified);
        }
    };

    console.log(popularMovies);
    return (
        <div>
            <Header />

            <main className="container text-center">
                <h2 className="pageTitle">Popular</h2>
                <div className="d-flex justify-content-center flex-wrap">
                    {popularMovies.results.map((movie) => {
                        return (
                            <Cards
                                image={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                                title={movie.title}
                                year={movie.release_date}
                                description={movie.overview}
                                addFavorite={() => {
                                    handleClickFavorite(movie.id);
                                }}
                                nameButton="Add Favorite"
                            />
                        );
                    })}
                </div>
            </main>
        </div>
    );
}

export default Popular;
