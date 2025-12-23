import { useContext, useMemo } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import EliminationContext from '../../../utils/elimination.context';

const EliminationStatisticsBoard = ({ playerId }) => {
    const { game, players, getCurrentThrowScore, getPointsToNextPlayer } = useContext(EliminationContext);

    if (!players.length || !game.playerModels[playerId]) return null;

    const player = players.find(p => p.id === playerId);
    const model = game.playerModels[playerId];

    // Dynamische Berechnungen
    const totalScore = useMemo(() => model.score ?? 0, [model.score]);
    const totalThrows = useMemo(() => model.totalThrow?.game?.darts ?? 0, [model.totalThrow]);
    const averageScore = useMemo(() => totalThrows > 0 ? (totalScore / totalThrows).toFixed(2) : 0, [totalScore, totalThrows]);
    const legsWon = useMemo(() => model.legsWon?.game ?? 0, [model.legsWon]);
    const setsWon = useMemo(() => model.setsWon ?? 0, [model.setsWon]);
    const pointsToNext = useMemo(() => {
        if (game.currentPlayerTurn === playerId) {
            const totalCurrentThrow = getCurrentThrowScore();
            const currentPlayerScore = totalScore;
            return getPointsToNextPlayer(totalCurrentThrow, currentPlayerScore, playerId);
        } else {
            return getPointsToNextPlayer(0, model.score, playerId);
        }
    }, [game.currentThrow, game.currentPlayerTurn, model.score, playerId]);

    return (
        <div className="container-fluid">
            <div className="row justify-content-md-center mb-3">
                <div className="d-flex justify-content-center align-items-center">
                    <span className="text-shade100 fs-6 fw-semibold text-center pb-2">
                        {player.nickname}
                    </span>
                </div>
            </div>

            <Accordion multiple>
                <AccordionTab header="Spielübersicht">
                    <div className="d-flex flex-column gap-2">
                        <div>Total Score: {totalScore}</div>
                        <div>Total Throws: {totalThrows}</div>
                        <div>Average per Throw: {averageScore}</div>
                        <div>Legs Won: {legsWon}</div>
                        <div>Sets Won: {setsWon}</div>
                        <div>Points to Beat Next Player: {pointsToNext > 0 ? pointsToNext : '-'}</div>
                    </div>
                </AccordionTab>

                <AccordionTab header="Best Three Darts">
                    <div>{model.bestThreeDarts?.game?.value ?? 0}</div>
                </AccordionTab>

                <AccordionTab header="Checkout Stats">
                    <div>
                        Hits: {model.checkout?.game?.hit ?? 0} <br />
                        Misses: {model.checkout?.game?.miss ?? 0} <br />
                        Total: {model.checkout?.game?.total ?? 0}
                    </div>
                </AccordionTab>

                <AccordionTab header="Score Ranges">
                    <div>
                        {model.scoreRanges?.game ? (
                            Object.entries(model.scoreRanges.game).map(([range, count]) => (
                                <div key={range}>{range}: {count}</div>
                            ))
                        ) : (
                            <span>No data</span>
                        )}
                    </div>
                </AccordionTab>
            </Accordion>
        </div>
    );
};

export default EliminationStatisticsBoard;
