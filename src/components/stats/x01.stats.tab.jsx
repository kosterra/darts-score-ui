import React, { Fragment } from 'react';

import ComparisonBar from '../elements/comparison.bar';

const X01StatsTab = (props) => {
    const {
        valueKey,
        game
    } = props;

    return (
        <Fragment>
            <ComparisonBar
                title="Won Legs"
                barLValue={(((game || {}).playerModels[game.players[0]] || {}).legsWon || {})[valueKey] || 0}
                barRValue={(((game || {}).playerModels[game.players[1]] || {}).legsWon || {})[valueKey] || 0} />
            <ComparisonBar
                title="180s"
                barLValue={((((game || {}).playerModels[game.players[0]] || {}).scoreRanges || {})[valueKey] || {})['180'] || 0}
                barRValue={((((game || {}).playerModels[game.players[1]] || {}).scoreRanges || {})[valueKey] || {})['180'] || 0}
            />
            <ComparisonBar
                title="140+"
                barLValue={
                    ((((game || {}).playerModels[game.players[0]] || {}).scoreRanges || {})[valueKey] || {})['160-179'] || 0 +
                    ((((game || {}).playerModels[game.players[0]] || {}).scoreRanges || {})[valueKey] || {})['140-159'] || 0
                }
                barRValue={
                    ((((game || {}).playerModels[game.players[1]] || {}).scoreRanges || {})[valueKey] || {})['160-179'] || 0 +
                    ((((game || {}).playerModels[game.players[1]] || {}).scoreRanges || {})[valueKey] || {})['140-159'] || 0
                }
            />
            <ComparisonBar
                title="100+"
                barLValue={
                    ((((game || {}).playerModels[game.players[0]] || {}).scoreRanges || {})[valueKey] || {})['100-119'] || 0 +
                    ((((game || {}).playerModels[game.players[0]] || {}).scoreRanges || {})[valueKey] || {})['120-139'] || 0
                }
                barRValue={
                    ((((game || {}).playerModels[game.players[1]] || {}).scoreRanges || {})[valueKey] || {})['100-119'] || 0 +
                    ((((game || {}).playerModels[game.players[1]] || {}).scoreRanges || {})[valueKey] || {})['120-139'] || 0
                }
            />
            <ComparisonBar
                title="Average"
                barLValue={Math.round(((((game || {}).playerModels[game.players[0]] || {}).averages || {})[valueKey] || {}).begMidGame || 0)}
                barRValue={Math.round(((((game || {}).playerModels[game.players[1]] || {}).averages || {})[valueKey] || {}).begMidGame || 0)}
            />
            <ComparisonBar
                title="Checkouts"
                unit="%"
                barLValue={Math.round((100 / ((((game || {}).playerModels[game.players[0]] || {}).checkout || {})[valueKey] || {}).total) * ((((game || {}).playerModels[game.players[0]] || {}).checkout || {})[valueKey] || {}).hit || 0)}
                barRValue={Math.round((100 / ((((game || {}).playerModels[game.players[1]] || {}).checkout || {})[valueKey] || {}).total) * ((((game || {}).playerModels[game.players[1]] || {}).checkout || {})[valueKey] || {}).hit || 0)}
                barLSubvalue={'(' + (((((game || {}).playerModels[game.players[0]] || {}).checkout || {})[valueKey] || {}).hit || 0) + '/' + (((((game || {}).playerModels[game.players[0]] || {}).checkout || {})[valueKey] || {}).total || 0) + ')'}
                barRSubvalue={'(' + (((((game || {}).playerModels[game.players[1]] || {}).checkout || {})[valueKey] || {}).hit || 0) + '/' + (((((game || {}).playerModels[game.players[1]] || {}).checkout || {})[valueKey] || {}).total || 0) + ')'}
            />
        </Fragment>
    );
};

export default X01StatsTab;