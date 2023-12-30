import React, { Fragment } from 'react';

import { 
  Col,
  Row
} from 'react-bootstrap';

import X01StatsScoreBoardPlayer from './x01.stats.scoreboard.player.item';

import dayjs from 'dayjs';

const X01StatsScoreBoardMultiple = (props) => {
    const {
      players,
      game
    } = props

    return (
        <Fragment>
            <Row className="p-3 border-dotted-top-grey">
                <Col className="d-flex justify-content-center align-items-center">
                    <div className="d-flex flex-column justify-content-center">
                        <div className="align-self-center fs-8 fw-400 text-white">
                            { dayjs(game.createdAt).format("DD.MM.YYYY HH:mm") }
                        </div>
                        <div className="align-self-center fs-8 fw-400 text-grey">
                            { game.gameIsRunning ? 'Running' : 'Finished' }
                        </div>
                    </div>
                </Col>
            </Row>
            <Row className="mb-3 p-3 border-dotted-bottom-grey">
                {game.players.map((player, idx) => (
                    <Col key={ 'player' + idx } className="d-flex justify-content-center align-items-center">
                        <div className="d-flex flex-column justify-content-center">
                            <X01StatsScoreBoardPlayer player={ players.find(item => item.id == player) } />
                            <div className="align-self-center fs-1 fw-400">
                                { game.playerModels[player].setsWon }
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </Fragment>
    );
};

export default X01StatsScoreBoardMultiple;