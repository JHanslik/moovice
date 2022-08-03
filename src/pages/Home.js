import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home(props) {
    return (
        <div>
            <header className="d-flex justify-content-around align-items-center">
                <h1>Home</h1>
                <nav>
                    <Link className="mx-2" to={`/`}>
                        Home
                    </Link>
                    <Link className="mx-2" to={`/weekly`}>
                        Weekly
                    </Link>
                    <Link className="mx-2" to={`/popular`}>
                        Popular
                    </Link>
                    <Link className="mx-2" to={`/favorites`}>
                        Favorites
                    </Link>
                </nav>
            </header>
        </div>
    );
}

export default Home;
