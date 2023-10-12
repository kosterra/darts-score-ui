import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import {
    Col,
    Container,
    Row
} from 'react-bootstrap';

import StatsService from '../../services/stats.service';
import PlayerService from '../../services/player.service';
import PageLoader from '../elements/page.loader';
import CricketService from '../../services/cricket.service';

const CricketGameStats = () => {
    const { id } = useParams();

    const [game, setGame] = useState();
    const [gameStats, setGameStats] = useState({});
    const [players, setPlayers] = useState();

    const loadCricketGame = async () => {
        let data = await CricketService.loadCricket(id);
        setGame(data);
    }

    const loadCricketGameStats = async () => {
        let data = await StatsService.loadCricketGameStats(game.id);
        setGameStats(data);
    }

    const loadPlayers = async () => {
        let data = await PlayerService.loadPlayers();
        setPlayers(data);
    }

    useEffect(() => {
        loadCricketGame();
        loadPlayers();
		// loadCricketGameStats();
	}, []);

    if (!game || !players) {
        return (
            <PageLoader />
        )
    }

    return (
        <Container fluid className="p-4 pt-0 bg-transparent border-0">
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    Not yet implemented. Coming soon...
                </Col>
            </Row>
        </Container>
    );
}

export default CricketGameStats;