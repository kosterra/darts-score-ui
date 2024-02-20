import React, { useState, useEffect } from 'react';

import {
    ToggleButton,
    Form,
    InputGroup,
    Row,
    Col,
    Container
} from 'react-bootstrap';

import PlayersSelectList from '../../elements/players.select.list';
import PlayerConfigOptions from '../config_options/player.config.options';
import PlayerForm from '../../elements/player.form';
import PlayerService from '../../../services/player.service';

const PlayerConfig = (props) => {
    const {
        numberOfPlayers,
        selectedPlayers,
        onNumberOfPlayersChange,
        onSelectedPlayersChange
    } = props;

    const { numberOfPlayerOptions } = PlayerConfigOptions;

    const [players, setPlayers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadPlayers('');
    }, [])

    const onPlayerAdd = () => {
        loadPlayers('');
    }

    const onSelectPlayer = (players) => {
        onSelectedPlayersChange('players', players);
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
        <Container className="justify-content-md-center align-items-center">
            <p className="text-center text-shade600 fs-7 fw-semibold">Players</p>
            <Row className="d-flex justify-content-center align-items-center border-solid-grey rounded m-0 py-3 mb-3 text-white">
                {numberOfPlayerOptions.values.map((option, idx) => (
                    <Col key={idx} xs={6} sm={6} md={3} lg={3} className="d-flex justify-content-center align-items-center py-1">
                        <ToggleButton
                            key={idx}
                            id={`number-of-players-option-${idx}`}
                            type="radio"
                            name="number-of-players-options"
                            value={option}
                            className={`w-100 btn btn-sm text-white btr-16 bbr-16 fs-8 fw-semibold ${Number(numberOfPlayers) === option ? 'btn-primary' : 'btn-tertiary'}`}
                            checked={Number(numberOfPlayers) === option}
                            onChange={(e) => onNumberOfPlayersChange('numberOfPlayers', e.currentTarget.value)}>
                            {Number(option) === 1 ? 'Solo' : option}
                        </ToggleButton>
                    </Col>
                ))}
            </Row>
            <Row className="d-flex justify-content-between align-items-center p-2 mb-3">
                <Col className="col-10 p-0" >
                    <InputGroup className="p-0">
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
                </Col>
                <Col className="col-2 p-0" >
                    <PlayerForm onPlayerAdd={onPlayerAdd} />
                </Col>
            </Row>
            <PlayersSelectList
                itemType={'Players'}
                items={players}
                selectedItems={selectedPlayers}
                emptyText={'No Players found. Please create new Players first.'}
                maxSelectable={Number(numberOfPlayers)}
                setSelectedItems={onSelectPlayer}
                cardCssClass="bg-tertiary" />
        </Container>
    );
};

export default PlayerConfig;