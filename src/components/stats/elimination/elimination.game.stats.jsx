import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

//import StatsService from '../../services/stats.service';
import PlayerService from '../../../services/player.service';
import PageLoader from '../../elements/page.loader';
import EliminationService from '../../../services/elimination.service';

const EliminationGameStats = () => {
    const { id } = useParams();

    const [game, setGame] = useState();
    //const [gameStats, setGameStats] = useState({});
    const [players, setPlayers] = useState();

    const loadData = async () => {
        let game = await EliminationService.loadEliminationGameById(id);
        let players = await PlayerService.findPlayersByIds(game.players);
        //let gameStats = await StatsService.loadEliminationGameStats(game.id);

        setGame(game);
        setPlayers(players);
        //setGameStats(gameStats);
    }

    useEffect(() => {
        loadData();
        // eslint-disable-next-line
    }, []);

    if (!game || !players) {
        return (
            <PageLoader />
        )
    }

    return (
        <div className="container-fluid p-4">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col text-shade100">
                    Not yet implemented. Coming soon...
                </div>
            </div>
        </div>
    );
}

export default EliminationGameStats;