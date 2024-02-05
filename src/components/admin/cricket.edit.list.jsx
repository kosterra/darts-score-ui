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

import {
    FaTrash,
    FaChartBar
} from "react-icons/fa";

import { GiBullseye } from "react-icons/gi";
import { VscJson } from "react-icons/vsc";

import dayjs from "dayjs";

import PlayerService from '../../services/player.service';
import CricketService from '../../services/cricket.service';
import JSONViewer from '../elements/json.viewer';

const EditableCard = (props) => {
    const {
        cricketGame,
        players,
        deleteCricketGame,
        showRAWCricketGame,
        deleteActive = false,
        rawActive = false
    } = props

    const handleCricketGameDelete = () => {
        deleteCricketGame(cricketGame);
    }

    const handleCricketGameRAW = () => {
        showRAWCricketGame(cricketGame);
    }

    return (
        <Col className="mb-3">
            <Card as='div'
                className={`m-0 p-0 rounded-0 editable-card card-list-card bg-secondary-grey`}>
                <Card.Body className="m-0 p-0 border-0 rounded-0">
                    <Card.Title as="h6" className="bg-primary-green p-2 mb-0 text-white text-center span">
                        <div className="fs-5 fw-600">Cricket</div>
                        <span className="fw-500 fs-8">
                            { cricketGame.gameIsRunning ? 'Running' : 'Finished' }
                        </span>
                    </Card.Title>
                    <Card.Text as="div" className="pt-3 pb-2 text-white">
                        <Container>
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
                                        { cricketGame.gameIsRunning &&
                                            <Button variant="primary-green" href={'/cricket/' + cricketGame.id} className="me-1">
                                                <GiBullseye title="Continue Playing" />
                                            </Button>
                                        }
                                        { !cricketGame.gameIsRunning &&
                                            <Button variant="primary-green" href={'/stats/games/cricket/' + cricketGame.id} className="me-1">
                                                <FaChartBar title="Show Statistics" />
                                            </Button>
                                        }
                                        {!cricketGame.gameIsRunning && rawActive &&
                                            <Button variant="primary-grey" title="Show _raw data" onClick={handleCricketGameRAW} className="me-1">
                                                <VscJson />
                                            </Button>
                                        }
                                        { deleteActive &&
                                            <Button variant="red" onClick={handleCricketGameDelete}>
                                                <FaTrash title="Delete Game" />
                                            </Button>
                                        }
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
    const {
        emptyText,
        showStatusFilter = true,
        staticStatusValue = '1',
        deleteActive = false,
        rawActive = false
    } = props

    const [cricketGames, setCricketGames] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showRAWModal, setShowRAWModal] = useState(false);
    const [cricketGameToDelete, setCricketGameToDelete] = useState(null);
    const [cricketGameRAW, setCricketGameRAW] = useState({});
    const [players, setPlayers] = useState([]);
    const [statusFilterValue, setStatusFilterValue] = useState(staticStatusValue);

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

    const handleShowRAWCricketGame = (cricketGame) => {
        setCricketGameRAW(cricketGame);
        setShowRAWModal(true);
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
            { showStatusFilter &&
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
            }
            <Container className="editable-card-list card-list">
                {cricketGames.length > 0 &&
                    <Row xs={1} md={3}>
                        {cricketGames.map((item, idx) => (
                            <EditableCard
                                key={idx}
                                cricketGame={item}
                                players={players}
                                deleteCricketGame={handleCricketGameDelete}
                                showRAWCricketGame={handleShowRAWCricketGame}
                                deleteActive={deleteActive}
                                rawActive={rawActive}
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
                    <Button variant="primary-grey" onClick={cancelDeleteCricketGame}>
                        Cancel
                    </Button>
                    <Button variant="red" onClick={deleteCricketGame}>
                        Sure!
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showRAWModal} fullscreen={true} onHide={() => setShowRAWModal(false)} dialogClassName="p-4">
                <Modal.Header closeButton closeVariant="white">
                    <Modal.Title className="h6">Cricket Game _RAW Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <JSONViewer data={cricketGameRAW} />
                </Modal.Body>
            </Modal>
        </Fragment>
    );
}

export default CricketEditList;