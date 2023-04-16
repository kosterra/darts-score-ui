import React, { Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Avatar from 'react-avatar';
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    InputGroup,
    Modal,
    Row
} from 'react-bootstrap';

import PlayerService from '../../services/player.service';
import PlayerForm from './player.form';

const EditableCard = (props) => {
    const {
        item,
        deletePlayer,
        editPlayer
    } = props

    const handlePlayerDelete = () => {
        deletePlayer(item);
    }

    const handlePlayerEdit = () => {
        editPlayer();
    }

    return (
        <Col className="mb-3">
            <Card as='a'
                className={`m-0 p-0 rounded-0 editable-card card-list-card bg-tertiary-grey`}>
                <Card.Body className="m-0 p-0 border-0 rounded-0 bg-tertiary">
                    <Card.Title as="h6" className="bg-primary-green p-2 mb-0 text-white text-center span">
                        {item.nickname}
                    </Card.Title>
                    <Card.Text as="div" className="pt-4 pb-2 text-white">
                        <Container>
                            <Row>
                                <div className="d-flex flex-column justify-content-center align-items-center">
                                    <Avatar
                                        name={item.firstname + ' ' + item.lastname}
                                        src={item.profileImg}
                                        size="80" round={true}
                                        color="#565656"
                                        textSizeRatio={0.2}
                                        className="align-self-center"
                                    />
                                    <span className="mt-1 text-primary-grey">{item.firstname + ' ' + item.lastname}</span>
                                </div>
                            </Row>
                            <Row className="mt-2">
                                <div className="d-flex justify-content-end gap-2 mt-2">
                                    <PlayerForm onPlayerEdit={handlePlayerEdit} edit={true} updatePlayer={item} />
                                    <Button variant="red" onClick={handlePlayerDelete}>
                                        <i className="fas fa-trash-alt"></i>
                                    </Button>
                                </div>
                            </Row>
                        </Container>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
}

const PlayersEditList = (props) => {
    const { emptyText } = props

    const [players, setPlayers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [playerToDelete, setPlayerToDelete] = useState(null);

    const cancelDeletePlayer = () => {
        setShowDeleteModal(false);
    };

    const handlePlayerDelete = (player) => {
        setPlayerToDelete(player);
        setShowDeleteModal(true);
    };

    const deletePlayer = async () => {
        if (playerToDelete) {
            setShowDeleteModal(false);
            if (await PlayerService.deletePlayer(playerToDelete.id)) {
                setPlayerToDelete({});
                toast.success('Successfully deleted player: ' + playerToDelete.nickname);
                loadPlayers('');
            } else {
                toast.error('Error on deleting player: ' + playerToDelete.nickname + '. Please try again or contact your system administrator');
            }
        }
    }

    const handlePlayerEdit = () => {
        loadPlayers('');
    };

    useEffect(() => {
        loadPlayers('');
    }, [])

    const onPlayerAdd = () => {
        loadPlayers('');
    }

    const onSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
        loadPlayers(event.target.value);
    }

    const loadPlayers = async searchTerm => {
        let data = await PlayerService.loadPlayers(searchTerm);
        setPlayers(data);
    }

    return (
        <Fragment>
            <div className="d-flex justify-content-md-center align-items-center p-2 text-white">
                <InputGroup className="mb-3">
                    <InputGroup.Text id="search-addon">
                        <i className="fas fa-search"></i>
                    </InputGroup.Text>
                    <Form.Control
                        placeholder="Search"
                        value={searchTerm}
                        aria-label="Search"
                        aria-describedby="search-addon"
                        onChange={onSearchTermChange}
                    />
                </InputGroup>
                <PlayerForm onPlayerAdd={onPlayerAdd} />
            </div>
            <Container className="editable-card-list card-list">
                {players.length > 0 &&
                    <Row xs={1} md={6}>
                        {players.map((item, idx) => (
                            <EditableCard
                                key={idx}
                                item={item}
                                deletePlayer={handlePlayerDelete}
                                editPlayer={handlePlayerEdit}
                            />
                        ))}
                    </Row>
                }
                {players.length === 0 &&
                    <div className="d-flex justify-content-center mb-4">
                        <span className="empty-text text-primary-grey">{emptyText}</span>
                    </div>
                }
            </Container>
            <Modal show={showDeleteModal} onHide={cancelDeletePlayer} centered>
                <Modal.Header closeButton closeVariant="white">
                    <Modal.Title className="h6">Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete player {playerToDelete ? playerToDelete.nickname : 'unknown'} ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary-green" onClick={cancelDeletePlayer}>
                        No
                    </Button>
                    <Button variant="red" onClick={deletePlayer}>
                        Sure!
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
}

export default PlayersEditList;