import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cards from "../components/Cards";

function Favorites(props) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        let ids = localStorage.getItem("favoriteIds");
        let favoriteIds = JSON.parse(ids);
        let tempMovies = [];
        favoriteIds.forEach(async (id) => {
            const movie = await fetch(
                `https://api.themoviedb.org/3/movie/${id}?api_key=c553055e26e069d72e96bea7b56dc984`
            );
            const response = await movie.json();
            tempMovies.push(response);
        });
        console.log(tempMovies);
        setMovies(tempMovies);
    };

    const handleClickRemoveFavorite = (id) => {
        let favorites = localStorage.getItem("favoriteIds");
        let favoriteIds = JSON.parse(favorites);
        if (!favoriteIds.includes(id)) {
            favoriteIds.splice(id, 1);
            const favoritesStringified = JSON.stringify(favoriteIds);
            localStorage.setItem("favoriteIds", favoritesStringified);
        }
    };
    console.log(movies);

    return (
        <div>
            <header className="d-flex justify-content-around align-items-center">
                <h1>Favorites</h1>
                <nav>
                    <Link className="mx-2" to={`/`}>
                        Home
                    </Link>
                    <Link className="mx-2" to={`/weekly`}>
                        Weekly
                    </Link>
                    <Link className="mx-2" to={`/popular`}>
                        Popular
                    </Link>
                    <Link className="mx-2" to={`/favorites`}>
                        Favorites
                    </Link>
                </nav>
            </header>
            <main>
                {movies.map((movie) => {
                    return (
                        <Cards
                            image={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                            title={movie.title}
                            year={movie.release_date}
                            description={movie.overview}
                            addFavorite={() => {
                                handleClickRemoveFavorite(movie.id);
                            }}
                            nameButton="Remove"
                        />
                    );
                })}
            </main>
        </div>
    );
}

export default Favorites;
