import React, { Fragment, useState, useEffect } from 'react';

import {
    Card,
    ListGroup,
    Row,
    Col,
    Button
} from 'react-bootstrap';

import X01Service from '../../services/x01.service';
import PlayerService from '../../services/player.service';
import dayjs from "dayjs";

const RunningX01Games = () => {
    const [x01Games, setX01Games] = useState([]);
    const [players, setPlayers] = useState([]);

    useEffect(() => {
		loadRunningX01Games();
        loadPlayers();
	}, []);

    const loadRunningX01Games = async () => {
        let data = await X01Service.loadRunningX01Games();
        setX01Games(data);
    }

    const loadPlayers = async () => {
        let data = await PlayerService.loadPlayers('');
        setPlayers(data);
    }

    return (
        <Fragment>
            {x01Games.length > 0 &&
                <Col className="col-3">
                    <Card className="rounded-0 border-0 bg-secondary-grey">
                        <Card.Body className="m-0 p-0 border-0 rounded-0">
                            <Card.Title className="bg-primary-green p-2 mb-0 text-white text-center span">
                                <div className="fs-6 fw-600">X01</div>
                                <div className="fs-8 mt-1">Currently Running</div>
                            </Card.Title>
                            <Card.Text as="div" className="p-2 text-white">
                                <ListGroup variant="flush">
                                    {x01Games.length > 0 && x01Games.map((x01Game, idx) => (
                                        <ListGroup.Item key={idx} className="bg-transparent mb-1 border-solid-grey">
                                            <div>
                                                { players.length > 0 && x01Game.players.map((playerId, idx) => (
                                                    <Row key={idx}>
                                                        <Col className="text-white fs-8">{ ((players || []).find(player => player.id === playerId) || {}).nickname || 'N / A' }</Col>
                                                        <Col className="text-white text-center fs-8">{ x01Game.playerModels[playerId].setsWon }</Col>
                                                        <Col className="text-white text-center fs-8">{ x01Game.playerModels[playerId].currentSetLegsWon }</Col>
                                                    </Row>
                                                ))}
                                            </div>
                                            <div className="d-flex justify-content-between align-items-end mt-2">
                                                <span className="fs-9 text-grey">{ dayjs(x01Game.createdAt).format("DD.MM.YYYY HH:mm") }</span>
                                                <Button variant="primary-green" href={'/x01/' + x01Game.id} className="py-1">
                                                    <i className="fas fa-external-link-alt"></i>
                                                </Button>
                                            </div>
                                        </ListGroup.Item>
                                    ))}
                                    {x01Games.length === 0 &&
                                        <span className="text-center fs-7">No running games yet.</span>
                                    }
                                </ListGroup>
                            </Card.Text>
                        </Card.Body>               
                    </Card>
                </Col>
            }
        </Fragment>
    )
}
  
export default RunningX01Games;