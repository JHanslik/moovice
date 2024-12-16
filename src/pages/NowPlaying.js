import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import { Link, useParams } from "react-router-dom";

function NowPlaying() {
  const params = useParams();
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(Number(params.page));

  useEffect(() => {
    fetchNowPlaying();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchNowPlaying();
    // eslint-disable-next-line
  }, [page]);

  const fetchNowPlaying = async () => {
    const request = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=f38a269d5ab6751378c9a42f54ecf63a&page=${page}&region=FR`
    );
    const response = await request.json();
    setNowPlayingMovies(response.results);
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
      <h2 className="fs-1 text-center my-3">Now Playing Movies</h2>
      <section className="row mb-5">
        {nowPlayingMovies.map((movie) => {
          return <Cards key={movie.title} movie={movie} />;
        })}
      </section>
      <section className="d-flex justify-content-around align-items-center mb-5">
        <Link to={`/nowplaying/1`}>
          <button className="btn btn-primary" onClick={firstPage}>
            <span className="material-icons">keyboard_double_arrow_left</span>
          </button>
        </Link>
        <Link to={`/nowplaying/${page - 1}`}>
          <button className="btn btn-primary" onClick={pageNumberMinus}>
            <span className="material-icons">keyboard_arrow_left</span>
          </button>
        </Link>
        <p className="fs-4 page">Page: {page}</p>
        <Link to={`/nowplaying/${page + 1}`}>
          <button className="btn btn-primary" onClick={pageNumberPlus}>
            <span className="material-icons">keyboard_arrow_right</span>
          </button>
        </Link>
        <Link to={`/nowplaying/${totalPages}`}>
          <button className="btn btn-primary" onClick={lastPage}>
            <span className="material-icons">keyboard_double_arrow_right</span>
          </button>
        </Link>
      </section>
    </main>
  );
}

export default NowPlaying;
