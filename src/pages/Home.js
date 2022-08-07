import { useEffect, useState } from "react";
import PreviewCards from "../components/PreviewCards";
import { Link } from "react-router-dom";

function Home(props) {
    const [latestMovie, setLatestMovies] = useState([]);
    const [topMovies, setTopMovies] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);

    useEffect(() => {
        fetchLatest();
        fetchTop();
        fetchNowPlaying();
        fetchUpcoming();
    }, []);

    const fetchLatest = async () => {
        const request = await fetch(
            `https://api.themoviedb.org/3/movie/latest?api_key=c553055e26e069d72e96bea7b56dc984`
        );
        const response = await request.json();
        setLatestMovies(response);
    };

    const fetchTop = async () => {
        const request = await fetch(
            `
            https://api.themoviedb.org/3/movie/top_rated?api_key=c553055e26e069d72e96bea7b56dc984&page=1&region=FR`
        );
        const response = await request.json();
        setTopMovies(response.results);
    };

    const fetchNowPlaying = async () => {
        const request = await fetch(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=c553055e26e069d72e96bea7b56dc984&page=1&region=FR`
        );
        const response = await request.json();
        setNowPlayingMovies(response.results);
    };

    const fetchUpcoming = async () => {
        const request = await fetch(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=c553055e26e069d72e96bea7b56dc984&page=1&region=FR`
        );
        const response = await request.json();
        setUpcomingMovies(response.results);
    };

    return (
        <main className="row mb-5">
            <section className="mt-5">
                <div>
                    <h2>Latest</h2>
                </div>
                <article className="preview">
                    <PreviewCards key={latestMovie.title} movie={latestMovie} />
                </article>
            </section>
            <section className="mt-5">
                <div className="d-flex align-items-center">
                    <h2 className="me-3">Top rated</h2>
                    <Link to={`/top`}>See more</Link>
                </div>
                <article className="preview d-flex">
                    {topMovies.map((movie) => {
                        return <PreviewCards key={movie.title} movie={movie} />;
                    })}
                </article>
            </section>
            <section className="mt-5">
                <div className="d-flex align-items-center">
                    <h2 className="me-3">Now playing</h2>
                    <Link to={`/nowplaying`}>See more</Link>
                </div>
                <article className="preview d-flex">
                    {nowPlayingMovies.map((movie) => {
                        return <PreviewCards key={movie.title} movie={movie} />;
                    })}
                </article>
            </section>
            <section className="mt-5">
                <div className="d-flex align-items-center">
                    <h2 className="me-3">Upcoming</h2>
                    <Link to={`/upcoming`}>See more</Link>
                </div>
                <article className="preview d-flex">
                    {upcomingMovies.map((movie) => {
                        return <PreviewCards key={movie.title} movie={movie} />;
                    })}
                </article>
            </section>
        </main>
    );
}

export default Home;
