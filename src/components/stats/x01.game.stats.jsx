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

const X01GameStats = () => {
    const { id } = useParams();

    const [game, setGame] = useState();
    const [gameStats, setGameStats] = useState({});
    const [players, setPlayers] = useState();

    const loadX01Game = async () => {
        let data = await X01Service.loadX01(id);
        setGame(data);
    }

    const loadX01GameStats = async () => {
        let data = await StatsService.loadX01GameStats(game.id);
        setGameStats(data);
    }

    const loadPlayers = async () => {
        let data = await PlayerService.loadPlayers();
        setPlayers(data);
    }

    useEffect(() => {
        loadX01Game();
        loadPlayers();
		// loadX01GameStats();
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
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    { game.players.length === 2 &&
                        <X01StatsScoreBoard players={ players } game={ game } />
                    }
                    { game.players.length > 2 &&
                        <X01StatsScoreBoardMultiple players={ players } game={ game } />
                    }
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 6, offset: 3 }} className="px-0 rounded-2">
                    <Tabs
                        defaultActiveKey="overall"
                        justify
                    >
                        <Tab eventKey="overall" title="Overall" className="p-4 bg-secondary-grey">
                            <X01StatsTab valueKey="game" game={ game }/>
                        </Tab>

                        {[...Array(game.setsPlayed)].map((e, i) => (
                            <Tab key={`set-tab-${i}`} eventKey={`set-${i}`} title={`Set ${i+1}`} className="p-4 bg-secondary-grey">
                                <X01StatsTab valueKey={`set-${i+1}`} game={ game } />
                            </Tab>
                        ))}
                    </Tabs>
                </Col>
            </Row>
        </Container>
    );
}

export default X01GameStats;