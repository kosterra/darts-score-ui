import { Fragment } from 'react';
import { Col, Row } from 'react-bootstrap';

import StatsRadarChart from '../common/radar.chart';
import StatsScatterChart from '../common/scatter.chart';
import StatsBarChart from '../common/bar.chart';
import StatsAreaChart from '../common/area.chart';

const PlayerStatsCharts = (props) => {
    const {
        playerStats,
        players
    } = props;

    return (
        <Fragment>
            <Row xs={1} sm={1} md={2} className="d-flex justify-content-center align-items-center mt-3">
                <Col className="col-6 p-1">
                    <StatsAreaChart title="Average"
                        subtitle="X01"
                        data={((playerStats || {}).avg || {}).perGameX01 || []}
                        players={players}
                        labels={[
                            { areaKey: "value", xkey: "label", fill: "#528b6e", stroke: "#d4c783" }
                        ]}
                    />
                </Col>
                <Col className="col-6 p-1">
                    <StatsRadarChart title="Section Hits"
                        subtitle="X01"
                        data={(playerStats || {}).sectionHits || []}
                        players={players}
                        axisKey="section"
                        labels={[
                            { radarKey: "hit", fill: "#528b6e", stroke: "#d4c783" }
                        ]}
                    />
                </Col>
            </Row>
            <Row xs={1} sm={1} md={2} className="d-flex justify-content-center align-items-center mt-3">
                <Col className="col-6 p-1">
                    <StatsScatterChart title="Checkouts"
                        subtitle="X01"
                        data={((playerStats || {}).checkouts || {}).rates || []}
                        players={players}
                        xKey="total"
                        yKey="hit"
                        zKey="rate"
                        xLabel="Total Attempts"
                        yLabel="Hit"
                        labels={[
                            { scatterKey: "section", fill: "#528b6e", stroke: "#d4c783" }
                        ]}
                    />
                </Col>
                <Col className="col-6 p-1">
                    <StatsBarChart title="Score Ranges"
                        subtitle="X01"
                        data={(playerStats || {}).scoreRanges || []}
                        players={players}
                        yLabel="Count"
                        labels={[
                            { barKey: "count", xKey: "range", fill: "#528b6e" }
                        ]}
                    />
                </Col>
            </Row>
        </Fragment>
    );
};

export default PlayerStatsCharts;