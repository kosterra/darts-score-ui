import React, { Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
    Button,
    ButtonGroup,
    Card,
    Col,
    Container,
    InputGroup,
    Modal,
    Row,
    ToggleButton
} from 'react-bootstrap';

import dayjs from "dayjs";

import PlayerService from '../../services/player.service';
import CricketService from '../../services/cricket.service';

const EditableCard = (props) => {
    const {
        cricketGame,
        players,
        deleteCricketGame
    } = props

    const handleCricketGameDelete = () => {
        deleteCricketGame(cricketGame);
    }

    return (
        <Col className="mb-3">
            <Card as='div'
                className={`m-0 p-0 rounded-0 editable-card card-list-card bg-tertiary-grey`}>
                <Card.Body className="m-0 p-0 border-0 rounded-0 bg-tertiary">
                    <Card.Text as="div" className="pt-3 pb-2 text-white">
                        <Container>
                            <Row className="mb-3">
                                <span className="fw-600 fs-7">
                                    { cricketGame.gameIsRunning ? 'Running' : 'Finished' }
                                </span>
                            </Row>
                            <Row>
                                { players.length > 0 && cricketGame.players.map((playerId, idx) => (
                                    <Row key={idx}>
                                        <Col className="text-white fs-8">
                                            { ((players || []).find(player => player.id === playerId) || {}).nickname || 'N / A' }
                                            { cricketGame.playerModels[playerId].hasWonGame &&
                                                <i className="ms-1 text-gold fas fa-trophy"></i>
                                            }
                                        </Col>
                                        <Col className="text-white text-center fs-8">{ cricketGame.playerModels[playerId].setsWon }</Col>
                                    </Row>
                                ))}
                            </Row>
                            <Row>
                                <div className="d-flex justify-content-between align-items-end mt-2">
                                    <span className="fs-9 text-grey">{ dayjs(cricketGame.createdAt).format("DD.MM.YYYY HH:mm") }</span>
                                    <div>
                                        <Button variant="primary-green" href={'/cricket/' + cricketGame.id} className="me-1">
                                            <i className="fas fa-external-link-alt"></i>
                                        </Button>
                                        <Button variant="red" onClick={handleCricketGameDelete}>
                                            <i className="fas fa-trash-alt"></i>
                                        </Button>
                                    </div>
                                </div>
                            </Row>
                        </Container>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
}

const CricketEditList = (props) => {
    const { emptyText } = props

    const [cricketGames, setCricketGames] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [cricketGameToDelete, setCricketGameToDelete] = useState(null);
    const [players, setPlayers] = useState([]);
    const [statusFilterValue, setStatusFilterValue] = useState('1');

    const statusFilter = [
        { name: 'Running', value: '1' },
        { name: 'Finished', value: '2' },
        { name: 'All', value: '' }
    ];

    useEffect(() => {
        loadPlayers();
        loadCricketGames();
        // eslint-disable-next-line
    }, [ statusFilterValue ]);

    const cancelDeleteCricketGame = () => {
        setShowDeleteModal(false);
    };

    const handleCricketGameDelete = (cricketGame) => {
        setCricketGameToDelete(cricketGame);
        setShowDeleteModal(true);
    };

    const deleteCricketGame = async () => {
        if (cricketGameToDelete) {
            setShowDeleteModal(false);
            if (await CricketService.deleteCricket(cricketGameToDelete.id)) {
                setCricketGameToDelete({});
                toast.success('Successfully deleted cricket game: ' + cricketGameToDelete.id);
                loadCricketGames();
            } else {
                toast.error('Error on deleting cricket game: ' + cricketGameToDelete.id + '. Please try again or contact your system administrator');
            }
        }
    }

    const loadPlayers = async () => {
        let data = await PlayerService.loadPlayers('');
        setPlayers(data);
    }

    const loadCricketGames = async () => {
        let data;
        if (statusFilterValue === '1') {
            data = await CricketService.loadRunningCricketGames();
        } else if (statusFilterValue === '2') {
            data = await CricketService.loadFinishedCricketGames();
        } else {
            data = await CricketService.loadAllCricketGames();
        }
        setCricketGames(data);
    }

    return (
        <Fragment>
            <div className="d-flex justify-content-md-center align-items-center p-2 text-white">
                <InputGroup className="mb-3">
                    <ButtonGroup>
                        {statusFilter.map((filter, idx) => (
                            <ToggleButton
                                key={idx}
                                id={`status-filter-${idx}`}
                                type="radio"
                                variant="primary-green"
                                name="radio"
                                value={filter.value}
                                checked={statusFilterValue === filter.value}
                                onChange={(e) => setStatusFilterValue(e.currentTarget.value)}
                            >
                                {filter.name}
                            </ToggleButton>
                        ))}
                    </ButtonGroup>
                </InputGroup>
            </div>
            <Container className="editable-card-list card-list">
                {cricketGames.length > 0 &&
                    <Row xs={1} md={3}>
                        {cricketGames.map((item, idx) => (
                            <EditableCard
                                key={idx}
                                cricketGame={item}
                                players={players}
                                deleteCricketGame={handleCricketGameDelete}
                            />
                        ))}
                    </Row>
                }
                {cricketGames.length === 0 &&
                    <div className="d-flex justify-content-center mb-4">
                        <span className="empty-text text-primary-grey">{emptyText}</span>
                    </div>
                }
            </Container>
            <Modal show={showDeleteModal} onHide={cancelDeleteCricketGame} centered>
                <Modal.Header closeButton closeVariant="white">
                    <Modal.Title className="h6">Delete Cricket Game</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete cricket game {cricketGameToDelete ? cricketGameToDelete.id : 'unknown'} ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary-green" onClick={cancelDeleteCricketGame}>
                        No
                    </Button>
                    <Button variant="red" onClick={deleteCricketGame}>
                        Sure!
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
}

export default CricketEditList;