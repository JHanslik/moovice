import { useEffect, useState } from "react";
import PreviewCards from "../components/PreviewCards";
import moment from "moment";

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
        console.log(response.results);
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
        const tomorrow = moment().add(1, "days").format("YYYY-MM-DD");
        const sevenDaysFuture = moment().add(7, "days").format("YYYY-MM-DD");
        const request = await fetch(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=c553055e26e069d72e96bea7b56dc984&page=1&region=FR`
        );
        const response = await request.json();
        setUpcomingMovies(response.results);
    };

    return (
        <div>
            <main className="row mb-5">
                <section>
                    <h2>Latest</h2>
                    <article className="preview">
                        <PreviewCards
                            key={latestMovie.title}
                            movie={latestMovie}
                        />
                        ;
                    </article>
                </section>
                <section>
                    <h2>Top rated</h2>
                    <article className="preview d-flex">
                        {topMovies.map((movie) => {
                            return (
                                <PreviewCards key={movie.title} movie={movie} />
                            );
                        })}
                    </article>
                </section>
                <section>
                    <h2>Now playing</h2>
                    <article className="preview d-flex">
                        {nowPlayingMovies.map((movie) => {
                            return (
                                <PreviewCards key={movie.title} movie={movie} />
                            );
                        })}
                    </article>
                </section>
                <section>
                    <h2>Upcoming</h2>
                    <article className="preview d-flex">
                        {upcomingMovies.map((movie) => {
                            return (
                                <PreviewCards key={movie.title} movie={movie} />
                            );
                        })}
                    </article>
                </section>
            </main>
        </div>
    );
}

export default Home;
