import React, { Fragment, useState, useEffect } from 'react'
import {
    Col,
    Container
} from 'react-bootstrap'

import PlayerOverallStats from './player.overall.stats'
import StatsService from '../../services/stats.service'
import PlayerStatsCharts from './player.stats.charts'
import PlayerSelect from '../elements/player.select'

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
        <Fragment>
            <Container className="d-flex justify-content-md-center align-items-top w-25">
                <PlayerSelect
                    idx={0}
                    onSelect={onSelectPlayer}
                    onDelete={onDeletePlayer}
                />
            </Container>
            {players && (players.filter(player => player != null).length == 1) &&
                <div className="p-2 container">
                    {players && players[0] &&
                        <Container>
                            <Col>
                                <span className="d-flex justify-content-center align-items-center fs-4 fw-600 mb-4 mt-4">Game Statistics</span>
                                <PlayerOverallStats playerStats={playerStats} />
                            </Col>
                            <Col>
                                <span className="d-flex justify-content-center align-items-center fs-4 fw-600 mb-4 mt-4">X01 Statistics Charts</span>
                                <PlayerStatsCharts playerStats={playerStats} players={players} />
                            </Col>
                        </Container>
                    }
                </div>
            }
            {players && (players.filter(player => player != null).length != 1) &&
                <div className="d-flex justify-content-center mt-4">
                    <span className="empty-text text-primary-grey">Please select a player to show the statistics</span>
                </div>
            }
        </Fragment>
    );
}

export default PlayerStats