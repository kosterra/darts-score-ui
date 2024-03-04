import { Fragment, useContext } from 'react';
import { useNavigate } from "react-router-dom";

import X01Context from '../../../utils/x01.context';
import X01ScoreBoard from './x01.scoreboard';
import X01StatisticsBoard from './x01.statisticsboard';
import X01ScoreInputBoard from './x01.score.input.board';
import X01GameHeader from './x01.game.header';
import PageLoader from '../../elements/page.loader';


const X01Game = () => {
    const {
        game,
        players,
        loading
    } = useContext(X01Context);

    const navigate = useNavigate();

    if (game.hasWinner) {
        navigate("/stats/games/x01/" + game.id, { replace: true });
    }

    if (loading.initGameLoading) {
        return (
            <PageLoader />
        )
    }

    return (
        <Fragment>
            <X01GameHeader
                setMode={game.setMode}
                numberOfSets={game.numberOfSets}
                legMode={game.legMode}
                numberOfLegs={game.numberOfLegs}
                legInMode={game.legInMode}
                legOutMode={game.legOutMode}
            />
            <div className="container-fluid">
                <div className="row justify-content-md-center">
                    {game.players.length > 0 && game.players.map((playerId, idx) => (
                        <div
                            key={`score-board-col-${idx}`}
                            className={`col-12 col-md-6 col-xxl-3 border-top border-bottom border-opacity-50 ${Number(idx) < players.length - 1 ? 'border-end-md' : ''}`}
                        >
                            <X01ScoreBoard key={`score-board-${idx}`} playerId={playerId} idx={idx} />
                        </div>
                    ))}
                </div>
            </div>
            <X01ScoreInputBoard />
            <div className="container-fluid mt-4">
                <div className="row justify-content-md-center">
                    {game.players.length > 0 && game.players.map((playerId, idx) => (
                        <div
                            key={`statistics-board-col-${idx}`}
                            className={`col-6 col-xxl-3 p-0 py-2 border-top border-bottom border-opacity-50 ${Number(idx) < players.length - 1 ? 'border-end-md' : ''}`}
                        >
                            <X01StatisticsBoard key={`statistics-board-${idx}`} playerId={playerId} />
                        </div>
                    ))}
                </div>
            </div>
        </Fragment>
    )
}

export default X01Game;
