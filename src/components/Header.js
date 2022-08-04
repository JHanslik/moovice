import React from "react";
import { NavLink } from "react-router-dom";

function Header(props) {
    return (
        <header className="d-flex flex-column justify-content-around align-items-center pt-2">
            <h1>Moovice !</h1>
            <nav>
                <NavLink className={`link`} to={`/`}>
                    Home
                </NavLink>
                <NavLink className={`link`} to={`/weekly`}>
                    Weekly
                </NavLink>
                <NavLink className={`link`} to={`/popular`}>
                    Popular
                </NavLink>
                <NavLink className={`link`} to={`/favorites`}>
                    Favorites
                </NavLink>
            </nav>
        </header>
    );
}

export default Header;
