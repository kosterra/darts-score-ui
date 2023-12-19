import React, { Fragment, useContext } from 'react';
import { useNavigate } from "react-router-dom";

import {
    Container,
    Row,
    Col
} from 'react-bootstrap';

import X01Context from '../../utils/x01.context';

import X01ScoreBoard from './x01.scoreboard';
import X01StatisticsBoard from './x01.statisticsboard';
import X01ScoreInputBoard from './x01.score.input.board';
import X01GameHeader from './x01.game.header';
import PageLoader from '../elements/page.loader';

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
        <div>
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
            <X01ScoreInputBoard />
            <Container fluid className="mt-4">
                <Row className="justify-content-md-center">
                    {game.players.length > 0 && game.players.map((playerId, idx) => (
                        <Col key={`statistics-board-col-${idx}`} className={`col-3 border-dotted-top-grey border-dotted-bottom-grey ${Number(idx) < players.length - 1 ? 'border-dotted-end-grey' : ''}`}>
                            <X01StatisticsBoard key={`statistics-board-${idx}`} playerId={playerId} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
      </Fragment>
    )
}
  
export default X01Game;
