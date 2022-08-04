import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import Header from "../components/Header";

function Favorites() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchFavorite();
        // eslint-disable-next-line
    }, []);

    const fetchFavorite = async () => {
        let ids = localStorage.getItem("favoriteIds");
        let favoriteIds = JSON.parse(ids);
        const promises = favoriteIds.map((id) => fetchMovie(id));
        const promiseAllResults = await Promise.all(promises);

        setMovies(promiseAllResults);
    };

    const fetchMovie = async (id) => {
        const movie = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=c553055e26e069d72e96bea7b56dc984`
        );
        const response = await movie.json();
        return response;
    };

    const handleClickRemoveFavorite = (id) => {
        let clonedMovies = [...movies];
        const movie = clonedMovies.find((movie) => movie.id === id);
        clonedMovies.splice(clonedMovies.indexOf(movie), 1);
        setMovies(clonedMovies);
    };
    return (
        <div>
            <Header />
            <main className="text-center">
                <div className="d-flex justify-content-center flex-wrap ">
                    {movies.map((movie, i) => {
                        return (
                            <Cards
                                key={movie.title}
                                movie={movie}
                                removeFunctionRender={handleClickRemoveFavorite}
                            />
                        );
                    })}
                </div>
            </main>
        </div>
    );
}

export default Favorites;
