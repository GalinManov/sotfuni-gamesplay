import { useEffect, useState } from "react";
import * as gameServices from "../../services/gameService";
import LatestGame from "./LatestGame";

const Home = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        gameServices.getAll()
            .then(result => {
                setGames(result)
            })
    }, [])

    return (
        <section id="welcome-world">
            <div className="welcome-message">
                <h2>ALL new games are</h2>
                <h3>Only in GamesPlay</h3>
            </div>
            <img src="./images/four_slider_img01.png" alt="hero" />
            <div id="home-page">
                <h1>Latest Games</h1>
                {/* Display div: with information about every game (if any) */}
                <div className="game">
                    {games.map(game => <LatestGame key={game._id} game={game} />)}
                </div>
                {games.length == 0 &&
                    <p className="no-articles">No games yet</p>
                }
            </div>
        </section>
    )
}

export default Home;