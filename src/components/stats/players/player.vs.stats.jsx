import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputSwitch } from 'primereact/inputswitch';
import { SelectButton } from 'primereact/selectbutton';
import { FaPlusCircle } from "react-icons/fa";

import PlayerSelect from '../../elements/player.select';
import StatsService from '../../../services/stats.service';
import PlayersX01StatsComparisonBars from './players.x01.stats.comparison.bars';
import X01StatsCharts from '../x01/x01.stats.charts';

const PlayerVSStats = (props) => {
    const {
        showStatsFilter = true,
        staticGameTypeFilterValue = 'X01'
    } = props

    const [playersCount, setPlayersCount] = useState(2);
    const [players, setPlayers] = useState([]);
    const [playerStats, setPlayerStats] = useState({});
    const [gameTypeFilterValue, setGameTypeFilterValue] = useState(staticGameTypeFilterValue);
    const [includeOthersValue, setIncludeOthersValue] = useState(false);
    const [dateFilterValue, setDateFilterValue] = useState('All');

    const gameTypeFilter = ['X01', 'Cricket'];
    const dateFilter = ['1 D', '1 W', '1 M', '1 Y', 'All'];

    const onSelectPlayer = async (player, idx) => {
        console.log(players);
        let newPlayers = [...players];
        newPlayers.splice(idx, 0, player);
        console.log(newPlayers);
        setPlayers(newPlayers);
    };

    const onDeletePlayer = (idx) => {
        let newPlayers = [...players]
        newPlayers.splice(idx, 1)
        setPlayers(newPlayers)
    };

    const loadX01Stats = async () => {
        let playerIds = players.map(player => player.id)
        let body = {
            playerIds: playerIds,
            includeOthers: includeOthersValue,
            dateFilter: dateFilterValue
        }
        // body['playerIds'] = playerIds
        // body['includeOthers'] = includeOthers
        // body['dateFilter'] = dateFilter
        let playersStats = await StatsService.loadX01PlayersStats(body)
        setPlayerStats(playersStats)
    };

    const handleIncludeOthers = (e) => {
        setIncludeOthersValue(!includeOthersValue)
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

    useEffect(() => {
        if (players.length === playersCount) {
            if (gameTypeFilterValue === 'X01') {
                loadX01Stats()
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
                            <div className="col-xs-12 col-sm-12 col-md-10 col-lg-8 p-0 bg-shade900" >
                                <Toolbar start={startContent} center={centerContent} end={endContent} className="m-4 p-4"/>
                            </div>
                        </div>
                    }
                    {playerStats && playerStats.playedGames > 0 &&
                        <>
                            <div className="row d-flex justify-content-center align-items-center">
                                <div className="col-xs-12 col-sm-12 col-md-10 col-lg-8 p-0" >
                                    <PlayersX01StatsComparisonBars playersX01Stats={playerStats} />
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