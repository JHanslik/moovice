import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieDetails from "./pages/MovieDetails";
import "./App.css";
import Header from "./components/Header";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Popular from "./pages/Popular";
import Weekly from "./pages/Weekly";
import Search from "./pages/Search";
import Top from "./pages/Top";
import NowPlaying from "./pages/NowPlaying";
import Upcoming from "./pages/Upcoming";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <main className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/weekly" element={<Weekly />} />
                    <Route path="/popular" element={<Popular />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/top" element={<Top />} />
                    <Route path="/nowplaying" element={<NowPlaying />} />
                    <Route path="/upcoming" element={<Upcoming />} />
                    <Route path="/movie/:id" element={<MovieDetails />} />

                    <Route path="/seach/:input" element={<Search />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
