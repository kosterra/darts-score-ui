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
        <div className="container overflow-hidden p-0">
            <div className="row gy-4 mt-4 d-flex space-between">
                <span className="d-flex justify-content-center align-items-center text-shade100 fs-4 fw-semibold mb-4 mt-4">
                    X01 Statistics Charts
                </span>
                <div className="col-12 col-xl-6">
                    <StatsAreaChart title="Average"
                        subtitle="X01"
                        data={((playerStats || {}).avg || {}).perGameX01 || []}
                        players={players}
                        labels={[
                            { areaKey: "value", xkey: "label", fill: "#528b6e", stroke: "#d4c783" }
                        ]}
                    />
                </div>
                <div className="col-12 col-xl-6">
                    <StatsRadarChart title="Section Hits"
                        subtitle="X01"
                        data={(playerStats || {}).sectionHits || []}
                        players={players}
                        axisKey="section"
                        labels={[
                            { radarKey: "hit", fill: "#528b6e", stroke: "#d4c783" }
                        ]}
                    />
                </div>
            </div>
            <div className="row gy-4 mt-2 d-flex space-between">
                <div className="col-12 col-xl-6">
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
                </div>
                <div className="col-12 col-xl-6 ">
                    <StatsBarChart title="Score Ranges"
                        subtitle="X01"
                        data={(playerStats || {}).scoreRanges || []}
                        players={players}
                        yLabel="Count"
                        labels={[
                            { barKey: "count", xKey: "range", fill: "#528b6e" }
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};

export default PlayerStatsCharts;