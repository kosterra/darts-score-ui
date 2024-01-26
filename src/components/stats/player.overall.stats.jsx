import { Fragment } from 'react';

import {
    Col,
    Container,
    Row
} from 'react-bootstrap';

import StatsCard from './stats.card';
import PlayerStatsCharts from './player.stats.charts';

const PlayerOverallStats = (props) => {
    const {
        player,
        playerStats
    } = props

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
                                   value={ (((playerStats || {}).throwedDarts || {}).x01 || 0).toLocaleString('de-CH') }
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
            </Container>
        </Fragment>
    );
}

export default PlayerOverallStats;