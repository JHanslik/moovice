import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ModalVideo from "../components/ModalVideo";

function MovieDetails(props) {
    const params = useParams();
    const [movie, setMovies] = useState([]);
    const [videos, setVideos] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        fetchMovie();
        fetchVideos();
        // eslint-disable-next-line
    }, []);

    const fetchMovie = async () => {
        const movie = await fetch(
            `https://api.themoviedb.org/3/movie/${params.id}?api_key=c553055e26e069d72e96bea7b56dc984`
        );
        const response = await movie.json();
        setMovies(response);
    };

    const fetchVideos = async () => {
        const videos = await fetch(
            `https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=c553055e26e069d72e96bea7b56dc984`
        );
        const response = await videos.json();
        const trailer = response.results.find(
            (video) => video.type === "Trailer"
        );
        console.log(`https://www.youtube.com/watch?v=${trailer.key}`);
        setVideos(`https://www.youtube.com/embed/${trailer.key}?rel=0`);
    };
    const handleClickTrailer = () => {
        setOpenModal(true);
    };
    const handleClickClose = () => {
        setOpenModal(false);
    };
    console.log(movie);
    return (
        <main>
            <section className="d-flex justify-content-center align-items-center my-5 details">
                <img
                    className="rounded"
                    src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                    alt={`${movie.title} poster`}
                />
                <div className="ms-lg-5 mt-4 mt-lg-0 details-right">
                    <h2 className="details-title text-center fs-1">
                        {movie.title}
                    </h2>
                    <p className="text-center fs-3">{movie.tagline}</p>

                    {movie.genre &&
                        movie.genres.map((genre) => {
                            return (
                                <button key={movie.title}>{genre.name}</button>
                            );
                        })}
                    <p>
                        <span className="colorDetail">Synopsis: </span>
                        {movie.overview}
                    </p>
                    <div>
                        <p>
                            <span className="colorDetail">Release Date: </span>
                            {movie.release_date}
                        </p>
                        <p>
                            <span className="colorDetail">Status: </span>
                            {movie.status}
                        </p>
                        <p>
                            <span className="colorDetail">Runtime: </span>
                            {movie.runtime} min
                        </p>
                    </div>
                    <div>
                        {movie.budget !== 0 && (
                            <p>
                                <span className="colorDetail">Budget: </span>
                                {movie.budget} $
                            </p>
                        )}
                        {movie.revenue !== 0 && (
                            <p>
                                <span className="colorDetail">Revenue: </span>
                                {movie.revenue} $
                            </p>
                        )}
                    </div>
                    {movie.homepage && (
                        <p>
                            <span className="colorDetail">Homepage: </span>
                            <a href={movie.homepage} target="blank">
                                {movie.homepage}
                            </a>
                        </p>
                    )}

                    <button
                        type="button"
                        className="btn trailer-button"
                        onClick={handleClickTrailer}
                    >
                        Trailer
                    </button>
                    <ModalVideo
                        open={openModal}
                        movie={movie}
                        video={videos}
                        handleClickClose={handleClickClose}
                    />

                    <p>Où regarder</p>
                </div>
            </section>
            <section>
                <p>Actor cards</p>
            </section>
        </main>
    );
}

export default MovieDetails;
