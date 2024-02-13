import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import {
    Button,
    Card,
    Col
} from 'react-bootstrap';

import PlayerConfig from './config_components/player.config';
import CricketModels from '../../models/cricket.models';
import CricketService from '../../services/cricket.service';


const CricketConfig = () => {
    const initialState = CricketModels.CricketModel;

    const [game, setGame] = useState(initialState);

    const navigate = useNavigate();

    const handleConfigChange = (name, value) => {
        if (name === 'players') {
            setGame({ ...game, players: value })
        } else {
            setGame({ ...game, [name]: Number(value) });
        }
    }

    const handleSubmit = async (event) => {
        if (!validate()) {
            event.preventDefault();
            event.stopPropagation();
            toast.error('You need to select ' + game.numberOfPlayers + ' players!');
        } else {
            let playerIds = game.players.map((item) => item.id);
            game.isSoloGame = playerIds.length === 1;
            game['players'] = playerIds;
            game.currentPlayerTurn = game.players[0];

            game.players.forEach(player => {
                let cricketPlayerModel = { ...CricketModels.CricketPlayerModel };
                cricketPlayerModel.score = Number(game.startingScore);
                game.playerModels[player] = cricketPlayerModel;
            })

            let newGame = await CricketService.createCricket(game)
            navigate('/cricket/' + newGame.id);
        }
    }

    const validate = () => {
        return Number(game.numberOfPlayers) === game.players.length;
    }

    return (
        <Col className="d-flex justify-content-center col-12 mb-3">
            <Card bg="secondary" className="m-0 p-0 border-0 rounded-0">
                <Card.Body className="m-0 p-0 border-0 rounded-0">
                    <Card.Title className="bg-primary p-3 text-white text-center">
                        Cricket
                    </Card.Title>
                    <Card.Text as="div" className="p-2 text-white">
                        <PlayerConfig
                            numberOfPlayers={game.numberOfPlayers}
                            selectedPlayers={game.players}
                            onNumberOfPlayersChange={handleConfigChange}
                            onSelectedPlayersChange={handleConfigChange}
                        />
                        <div className="col-xs-1 p-3" align="center">
                            <Button variant="primary" className="text-white m-0 p-2" onClick={handleSubmit}>Start Game</Button>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default CricketConfig;
