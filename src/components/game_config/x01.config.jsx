import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import {
    Button,
    Card,
    Col
} from 'react-bootstrap';

import X01ScoreConfig from './config_components/x01.score.config';
import X01InOutConfig from './config_components/x01.inout.config';
import SetsLegsConfig from './config_components/sets.legs.config';
import PlayerConfig from './config_components/player.config';
import X01Models from '../../models/x01.models';
import X01Service from '../../services/x01.service';


const X01Config = () => {
    const initialState = X01Models.X01Model;

    const [ game, setGame ] = useState(initialState);

    const navigate = useNavigate();

	const handleConfigChange = (name, value) => {
		if (name === 'numberOfPlayers') {
			setGame({...game,
				numberOfPlayers: Number(value),
				setMode: value > 2 ? 'First to' : game.setMode,
				legMode: value > 2 ? 'First to' : game.legMode
			})

            if (game.players.length > Number(value)) {
                setGame({...game, players: game.players.slice(0, Number(value))});
            }
		} else if (['setMode', 'legMode', 'legInMode', 'legOutMode'].includes(name)) {
			setGame({...game, [name]: value});
        } else if (name === 'players') {
            setGame({...game, players: value})
		} else {
			setGame({...game, [name]: Number(value)});
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
            game.startingPlayerSet = game.players[0];
            game.startingPlayerLeg = game.players[0];

            game.players.forEach(player => {
                let x01PlayerModel = {...X01Models.X01PlayerModel};
                x01PlayerModel.score = Number(game.startingScore);
                game.playerModels[player] = x01PlayerModel;
            })

            let newGame = await X01Service.createX01(game)
            navigate('/x01/' + newGame.id);
        }
    }

    const validate = () =>{
        return Number(game.numberOfPlayers) === game.players.length;
    }

    return (
        <Col className="d-flex justify-content-center col-12 mb-3">
            <Card bg="secondary-grey" className="m-0 p-0 border-0 rounded-0">
                <Card.Body className="m-0 p-0 border-0 rounded-0">
                    <Card.Title className="bg-primary-green p-3 text-white text-center">
                        X01
                    </Card.Title>
                    <Card.Text as="div" className="p-2 text-white">
                        <X01ScoreConfig
                            scoreOption={game.startingScore}
                            onScoreChange={handleConfigChange}
                        />
                        <X01InOutConfig
                            legInOption={game.legInMode}
                            legOutOption={game.legOutMode}
                            onInOutChange={handleConfigChange}
                        />
                        <SetsLegsConfig
                            setModeOption={game.setMode}
                            legModeOption={game.legMode}
                            numberOfSetsOption={game.numberOfSets}
                            numberOfLegsOption={game.numberOfLegs}
                            onSetsLegsChange={handleConfigChange}
                        />
                        <PlayerConfig
                            numberOfPlayers={game.numberOfPlayers}
                            selectedPlayers={game.players}
                            onNumberOfPlayersChange={handleConfigChange}
                            onSelectedPlayersChange={handleConfigChange}
                        />
                        <div className="col-xs-1 p-2" align="center">
                            <Button variant="primary-green" className="m-0 px-2 py-2" onClick={handleSubmit}>Start Game</Button>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default X01Config;
