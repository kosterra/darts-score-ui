import React, { Fragment, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Container,
    Row,
    Col,
    Button
} from 'react-bootstrap';

import { Rings } from 'react-loader-spinner';

import CricketContext from '../../utils/cricket.context';
import CricketModels from '../../models/cricket.models';
import CricketService from '../../services/cricket.service';

import CricketScoreBoard from './cricket.scoreboard';
import CricketScoreInputBoard from './cricket.score.input.board';

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
        let newMatchSetup = {...CricketModels.CricketModel};
        newMatchSetup.isSoloGame = game.players.length === 1;
        newMatchSetup.startingScore = game.startingScore;
        newMatchSetup.numberOfPlayers = game.players.length;
        newMatchSetup.currentPlayerTurn = game.players[0];
        newMatchSetup.players = game.players;
        newMatchSetup.playerModels = {};
		game.players.forEach(player => {
			let cricketPlayerModel = {...CricketModels.CricketPlayerModel};
			cricketPlayerModel.score = Number(game.startingScore);
			newMatchSetup.playerModels[player] = cricketPlayerModel;
		});

		let newGame = await CricketService.createCricket(newMatchSetup)
        navigate('/cricket/' + newGame.id);
	};

    if (loading.initGameLoading) {
        return (
            <Container fluid className="m-5">
                <div className="d-flex justify-content-center align-items-center">
                    <span className="display-2 me-2 fw-600 text-white">L</span>
                    <Rings
                        height="120"
                        width="120"
                        color="#528b6e"
                        radius="12"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="rings-loading"
                    />
                    <span className="display-2 ms-2 fw-600 text-white">ading</span>
                </div>
            </Container>
        )
    }

    return (
      <Fragment>
        <div>
            <div className="d-flex justify-content-center mb-2">
                <div className="d-flex flex-column align-items-center bbr-12 bg-tertiary-grey px-4 p-2">
                    <div className="fs-7">Cricket</div>
                </div>
            </div>
            <Container fluid>
                <Row className="justify-content-md-center">
                    {game.players.length > 0 && game.players.map((playerId, idx) => (
                        <Col key={`score-board-col-${idx}`} className={`col-3 border-dotted-top-grey border-dotted-bottom-grey ${Number(idx) < players.length - 1 ? 'border-dotted-end-grey' : ''}`}>
                            <CricketScoreBoard key={`score-board-${idx}`} playerId={playerId} idx={idx} />
                        </Col>
                    ))}
                </Row>
            </Container>
            {game.hasWinner && (
                <Container className="mt-4">
                    <Row>
                        <Col className="d-flex flex-column justify-content-center align-items-center gap-2">
                            <div className="d-grid gap-2 col-2 mx-auto">
                                <Button onClick={onRestartGame} variant="primary-green">
                                    <i className="fas fa-sync-alt pe-2" title='Restart'></i>
                                    PLAY AGAIN
                                </Button>
                                <Button onClick={onNewGame} variant="outline-primary-green">
                                    <i className="fas fa-plus pe-2" title='Plus'></i>
                                    NEW GAME
                                </Button>
                                <Button onClick={onFinishGame} variant="outline-primary-green">
                                    <i className="fas fa-home pe-2" title='Home'></i>
                                    BACK HOME
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            )}
            <CricketScoreInputBoard />
        </div>
      </Fragment>
    )
}
  
export default CricketGame;
