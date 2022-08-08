import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import { Link, useParams } from "react-router-dom";

function Upcoming() {
    const params = useParams();
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(Number(params.page));

    useEffect(() => {
        fetchUpcoming();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        fetchUpcoming();
        // eslint-disable-next-line
    }, [page]);

    const fetchUpcoming = async () => {
        const request = await fetch(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=c553055e26e069d72e96bea7b56dc984&page=${page}&region=FR`
        );
        const response = await request.json();
        setUpcomingMovies(response.results);
        setTotalPages(response.total_pages);
    };

    const fetchTemp = async () => {
        const request = await fetch(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=c553055e26e069d72e96bea7b56dc984&page=${
                page + 1
            }&region=FR`
        );
        const response = await request.json();
        if (response.results.length !== 0) {
            setPage(page + 1);
        }
    };

    const pageNumberMinus = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };
    const pageNumberPlus = () => {
        fetchTemp();
    };
    const firstPage = () => {
        setPage(1);
    };
    const lastPage = () => {
        setPage(totalPages);
    };

    return (
        <main onLoad={window.scroll(0, 0)}>
            <h2 className="fs-1 text-center my-3">Upcoming Movies</h2>
            <section className="row mb-5">
                {upcomingMovies.map((movie) => {
                    return <Cards key={movie.title} movie={movie} />;
                })}
            </section>
            <section className="d-flex justify-content-around align-items-center mb-5">
                <Link to={`/upcoming/1`}>
                    <button className="btn btn-primary" onClick={firstPage}>
                        <span className="material-icons">
                            keyboard_double_arrow_left
                        </span>
                    </button>
                </Link>
                <Link to={`/upcoming/${page - 1}`}>
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
                <Link to={`/upcoming/${page + 1}`}>
                    <button
                        className="btn btn-primary"
                        onClick={pageNumberPlus}
                    >
                        <span className="material-icons">
                            keyboard_arrow_right
                        </span>
                    </button>
                </Link>
                <Link to={`/upcoming/${totalPages}`}>
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

export default Upcoming;
