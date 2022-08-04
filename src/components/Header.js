import React from "react";
import { Link } from "react-router-dom";

function Header(props) {
    return (
        <header className="d-flex justify-content-around align-items-center">
            <Link className="mx-1 link" to={`/`}>
                <h1>Moovice !</h1>
            </Link>
            <nav>
                <Link className="mx-1 link" to={`/weekly`}>
                    Weekly
                </Link>
                <Link className="mx-1 link" to={`/popular`}>
                    Popular
                </Link>
                <Link className="mx-1 link" to={`/favorites`}>
                    Favorites
                </Link>
            </nav>
        </header>
    );
}

export default Header;
