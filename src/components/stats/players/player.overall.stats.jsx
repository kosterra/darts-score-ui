import StatsCard from '../common/stats.card';

const PlayerOverallStats = (props) => {
    const {
        playerStats
    } = props

    return (
        <div className="container overflow-hidden p-0 mt-4">
            <span className="d-flex justify-content-center align-items-center text-shade100 fs-4 fw-semibold mt-4">
                Game Statistics
            </span>
            <div className="row gy-4 mt-4 d-flex space-between">
                <div className="col-12 col-sm-6 col-lg-4 col-xl-3">
                    <StatsCard
                        title="Played Games"
                        subtitle="X01"
                        value={(((playerStats || {}).playedGames || {}).x01 || 0)}
                        subvalue=""
                    />
                </div>
                <div className="col-12 col-sm-6 col-lg-4 col-xl-3">
                    <StatsCard
                        title="Won Games"
                        subtitle="X01"
                        value={(((playerStats || {}).wonGames || {}).x01 || 0)}
                        subvalue={'(' + Math.round(((((playerStats || {}).wonGames || {}).x01 || 0) * 100) / (((playerStats || {}).playedGames || {}).x01 || 0), 0) + '%)'}
                    />
                </div>
                <div className="col-12 col-sm-6 col-lg-4 col-xl-3">
                    <StatsCard
                        title="Played Games"
                        subtitle="Cricket"
                        value={(((playerStats || {}).playedGames || {}).cricket || 0)}
                        subvalue=""
                    />
                </div>
                <div className="col-12 col-sm-6 col-lg-4 col-xl-3">
                    <StatsCard
                        title="Won Games"
                        subtitle="Cricket"
                        value={(((playerStats || {}).wonGames || {}).cricket || 0)}
                        subvalue={'(' + Math.round(((((playerStats || {}).wonGames || {}).cricket || 0) * 100) / (((playerStats || {}).playedGames || {}).cricket || 0), 0) + '%)'}
                    />
                </div>
                <div className="col-12 col-sm-6 col-lg-4 col-xl-3">
                    <StatsCard
                        title="Overall Avg"
                        subtitle="X01"
                        value={(((playerStats || {}).avg || {}).overallX01 || 0)}
                        subvalue=""
                    />
                </div>
                <div className="col-12 col-sm-6 col-lg-4 col-xl-3">
                    <StatsCard
                        title="Avg Darts per Leg"
                        subtitle="X01"
                        value={(((playerStats || {}).avg || {}).dartsPerLegX01 || 0)}
                        subvalue=""
                    />
                </div>
                <div className="col-12 col-sm-6 col-lg-4 col-xl-3">
                    <StatsCard
                        title="180's"
                        subtitle="X01"
                        value={((playerStats || {}).num180s || 0)}
                        subvalue=""
                    />
                </div>
                <div className="col-12 col-sm-6 col-lg-4 col-xl-3">
                    <StatsCard
                        title="140+"
                        subtitle="X01"
                        value={((playerStats || {}).num140plus || 0)}
                        subvalue=""
                    />
                </div>
                <div className="col-12 col-sm-6 col-lg-4 col-xl-3">
                    <StatsCard
                        title="Checkout Rate"
                        subtitle="X01"
                        value={(((playerStats || {}).checkouts || {}).hit || 0) + ' / ' + (((playerStats || {}).checkouts || {}).total || 0)}
                        subvalue={'(' + Math.round(((((playerStats || {}).checkouts || {}).hit || 0) * 100) / (((playerStats || {}).checkouts || {}).total || 0), 0) + '%)'}
                    />
                </div>
                <div className="col-12 col-sm-6 col-lg-4 col-xl-3">
                    <StatsCard
                        title="Highest Checkout"
                        subtitle="X01"
                        value={(((playerStats || {}).checkouts || {}).highest || 0)}
                        subvalue=""
                    />
                </div>
                <div className="col-12 col-sm-6 col-lg-4 col-xl-3">
                    <StatsCard
                        title="Throwed Darts"
                        subtitle="X01"
                        value={(((playerStats || {}).throwedDarts || {}).x01 || 0).toLocaleString('de-CH')}
                        subvalue=""
                    />
                </div>
                <div className="col-12 col-sm-6 col-lg-4 col-xl-3">
                    <StatsCard
                        title="Throwed Points"
                        subtitle="X01"
                        value={(((playerStats || {}).throwedPoints || {}).x01 || 0).toLocaleString('de-CH')}
                        subvalue=""
                    />
                </div>
            </div>
        </div>
    );
}

export default PlayerOverallStats;