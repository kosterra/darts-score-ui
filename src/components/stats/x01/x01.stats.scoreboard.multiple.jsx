import { Fragment } from 'react';

import dayjs from 'dayjs';

import X01StatsScoreBoardPlayer from './x01.stats.scoreboard.player.item';

const X01StatsScoreBoardMultiple = (props) => {
    const {
        players,
        game
    } = props

    return (
        <Fragment>
            <div className="row border-top p-3">
                <div className="col d-flex justify-content-center align-items-center">
                    <div className="d-flex flex-column justify-content-center">
                        <div className="align-self-center fs-8 font-weight-normal text-shade100">
                            {dayjs(game.createdAt).format("DD.MM.YYYY HH:mm")}
                        </div>
                        <div className="align-self-center fs-8 font-weight-normal text-shade600">
                            {game.gameIsRunning ? 'Running' : 'Finished'}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row border-bottom mb-3 p-3">
                {game.players.map((player, idx) => (
                    <div key={'player' + idx} className="col d-flex justify-content-center align-items-center">
                        <div className="d-flex flex-column justify-content-center">
                            <X01StatsScoreBoardPlayer player={players.find(item => item.id == player)} />
                            <div className="align-self-center fs-1 font-weight-normal">
                                {game.playerModels[player].setsWon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Fragment>
    );
};

export default X01StatsScoreBoardMultiple;