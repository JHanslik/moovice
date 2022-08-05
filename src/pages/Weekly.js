import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import moment from "moment";

function Weekly(props) {
    const [weekMovies, setWeekMovies] = useState([]);

    useEffect(() => {
        fetchWeekly();
        // eslint-disable-next-line
    }, []);

    const fetchWeekly = async () => {
        const request = await fetch(
            `http://api.themoviedb.org/3/discover/movie?primary_release_date.gte=${lastWeek()}&primary_release_date.lte=${presentDate()}&api_key=c553055e26e069d72e96bea7b56dc984`
        );
        const response = await request.json();
        setWeekMovies(response.results);
    };

    const presentDate = () => {
        const date = moment().format("YYYY-MM-DD");
        return date;
    };

    const lastWeek = () => {
        const lastWeekDate = moment().subtract(7, "d").format("YYYY-MM-DD");
        return lastWeekDate;
    };
    console.log(presentDate(), lastWeek());
    return (
        <div>
            <main className="row mb-5">
                {weekMovies.map((movie) => {
                    return <Cards key={movie.title} movie={movie} />;
                })}
            </main>
        </div>
    );
}

export default Weekly;
