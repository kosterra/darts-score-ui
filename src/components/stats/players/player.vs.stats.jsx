import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputSwitch } from 'primereact/inputswitch';
import { SelectButton } from 'primereact/selectbutton';
import { Panel } from 'primereact/panel';

import PlayerSelect from '../../elements/player.select';
import StatsService from '../../../services/stats.service';
import X01Service from '../../../services/x01.service';
import GamesTimeline from '../../elements/games.timeline';
import PlayersX01StatsComparisonBars from './players.x01.stats.comparison.bars';
import X01StatsCharts from '../x01/x01.stats.charts';
import StatsCard from '../common/stats.card';
import ChartConfigOptions from '../common/chart.config.options';

const PlayerVSStats = (props) => {
    const {
        showStatsFilter = true,
        staticGameTypeFilterValue = 'X01'
    } = props;

    const [playersCount, setPlayersCount] = useState(2);
    const [players, setPlayers] = useState([]);
    const [games, setGames] = useState([]);
    const [playerStats, setPlayerStats] = useState({});
    const [gameTypeFilterValue, setGameTypeFilterValue] = useState(staticGameTypeFilterValue);
    const [includeOthersValue, setIncludeOthersValue] = useState(false);
    const [dateFilterValue, setDateFilterValue] = useState('All');

    const gameTypeFilter = ['X01', 'Cricket'];
    const dateFilter = ['1 D', '1 W', '1 M', '1 Y', 'All'];

    const onSelectPlayer = async (player, idx) => {
        let newPlayers = [...players];
        newPlayers.splice(idx, 0, player);
        setPlayers(newPlayers);
    };

    const onDeletePlayer = (idx) => {
        let newPlayers = [...players];
        newPlayers.splice(idx, 1);
        setPlayers(newPlayers);
    };

    const loadX01Games = async () => {
        let playerIds = players.map(player => player.id);
        let body = {
            playerIds: playerIds,
            includeOthers: includeOthersValue,
            dateFilter: dateFilterValue
        };
        let x01Games = await X01Service.loadX01Games(body);
        setGames(x01Games);
    };

    const loadX01Stats = async () => {
        let playerIds = players.map(player => player.id);
        let body = {
            playerIds: playerIds,
            includeOthers: includeOthersValue,
            dateFilter: dateFilterValue
        };
        let playersStats = await StatsService.loadX01PlayersStats(body);
        setPlayerStats(playersStats);
    };

    const handleIncludeOthers = (e) => {
        setIncludeOthersValue(!includeOthersValue);
    };

    const incrementPlayersCount = () => {
        setPlayersCount(playersCount + 1);
    };

    const removePlayerCard = (idx) => {
        setPlayersCount(playersCount - 1);
        onDeletePlayer(idx);
    };

    const startContent = (
        <div className="continer-fluid">
            <SelectButton
                value={gameTypeFilterValue}
                onChange={(e) => setGameTypeFilterValue(e.value)}
                options={gameTypeFilter}
            />
        </div>
    );

    const centerContent = (
        <div className="d-flex flex-column align-items-center justify-content-center gap-4">
            <span className="text-shade100 fs-8 fw-semibold">
                Date Range
            </span>
            <SelectButton
                value={dateFilterValue}
                onChange={(e) => setDateFilterValue(e.value)}
                options={dateFilter}
                className="p-selectbutton-pills min-pills-width"
            />
        </div>
    );

    const endContent = (
        <div className="d-flex align-items-center justify-content-center gap-2">
            <InputSwitch
                checked={includeOthersValue}
                onChange={(e) => handleIncludeOthers(e.value)}
            />
            <span className="text-shade100 fs-8 fw-semibold">Include Games with other players</span>
        </div>
    );

    const legendContent = (
        <div>
            <div className="row">
                <span className="col-4 d-flex justify-content-center align-items-center p-0">
                    <i className="pi pi-circle-fill fs-8" style={{ color: ChartConfigOptions.fillColors.values[0] }}></i>
                </span>
                <span className="col-8 fs-7 text-shade500 fw-semibold p-0">
                    {players[0] ? players[0].nickname : 'N/A'}
                </span>
            </div>
            <div className="row">
                <span className="col-4 d-flex justify-content-center align-items-center p-0">
                    <i className="pi pi-circle-fill fs-8" style={{ color: ChartConfigOptions.fillColors.values[1] }}></i>
                </span>
                <span className="col-8 fs-7 text-shade500 fw-semibold p-0">
                    {players[1] ? players[1].nickname : 'N/A'}
                </span>
            </div>
            {players.length > 2 &&
                <div className="row">
                    <span className="col-4 d-flex justify-content-center align-items-center p-0">
                        <i className="pi pi-circle-fill fs-8" style={{ color: ChartConfigOptions.fillColors.values[2] }}></i>
                    </span>
                    <span className="col-8 fs-7 text-shade500 fw-semibold p-0">
                        {players[2] ? players[2].nickname : 'N/A'}
                    </span>
                </div>
            }
            {players.length > 3 &&
                <div className="row">
                    <span className="col-4 d-flex justify-content-center align-items-center p-0">
                        <i className="pi pi-circle-fill fs-8" style={{ color: ChartConfigOptions.fillColors.values[3] }}></i>
                    </span>
                    <span className="col-8 fs-7 text-shade500 fw-semibold p-0">
                        {players[3] ? players[3].nickname : 'N/A'}
                    </span>
                </div>
            }
        </div>
    );

    useEffect(() => {
        if (players.length === playersCount) {
            if (gameTypeFilterValue === 'X01') {
                loadX01Stats();
                loadX01Games();
            } else if (gameTypeFilterValue === 'Cricket') {
                //let data = await StatsService.loadCricketPlayerStats(player.id);
                //setPlayerStats(data);
            }
        }
    }, [players, gameTypeFilterValue, includeOthersValue, dateFilterValue]);

    return (
        <div className="container-fluid p-4 pt-0 border-0">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-xs-12 col-sm-12 col-md-10 col-lg-8" >
                    <div className="row d-flex justify-content-center align-items-center p-4 bg-shade900">
                        <div className="col-12 col-md-6">
                            <PlayerSelect
                                idx={0}
                                onSelect={onSelectPlayer}
                                onDelete={onDeletePlayer}
                            />
                        </div>
                        <div className="col-12 col-md-6 mt-4 mt-md-0">
                            <PlayerSelect
                                idx={1}
                                onSelect={onSelectPlayer}
                                onDelete={onDeletePlayer}
                            />
                        </div>
                        {playersCount > 2 &&
                            <div className="col-12 col-md-6 mt-4">
                                <div className="position-relative">
                                    <PlayerSelect
                                        idx={2}
                                        onSelect={onSelectPlayer}
                                        onDelete={onDeletePlayer}
                                    />
                                    {playersCount === 3 &&
                                        <span className="position-absolute top-0 start-100 translate-middle">
                                            <Button
                                                icon="pi pi-times"
                                                size="small"
                                                rounded
                                                severity="danger"
                                                aria-label="Remove Player Card"
                                                className="text-shade100 fw-semibold me-4 mt-4"
                                                onClick={() => removePlayerCard(2)}
                                            />
                                        </span>
                                    }
                                </div>
                            </div>
                        }
                        {playersCount > 3 &&
                            <div className="col-12 col-md-6 mt-4">
                                <div className="position-relative">
                                    <PlayerSelect
                                        idx={3}
                                        onSelect={onSelectPlayer}
                                        onDelete={onDeletePlayer}
                                    />
                                    {playersCount === 4 &&
                                        <span className="position-absolute top-0 start-100 translate-middle">
                                            <Button
                                                icon="pi pi-times"
                                                size="small"
                                                rounded
                                                severity="danger"
                                                aria-label="Remove Player Card"
                                                className="text-shade100 fw-semibold me-4 mt-4"
                                                onClick={() => removePlayerCard(3)}
                                            />
                                        </span>
                                    }
                                </div>
                            </div>
                        }
                        {playersCount === 2 &&
                            <div className="col-12 col-md-6 mt-4 d-flex align-items-center justify-content-center">
                                <Button
                                    icon="pi pi-plus"
                                    size="large"
                                    rounded
                                    severity="secondary"
                                    aria-label="Add Player"
                                    className="text-shade500 fw-semibold"
                                    onClick={incrementPlayersCount}
                                />
                            </div>
                        }
                        {playersCount === 3 &&
                            <div className="col-12 col-md-6 mt-4 d-flex align-items-center justify-content-center">
                                <Button
                                    icon="pi pi-plus"
                                    size="large"
                                    rounded
                                    severity="secondary"
                                    aria-label="Add Player"
                                    className="text-shade500 fw-semibold"
                                    onClick={incrementPlayersCount}
                                />
                            </div>
                        }
                    </div>
                </div>
            </div>
            {players && (players.filter(player => player != null).length === playersCount) &&
                <>
                    {showStatsFilter &&
                        <div className="row d-flex justify-content-center align-items-center">
                            <div className="col-xs-12 col-sm-12 col-md-10 col-lg-8 px-3 bg-shade900" >
                                <Toolbar start={startContent} center={centerContent} end={endContent} className="m-4 p-4"/>
                            </div>
                        </div>
                    }
                    {playerStats && playerStats.playedGames > 0 &&
                        <>
                            <div className="row d-flex justify-content-center align-items-center">
                                <div className="col-xs-12 col-sm-12 col-md-10 col-lg-8 p-0">
                                    <Panel>
                                        <div className="row">
                                            <div className="col-12 col-lg-6 p-0 align-top" >
                                                <GamesTimeline games={games} players={players} />
                                            </div>
                                            <div className="col-12 col-lg-6 p-0 align-top" >
                                                <Panel className="h-100">
                                                    <div className="d-flex flex-column align-items-center">
                                                        <span className="text-shade100 fs-4 fw-semibold mb-4 mt-4">
                                                            Infos
                                                        </span>
                                                        <div className="container overflow-hidden">
                                                            <div className="row gy-4 d-flex justify-content-center">
                                                                <div className="col-12 col-sm-6 col-lg-4">
                                                                    <StatsCard
                                                                        title="Played Games"
                                                                        value={games.length}
                                                                        subvalue=""
                                                                        className="panel-brighter-bg"
                                                                    />
                                                                </div>
                                                                <div className="col-12 col-sm-6 col-lg-4">
                                                                    <StatsCard
                                                                        title="Legend"
                                                                        value={legendContent}
                                                                        subvalue=""
                                                                        className="panel-brighter-bg"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Panel>
                                            </div>
                                        </div>
                                        <div className="row d-flex justify-content-center align-items-center">
                                            <div className="col-12 p-0" >
                                                <PlayersX01StatsComparisonBars playersX01Stats={playerStats} />
                                            </div>
                                        </div>
                                    </Panel>
                                </div>
                            </div>
                            <div className="row d-flex justify-content-center align-items-center">
                                <div className="col-xs-12 col-sm-12 col-md-10 col-lg-8 p-0" >
                                    <X01StatsCharts
                                        avg={((playerStats || {}).avg || []).perGame || []}
                                        sectionHits={(playerStats || {}).sectionHits || {}}
                                        checkouts={((playerStats || {}).checkouts || {}).rates || {}}
                                        scoreRanges={(playerStats || {}).scoreRanges || {}}
                                        players={players}
                                    />
                                </div>
                            </div>
                        </>
                    }
                </>
            }
            {players && (players.filter(player => player != null).length !== playersCount) &&
                <div className="d-flex justify-content-center mt-4">
                    <span className="empty-text text-shade500">
                        Please select {playersCount} players to compare statistics
                    </span>
                </div>
            }
            {playerStats && playerStats.playedGames == 0 &&
                <div className="d-flex justify-content-center mt-4">
                    <span className="empty-text text-shade500">
                        No games found. Check the filters
                    </span>
                </div>
            }
        </div>
    );
}

export default PlayerVSStats;