import { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';


import SelectableCard from './selectable.card';
import PlayerService from '../../services/player.service';

const PlayerSelect = (props) => {
    const {
        idx,
        onSelect,
        onDelete
    } = props

    const [isLoading, setIsLoading] = useState(false);
    const [players, setPlayers] = useState([]);
    const [selectedPlayers, setSelectedPlayers] = useState([]);

    const handleSearch = async (query) => {
        setIsLoading(true);
        let data = await PlayerService.loadPlayers(query);
        setPlayers(data);
        setIsLoading(false);
    };

    const handleChange = selections => {
        if (selections && selections.length > 0) {
            const [selectedPlayer] = selections.slice(-1);
            setSelectedPlayers([selectedPlayer]);
            onSelect(selectedPlayer, idx);
        } else {
            setSelectedPlayers([]);
            onDelete(idx);
        }
    }

    // Bypass client-side filtering by returning `true`. Results are already
    // filtered by the search endpoint, so no need to do it again.
    const filterBy = () => true;

    return (
        <Container className={`px-1 p-0 selectable-card-list card-list`}>
            <SelectableCard
                item={selectedPlayers[0]}
                isSelected={false}
                selectable={false}
                cssClass='bg-tertiary-grey' />
            <Form.Group className="mt-3">
                <AsyncTypeahead
                    multiple
                    id="player-select"
                    labelKey="nickname"
                    filterBy={filterBy}
                    isLoading={isLoading}
                    onSearch={handleSearch}
                    onChange={selections => handleChange(selections)}
                    options={players}
                    placeholder="Choose a Player..."
                    selected={selectedPlayers}
                    minLength={2}
                    renderMenuItemChildren={(player) => (
                        <div className="d-flex">
                            <span>
                                <img
                                    alt={player.nickname}
                                    src={player.profileImg}
                                    className="dropdown-item-img"
                                />
                            </span>
                            <span className="d-flex flex-column justify-content-center ms-4">
                                <span className="fs-6">{player.nickname}</span>
                                <span className="text-white fs-8 fw-400">{player.firstname + ' ' + player.lastname}</span>
                            </span>
                        </div>
                    )}
                />
            </Form.Group>
        </Container>
    );
}

export default PlayerSelect;