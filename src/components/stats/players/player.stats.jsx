import { useState, useEffect } from 'react';

import PlayerOverallStats from './player.overall.stats';
import StatsService from '../../../services/stats.service';
import PlayerStatsCharts from './player.stats.charts';
import PlayerSelect from '../../elements/player.select';

const PlayerStats = () => {
    const [players, setPlayers] = useState([])
    const [playerStats, setPlayerStats] = useState({})

    const onSelectPlayer = async (player, idx) => {
        setPlayers([player])
    }

    const onDeletePlayer = (idx) => {
        setPlayers([])
    }

    const loadX01Stats = async () => {
        let data = await StatsService.loadPlayerStats(players[0].id)
        setPlayerStats(data)
    }

    useEffect(() => {
        if (players.length == 1) {
            loadX01Stats()
        }
    }, [players]);

    return (
        <div className="container-fluid p-4 pt-0 border-0">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-xs-12 col-sm-12 col-md-10 col-lg-8" >
                    <div className="row d-flex justify-content-center align-items-center p-4 bg-shade900">
                        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-6 col-xxl-4" >
                            <PlayerSelect
                                idx={0}
                                onSelect={onSelectPlayer}
                                onDelete={onDeletePlayer}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {players && players[0] && (players.filter(player => player != null).length == 1) &&
                <>
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-8 p-0" >
                            <PlayerOverallStats playerStats={playerStats} />
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-8 p-0" >
                            <PlayerStatsCharts playerStats={playerStats} players={players} />
                        </div>
                    </div>
                </>
            }
            {players && (players.filter(player => player != null).length != 1) &&
                <div className="d-flex justify-content-center mt-4">
                    <span className="empty-text text-shade500">
                        Please select a player to show the statistics
                    </span>
                </div>
            }
        </div>
    );
}

export default PlayerStats