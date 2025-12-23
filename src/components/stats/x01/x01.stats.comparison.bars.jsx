import { Fragment } from 'react';
import ComparisonBar from '../../elements/comparison.bar';

const X01StatsComparisonBars = ({ valueKey, game }) => {
    const players = game.players || [];

    // Hilfsfunktion zum sicheren Zugriff auf Spielerstatistiken
    const getPlayerStat = (playerId, path = [], defaultValue = 0) => {
        return path.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), game.playerModels[playerId]) ?? defaultValue;
    };

    const buildData = (name, pathMapper, unit) => ({
        name,
        unit,
        ...Object.fromEntries(
            players.map((playerId, idx) => {
                const val = pathMapper(playerId);
                return [`player${idx + 1}`, val];
            })
        )
    });

    const getWonLegsData = () =>
        [buildData('Won Legs', (playerId) => getPlayerStat(playerId, ['legsWon', valueKey]))];

    const getRangesData = (name, range) =>
        [buildData(name, (playerId) => getPlayerStat(playerId, ['scoreRanges', valueKey, range]))];

    const getAverageData = () =>
        [buildData('Average', (playerId) => {
            const avg = getPlayerStat(playerId, ['averages', valueKey, valueKey === 'game' ? 'begMidGame' : 'begMidSet'], 0);
            return Number(avg.toFixed(1));
        })];

    const getCheckoutData = () =>
        [buildData('Checkouts', (playerId) => {
            const checkout = getPlayerStat(playerId, ['checkout', valueKey], { total: 0, hit: 0 });
            const percent = checkout.total ? (100 * checkout.hit) / checkout.total : 0;
            return Number(percent.toFixed(1));
        }, '%')];

    const getCheckoutSubData = () =>
        [buildData('Checkouts Sub', (playerId) => {
            const checkout = getPlayerStat(playerId, ['checkout', valueKey], { total: 0, hit: 0 });
            return `(${checkout.hit}/${checkout.total})`;
        })];

    return (
        <Fragment>
            <ComparisonBar data={getWonLegsData()} />
            <ComparisonBar data={getRangesData('180s', '180')} />
            <ComparisonBar data={getRangesData('160+', '160-179')} />
            <ComparisonBar data={getRangesData('140+', '140-159')} />
            <ComparisonBar data={getRangesData('120+', '120-139')} />
            <ComparisonBar data={getRangesData('100+', '100-119')} />
            <ComparisonBar data={getAverageData()} />
            <ComparisonBar data={getCheckoutData()} />
            <ComparisonBar data={getCheckoutSubData()} />
        </Fragment>
    );
};

export default X01StatsComparisonBars;
