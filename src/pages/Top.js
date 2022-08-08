import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import { Link, useParams } from "react-router-dom";

function Top() {
    const params = useParams();
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(Number(params.page));

    useEffect(() => {
        fetchTopRated();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        fetchTopRated();
        // eslint-disable-next-line
    }, [page]);

    const fetchTopRated = async () => {
        const request = await fetch(
            `https://api.themoviedb.org/3/movie/top_rated?api_key=c553055e26e069d72e96bea7b56dc984&page=${page}&region=FR`
        );
        const response = await request.json();
        setTopRatedMovies(response.results);
        setTotalPages(response.total_pages);
    };

    const pageNumberMinus = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };
    const pageNumberPlus = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };
    const firstPage = () => {
        setPage(1);
    };
    const lastPage = () => {
        setPage(totalPages);
    };

    return (
        <main onLoad={window.scroll(0, 0)}>
            <h2 className="fs-1 text-center my-3">Top Rated Movies</h2>
            <section className="row mb-5">
                {topRatedMovies.map((movie) => {
                    return <Cards key={movie.title} movie={movie} />;
                })}
            </section>
            <section className="d-flex justify-content-around align-items-center mb-5">
                <Link to={`/top/1`}>
                    <button className="btn btn-primary" onClick={firstPage}>
                        <span className="material-icons">
                            keyboard_double_arrow_left
                        </span>
                    </button>
                </Link>
                <Link to={`/top/${page - 1}`}>
                    <button
                        className="btn btn-primary"
                        onClick={pageNumberMinus}
                    >
                        <span className="material-icons">
                            keyboard_arrow_left
                        </span>
                    </button>
                </Link>
                <p className="fs-4 page">{page}</p>
                <Link to={`/top/${page + 1}`}>
                    <button
                        className="btn btn-primary"
                        onClick={pageNumberPlus}
                    >
                        <span className="material-icons">
                            keyboard_arrow_right
                        </span>
                    </button>
                </Link>
                <Link to={`/top/${totalPages}`}>
                    <button className="btn btn-primary" onClick={lastPage}>
                        <span className="material-icons">
                            keyboard_double_arrow_right
                        </span>
                    </button>
                </Link>
            </section>
        </main>
    );
}

export default Top;
