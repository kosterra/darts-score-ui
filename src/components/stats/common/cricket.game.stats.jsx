import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import {
    Col,
    Container,
    Row
} from 'react-bootstrap';

//import StatsService from '../../services/stats.service';
import PlayerService from '../../../services/player.service';
import PageLoader from '../../elements/page.loader';
import CricketService from '../../../services/cricket.service';

const CricketGameStats = () => {
    const { id } = useParams();

    const [game, setGame] = useState();
    //const [gameStats, setGameStats] = useState({});
    const [players, setPlayers] = useState();

    const loadData = async () => {
        let game = await CricketService.loadCricket(id);
        let players = await PlayerService.loadPlayers();
        //let gameStats = await StatsService.loadCricketGameStats(game.id);

        setGame(game);
        setPlayers(players);
        //setGameStats(gameStats);
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
        <Container fluid className="p-4 bg-transparent border-0">
            <Row className="d-flex justify-content-center align-items-center">
                <Col md={{ span: 6, offset: 3 }}>
                    Not yet implemented. Coming soon...
                </Col>
            </Row>
        </Container>
    );
}

export default CricketGameStats;