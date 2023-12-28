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

import CricketService from '../../services/cricket.service';
import PlayerService from '../../services/player.service';
import dayjs from "dayjs";

const RunningCricketGames = () => {
    const [cricketGames, setCricketGames] = useState([]);
    const [players, setPlayers] = useState([]);

    useEffect(() => {
		loadRunningCricketGames();
        loadPlayers();
	}, []);

    const loadRunningCricketGames = async () => {
        let data = await CricketService.loadRunningCricketGames();
        setCricketGames(data);
    }

    const loadPlayers = async () => {
        let data = await PlayerService.loadPlayers('');
        setPlayers(data);
    }

    return (
        <Fragment>
            {cricketGames.length > 0 &&
                <Col className="col-12 col-md-6 col-lg-4 col-xl-3 mb-3">
                    <Card className="rounded-0 border-0 bg-secondary-grey">
                        <Card.Body className="m-0 p-0 border-0 rounded-0">
                            <Card.Title className="bg-primary-green p-2 mb-0 text-white text-center span">
                                <div className="fs-6 fw-600">Cricket</div>
                                <div className="fs-8 mt-1">Currently Running</div>
                            </Card.Title>
                            <Card.Text as="div" className="p-2 text-white">
                                <ListGroup variant="flush">
                                    {cricketGames.length > 0 && cricketGames.map((cricketGame, idx) => (
                                        <ListGroup.Item key={idx} className="bg-transparent mb-1 border-solid-grey">
                                            <div>
                                                { players.length > 0 && cricketGame.players.map((playerId, idx) => (
                                                    <Row key={idx}>
                                                        <Col className="text-white fs-8">{ ((players || []).find(player => player.id === playerId) || {}).nickname || 'N / A' }</Col>
                                                    </Row>
                                                ))}
                                            </div>
                                            <div className="d-flex justify-content-between align-items-end mt-2">
                                                <span className="fs-9 text-grey">{ dayjs(cricketGame.createdAt).format("DD.MM.YYYY HH:mm") }</span>
                                                <Button variant="primary-green" href={'/cricket/' + cricketGame.id} className="py-1">
                                                    <FaChartBar title="Show Statistics" />
                                                </Button>
                                            </div>
                                        </ListGroup.Item>
                                    ))}
                                    {cricketGames.length === 0 &&
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
  
export default RunningCricketGames;