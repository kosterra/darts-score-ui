import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import {
    Col,
    Container,
    Row,
    Tab,
    Tabs
} from 'react-bootstrap';

import StatsService from '../../services/stats.service';
import PlayerService from '../../services/player.service';
import X01Service from '../../services/x01.service';
import X01StatsScoreBoard from './x01.stats.scoreboard';
import X01GameHeader from '../games/x01.game.header';
import PageLoader from '../elements/page.loader';
import X01StatsScoreBoardMultiple from './x01.stats.scoreboard.multiple';
import X01StatsTab from './x01.stats.tab';
import X01StatsCharts from './x01.stats.charts';

const X01GameStats = () => {
    const { id } = useParams();

    const [game, setGame] = useState();
    const [gameStats, setGameStats] = useState({});
    const [players, setPlayers] = useState();

    const loadData = async () => {
        let game = await X01Service.loadX01(id);
        let players = await PlayerService.loadPlayers();
        let gameStats = await StatsService.loadX01GameStats(game.id);
        
        players = players.filter(player => game.players.includes(player.id));

        setGame(game);
        setPlayers(players);
        setGameStats(gameStats);
    }

    useEffect(() => {
        loadData();
        // eslint-disable-next-line
	}, []);

    if (!game || !players) {
        return (
            <PageLoader />
        )
    }

    return (
        <Container fluid className="p-4 pt-0 bg-transparent border-0">
            <X01GameHeader
                setMode={ game.setMode }
                numberOfSets={ game.numberOfSets }
                legMode={ game.legMode }
                numberOfLegs={ game.numberOfLegs }
                legInMode={ game.legInMode }
                legOutMode={ game.legOutMode }
            />
            <Row className="d-flex justify-content-center align-items-center">
                <Col className="col-xs-12 col-sm-12 col-md-10 col-lg-8" >
                    { game.players.length === 2 &&
                        <X01StatsScoreBoard players={ players } game={ game } />
                    }
                    { game.players.length > 2 &&
                        <X01StatsScoreBoardMultiple players={ players } game={ game } />
                    }
                </Col>
            </Row>
            <Row xs={1} sm={1} md={1} className="d-flex justify-content-center align-items-center">
                <Col className="col-xs-12 col-sm-12 col-md-10 col-lg-8 px-0 rounded-2">
                    <Tabs
                        defaultActiveKey="overall"
                        justify
                    >
                        <Tab eventKey="overall" title="Overall" className="p-4 bg-secondary-grey">
                            <X01StatsTab valueKey="game" game={ game } gameStats={ gameStats } players={ players } />
                        </Tab>

                        {[...Array(game.setsPlayed)].map((e, i) => (
                            <Tab key={`set-tab-${i}`} eventKey={`set-${i}`} title={`Set ${i+1}`} className="p-4 bg-secondary-grey">
                                <X01StatsTab valueKey={`set-${i+1}`} game={ game } />
                            </Tab>
                        ))}
                    </Tabs>
                </Col>
                <Col className="col-12">
                    <X01StatsCharts gameStats={ gameStats } players={ players } />
                </Col>
            </Row>
        </Container>
    );
}

export default X01GameStats;