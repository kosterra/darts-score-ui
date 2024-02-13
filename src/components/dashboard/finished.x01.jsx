import React, { Fragment, useState, useEffect } from 'react';

import {
    Card,
    ListGroup,
    Row,
    Col,
    Button
} from 'react-bootstrap';

import {
    FaChartBar
} from "react-icons/fa";

import X01Service from '../../services/x01.service';
import PlayerService from '../../services/player.service';
import dayjs from "dayjs";

const FinishedX01Games = () => {
    const [x01Games, setX01Games] = useState([]);
    const [index, setIndex] = useState(3);
    const [isCompleted, setIsCompleted] = useState(false);
    const [players, setPlayers] = useState([]);

    const initialX01Games = x01Games.slice(0, index);

    const loadFinishedX01Games = async () => {
        let data = await X01Service.loadFinishedX01Games();
        setX01Games(data);
    }

    const loadPlayers = async () => {
        let data = await PlayerService.loadPlayers('');
        setPlayers(data);
    }

    const loadMore = () => {
        setIndex(index + 2)
        if (index >= x01Games.length) {
            setIsCompleted(true);
        } else {
            setIsCompleted(false);
        }
    }

    useEffect(() => {
        loadFinishedX01Games();
        loadPlayers();
    }, []);

    return (
        <Fragment>
            {x01Games.length > 0 &&
                <Col className="col-12 col-md-6 col-lg-4 col-xl-3 mb-3">
                    <Card className="rounded-0 border-0 bg-secondary">
                        <Card.Body className="m-0 p-0 border-0 rounded-0">
                            <Card.Title className="bg-primary p-2 mb-0 text-white text-center span">
                                <div className="fs-6 fw-semibold">X01</div>
                                <div className="fs-8 mt-1">Recently Finished</div>
                            </Card.Title>
                            <Card.Text as="div" className="p-2 text-white">
                                <ListGroup variant="flush">
                                    {initialX01Games.length > 0 && initialX01Games.map((x01Game, idx) => (
                                        <ListGroup.Item key={idx} className="bg-transparent mb-1 border-solid-grey">
                                            <div>
                                                {players.length > 0 && x01Game.players.map((playerId, idx) => (
                                                    <Row key={idx}>
                                                        <Col className="text-white fs-8">
                                                            {((players || []).find(player => player.id === playerId) || {}).nickname || 'N / A'}
                                                            {x01Game.playerModels[playerId].hasWonGame &&
                                                                <i className="ms-1 text-gold fas fa-trophy"></i>
                                                            }
                                                        </Col>
                                                        <Col className="text-white text-center fs-8">{x01Game.playerModels[playerId].setsWon}</Col>
                                                    </Row>
                                                ))}
                                            </div>
                                            <div className="d-flex justify-content-between align-items-end mt-2">
                                                <span className="fs-9 text-gray">{dayjs(x01Game.createdAt).format("DD.MM.YYYY HH:mm")}</span>
                                                <Button variant="primary" href={'/x01/' + x01Game.id} className="py-1">
                                                    <FaChartBar title="Show Statistics" />
                                                </Button>
                                            </div>
                                        </ListGroup.Item>
                                    ))}
                                    {initialX01Games.length < 1 &&
                                        <span className="text-center fs-7">No finished games yet.</span>
                                    }
                                </ListGroup>
                                {!isCompleted &&
                                    <div className="d-flex justify-content-center mt-2">
                                        <Button variant="primary" onClick={loadMore}>
                                            Load More +
                                        </Button>
                                    </div>
                                }
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            }
        </Fragment>
    )
}

export default FinishedX01Games;