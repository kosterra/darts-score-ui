import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import { TabView, TabPanel } from 'primereact/tabview';

import StatsService from '../../../services/stats.service';
import PlayerService from '../../../services/player.service';
import X01Models from '../../../models/x01.models';
import X01Service from '../../../services/x01.service';
import X01StatsScoreBoard from './x01.stats.scoreboard';
import X01GameHeader from '../../games/x01/x01.game.header';
import PageLoader from '../../elements/page.loader';
import X01StatsScoreBoardMultiple from './x01.stats.scoreboard.multiple';
import X01StatsTab from './x01.stats.tab';
import X01StatsCharts from './x01.stats.charts';

const X01GameStats = () => {
    const { id } = useParams();

    const [game, setGame] = useState();
    const [gameStats, setGameStats] = useState({});
    const [players, setPlayers] = useState();

    const navigate = useNavigate();

    const loadData = async () => {
        let game = await X01Service.loadX01(id);
        let players = await PlayerService.loadPlayers();
        let gameStats = await StatsService.loadX01GameStats(game.id);

        players = players.filter(player => game.players.includes(player.id));
        players.sort(function (a, b) {
            return game.players.indexOf(a.id) - game.players.indexOf(b.id);
        });

        setGame(game);
        setPlayers(players);
        setGameStats(gameStats);
    }

    useEffect(() => {
        loadData();
        // eslint-disable-next-line
    }, []);

    const onNewGame = () => {
        navigate("/x01", { replace: true });
    };

    const onFinishGame = () => {
        navigate("/", { replace: true });
    };

    const onRestartGame = async () => {
        let newMatchSetup = { ...X01Models.X01Model };
        newMatchSetup.isSoloGame = game.players.length === 1;
        newMatchSetup.startingScore = game.startingScore;
        newMatchSetup.setMode = game.setMode;
        newMatchSetup.legMode = game.legMode;
        newMatchSetup.legInMode = game.legInMode;
        newMatchSetup.legOutMode = game.legOutMode;
        newMatchSetup.numberOfSets = game.numberOfSets;
        newMatchSetup.numberOfLegs = game.numberOfLegs;
        newMatchSetup.numberOfPlayers = game.players.length;
        newMatchSetup.startingPlayerLeg = game.players[0];
        newMatchSetup.startingPlayerSet = game.players[0];
        newMatchSetup.currentPlayerTurn = game.players[0];
        newMatchSetup.players = game.players;
        newMatchSetup.playerModels = {};
        game.players.forEach(player => {
            let x01PlayerModel = { ...X01Models.X01PlayerModel };
            x01PlayerModel.score = Number(game.startingScore);
            newMatchSetup.playerModels[player] = x01PlayerModel;
        });

        let newGame = await X01Service.createX01(newMatchSetup)
        navigate('/x01/' + newGame.id);
    };

    const tabHeaderTemplate = (options) => {
        return (
            <div className="d-flex align-items-center text-shade500 gap-2 p-3" style={{ cursor: 'pointer' }} onClick={options.onClick}>
                <Badge size="large" severity="secondary" value={options.index === 0 ? 'A' : options.index} />
                <span className="fw-bold fs-6">{options.index === 0 ? 'Overall' : 'Set'}</span>
            </div>
        );
    };

    if (!game || !players) {
        return (
            <PageLoader />
        )
    }

    return (
        <div className="container-fluid p-4 pt-0 border-0">
            <X01GameHeader
                setMode={game.setMode}
                numberOfSets={game.numberOfSets}
                legMode={game.legMode}
                numberOfLegs={game.numberOfLegs}
                legInMode={game.legInMode}
                legOutMode={game.legOutMode}
            />
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-xs-12 col-sm-12 col-md-10 col-lg-8" >
                    {game.players.length === 2 &&
                        <X01StatsScoreBoard players={players} game={game} />
                    }
                    {game.players.length > 2 &&
                        <X01StatsScoreBoardMultiple players={players} game={game} />
                    }
                </div>
            </div>
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-xs-12 col-sm-12 col-md-10 col-lg-8 px-0 rounded-2">
                    <Panel>
                        <TabView>
                            <TabPanel header="Overall" headerTemplate={tabHeaderTemplate}>
                                <X01StatsTab valueKey="game" game={game} gameStats={gameStats} />
                            </TabPanel>

                            {[...Array(game.setsPlayed)].map((e, i) => (
                                <TabPanel key={`set-tab-${i}`} header={`Set ${i + 1}`} headerTemplate={tabHeaderTemplate}>
                                    <X01StatsTab valueKey={`set-${i + 1}`} game={game} />
                                </TabPanel>
                            ))}
                        </TabView>
                    </Panel>
                </div>
            </div>
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-xs-12 col-sm-12 col-md-10 col-lg-8 px-0 rounded-2">
                    <X01StatsCharts
                        avg={(gameStats || {}).avg || []}
                        sectionHits={(gameStats || {}).sectionHits || {}}
                        checkouts={(gameStats || {}).checkouts || {}}
                        scoreRanges={(gameStats || {}).scoreRanges || {}}
                        players={players} />
                </div>
            </div>
            <div className="row mt-4">
                <div className="col d-flex justify-content-center align-items-center">
                    <span className="p-buttonset">
                        <Button
                            label="PLAY AGAIN"
                            icon="pi pi-sync"
                            onClick={onRestartGame}
                            size="small"
                            severity="primary"
                        />
                        <Button
                            label="NEW GAME"
                            icon="pi pi-plus"
                            onClick={onNewGame}
                            size="small"
                            outlined
                            severity="primary"
                        />
                        <Button
                            label="BACK HOME"
                            icon="pi pi-home"
                            onClick={onFinishGame}
                            size="small"
                            outlined
                            severity="primary"
                        />
                    </span>
                </div>
            </div>
        </div>
    );
}

export default X01GameStats;