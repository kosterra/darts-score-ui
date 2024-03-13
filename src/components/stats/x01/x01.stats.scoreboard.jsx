import { Tag } from 'primereact/tag';

import dayjs from 'dayjs';

import X01StatsScoreBoardPlayer from './x01.stats.scoreboard.player';

const X01StatsScoreBoard = (props) => {
    const {
        players,
        game
    } = props

    return (
        <div className="row bg-shade900 mb-3 p-3">
            <div className="col d-flex justify-content-center align-items-center">
                <X01StatsScoreBoardPlayer
                    player={players.find(player => player.id === game.players[0])}
                    hasWonGame={game.playerModels[game.players[0]].hasWonGame}
                />
            </div>
            <div className="col d-flex justify-content-center align-items-center">
                <div className="d-flex flex-column justify-content-center">
                    <div className="align-self-center fs-8 fw-semibold text-shade500">
                        {dayjs(game.createdAt).format("DD.MM.YYYY HH:mm")}
                    </div>
                    <div className="align-self-center text-shade100 fs-1 fw-semibold">
                        {game.playerModels[game.players[0]].setsWon + ' - ' + game.playerModels[game.players[1]].setsWon}
                    </div>
                    <div className="align-self-center mt-3">
                        <Tag
                            severity={game.gameIsRunning ? 'warning' : 'info'}
                            value={game.gameIsRunning ? 'Running' : 'Finished'}
                            rounded
                        />
                    </div>
                </div>
            </div>
            <div className="col d-flex justify-content-center align-items-center">
                <X01StatsScoreBoardPlayer
                    player={players.find(player => player.id === game.players[1])}
                    hasWonGame={game.playerModels[game.players[1]].hasWonGame}
                />
            </div>
        </div>
    );
};

export default X01StatsScoreBoard;