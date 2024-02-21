import React, { Fragment } from 'react';

import { 
  Col,
  Row
} from 'react-bootstrap';

import X01StatsScoreBoardPlayer from './x01.stats.scoreboard.player.item';

import dayjs from 'dayjs';

const X01StatsScoreBoard = (props) => {
    const {
      players,
      game
    } = props

    return (
      <Fragment>
          <Row className="mb-3 p-3 border-dotted-top-grey border-dotted-bottom-grey">
              <Col className="d-flex justify-content-center align-items-center">
                  <X01StatsScoreBoardPlayer player={ players.find(player => player.id === game.players[0]) } />
              </Col>
              <Col className="d-flex justify-content-center align-items-center">
                  <div className="d-flex flex-column justify-content-center">
                        <div className="align-self-center fs-8 font-weight-normal text-white">
                          { dayjs(game.createdAt).format("DD.MM.YYYY HH:mm") }
                      </div>
                        <div className="align-self-center fs-1 font-weight-normal">
                          { game.playerModels[game.players[0]].setsWon + ' - ' + game.playerModels[game.players[1]].setsWon }
                      </div>
                        <div className="align-self-center fs-8 font-weight-normal">
                          { game.gameIsRunning ? 'Running' : 'Finished' }
                      </div>
                  </div>
              </Col>
              <Col className="d-flex justify-content-center align-items-center">
                  <X01StatsScoreBoardPlayer player={ players.find(player => player.id === game.players[1]) } />
              </Col>
          </Row>
      </Fragment>
    );
};

export default X01StatsScoreBoard;