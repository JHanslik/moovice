import { useEffect, useState } from "react";
import Cards from "../components/Cards";

function Top(props) {
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [page, setPage] = useState(1);

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
    };

    const fetchTemp = async () => {
        const request = await fetch(
            `https://api.themoviedb.org/3/movie/top_rated?api_key=c553055e26e069d72e96bea7b56dc984&page=${
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

    return (
        <main onLoad={window.scroll(0, 0)}>
            <h2 className="fs-1 text-center my-3">Top Rated Movies</h2>
            <section className="row mb-5">
                {topRatedMovies.map((movie) => {
                    return <Cards key={movie.title} movie={movie} />;
                })}
            </section>
            <section className="d-flex justify-content-center align-items-center mb-5">
                <button className="btn btn-primary" onClick={pageNumberMinus}>
                    Previous
                </button>
                <p className="mx-5 fs-4 page">Page: {page}</p>
                <button className="btn btn-primary" onClick={pageNumberPlus}>
                    Next
                </button>
            </section>
        </main>
    );
}

export default Top;
