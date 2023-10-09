import React, { Fragment, useState, useEffect } from 'react';

import {
    Card,
    ListGroup,
    Row,
    Col,
    Button
} from 'react-bootstrap';

import CricketService from '../../services/cricket.service';
import PlayerService from '../../services/player.service';
import dayjs from "dayjs";

const FinishedCricketGames = () => {
    const [cricketGames, setCricketGames] = useState([]);
    const [index, setIndex] = useState(3);
    const [isCompleted, setIsCompleted] = useState(false);
    const [players, setPlayers] = useState([]);

    const initialCricketGames = cricketGames.slice(0, index);

    const loadFinishedCricketGames = async () => {
        let data = await CricketService.loadFinishedCricketGames();
        setCricketGames(data);
    }

    const loadPlayers = async () => {
        let data = await PlayerService.loadPlayers('');
        setPlayers(data);
    }

    const loadMore = () => {
        setIndex(index + 2)
        if (index >= cricketGames.length) {
          setIsCompleted(true);
        } else {
          setIsCompleted(false);
        }
    }

    useEffect(() => {
		loadFinishedCricketGames();
        loadPlayers();
	}, []);

    return (
        <Fragment>
            {cricketGames.length > 0 &&
                <Col className="col-3">
                    <Card className="rounded-0 border-0 bg-secondary-grey">
                        <Card.Body className="m-0 p-0 border-0 rounded-0">
                            <Card.Title className="bg-primary-green p-2 mb-0 text-white text-center span">
                                <div className="fs-6 fw-600">Cricket</div>
                                <div className="fs-8 mt-1">Recently Finished</div>
                            </Card.Title>
                            <Card.Text as="div" className="p-2 text-white">
                                <ListGroup variant="flush">
                                    {initialCricketGames.length > 0 && initialCricketGames.map((cricketGame, idx) => (
                                        <ListGroup.Item key={idx} className="bg-transparent mb-1 border-solid-grey">
                                            <div>
                                                { players.length > 0 && cricketGame.players.map((playerId, idx) => (
                                                    <Row key={idx}>
                                                        <Col className="text-white fs-8">
                                                            { ((players || []).find(player => player.id === playerId) || {}).nickname || 'N / A' }
                                                            { cricketGame.playerModels[playerId].hasWonGame &&
                                                                <i className="ms-1 text-gold fas fa-trophy"></i>
                                                            }
                                                        </Col>
                                                    </Row>
                                                ))}
                                            </div>
                                            <div className="d-flex justify-content-between align-items-end mt-2">
                                                <span className="fs-9 text-grey">{ dayjs(cricketGame.createdAt).format("DD.MM.YYYY HH:mm") }</span>
                                                <Button variant="primary-green" href={'/cricket/' + cricketGame.id} className="py-1">
                                                    <i className="fas fa-external-link-alt"></i>
                                                </Button>
                                            </div>
                                        </ListGroup.Item>
                                    ))}
                                    { initialCricketGames.length < 1 &&
                                        <span className="text-center fs-7">No finished games yet.</span>
                                    }
                                </ListGroup>
                                {!isCompleted &&
                                    <div className="d-flex justify-content-center mt-2">
                                        <Button variant="primary-green" onClick={loadMore}>
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
  
export default FinishedCricketGames;