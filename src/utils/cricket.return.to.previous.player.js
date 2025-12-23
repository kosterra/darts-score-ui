import { changeCurrentPlayer, cricketGetCurrentScore } from './game.utils';

const CricketReturnToPreviousPlayer = game => {
    const prevThrowInfo = game.allThrows.pop();

    changeCurrentPlayer(game);
    game.currentThrow = prevThrowInfo.darts;

    updateTotalThrow(game, prevThrowInfo.playerId, prevThrowInfo.darts.length);
    updateSectionHit(game.playerModels[prevThrowInfo.playerId], prevThrowInfo.darts);
    updateHit(game.playerModels[prevThrowInfo.playerId], prevThrowInfo.darts);

    const prevScore = cricketGetCurrentScore(
        game.currentThrow,
        game.playerModels[prevThrowInfo.playerId],
        game.playerModels[prevThrowInfo.playerId].sectionHit
    );
    game.playerModels[prevThrowInfo.playerId].score = prevScore;

    return game;
};

const updateTotalThrow = (game, playerId, dartsNbr) => {
    const totalThrow = game.playerModels[playerId].totalThrow;
    totalThrow.game.rounds--;
    totalThrow.game.darts -= dartsNbr;
    game.playerModels[playerId].totalThrow = totalThrow;
};

const updateSectionHit = (playerModel, darts) => {
    darts.forEach(dart => {
        const section = Number(dart.slice(1));
        if (section < 15) return;

        const hits = { t: 3, d: 2, s: 1 };
        const type = dart[0].toLowerCase();

        if (hits[type]) {
            playerModel.sectionHit[section] = Math.max(
                0,
                playerModel.sectionHit[section] - hits[type]
            );
        }
    });
};

const updateHit = (playerModel, darts) => {
    darts.forEach(dart => {
        if (Number(dart) === 0) dart = 'Missed';
        if (playerModel.hit[dart] > 0) playerModel.hit[dart]--;
        if (playerModel.hit[dart] === 0) delete playerModel.hit[dart];
    });
};

export default CricketReturnToPreviousPlayer;
