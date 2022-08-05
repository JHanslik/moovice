import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DefaultPoster from "./Assets/DefaultPoster.png";

function PreviewCards({ movie, removeFunctionRender }) {
    const { title, release_date, poster_path, id } = movie;
    const [ids, setIds] = useState([]);

    useEffect(() => {
        let stringifiedFavoriteIds = localStorage.getItem("favoriteIds");
        const favoriteIds = JSON.parse(stringifiedFavoriteIds) || [];
        setIds(favoriteIds);
    }, []);

    const handleFavoriteClick = () => {
        let stringifiedFavoriteIds = localStorage.getItem("favoriteIds");
        let favoriteIds = [];

        if (stringifiedFavoriteIds) {
            favoriteIds = JSON.parse(stringifiedFavoriteIds);
        }

        if (!favoriteIds.includes(id)) {
            favoriteIds.push(id);
            stringifiedFavoriteIds = JSON.stringify(favoriteIds);
            localStorage.setItem("favoriteIds", stringifiedFavoriteIds);
            setIds(favoriteIds);
        } else {
            favoriteIds.splice(favoriteIds.indexOf(id), 1);
            let stringifiedFavoriteIds = JSON.stringify(favoriteIds);
            localStorage.setItem("favoriteIds", stringifiedFavoriteIds);
            setIds(favoriteIds);
            if (removeFunctionRender) {
                removeFunctionRender(id);
            }
        }
    };

    return (
        <article className="p-2 col-5 col-md-4 col-lg-3 mx-auto text-center previewCard">
            <div className="card h-100 cardEffect">
                <Link className="cardLink" to={`/movie/${id}`}>
                    <img
                        className="card-img-top"
                        src={
                            poster_path
                                ? `https://image.tmdb.org/t/p/w300/${poster_path}`
                                : DefaultPoster
                        }
                        alt={title}
                    />
                    <div className="p-3 card-element d-flex flex-column align-items-center justify-content-center">
                        <h3 className="card-title">{title}</h3>
                        <p className="card-text">{release_date}</p>
                    </div>
                </Link>
                <button className="favorite" onClick={handleFavoriteClick}>
                    {ids.includes(id) ? (
                        <i className="bi bi-heart-fill"></i>
                    ) : (
                        <i className="bi bi-heart"></i>
                    )}
                </button>
            </div>
        </article>
    );
}

export default PreviewCards;
