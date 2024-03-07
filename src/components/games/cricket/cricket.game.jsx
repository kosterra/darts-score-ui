import { Fragment, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';

import CricketContext from '../../../utils/cricket.context';
import CricketModels from '../../../models/cricket.models';
import CricketService from '../../../services/cricket.service';
import CricketScoreBoard from './cricket.scoreboard';
import CricketScoreInputBoard from './cricket.score.input.board';
import PageLoader from '../../elements/page.loader';

const CricketGame = () => {
    const navigate = useNavigate();

    const {
        game,
        players,
        loading
    } = useContext(CricketContext);

    const onNewGame = () => {
        navigate("/cricket", { replace: true });
    };

    const onFinishGame = () => {
        navigate("/", { replace: true });
    };

    const onRestartGame = async () => {
        let newMatchSetup = { ...CricketModels.CricketModel };
        newMatchSetup.isSoloGame = game.players.length === 1;
        newMatchSetup.startingScore = game.startingScore;
        newMatchSetup.numberOfPlayers = game.players.length;
        newMatchSetup.currentPlayerTurn = game.players[0];
        newMatchSetup.players = game.players;
        newMatchSetup.playerModels = {};
        game.players.forEach(player => {
            let cricketPlayerModel = { ...CricketModels.CricketPlayerModel };
            cricketPlayerModel.score = Number(game.startingScore);
            newMatchSetup.playerModels[player] = cricketPlayerModel;
        });

        let newGame = await CricketService.createCricket(newMatchSetup)
        navigate('/cricket/' + newGame.id);
    };

    if (loading.initGameLoading) {
        return (
            <PageLoader />
        )
    }

    return (
        <Fragment>
            <div className="d-flex justify-content-center mb-4">
                <div className="d-flex flex-column align-items-center rounded-bottom-4 bg-shade701 p-2 px-4">
                    <div className="text-shade100 fw-semibold fs-7">Cricket</div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row justify-content-md-center">
                    {game.players.length > 0 && game.players.map((playerId, idx) => (
                        <div
                            key={`score-board-col-${idx}`}
                            className={`col-12 col-md-6 col-xxl-3 border-top border-bottom border-opacity-50 ${Number(idx) < players.length - 1 ? 'border-end-md' : ''}`}
                        >
                            <CricketScoreBoard key={`score-board-${idx}`} playerId={playerId} idx={idx} />
                        </div>
                    ))}
                </div>
            </div>
            <CricketScoreInputBoard />
            {game.hasWinner && (
                <div className="container-fluid mt-4">
                    <div className="row">
                        <div className="col d-flex justify-content-center align-items-center">
                            <span className="p-buttonset">
                                <Button
                                    label="PLAY AGAIN"
                                    icon="pi pi-sync"
                                    onClick={onRestartGame}
                                    size="small"
                                    severity="primary"
                                />
                                <Button
                                    label="NEW GAME"
                                    icon="pi pi-plus"
                                    onClick={onNewGame}
                                    size="small"
                                    outlined
                                    severity="primary"
                                />
                                <Button
                                    label="BACK HOME"
                                    icon="pi pi-home"
                                    onClick={onFinishGame}
                                    size="small"
                                    outlined
                                    severity="primary"
                                />
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default CricketGame;
