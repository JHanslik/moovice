import React from "react";
import { NavLink } from "react-router-dom";

function Header(props) {
    return (
        <header className="d-flex flex-column justify-content-around align-items-center py-2">
            <h1>Moovice !</h1>
            <nav>
                <NavLink className={`btn link button`} to={`/`}>
                    Home
                </NavLink>
                <NavLink className={`btn link button`} to={`/weekly`}>
                    Weekly
                </NavLink>
                <NavLink className={`btn link button`} to={`/popular`}>
                    Popular
                </NavLink>
                <NavLink className={`btn link button`} to={`/favorites`}>
                    Favorites
                </NavLink>
            </nav>
        </header>
    );
}

export default Header;
