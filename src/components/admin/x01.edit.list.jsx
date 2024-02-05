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
import X01Service from '../../services/x01.service';
import JSONViewer from '../elements/json.viewer';

const EditableCard = (props) => {
    const {
        x01Game,
        players,
        deleteX01Game,
        showRAWX01Game,
        deleteActive = false,
        rawActive = false,
    } = props

    const handleX01GameDelete = () => {
        deleteX01Game(x01Game);
    }

    const handleX01GameRAW = () => {
        showRAWX01Game(x01Game);
    }

    return (
        <Col className="mb-3">
            <Card as='div'
                className={`m-0 p-0 rounded-0 editable-card card-list-card bg-secondary-grey`}>
                <Card.Body className="m-0 p-0 border-0 rounded-0">
                    <Card.Title as="h6" className="bg-primary-green p-2 mb-0 text-white text-center span">
                        <div className="fs-5 fw-600">{ x01Game.startingScore }</div>
                        <span className="fw-500 fs-8">
                            { x01Game.gameIsRunning ? 'Running' : 'Finished' }
                        </span>
                    </Card.Title>
                    <Card.Text as="div" className="pt-3 pb-2 text-white">
                        <Container>
                            <Row className="mb-3">
                                <span className="fs-8 text-grey">{ x01Game.setMode } { x01Game.numberOfSets } Set{ x01Game.numberOfSets > 1 && 's' } - { x01Game.legMode } { x01Game.numberOfLegs } Leg{ x01Game.numberOfLegs > 1 && 's'}</span>
                                <span className="fs-9 pt-1 text-grey">({ x01Game.legInMode } / { x01Game.legOutMode })</span>
                            </Row>
                            <Row>
                                { players.length > 0 && x01Game.players.map((playerId, idx) => (
                                    <Row key={idx}>
                                        <Col className="text-white fs-8">
                                            { ((players || []).find(player => player.id === playerId) || {}).nickname || 'N / A' }
                                            { x01Game.playerModels[playerId].hasWonGame &&
                                                <i className="ms-1 text-gold fas fa-trophy"></i>
                                            }
                                        </Col>
                                        <Col className="text-white text-center fs-8">{ x01Game.playerModels[playerId].setsWon }</Col>
                                    </Row>
                                ))}
                            </Row>
                            <Row>
                                <div className="d-flex justify-content-between align-items-end mt-2">
                                    <span className="fs-9 text-grey">{ dayjs(x01Game.createdAt).format("DD.MM.YYYY HH:mm") }</span>
                                    <div>
                                        { x01Game.gameIsRunning &&
                                            <Button variant="primary-green" href={'/x01/' + x01Game.id} className="me-1">
                                                <GiBullseye title="Continue Playing" />
                                            </Button>
                                        }
                                        { !x01Game.gameIsRunning &&
                                            <Button variant="primary-green" title="Show Statistics"  href={'/stats/games/x01/' + x01Game.id} className="me-1">
                                                <FaChartBar />
                                            </Button>
                                        }
                                        {!x01Game.gameIsRunning && rawActive &&
                                            <Button variant="primary-grey" title="Show _raw data" onClick={handleX01GameRAW} className="me-1">
                                                <VscJson />
                                            </Button>
                                        }
                                        { deleteActive &&
                                            <Button variant="red" title="Delete Game" onClick={handleX01GameDelete}>
                                                <FaTrash />
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

const X01EditList = (props) => {
    const {
        emptyText,
        showStatusFilter = true,
        staticStatusValue = '1',
        deleteActive = false,
        rawActive = false
    } = props

    const [x01Games, setX01Games] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showRAWModal, setShowRAWModal] = useState(false);
    const [x01GameToDelete, setX01GameToDelete] = useState(null);
    const [x01GameRAW, setX01GameRAW] = useState({});
    const [players, setPlayers] = useState([]);
    const [statusFilterValue, setStatusFilterValue] = useState(staticStatusValue);

    const statusFilter = [
        { name: 'Running', value: '1' },
        { name: 'Finished', value: '2' },
        { name: 'All', value: '' }
    ];

    useEffect(() => {
        loadPlayers();
        loadX01Games();
        // eslint-disable-next-line
    }, [ statusFilterValue ]);

    const cancelDeleteX01Game = () => {
        setShowDeleteModal(false);
    };

    const handleX01GameDelete = (x01Game) => {
        setX01GameToDelete(x01Game);
        setShowDeleteModal(true);
    };

    const handleShowRAWX01Game = (x01Game) => {
        setX01GameRAW(x01Game);
        setShowRAWModal(true);
    };

    const deleteX01Game = async () => {
        if (x01GameToDelete) {
            setShowDeleteModal(false);
            if (await X01Service.deleteX01(x01GameToDelete.id)) {
                setX01GameToDelete({});
                toast.success('Successfully deleted x01 game: ' + x01GameToDelete.id);
                loadX01Games();
            } else {
                toast.error('Error on deleting x01 game: ' + x01GameToDelete.id + '. Please try again or contact your system administrator');
            }
        }
    }

    const loadPlayers = async () => {
        let data = await PlayerService.loadPlayers('');
        setPlayers(data);
    }

    const loadX01Games = async () => {
        let data;
        if (statusFilterValue === '1') {
            data = await X01Service.loadRunningX01Games();
        } else if (statusFilterValue === '2') {
            data = await X01Service.loadFinishedX01Games();
        } else {
            data = await X01Service.loadAllX01Games();
        }
        setX01Games(data);
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
                {x01Games.length > 0 &&
                    <Row xs={1} md={3}>
                        {x01Games.map((item, idx) => (
                            <EditableCard
                                key={ idx }
                                x01Game={ item }
                                players={ players }
                                deleteX01Game={handleX01GameDelete}
                                showRAWX01Game={handleShowRAWX01Game}
                                deleteActive={deleteActive}
                                rawActive={rawActive}
                            />
                        ))}
                    </Row>
                }
                {x01Games.length === 0 &&
                    <div className="d-flex justify-content-center mb-4">
                        <span className="empty-text text-primary-grey">{ emptyText }</span>
                    </div>
                }
            </Container>
            <Modal show={showDeleteModal} onHide={cancelDeleteX01Game} centered>
                <Modal.Header closeButton closeVariant="white">
                    <Modal.Title className="h6">Delete X01 Game</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete x01 game {x01GameToDelete ? x01GameToDelete.id : 'unknown'} ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary-grey" onClick={cancelDeleteX01Game}>
                        Cancel
                    </Button>
                    <Button variant="red" onClick={deleteX01Game}>
                        Sure!
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showRAWModal} fullscreen={true} onHide={() => setShowRAWModal(false)} dialogClassName="p-4">
                <Modal.Header closeButton closeVariant="white">
                    <Modal.Title className="h6">X01 Game _RAW Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <JSONViewer data={x01GameRAW} />
                </Modal.Body>
            </Modal>
        </Fragment>
    );
}

export default X01EditList;