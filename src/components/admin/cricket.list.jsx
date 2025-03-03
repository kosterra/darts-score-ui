
import { useState, useEffect, useRef } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Avatar } from 'primereact/avatar';
import { SelectButton } from 'primereact/selectbutton';
import { Dropdown } from 'primereact/dropdown';
import { Panel } from 'primereact/panel';
import { Toast } from 'primereact/toast';
import { Tag } from 'primereact/tag';
import { FaTrophy, FaChartColumn } from "react-icons/fa6";
import { GiDart } from "react-icons/gi";

import dayjs from "dayjs";

import PlayerService from '../../services/player.service';
import CricketService from '../../services/cricket.service';
import DeletePopup from '../elements/delete.popup';
import JSONViewer from '../elements/json.viewer';

const CricketList = (props) => {
    const {
        deleteActive = false,
        rawActive = true,
        staticStatusValue = 3,
        showStatusFilter = true,
        emptyMessage = 'No items found'
    } = props;

    const toast = useRef(null);

    const [players, setPlayers] = useState([]);
    const [cricketGames, setCricketGames] = useState([]);
    const [layout, setLayout] = useState('grid');
    const [statusFilterValue, setStatusFilterValue] = useState(staticStatusValue);
    const [sortKey, setSortKey] = useState('!createdAt');
    const [sortOrder, setSortOrder] = useState(-1);
    const [sortField, setSortField] = useState('createdAt');
    const sortOptions = [
        { label: 'Latest to Earliest', value: '!createdAt' },
        { label: 'Earliest to Latest', value: 'createdAt' }
    ];

    const statusFilterValues = [
        { name: 'Running', value: 1 },
        { name: 'Finished', value: 2 },
        { name: 'All', value: 3 }
    ];

    useEffect(() => {
        loadCricketGames();
    }, [statusFilterValue]);

    useEffect(() => {
        loadPlayers();
    }, []);

    const onSortChange = (event) => {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            setSortOrder(-1);
            setSortField(value.substring(1, value.length));
            setSortKey(value);
        } else {
            setSortOrder(1);
            setSortField(value);
            setSortKey(value);
        }
    };

    const onCricketGameDelete = async (game) => {
        if (await CricketService.deleteCricket(game.id)) {
            toast.current.show(
                {
                    severity: 'success',
                    summary: 'Cricket Game deleted',
                    detail: 'Successfully deleted game: ' + game.id,
                    life: 3000
                }
            );
            loadCricketGames('');
        } else {
            toast.current.show(
                {
                    severity: 'error',
                    summary: 'Cricket Game deleted',
                    detail: 'Error on deleting Cricket game: ' + game.id + '. Please try again or contact your system administrator',
                    life: 3000
                }
            );
        }
    };

    const loadPlayers = async () => {
        let data = await PlayerService.searchPlayers();
        setPlayers(data);
    };

    const loadCricketGames = async () => {
        let data;
        if (statusFilterValue === 1) {
            data = await CricketService.loadRunningCricketGames();
        } else if (statusFilterValue === 2) {
            data = await CricketService.loadFinishedCricketGames();
        } else {
            data = await CricketService.loadAllCricketGames();
        }
        setCricketGames(data);
    }

    const gameTemplate = (game) => {
        return (
            <>
                <div className="row mb-2">
                    <div className={`col-9`}>
                        {' '}
                    </div>
                    <div className="col-3 d-flex align-items-center justify-content-center text-shade100 fs-8 fw-semibold">
                        {game.gameIsRunning ? 'Score' : 'End Score'}
                    </div>
                </div>
                {players.length > 0 && game.players.map((playerId, idx) => (
                    <div className="row" key={idx}>
                        <div className={`col-9 d-flex align-items-center text-shade100 fs-7 fw-semibold`}>
                            <Avatar
                                label={(((players || []).find(player => player.id === playerId) || {}).firstname + ' ' + ((players || []).find(player => player.id === playerId) || {}).lastname).split(" ").map((n) => n[0]).join("")}
                                image={((players || []).find(player => player.id === playerId) || {}).profileImg}
                                shape="circle"
                                size="small"
                                className="bg-shade700 m-2 me-4"
                            />
                            {((players || []).find(player => player.id === playerId) || {}).nickname || 'N / A'}
                            {game.playerModels[playerId].hasWonGame &&
                                <FaTrophy className="ms-2 text-gold fs-6" />
                            }
                        </div>
                        <div className="col-3 d-flex align-items-center justify-content-center text-shade100 fs-7 fw-semibold">
                            {game.playerModels[playerId].score}
                        </div>
                    </div>
                ))}
            </>
        );
    }

    const listItem = (game, index) => {
        return (
            <div className="col-12" key={'list-item-' + index}>
                <Panel className="panel-brighter-bg no-header">
                    <div className="container-fluid overflow-hidden">
                        <div className="row gy-4">
                            <div className="col-12 col-lg-4 d-flex flex-column gap-4">
                                <div className="d-flex justify-content-start align-items-center gap-3">
                                    <span className="fs-5 text-shade100 fw-semibold">
                                        Cricket Game
                                    </span>
                                    <Tag
                                        severity={game.gameIsRunning ? 'warning' : 'info'}
                                        value={game.gameIsRunning ? 'Running' : 'Finished'}
                                        rounded
                                    />
                                </div>
                                <div>
                                    <span className="fs-8 text-shade500">
                                        {dayjs(game.createdAt).format("DD.MM.YYYY HH:mm")}
                                    </span>
                                </div>
                            </div>
                            <div className="col-12 col-lg-4 d-flex flex-column justify-content-center">
                                {gameTemplate(game)}
                            </div>
                            <div className="col-12 col-lg-4 d-flex justify-content-center justify-content-md-end align-items-center gap-2">
                                {game.gameIsRunning &&
                                    <a href={'/cricket/' + game.id} className="p-button font-bold">
                                        <GiDart title="Continue Playing" className="fs-6" />
                                    </a>
                                }
                                {!game.gameIsRunning &&
                                    <a href={'/stats/games/cricket/' + game.id} className="p-button font-bold">
                                        <FaChartColumn title="Show Statistics" className="fs-6" />
                                    </a>
                                }
                                {rawActive &&
                                    <JSONViewer data={game} header="Game _RAW Data" />
                                }
                                {deleteActive &&
                                    <DeletePopup
                                        data={game}
                                        header="Delete Game"
                                        message={'game ' + game.id}
                                        handleDelete={onCricketGameDelete}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </Panel>
            </div>
        );
    };

    const gridItem = (game, index) => {
        return (
            <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={'grid-item-' + index}>
                <Panel className="panel-brighter-bg no-header">
                    <div className="row mb-3">
                        <div className="d-flex justify-content-start align-items-center gap-3">
                            <span className="fs-5 text-shade100 fw-semibold">
                                Cricket Game
                            </span>
                            <Tag
                                severity={game.gameIsRunning ? 'warning' : 'info'}
                                value={game.gameIsRunning ? 'Running' : 'Finished'}
                                rounded
                            />
                        </div>
                    </div>
                    <div className="row pt-2">
                        <div className="col-12 d-flex flex-column justify-content-center">
                            {gameTemplate(game)}
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-12">
                            <span className="fs-8 text-shade500">
                                {dayjs(game.createdAt).format("DD.MM.YYYY HH:mm")}
                            </span>
                        </div>
                        <div className="col-12 d-flex justify-content-start justify-content-xxl-end mt-2">
                            <div className="d-flex gap-2">
                                {game.gameIsRunning &&
                                    <a href={'/cricket/' + game.id} className="p-button font-bold">
                                        <GiDart title="Continue Playing" className="fs-6" />
                                    </a>
                                }
                                {!game.gameIsRunning &&
                                    <a href={'/stats/games/cricket/' + game.id} className="p-button font-bold">
                                        <FaChartColumn title="Show Statistics" className="fs-6" />
                                    </a>
                                }
                                {rawActive &&
                                    <JSONViewer data={game} header="Game _RAW Data" />
                                }
                                {deleteActive &&
                                    <DeletePopup
                                        data={game}
                                        header="Delete Game"
                                        message={'game ' + game.id}
                                        handleDelete={onCricketGameDelete}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </Panel>
            </div>
        );
    };

    const itemTemplate = (game, layout, index) => {
        if (!game) {
            return;
        }

        if (layout === 'list') {
            return listItem(game, index);
        } else if (layout === 'grid') {
            return gridItem(game, index);
        }
    };

    const listTemplate = (games, layout) => {
        return (
            <div className="container-fluid overflow-hidden">
                <div className="row gy-4 p-4">
                    {games.map((game, index) => itemTemplate(game, layout, index))}
                </div>
            </div>
        );
    };

    const header = () => {
        return (
            <div className="container-fluid overflow-hidden">
                <div className="row gy-2">
                    <div className="col-12 col-md-8">
                        <div className="d-flex flex-sm-row align-items-center justify-content-start flex-wrap gap-3 p-2">
                            {showStatusFilter &&
                                <SelectButton
                                    value={statusFilterValue}
                                    onChange={(e) => setStatusFilterValue(e.value)}
                                    optionLabel="name"
                                    options={statusFilterValues}
                                />
                            }
                            <Dropdown
                                options={sortOptions}
                                value={sortKey}
                                optionLabel="label"
                                placeholder="Sort List"
                                onChange={onSortChange}
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-4 d-flex align-items-center justify-content-start justify-content-lg-end mb-2 mb-lg-0">
                        <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="card">
            <DataView
                value={cricketGames}
                listTemplate={listTemplate}
                layout={layout}
                header={header()}
                sortField={sortField}
                sortOrder={sortOrder}
                paginator
                rows={8}
                emptyMessage={emptyMessage}
            />
            <Toast ref={toast} position="bottom-right" />
        </div>
    )
};

export default CricketList;