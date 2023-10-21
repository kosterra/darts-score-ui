import React, { Fragment } from 'react';

import ComparisonBar from '../elements/comparison.bar';

const X01StatsComparisonBars = (props) => {
    const {
        valueKey,
        game
    } = props;

    const getWonLegsData = () => {
        var wonLegs = {};
        wonLegs.name = 'Won Legs';

        game.players.forEach((playerId, idx) => {
            wonLegs['player' + (idx + 1)] = (((game || {}).playerModels[playerId] || {}).legsWon || {})[valueKey] || 0
        })

        return [wonLegs];
    }

    const getRangesData = (name, range) => {
        var ranges = {};
        ranges.name = name;

        game.players.forEach((playerId, idx) => {
            ranges['player' + (idx + 1)] = ((((game || {}).playerModels[playerId] || {}).scoreRanges || {})[valueKey] || {})[range] || 0
        })

        return [ranges];
    }

    const getAverageData = () => {
        var average = {};
        average.name = "Average";

        game.players.forEach((playerId, idx) => {
            average['player' + (idx + 1)] = (((((game || {}).playerModels[playerId] || {}).averages || {})[valueKey] || {}).begMidGame || 0).toFixed(1)
        });

        return [average];
    }

    const getCheckoutData = () => {
        var checkout = {};
        checkout.name = "Checkouts";
        checkout.unit = "%";

        game.players.forEach((playerId, idx) => {
            checkout['player' + (idx + 1)] = ((100 / ((((game || {}).playerModels[playerId] || {}).checkout || {})[valueKey] || {}).total) * ((((game || {}).playerModels[playerId] || {}).checkout || {})[valueKey] || {}).hit || 0).toFixed(1);
            checkout['player' + (idx + 1) + 'sub'] = '(' + (((((game || {}).playerModels[playerId] || {}).checkout || {})[valueKey] || {}).hit || 0) + '/' + (((((game || {}).playerModels[playerId] || {}).checkout || {})[valueKey] || {}).total || 0) + ')';
        })

        return [checkout];
    }

    return (
        <Fragment>
            <ComparisonBar data={ getWonLegsData() } />
            <ComparisonBar data={ getRangesData('180s', '180') } />
            <ComparisonBar data={ getRangesData('160+', '160-179') } />
            <ComparisonBar data={ getRangesData('140+', '140-159') } />
            <ComparisonBar data={ getRangesData('120+', '120-139') } />
            <ComparisonBar data={ getRangesData('100+', '100-119') } />
            <ComparisonBar data={ getAverageData() } />
            <ComparisonBar data={ getCheckoutData() } />
        </Fragment>
    );
};

export default X01StatsComparisonBars;