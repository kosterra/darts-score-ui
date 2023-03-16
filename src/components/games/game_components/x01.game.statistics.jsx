import React from 'react';

import Avatar from 'react-avatar';
import Container from 'react-bootstrap/Container';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ComparisonBar from '../../elements/comparison.bar';

import dayjs from "dayjs";

const X01GameStatistics = props => {
    const {
        game,
        players
    } = props;

    return (
        <Container className="w-50 mb-4">
            <Row className="mb-3 p-3 border-dotted-top-grey border-dotted-bottom-grey">
                <Col className="d-flex justify-content-center align-items-center">
                    <div className="d-flex flex-column justify-content-center">
                        <Avatar
                            name={`${players.find(player => player.id === game.players[0]).firstname} ${players.find(player => player.id === game.players[0]).lastname}`}
                            src={ `${players.find(player => player.id === game.players[0]).profileImg}` }
                            size="80"
                            round={true}
                            color="#565656"
                            textSizeRatio={0.2}
                            className="align-self-center"
                        />
                        <div className="mt-2 align-self-center fs-7 fw-600">
                            {players.find(player => player.id === game.players[0]).nickname}
                        </div>
                        <div className="align-self-center fs-7 fw-500">
                            {players.find(player => player.id === game.players[0]).firstname} {players.find(player => player.id === game.players[0]).lastname}
                        </div>
                    </div>
                </Col>
                <Col className="d-flex justify-content-center align-items-center">
                    <div className="d-flex flex-column justify-content-center">
                        <div className="align-self-center fs-8 fw-400 text-white">
                            { dayjs(game.createdAt).format("DD.MM.YYYY HH:mm") }
                        </div>
                        <div className="align-self-center fs-1 fw-400">
                            { game.playerModels[game.players[0]].setsWon + ' - ' + game.playerModels[game.players[1]].setsWon }
                        </div>
                        <div className="align-self-center fs-8 fw-400">
                            { game.gameIsRunning ? 'Running' : 'Finished' }
                        </div>
                    </div>
                </Col>
                <Col className="d-flex justify-content-center align-items-center">
                    <div className="d-flex flex-column justify-content-center">
                        <Avatar
                            name={`${players.find(player => player.id === game.players[1]).firstname} ${players.find(player => player.id === game.players[1]).lastname}`}
                            src={ `${players.find(player => player.id === game.players[1]).profileImg}` }
                            size="80"
                            round={true}
                            color="#565656"
                            textSizeRatio={0.2}
                            className="align-self-center"
                        />
                        <div className="mt-2 align-self-center fs-7 fw-600">
                            { players.find(player => player.id === game.players[1]).nickname }
                        </div>
                        <div className="align-self-center fs-7 fw-500">
                            { players.find(player => player.id === game.players[1]).firstname } { players.find(player => player.id === game.players[1]).lastname }
                        </div>
                    </div>
                </Col>
            </Row>
            <Tabs
                defaultActiveKey="overall"
                variant="pills"
                className="mb-3"
            >
                <Tab eventKey="overall" title="Overall">
                    <ComparisonBar
                        title="Won Legs"
                        barLValue={game.playerModels[game.players[0]].legsWon.game}
                        barRValue={game.playerModels[game.players[1]].legsWon.game} />
                    <ComparisonBar
                        title="180s"
                        barLValue={game.playerModels[game.players[0]].scoreRanges['game'].hasOwnProperty('180') ? game.playerModels[game.players[0]].scoreRanges['game']['180'] : 0}
                        barRValue={game.playerModels[game.players[1]].scoreRanges['game'].hasOwnProperty('180') ? game.playerModels[game.players[1]].scoreRanges['game']['180'] : 0}
                    />
                    <ComparisonBar
                        title="140+"
                        barLValue={
                            (game.playerModels[game.players[0]].scoreRanges['game'].hasOwnProperty("140-159") ? game.playerModels[game.players[0]].scoreRanges['game']['140-159'] : 0) +
                            (game.playerModels[game.players[0]].scoreRanges['game'].hasOwnProperty("160-179") ? game.playerModels[game.players[0]].scoreRanges['game']['160-179'] : 0)
                        }
                        barRValue={
                            (game.playerModels[game.players[1]].scoreRanges['game'].hasOwnProperty("140-159") ? game.playerModels[game.players[1]].scoreRanges['game']['140-159'] : 0) +
                            (game.playerModels[game.players[1]].scoreRanges['game'].hasOwnProperty("160-179") ? game.playerModels[game.players[1]].scoreRanges['game']['160-179'] : 0)
                        }
                    />
                    <ComparisonBar
                        title="100+"
                        barLValue={
                            (game.playerModels[game.players[0]].scoreRanges['game'].hasOwnProperty("100-119") ? game.playerModels[game.players[0]].scoreRanges['game']['100-119'] : 0) +
                            (game.playerModels[game.players[0]].scoreRanges['game'].hasOwnProperty("120-139") ? game.playerModels[game.players[0]].scoreRanges['game']['120-139'] : 0)
                        }
                        barRValue={
                            (game.playerModels[game.players[1]].scoreRanges['game'].hasOwnProperty("100-119") ? game.playerModels[game.players[1]].scoreRanges['game']['100-119'] : 0) +
                            (game.playerModels[game.players[1]].scoreRanges['game'].hasOwnProperty("120-139") ? game.playerModels[game.players[1]].scoreRanges['game']['120-139'] : 0)
                        }
                    />
                    <ComparisonBar
                        title="Average"
                        barLValue={Math.round(game.playerModels[game.players[0]].averages.game.begMidGame)}
                        barRValue={Math.round(game.playerModels[game.players[1]].averages.game.begMidGame)}
                    />
                    <ComparisonBar
                        title="Checkouts"
                        unit="%"
                        barLValue={Math.round((100 / game.playerModels[game.players[0]].checkout['game'].total) * game.playerModels[game.players[0]].checkout['game'].hit)}
                        barRValue={Math.round((100 / game.playerModels[game.players[1]].checkout['game'].total) * game.playerModels[game.players[1]].checkout['game'].hit)}
                        barLSubvalue={'(' + game.playerModels[game.players[0]].checkout['game'].hit + '/' + game.playerModels[game.players[0]].checkout['game'].total + ')'}
                        barRSubvalue={'(' + game.playerModels[game.players[1]].checkout['game'].hit + '/' + game.playerModels[game.players[1]].checkout['game'].total + ')'}
                    />
                </Tab>

                {[...Array(game.setsPlayed)].map((e, i) => (
                    <Tab
                        key={`set-tab-${i}`}
                        eventKey={`set-${i}`}
                        title={`Set ${i+1}`}>

                        <ComparisonBar
                            title="Won Legs"
                            barLValue={game.playerModels[game.players[0]].legsWon.hasOwnProperty('set-' + (i+1)) ? game.playerModels[game.players[0]].legsWon['set-' + (i+1)] : 0}
                            barRValue={game.playerModels[game.players[1]].legsWon.hasOwnProperty('set-' + (i+1)) ? game.playerModels[game.players[1]].legsWon['set-' + (i+1)] : 0} />
                        <ComparisonBar
                            title="180s"
                            barLValue={game.playerModels[game.players[0]].scoreRanges['set-' + (i+1)].hasOwnProperty('180') ? game.playerModels[game.players[0]].scoreRanges['set-' + (i+1)]['180'] : 0}
                            barRValue={game.playerModels[game.players[1]].scoreRanges['set-' + (i+1)].hasOwnProperty('180') ? game.playerModels[game.players[1]].scoreRanges['set-' + (i+1)]['180'] : 0}
                        />
                        <ComparisonBar
                            title="140+"
                            barLValue={
                                (game.playerModels[game.players[0]].scoreRanges['set-' + (i+1)].hasOwnProperty("140-159") ? game.playerModels[game.players[0]].scoreRanges['set-' + (i+1)]['140-159'] : 0) +
                                (game.playerModels[game.players[0]].scoreRanges['set-' + (i+1)].hasOwnProperty("160-179") ? game.playerModels[game.players[0]].scoreRanges['set-' + (i+1)]['160-179'] : 0)
                            }
                            barRValue={
                                (game.playerModels[game.players[1]].scoreRanges['set-' + (i+1)].hasOwnProperty("140-159") ? game.playerModels[game.players[1]].scoreRanges['set-' + (i+1)]['140-159'] : 0) +
                                (game.playerModels[game.players[1]].scoreRanges['set-' + (i+1)].hasOwnProperty("160-179") ? game.playerModels[game.players[1]].scoreRanges['set-' + (i+1)]['160-179'] : 0)
                            }
                        />
                        <ComparisonBar
                            title="100+"
                            barLValue={
                                (game.playerModels[game.players[0]].scoreRanges['set-' + (i+1)].hasOwnProperty("100-119") ? game.playerModels[game.players[0]].scoreRanges['set-' + (i+1)]['100-119'] : 0) +
                                (game.playerModels[game.players[0]].scoreRanges['set-' + (i+1)].hasOwnProperty("120-139") ? game.playerModels[game.players[0]].scoreRanges['set-' + (i+1)]['120-139'] : 0)
                            }
                            barRValue={
                                (game.playerModels[game.players[1]].scoreRanges['set-' + (i+1)].hasOwnProperty("100-119") ? game.playerModels[game.players[1]].scoreRanges['set-' + (i+1)]['100-119'] : 0) +
                                (game.playerModels[game.players[1]].scoreRanges['set-' + (i+1)].hasOwnProperty("120-139") ? game.playerModels[game.players[1]].scoreRanges['set-' + (i+1)]['120-139'] : 0)
                            }
                        />
                        <ComparisonBar
                            title="Average"
                            barLValue={Math.round(game.playerModels[game.players[0]].averages['set-' + (i+1)].begMidSet)}
                            barRValue={Math.round(game.playerModels[game.players[1]].averages['set-' + (i+1)].begMidSet)}
                        />
                        <ComparisonBar
                            title="Checkouts"
                            unit="%"
                            barLValue={Math.round((100 / game.playerModels[game.players[0]].checkout['set-' + (i+1)].total) * game.playerModels[game.players[0]].checkout['set-' + (i+1)].hit)}
                            barRValue={Math.round((100 / game.playerModels[game.players[1]].checkout['set-' + (i+1)].total) * game.playerModels[game.players[1]].checkout['set-' + (i+1)].hit)}
                            barLSubvalue={'(' + game.playerModels[game.players[0]].checkout['set-' + (i+1)].hit + '/' + game.playerModels[game.players[0]].checkout['set-' + (i+1)].total + ')'}
                            barRSubvalue={'(' + game.playerModels[game.players[1]].checkout['set-' + (i+1)].hit + '/' + game.playerModels[game.players[1]].checkout['set-' + (i+1)].total + ')'}
                        />
                    </Tab>
                ))}
            </Tabs>
        </Container>
    )
}
    
export default X01GameStatistics;