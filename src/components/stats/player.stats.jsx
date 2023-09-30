import React, { Fragment, useState, useEffect } from 'react';
import {
    Container,
    InputGroup,
    Form
} from 'react-bootstrap';

import PlayerOverallStats from './player.overall.stats';
import PlayersSelectList from '../elements/players.select.list';
import PlayerService from '../../services/player.service';

const PlayerStats = () => {

    const [players, setPlayers] = useState([]);
    const [selectedPlayers, setSelectedPlayers] = useState([])
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
		loadPlayers('');
	}, [])

    const onSelectPlayer=(players) => {
        setSelectedPlayers(players);
    }

    const onSearchTermChange=(event) => {
        setSearchTerm(event.target.value);
        loadPlayers(event.target.value);
    }

    const loadPlayers = async searchTerm => {
        let data = await PlayerService.loadPlayers(searchTerm);
        setPlayers(data);
    }

    return (
        <Fragment>
            <div className="p-2 container">
                <div className="justify-content-md-center align-items-center">
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
                    </div>
                    <PlayersSelectList
                        itemType={'Player'}
                        items={players}
                        selectedItems={selectedPlayers}
                        emptyText={'No Players found. Please create new Players and play any games first.'}
                        maxSelectable={Number(1)}
                        setSelectedItems={onSelectPlayer}
                        listCssClass="stats"
                        cardCssClass="stats border-0" />
                </div>
                { selectedPlayers && selectedPlayers[0] &&
                    <Container>
                        <PlayerOverallStats player={selectedPlayers[0]} />
                    </Container>
                }
            </div>
        </Fragment>
    );
}

export default PlayerStats;