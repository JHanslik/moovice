import React from "react";

function Cards(props) {
    return (
        <div className="card justify-content-between m-4">
            <img src={props.image} alt="Affiche" />
            <h2 className="card-title">{props.title}</h2>
            <p className="card-text">{props.year}</p>
            <p className="card-text">{props.description}</p>
            <button className="btn btn-primary" onClick={props.addFavorite}>
                {props.nameButton}
            </button>
        </div>
    );
}

export default Cards;
