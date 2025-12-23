import { Fragment, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import EliminationContext from '../../../utils/elimination.context';
import EliminationScoreBoard from './elimination.scoreboard';
import EliminationStatisticsBoard from './elimination.statisticsboard';
import EliminationScoreInputBoard from './elimination.score.input.board';
import EliminationGameHeader from './elimination.game.header';
import PageLoader from '../../elements/page.loader';

const EliminationGame = () => {
    const { game, players, loading } = useContext(EliminationContext);
    const navigate = useNavigate();

    // Navigation bei Spielende
    useEffect(() => {
        if (game.hasWinner) {
            navigate(`/stats/games/elimination/${game.id}`, { replace: true });
        }
    }, [game.hasWinner, navigate, game.id]);

    if (loading.initGameLoading) {
        return <PageLoader />;
    }

    if (!players || !game.playerModels) {
        return <PageLoader />; // Fallback, falls Daten noch nicht verfügbar
    }

    return (
        <Fragment>
            <EliminationGameHeader
                targetScore={game.targetScore}
                gameOutMode={game.gameOutMode}
            />

            <div className="container-fluid">
                <div className="row justify-content-md-center">
                    {game.players.map((playerId, idx) => (
                        <div
                            key={`score-board-${playerId}`}
                            className={`col-12 col-md-6 col-xxl-3 border-top border-bottom border-opacity-50 ${idx < players.length - 1 ? 'border-end-md' : ''}`}
                        >
                            <EliminationScoreBoard playerId={playerId} idx={idx} />
                        </div>
                    ))}
                </div>
            </div>

            <EliminationScoreInputBoard />

            <div className="container-fluid mt-4">
                <div className="row justify-content-md-center">
                    {game.players.map((playerId, idx) => (
                        <div
                            key={`statistics-board-${playerId}`}
                            className={`col-6 col-lg-3 p-0 py-2 border-top border-bottom border-opacity-50 ${idx < players.length - 1 ? 'border-end-md' : ''}`}
                        >
                            <EliminationStatisticsBoard playerId={playerId} />
                        </div>
                    ))}
                </div>
            </div>
        </Fragment>
    );
}

export default EliminationGame;
