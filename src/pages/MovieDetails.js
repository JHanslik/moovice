import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ModalVideo from "../components/ModalVideo";
import DefaultPoster from "../components/Assets/DefaultPoster.png";

function MovieDetails() {
  const params = useParams();
  const [movie, setMovies] = useState([]);
  const [videos, setVideos] = useState([]);
  const [providers, setProviders] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [ids, setIds] = useState([]);

  useEffect(() => {
    fetchFavoriteIds();
    fetchMovie();
    fetchVideos();
    fetchProviders();
    // eslint-disable-next-line
  }, []);

  const fetchMovie = async () => {
    const movie = await fetch(
      `https://api.themoviedb.org/3/movie/${params.id}?api_key=f38a269d5ab6751378c9a42f54ecf63a`
    );
    const response = await movie.json();
    setMovies(response);
  };

  const fetchVideos = async () => {
    const videos = await fetch(
      `https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=f38a269d5ab6751378c9a42f54ecf63a`
    );
    const response = await videos.json();
    const trailer = response.results.find((video) => video.type === "Trailer");
    if (trailer.key) {
      setVideos(`https://www.youtube.com/embed/${trailer.key}?autoplay=1`);
    }
  };

  const fetchProviders = async () => {
    const providers = await fetch(
      `https://api.themoviedb.org/3/movie/${params.id}/watch/providers?api_key=f38a269d5ab6751378c9a42f54ecf63a`
    );
    const response = await providers.json();
    setProviders(response.results.FR);
  };

  const fetchFavoriteIds = () => {
    let stringifiedFavoriteIds = localStorage.getItem("favoriteIds");
    const favoriteIds = JSON.parse(stringifiedFavoriteIds) || [];
    setIds(favoriteIds);
  };

  const handleClickTrailer = () => {
    setOpenModal(true);
  };
  const handleClickClose = () => {
    setOpenModal(false);
  };
  const handleFavoriteClick = () => {
    let stringifiedFavoriteIds = localStorage.getItem("favoriteIds");
    let favoriteIds = [];

    if (stringifiedFavoriteIds) {
      favoriteIds = JSON.parse(stringifiedFavoriteIds);
    }

    if (!favoriteIds.includes(movie.id)) {
      favoriteIds.push(movie.id);
      stringifiedFavoriteIds = JSON.stringify(favoriteIds);
      localStorage.setItem("favoriteIds", stringifiedFavoriteIds);
      setIds(favoriteIds);
    } else {
      favoriteIds.splice(favoriteIds.indexOf(movie.id), 1);
      let stringifiedFavoriteIds = JSON.stringify(favoriteIds);
      localStorage.setItem("favoriteIds", stringifiedFavoriteIds);
      setIds(favoriteIds);
    }
  };
  return (
    <main onLoad={window.scroll(0, 0)}>
      <section className="d-flex justify-content-center align-items-center my-5 details">
        <div className="align-self-lg-start text-center">
          <img
            className="rounded mb-3 details-img"
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
                : DefaultPoster
            }
            alt={`${movie.title} poster`}
          />
          <button
            className="btn genre-buttons w-100 mb-3"
            onClick={handleFavoriteClick}
          >
            {ids.includes(movie.id) ? (
              <div>
                <i className="bi bi-heart-fill fs-4"></i>
              </div>
            ) : (
              <div>
                <i className="bi bi-heart fs-4"></i>
              </div>
            )}
          </button>
        </div>
        <div className="ms-lg-5 mt-4 mt-lg-0 details-right">
          <h2 className="details-title text-center fs-1">{movie.title}</h2>
          <div className="d-flex flex-wrap justify-content-evenly">
            {movie.genres &&
              movie.genres.map((genre) => {
                return (
                  <button className="btn genre-buttons m-1" key={genre.name}>
                    {genre.name}
                  </button>
                );
              })}
          </div>
          <p className="text-center fs-3">{movie.tagline}</p>
          {movie.overview && (
            <p>
              <span className="colorDetail">Synopsis: </span>
              {movie.overview}
            </p>
          )}

          <div>
            {movie.release_date && (
              <p>
                <span className="colorDetail">Release Date: </span>
                {movie.release_date}
              </p>
            )}
            {movie.status && (
              <p>
                <span className="colorDetail">Status: </span>
                {movie.status}
              </p>
            )}
            {movie.runtime && (
              <p>
                <span className="colorDetail">Runtime: </span>
                {movie.runtime} min
              </p>
            )}
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
          {videos.length > 0 && (
            <div>
              <button
                type="button"
                className="btn trailer-button"
                onClick={handleClickTrailer}
              >
                Click to see the trailer
              </button>
              <ModalVideo
                open={openModal}
                movie={movie}
                video={videos}
                handleClickClose={handleClickClose}
              />
            </div>
          )}
          {providers && (
            <div>
              <div className="mt-3">
                {providers.flatrate && (
                  <div>
                    <p className="colorDetail">Streaming:</p>
                    {providers.flatrate.map((provider) => {
                      return (
                        <img
                          key={provider.provider_name}
                          className="logo-watch rounded m-1"
                          src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
                          alt={provider.provider_name}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="mt-3">
                {providers.rent && (
                  <div>
                    <p className="colorDetail">Rent:</p>
                    {providers.rent.map((provider) => {
                      return (
                        <img
                          key={provider.provider_name}
                          className="logo-watch rounded m-1"
                          src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
                          alt={provider.provider_name}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="mt-3">
                {providers.buy && (
                  <div>
                    <p className="colorDetail">Buy:</p>
                    {providers.buy.map((provider) => {
                      return (
                        <img
                          key={provider.provider_name}
                          className="logo-watch rounded m-1"
                          src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
                          alt={provider.provider_name}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
      <section>
        <p>Actor cards</p>
      </section>
    </main>
  );
}

export default MovieDetails;
