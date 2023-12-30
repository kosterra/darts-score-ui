import React, { Fragment } from 'react';

import { Col, Row } from 'react-bootstrap';
import StatsRadarChart from './radar.chart';
import StatsScatterChart from './scatter.chart';
import StatsBarChart from './bar.chart';
import StatsLineChart from './line.chart';
import ChartConfigOptions from './chart.config.options';

const X01StatsCharts = (props) => {
    const {
        game,
        gameStats,
        players
    } = props;

    const { fillColors, strokeColor } = ChartConfigOptions;

    const getLineChartLabels = () => {
        var labels = [];

        players.forEach((_player, idx) => {
            var label = {
                lineKey: 'player' + (idx + 1),
                xKey: "label",
                fill: fillColors.values[idx],
                stroke: fillColors.values[idx]
            };
            labels.push(label);
        });

        return labels;
    };

    const getRadarChartLabels = () => {
        var labels = [];

        players.forEach((_player, idx) => {
            var label = {
                radarKey: 'player' + (idx + 1) + 'Hit',
                xKey: "label",
                fill: fillColors.values[idx],
                stroke: strokeColor
            };
            labels.push(label);
        });

        return labels;
    };

    const getScatterChartLabels = () => {
        var labels = [];

        players.forEach((_player, idx) => {
            var label = {
                scatterKey: 'player' + (idx + 1),
                fill: fillColors.values[idx],
                stroke: strokeColor
            };
            labels.push(label);
        });

        return labels;
    };

    const getBarChartLabels = () => {
        var labels = [];

        players.forEach((_player, idx) => {
            var label = {
                barKey: 'player' + (idx + 1) + 'Count',
                xKey: 'range',
                fill: fillColors.values[idx],
                stroke: strokeColor
            };
            labels.push(label);
        });

        return labels;
    };

    return (
        <Fragment>
            <Row xs={1} sm={1} md={2} className="d-flex justify-content-center align-items-center mt-3">
                <Col className="col-xs-12 col-md-6 col-lg-4 p-1">
                    <StatsLineChart title="Averages"
                                    data={ (gameStats || {}).avg || [] }
                                    players={ players }
                                    labels={ getLineChartLabels() }
                                    showLegend={ true }
                    />
                </Col>
                <Col className="col-xs-12 col-md-6 col-lg-4 p-1">
                    <StatsRadarChart title="Section Hits"
                                     data={ (gameStats || {}).sectionHits || {} }
                                     players={ players }
                                     axisKey="section"
                                     labels={ getRadarChartLabels() }
                                     showLegend={ true }
                    />
                </Col>
            </Row>
            <Row xs={1} sm={1} md={2} className="d-flex justify-content-center align-items-center mt-3">
                <Col className="col-xs-12 col-md-6 col-lg-4  p-1">
                    <StatsScatterChart title="Checkouts"
                                        data={ (gameStats || {}).checkouts || {} }
                                        players={ players }
                                        xKey="total"
                                        yKey="hit"
                                        zKey="rate"
                                        xLabel="Total Attempts"
                                        yLabel="Hit"
                                        labels={ getScatterChartLabels() }
                                        showLegend={ true }
                    />
                </Col>
                <Col className="col-xs-12 col-md-6 col-lg-4  p-1">
                    <StatsBarChart title="Score Ranges"
                                   data={ (gameStats || {}).scoreRanges || {} }
                                   players={ players }
                                   yLabel="Count"
                                   labels={ getBarChartLabels() }
                                   showLegend={ true }
                    />
                </Col>
            </Row>
        </Fragment>
    );
};

export default X01StatsCharts;