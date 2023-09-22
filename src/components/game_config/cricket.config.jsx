import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';

import PlayerConfig from './config_components/player.config';
import CricketModels from '../../models/cricket.models';
import CricketService from '../../services/cricket.service';


const CricketConfig = () => {
    const initialState = CricketModels.CricketModel;

    const [ game, setGame ] = useState(initialState);

    const navigate = useNavigate();

	const handleConfigChange = (name, value) => {
		if (name === 'players') {
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

            game.players.forEach(player => {
                let cricketPlayerModel = {...CricketModels.CricketPlayerModel};
                cricketPlayerModel.score = Number(game.startingScore);
                game.playerModels[player] = cricketPlayerModel;
            })

            let newGame = await CricketService.createCricket(game)
            navigate('/cricket/' + newGame.id);
        }
    }

    const validate = () =>{
        return Number(game.numberOfPlayers) === game.players.length;
    }

    return (
        <div>
            <PlayerConfig
                numberOfPlayers={game.numberOfPlayers}
                selectedPlayers={game.players}
                onNumberOfPlayersChange={handleConfigChange}
                onSelectedPlayersChange={handleConfigChange}
            />
            <div className="col-xs-1 p-3" align="center">
                <Button variant="primary-green" className="text-white m-0 p-2" onClick={handleSubmit}>Start Game</Button>
            </div>
        </div>
    );
}

export default CricketConfig;
