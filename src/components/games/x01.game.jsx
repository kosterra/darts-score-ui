import React, { Fragment, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Container,
    Row,
    Col,
    Button
} from 'react-bootstrap';

import {
    FaChartBar
} from "react-icons/fa";

import X01Context from '../../utils/x01.context';
import X01Models from '../../models/x01.models';
import X01Service from '../../services/x01.service';

import X01ScoreBoard from './x01.scoreboard';
import X01StatisticsBoard from './x01.statisticsboard';
import X01ScoreInputBoard from './x01.score.input.board';
import X01GameHeader from './x01.game.header';
import PageLoader from '../elements/page.loader';
import X01GameStats from '../stats/x01.game.stats';

const X01Game = () => {
    const navigate = useNavigate();

    const {
        game,
        players,
        loading
    } = useContext(X01Context);

	const onShowStatistics = () => {
		navigate("/stats/games/x01/" + game.id, { replace: true });
	};

	const onNewGame = () => {
		navigate("/x01", { replace: true });
	};

	const onFinishGame = () => {
		navigate("/", { replace: true });
	};

	const onRestartGame = async () => {
        let newMatchSetup = {...X01Models.X01Model};
        newMatchSetup.isSoloGame = game.players.length === 1;
        newMatchSetup.startingScore = game.startingScore;
        newMatchSetup.setMode = game.setMode;
        newMatchSetup.legMode = game.legMode;
        newMatchSetup.legInMode = game.legInMode;
        newMatchSetup.legOutMode = game.legOutMode;
        newMatchSetup.numberOfSets = game.numberOfSets;
        newMatchSetup.numberOfLegs = game.numberOfLegs;
        newMatchSetup.numberOfPlayers = game.players.length;
        newMatchSetup.startingPlayerLeg = game.players[0];
        newMatchSetup.startingPlayerSet = game.players[0];
        newMatchSetup.currentPlayerTurn = game.players[0];
        newMatchSetup.players = game.players;
        newMatchSetup.playerModels = {};
		game.players.forEach(player => {
			let x01PlayerModel = {...X01Models.X01PlayerModel};
			x01PlayerModel.score = Number(game.startingScore);
			newMatchSetup.playerModels[player] = x01PlayerModel;
		});

		let newGame = await X01Service.createX01(newMatchSetup)
        navigate('/x01/' + newGame.id);
	};

    if (loading.initGameLoading) {
        return (
            <PageLoader />
        )
    }

    return (
      <Fragment>
        <div>
            {!game.hasWinner && (
                <Fragment>
                    <X01GameHeader
                        setMode={ game.setMode }
                        numberOfSets={ game.numberOfSets }
                        legMode={ game.legMode }
                        numberOfLegs={ game.numberOfLegs }
                        legInMode={ game.legInMode }
                        legOutMode={ game.legOutMode }
                    />
                    <Container fluid>
                        <Row className="justify-content-md-center">
                            {game.players.length > 0 && game.players.map((playerId, idx) => (
                                <Col key={`score-board-col-${idx}`} className={`col-3 border-dotted-top-grey border-dotted-bottom-grey ${Number(idx) < players.length - 1 ? 'border-dotted-end-grey' : ''}`}>
                                    <X01ScoreBoard key={`score-board-${idx}`} playerId={playerId} idx={idx} />
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </Fragment>
            )}
            {game.hasWinner && (
                <Container className="pb-4">
                    <Row>
                        <Col className="d-flex flex-column justify-content-center align-items-center gap-2">
                            <X01GameStats game={game} players={players} />
                            <div className="d-grid gap-2 col-2 mx-auto">
                                <Button onClick={onShowStatistics} variant="primary-green">
                                    <FaChartBar className="pe-2 fs-4" />
                                    All Statistics
                                </Button>
                                <Button onClick={onRestartGame} variant="outline-primary-green">
                                    <i className="fas fa-sync-alt pe-2" title='Restart'></i>
                                    Play Again
                                </Button>
                                <Button onClick={onNewGame} variant="outline-primary-green">
                                    <i className="fas fa-plus pe-2" title='Plus'></i>
                                    New Game
                                </Button>
                                <Button onClick={onFinishGame} variant="outline-primary-green">
                                    <i className="fas fa-home pe-2" title='Home'></i>
                                    Back Home
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            )}
            <X01ScoreInputBoard />
            {!game.hasWinner && (
                <Container fluid className="mt-4">
                    <Row className="justify-content-md-center">
                        {game.players.length > 0 && game.players.map((playerId, idx) => (
                            <Col key={`statistics-board-col-${idx}`} className={`col-3 border-dotted-top-grey border-dotted-bottom-grey ${Number(idx) < players.length - 1 ? 'border-dotted-end-grey' : ''}`}>
                                <X01StatisticsBoard key={`statistics-board-${idx}`} playerId={playerId} />
                            </Col>
                        ))}
                    </Row>
                </Container>
            )}
        </div>
      </Fragment>
    )
}
  
export default X01Game;
