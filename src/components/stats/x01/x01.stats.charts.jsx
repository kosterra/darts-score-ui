import StatsRadarChart from '../common/radar.chart';
import StatsScatterChart from '../common/scatter.chart';
import StatsBarChart from '../common/bar.chart';
import StatsLineChart from '../common/line.chart';
import ChartConfigOptions from '../common/chart.config.options';

const X01StatsCharts = (props) => {
    const {
        avg,
        sectionHits,
        checkouts,
        scoreRanges,
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
        <div className="container-fluid overflow-hidden p-0">
            <div className="row gy-3 d-flex justify-content-center align-items-center mt-2">
                <div className="col-12 col-xxl-6">
                    <StatsLineChart title="Averages"
                        data={avg}
                        players={players}
                        labels={getLineChartLabels()}
                        showLegend={true}
                    />
                </div>
                <div className="col-12 col-xxl-6">
                    <StatsRadarChart title="Section Hits"
                        data={sectionHits}
                        players={players}
                        axisKey="section"
                        labels={getRadarChartLabels()}
                        showLegend={true}
                    />
                </div>
            </div>
            <div className="row gy-3 d-flex justify-content-center align-items-center mt-2">
                <div className="col-12 col-xxl-6">
                    <StatsScatterChart title="Checkouts"
                        data={checkouts}
                        players={players}
                        xKey="total"
                        yKey="hit"
                        zKey="rate"
                        xLabel="Total Attempts"
                        yLabel="Hit"
                        labels={getScatterChartLabels()}
                        showLegend={true}
                    />
                </div>
                <div className="col-12 col-xxl-6">
                    <StatsBarChart title="Score Ranges"
                        data={scoreRanges}
                        players={players}
                        yLabel="Count"
                        labels={getBarChartLabels()}
                        showLegend={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default X01StatsCharts;