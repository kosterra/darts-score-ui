import { useRef } from 'react';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { DataScroller } from 'primereact/datascroller';
import { FaChartBar, FaTrophy } from "react-icons/fa";

import dayjs from "dayjs";

const DashboardGameList = (props) => {
    const {
        title = '',
        subtitle = '',
        gamesType = 'x01',
        games = [],
        players = []
    } = props;

    const ds = useRef(null);

    const headerTemplate = () => {
        return (
            <div className="p-panel-header" >
                <div>
                    <div className="text-center fs-6 fw-semibold">{title}</div>
                    <div className="text-center fs-8 fw-medium">{subtitle}</div>
                </div>
            </div>
        );
    };

    const itemTemplate = (game) => {
        return (
            <div>
                <div>
                    {players.length > 0 && game.players.map((playerId, idx) => (
                        <>
                            {gamesType == 'x01' &&
                                <div className="row mb-2">
                                    <div className={`text-white text-start align-middle fs-8 ${game.gameIsRunning ? 'col-6' : 'col-9'}`}>
                                        {((players || []).find(player => player.id === playerId) || {}).nickname || 'N / A'}
                                        {game.playerModels[playerId].hasWonGame &&
                                            <FaTrophy className="fs-6 ms-2 text-gold" />
                                        }
                                    </div>
                                    <div className="col-3 text-white text-center align-middle fs-8">{game.playerModels[playerId].setsWon}</div>
                                    {game.gameIsRunning &&
                                        <div className="col-3 text-white text-center align-middle fs-8">{game.playerModels[playerId].currentSetLegsWon}</div>
                                    }
                                </div>
                            }
                            {gamesType == 'cricket' &&
                                <div className="row">
                                    <div className="col-6 text-white text-start align-middle fs-8">
                                        {((players || []).find(player => player.id === playerId) || {}).nickname || 'N / A'}
                                        {game.playerModels[playerId].hasWonGame &&
                                            <FaTrophy className="fs-6 ms-2 text-gold" />
                                        }
                                    </div>
                                </div>
                            }
                        </>
                    ))}
                </div>
                <div className="d-flex justify-content-between align-items-end mt-4">
                    <span className="fs-9 text-shade500">{dayjs(game.createdAt).format("DD.MM.YYYY HH:mm")}</span>
                    <Button href={'/' + gamesType + '/' + game.id} className="py-2 px-3">
                        <FaChartBar title="Show Statistics" />
                    </Button>
                </div>
            </div>
        );
    };

    const footerTemplate = () => {
        if (games.length == 0) {
            return null;
        }

        return (
            <div className="mt-3">
                <Button type="text" icon="pi pi-plus" size="small" label="Load More" onClick={() => ds.current.load()} />
            </div>
        );
    };


    return (
        <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-3">
            <Panel headerTemplate={headerTemplate} className="mx-auto" >
                <DataScroller ref={ds} value={games} itemTemplate={itemTemplate} rows={5} loader footer={footerTemplate()} />
            </Panel>
        </div>
    );
};

export default DashboardGameList;