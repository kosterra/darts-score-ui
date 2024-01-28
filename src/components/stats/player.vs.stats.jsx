import React, { Fragment, useState, useEffect } from 'react';
import {
    ButtonGroup,
    Col,
    Container,
    InputGroup,
    Form,
    Row,
    ToggleButton
} from 'react-bootstrap';

import PlayerSelect from '../elements/player.select';
import PlayerOverallStats from './player.overall.stats';
import PlayerStatsCharts from './player.stats.charts';
import StatsService from '../../services/stats.service';
import PlayersX01StatsComparisonBars from './players.x01.stats.comparison.bars';
import X01StatsCharts from './x01.stats.charts';

const PlayerVSStats = (props) => {
    const {
        showStatsFilter = true,
        staticStatsFilterValue = '1'
    } = props

    const [statsFilterValue, setStatsFilterValue] = useState(staticStatsFilterValue)
    const [players, setPlayers] = useState([])
    const [playerStats, setPlayerStats] = useState({})
    const [includeOthers, setIncludeOthers] = useState(false)
    const [dateFilter, setDateFilter] = useState('All')

    const statsFilter = [
        { name: 'X01', value: '1' },
        { name: 'Cricket', value: '2' }
    ];

    const onSelectPlayer = async (player, idx) => {
        let newPlayers = [...players];
        newPlayers.splice(idx, 0, player)
        setPlayers(newPlayers)
    }

    const onDeletePlayer = (idx) => {
        let newPlayers = [...players]
        newPlayers.splice(idx, 1)
        setPlayers(newPlayers)
    }

    const loadX01Stats = async () => {
        let playerIds = players.map(player => player.id)
        let body = {}
        body['playerIds'] = playerIds
        body['includeOthers'] = includeOthers
        body['dateFilter'] = dateFilter
        let playersStats = await StatsService.loadX01PlayersStats(body)
        setPlayerStats(playersStats)
    }

    const handleIncludeOthers = (e) => {
        setIncludeOthers(!includeOthers)
    }

    useEffect(() => {
        if (players.length == 2) {
            if (statsFilterValue === '1') {
                loadX01Stats()
            } else {
                //let data = await StatsService.loadCricketPlayerStats(player.id);
                //setPlayerStats(data);
            }
        }
    }, [players, statsFilterValue, includeOthers, dateFilter]);

    return (
        <Fragment>
            <Container className="d-flex justify-content-md-center align-items-top w-50">
                <PlayerSelect
                    idx={0}
                    onSelect={onSelectPlayer}
                    onDelete={onDeletePlayer}
                />
                <PlayerSelect
                    idx={1}
                    onSelect={onSelectPlayer}
                    onDelete={onDeletePlayer}
                />
            </Container>
            {players && (players.filter(player => player != null).length == 2) &&
                <Fragment>
                    {showStatsFilter &&
                        <Row xs={1} sm={1} md={1} className="d-flex justify-content-center align-items-center mt-4 mb-4">
                            <Col className="col-xs-12 col-sm-12 col-md-10 col-lg-10 d-flex justify-content-md-center align-items-center p-2 text-white">
                                <Container className="d-flex justify-content-center align-items-center filter-bar gap-4 mt-4">
                                    <ButtonGroup>
                                        {statsFilter.map((filter, idx) => (
                                            <ToggleButton
                                                key={idx}
                                                id={`stats-filter-${idx}`}
                                                type="radio"
                                                variant="primary-green"
                                                name="radio"
                                                value={filter.value}
                                                checked={statsFilterValue === filter.value}
                                                onChange={(e) => setStatsFilterValue(e.currentTarget.value)}
                                            >
                                                {filter.name}
                                            </ToggleButton>
                                        ))}
                                    </ButtonGroup>
                                    <div className="d-flex justify-content-md-center align-items-center w-25">
                                        <Row xs={2} sm={3} md={5} className="d-flex justify-content-center align-items-center border-solid-grey rounded m-0 text-white w-100">
                                            {['1 D', '1 W', '1 M', '1 Y', 'All'].map((option, idx) => (
                                                <Col key={idx} className="py-1 d-flex justify-content-center align-items-center">
                                                    <ToggleButton
                                                        key={idx}
                                                        id={`date-filter-${idx}`}
                                                        type="radio"
                                                        name="date-filter"
                                                        value={option}
                                                        className={`w-100 btn btn-sm text-white btr-16 bbr-16 fs-8 fw-500 ${dateFilter === option ? 'btn-primary-green' : 'btn-tertiary-grey'}`}
                                                        checked={dateFilter === option}
                                                        onChange={(e) => setDateFilter(e.currentTarget.value)}
                                                    >
                                                        {option}
                                                    </ToggleButton>
                                                </Col>
                                            ))}
                                        </Row>
                                    </div>
                                    <Form.Check
                                        type="switch"
                                        id="custom-switch"
                                        label="Include Games with other players"
                                        defaultChecked={includeOthers}
                                        onChange={handleIncludeOthers}
                                    />
                                </Container>
                            </Col>
                        </Row>
                    }
                    {playerStats && playerStats.playedGames > 0 &&
                        <Row xs={1} sm={1} md={1} className="d-flex justify-content-center align-items-center">
                            <Col className="px-0 rounded-2 mt-4 mb-4">
                                <span className="d-flex justify-content-center align-items-center fs-4 fw-600 mb-4 mt-4">X01 Statistics</span>
                                <PlayersX01StatsComparisonBars playersX01Stats={playerStats} />
                            </Col>
                            <Col className="px-0 rounded-2 mb-4">
                                <span className="d-flex justify-content-center align-items-center fs-4 fw-600 mb-4 mt-4">X01 Statistics Charts</span>
                                <X01StatsCharts
                                    avg={((playerStats || {}).avg || []).perGame || []}
                                    sectionHits={(playerStats || {}).sectionHits || {}}
                                    checkouts={((playerStats || {}).checkouts || {}).rates || {}}
                                    scoreRanges={(playerStats || {}).scoreRanges || {}}
                                    players={players} />
                            </Col>
                        </Row>
                    }
                </Fragment>
            }
            {players && (players.filter(player => player != null).length != 2) &&
                <div className="d-flex justify-content-center mt-4">
                    <span className="empty-text text-primary-grey">Please select 2 players to compare statistics</span>
                </div>
            }
            {playerStats && playerStats.playedGames == 0 &&
                <div className="d-flex justify-content-center mt-4">
                    <span className="empty-text text-primary-grey">No games found. Check the filters</span>
                </div>
            }
        </Fragment>
    );
}

export default PlayerVSStats;