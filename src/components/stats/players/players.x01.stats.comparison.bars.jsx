import React, { Fragment } from 'react'
import { Container } from 'react-bootstrap'

import ComparisonBar from '../../elements/comparison.bar'

const PlayersX01StatsComparisonBars = (props) => {
    const {
        playersX01Stats
    } = props;

    const getWonGamesData = () => {
        var wonGames = (playersX01Stats || {}).wonGames || {}
        wonGames.name = 'Won Games'

        return [wonGames]
    }

    const getRangesData = (valueKey, title) => {
        var ranges = (playersX01Stats || {})[valueKey]
        ranges.name = title

        return [ranges]
    }

    const getAverageData = (valueKey, title) => {
        var average = ((playersX01Stats || {}).avg || {})[valueKey]
        average.name = title

        return [average]
    }

    const getCheckoutData = () => {
        var checkout = {}
        checkout.name = "Checkout"
        checkout.unit = "%"

        checkout['player1'] = (100 / ((((playersX01Stats || {}).checkouts || {}).total || {})['player1'] || 0) * (((playersX01Stats || {}).checkouts || {}).hit || {})['player1'] || 0).toFixed(1)
        checkout['player1sub'] = '(' + ((((playersX01Stats || {}).checkouts || {}).hit || {})['player1'] || 0) + '/' + ((((playersX01Stats || {}).checkouts || {}).total || {})['player1'] || 0) + ')'
        checkout['player2'] = (100 / ((((playersX01Stats || {}).checkouts || {}).total || {})['player2'] || 0) * (((playersX01Stats || {}).checkouts || {}).hit || {})['player2'] || 0).toFixed(1)
        checkout['player2sub'] = '(' + ((((playersX01Stats || {}).checkouts || {}).hit || {})['player2'] || 0) + '/' + ((((playersX01Stats || {}).checkouts || {}).total || {})['player2'] || 0) + ')'

        return [checkout]
    }

    const getHighestCheckoutData = () => {
        var checkout = ((playersX01Stats || {}).checkouts || {}).highest
        checkout.name = "Highest Checkout"

        return [checkout]
    }

    return (
        <Fragment>
            <Container className="d-flex flex-column align-items-center mt-4 mb-4 w-100">
                <ComparisonBar data={getWonGamesData()} />
                <ComparisonBar data={getRangesData('num180s', '180s')} />
                <ComparisonBar data={getRangesData('num160plus', '160+')} />
                <ComparisonBar data={getRangesData('num140plus', '140+')} />
                {/* <ComparisonBar data={getRangesData('160+', '180')} /> */}
                {/* <ComparisonBar data={ getRangesData('160+', '160-179') } /> */}
                {/* <ComparisonBar data={ getRangesData('140+', '140-159') } /> */}
                {/* <ComparisonBar data={ getRangesData('120+', '120-139') } /> */}
                {/* <ComparisonBar data={ getRangesData('100+', '100-119') } /> */}
                <ComparisonBar data={getAverageData('overall', 'Overall Average')} />
                <ComparisonBar data={getAverageData('dartsPerLeg', 'AVG Darts per Leg')} />
                <ComparisonBar data={getCheckoutData()} />
                <ComparisonBar data={getHighestCheckoutData()} />
            </Container>
        </Fragment>
    );
};

export default PlayersX01StatsComparisonBars;