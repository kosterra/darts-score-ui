import { Fragment } from 'react';

import X01StatsComparisonBars from './x01.stats.comparison.bars';

const X01StatsTab = (props) => {
    const {
        valueKey,
        game
    } = props;

    return (
        <Fragment>
            <div className="row">
                <div className="col">
                    <X01StatsComparisonBars game={ game } valueKey={ valueKey } />
                </div>
            </div>
        </Fragment>
    );
};

export default X01StatsTab;