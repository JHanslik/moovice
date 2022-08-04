import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import Header from "../components/Header";

function Favorites(props) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, []);

    const fetchData = async () => {
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

    const handleClickRemoveFavorite = (i) => {
        let ids = localStorage.getItem("favoriteIds");
        let favoriteIds = JSON.parse(ids);

        favoriteIds.splice(i, 1);

        let stringifiedFavoriteIds = JSON.stringify(favoriteIds);
        localStorage.setItem("favoriteIds", stringifiedFavoriteIds);
        fetchData();
    };
    console.log(movies);
    return (
        <div>
            <Header />
            <main className="text-center">
                <h2 className="pageTitle">Favorites</h2>
                <div className="d-flex justify-content-center flex-wrap ">
                    {movies.map((movie, i) => {
                        return (
                            <Cards
                                key={movie.title}
                                image={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                                title={movie.title}
                                year={movie.release_date}
                                description={movie.overview}
                                addFavorite={() => {
                                    handleClickRemoveFavorite(i);
                                }}
                                nameButton="Remove Favorite"
                            />
                        );
                    })}
                </div>
            </main>
        </div>
    );
}

export default Favorites;
