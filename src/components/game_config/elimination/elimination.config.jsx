import { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Toast } from 'primereact/toast';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';

import EliminationScoreConfig from '../config_components/elimination.score.config';
import EliminationInOutConfig from '../config_components/elimination.inout.config';
import PlayerConfig from '../config_components/player.config';
import EliminationModels from '../../../models/elimination.models';
import EliminationService from '../../../services/elimination.service';


const EliminationConfig = () => {
    const initialState = EliminationModels.EliminationModel;

    const [game, setGame] = useState(initialState);

    const toast = useRef(null);

    const navigate = useNavigate();

    const handleConfigChange = (name, value) => {
        if (name === 'numberOfPlayers') {
            setGame({
                ...game,
                numberOfPlayers: Number(value)
            })

            if (game.players.length > Number(value)) {
                setGame({ ...game, players: game.players.slice(0, Number(value)) });
            }
        } else if (['gameInMode','gameOutMode'].includes(name)) {
            setGame({ ...game, [name]: value });
        } else if (name === 'players') {
            setGame({ ...game, players: value })
        } else {
            setGame({ ...game, [name]: Number(value) });
        }
    }

    const handleSubmit = async (event) => {
        if (!validate()) {
            event.preventDefault();
            event.stopPropagation();
            toast.current.show(
                {
                    severity: 'error',
                    summary: 'Missing Config',
                    detail: 'You need to select ' + game.numberOfPlayers + ' players!',
                    //life: 3000
                    sticky: true
                }
            );
        } else {
            let playerIds = game.players.map((item) => item.id);
            game.isSoloGame = playerIds.length === 1;
            game['players'] = playerIds;
            game.currentPlayerTurn = game.players[0];
            game.startingPlayer = game.players[0];

            game.players.forEach(player => {
                let eliminationPlayerModel = { ...EliminationModels.EliminationPlayerModel };
                game.playerModels[player] = eliminationPlayerModel;
            })

            let newGame = await EliminationService.createEliminationGame(game)
            navigate('/elimination/' + newGame.id);
        }
    }

    const validate = () => {
        return Number(game.numberOfPlayers) === game.players.length;
    }

    return (
        <>
            <Panel header="Elimination" className="w-100 w-md-75 w-xxl-50 mx-auto" >
                <div className="container">
                    <EliminationScoreConfig
                        scoreOption={game.targetScore}
                        onScoreChange={handleConfigChange}
                    />
                    <EliminationInOutConfig
                        gameInOption={game.gameInMode}
                        gameOutOption={game.gameOutMode}
                        onInOutChange={handleConfigChange}
                    />
                    <PlayerConfig
                        numberOfPlayersOption={game.numberOfPlayers}
                        selectedPlayers={game.players}
                        onNumberOfPlayersChange={handleConfigChange}
                        onSelectedPlayersChange={handleConfigChange}
                    />
                    <div className="container" align="center">
                        <Button variant="primary" size="small" className="m-0" onClick={handleSubmit}>
                            Start Game
                        </Button>
                    </div>
                </div>
            </Panel>
            <Toast ref={toast} position="bottom-right" />
        </>
    );
}

export default EliminationConfig;
