import React, { Fragment, useState, useEffect } from 'react';

import {
    Col,
    Container,
    Row
} from 'react-bootstrap';

import StatsAreaChart from './area.chart';
import StatsService from '../../services/stats.service';
import StatsRadarChart from './radar.chart';
import StatsCard from './stats.card';

const PlayerOverallStats = (props) => {
    const {
        player
    } = props

    const [playerStats, setPlayerStats] = useState({});

    const loadPlayerStats = async () => {
        let data = await StatsService.loadPlayerStats(player.id);
        setPlayerStats(data);
    }

    
    useEffect(() => {
		loadPlayerStats();
    // eslint-disable-next-line
	}, []);

    return (
        <Fragment>
            <Container className="px-1">
                <div className="mt-4 d-flex justify-content-center">
                    <span className="fs-2">Statistics for {player.nickname}</span>
                </div>
                <Row className="mt-4 d-flex space-between">
                    <Col className="col-2 p-1 d-flex align-content-stretch">
                        <StatsCard title="Played Games"
                                   subtitle="X01"
                                   value={ (((playerStats || {}).playedGames || {}).x01 || 0) }
                                   subvalue=""
                        />
                    </Col>
                    <Col className="col-2 p-1 d-flex align-content-stretch">
                        <StatsCard title="Won Games"
                                   subtitle="X01"
                                   value={ (((playerStats || {}).wonGames || {}).x01 || 0) }
                                   subvalue={ '(' + Math.round(((((playerStats || {}).wonGames || {}).x01 || 0) * 100) / (((playerStats || {}).playedGames || {}).x01 || 0), 0) + '%)' }
                        />
                    </Col>
                    <Col className="col-2 p-1 d-flex align-content-stretch">
                        <StatsCard title="Played Games"
                                   subtitle="Cricket"
                                   value={ (((playerStats || {}).playedGames || {}).cricket || 0) }
                                   subvalue=""
                        />
                    </Col>
                    <Col className="col-2 p-1 d-flex align-content-stretch">
                        <StatsCard title="Won Games"
                                   subtitle="Cricket"
                                   value={ (((playerStats || {}).wonGames || {}).cricket || 0) }
                                   subvalue={ '(' + Math.round(((((playerStats || {}).wonGames || {}).cricket || 0) * 100) / (((playerStats || {}).playedGames || {}).cricket || 0), 0) + '%)' }
                        />
                    </Col>
                    <Col className="col-2 p-1 d-flex align-content-stretch">
                        <StatsCard title="Overall Avg"
                                   subtitle="X01"
                                   value={ (((playerStats || {}).avg || {}).overallX01 || 0) }
                                   subvalue=""
                        />
                    </Col>
                    <Col className="col-2 p-1 d-flex align-content-stretch">
                        <StatsCard title="Avg Darts per Leg"
                                   subtitle="X01"
                                   value={ (((playerStats || {}).avg || {}).dartsPerLegX01 || 0) }
                                   subvalue=""
                        />
                    </Col>
                    <Col className="col-2 p-1 d-flex align-content-stretch">
                        <StatsCard title="180's"
                                   subtitle="X01"
                                   value={ ((playerStats || {}).num180s || 0) }
                                   subvalue=""
                        />
                    </Col>
                    <Col className="col-2 p-1 d-flex align-content-stretch">
                        <StatsCard title="140+"
                                   subtitle="X01"
                                   value={ ((playerStats || {}).num140plus || 0) }
                                   subvalue=""
                        />
                    </Col>
                    <Col className="col-2 p-1 d-flex align-content-stretch">
                        <StatsCard title="Checkout Rate"
                                   subtitle="X01"
                                   value={ (((playerStats || {}).checkouts || {}).hit || 0) + ' / ' + (((playerStats || {}).checkouts || {}).total || 0) }
                                   subvalue={ '(' + Math.round(((((playerStats || {}).checkouts || {}).hit || 0) * 100) / (((playerStats || {}).checkouts || {}).total || 0), 0) + '%)' }
                        />
                    </Col>
                    <Col className="col-2 p-1 d-flex align-content-stretch">
                        <StatsCard title="Highest Checkout"
                                   subtitle="X01"
                                   value={ (((playerStats || {}).checkouts || {}).highest || 0) }
                                   subvalue=""
                        />
                    </Col>
                    <Col className="col-2 p-1 d-flex align-content-stretch">
                        <StatsCard title="Throwed Darts"
                                   subtitle="X01"
                                   value={ (((playerStats || {}).throwedDarts || {}).x01 || 0) }
                                   subvalue=""
                        />
                    </Col>
                    <Col className="col-2 p-1 d-flex align-content-stretch">
                        <StatsCard title="Throwed Points"
                                   subtitle="X01"
                                   value={ (((playerStats || {}).throwedPoints || {}).x01 || 0).toLocaleString('de-CH') }
                                   subvalue=""
                        />
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col className="col-6 p-1">
                        <StatsAreaChart title="Average"
                                        subtitle="X01"
                                        data={ ((playerStats || {}).avg || {}).perGameX01 || [] }
                        />
                    </Col>
                    <Col className="col-6 p-1">
                        <StatsRadarChart title="Section Hits"
                                         subtitle="X01"
                                         data={ (playerStats || {}).sectionHits || [] }
                        />
                    </Col>
                </Row>
{/*                 <Row className="mt-3">
                    <Col className="col-6 p-1">
                        <StatsAreaChart title="Points per Dart"
                                        subtitle="X01"
                                        data={ ((playerStats || {}).avg || {}).perGameX01 || [] }
                        />
                    </Col>
                    <Col className="col-6 p-1">
                        <StatsAreaChart title="Points 3 Darts"
                                        subtitle="X01"
                                        data={ ((playerStats || {}).avg || {}).perGameX01 || [] }
                        />
                    </Col>
                </Row> */}
            </Container>
        </Fragment>
    );
}

export default PlayerOverallStats;