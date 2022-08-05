import React, { useEffect, useState } from "react";

function Cards({ movie, removeFunctionRender }) {
    const { title, release_date, poster_path, overview, id } = movie;
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
        <article className="p-2 col-12 col-md-4 col-lg-3 mx-auto">
            <div className="card h-100 p-2">
                <img
                    src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
                    alt={title}
                />
                <h2 className="card-title">{title}</h2>
                <p className="card-text">{release_date}</p>
                <p className="card-text">{overview}</p>
                <button className="favorite" onClick={handleFavoriteClick}>
                    {ids.includes(id) ? (
                        <i class="bi bi-heart-fill"></i>
                    ) : (
                        <i class="bi bi-heart"></i>
                    )}
                </button>
            </div>
        </article>
    );
}

export default Cards;
