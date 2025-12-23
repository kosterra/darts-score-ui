import { changeCurrentPlayer, getCurrentThrowScore } from './game.utils';

const X01ReturnToPreviousPlayer = game => {
    const prevThrow = game.currentLegThrows.pop();
    const player = game.playerModels[prevThrow.playerId];

    // Spieler zurücksetzen
    changeCurrentPlayer(game);
    game.currentThrow = prevThrow.darts;

    const prevScore = getCurrentThrowScore(prevThrow.darts);
    player.score += prevScore;

    // Updates
    updateAverages(game, prevThrow.playerId, prevThrow.darts);
    updateTotalThrow(game, prevThrow.playerId, prevThrow.darts.length);
    updateHit(player, prevThrow.darts);
    updateScoreRange(game, prevThrow.playerId, prevScore);
    updateBestThreeDarts(game, prevThrow.playerId);

    if (player.score - prevScore <= 50) {
        updateCheckout(game, prevThrow.playerId, [...prevThrow.darts]);
    }

    return game;
};

// --- Hilfsfunktionen ---

const updateTotalThrow = (game, playerId, dartsNbr) => {
    const player = game.playerModels[playerId];
    ['totalThrow', 'totalThrowBegMidGame', 'totalThrowEndGame'].forEach(key => {
        const tt = player[key];
        if (!tt) return;
        decrementThrow(tt, dartsNbr, game.currentSet, game.currentSetLeg);
    });
};

const decrementThrow = (tt, dartsNbr, currentSet, currentLeg) => {
    tt.game.rounds--; tt.game.darts -= dartsNbr;
    tt['set-' + currentSet].rounds--; tt['set-' + currentSet].darts -= dartsNbr;
    tt['set-' + currentSet]['leg-' + currentLeg].rounds--;
    tt['set-' + currentSet]['leg-' + currentLeg].darts -= dartsNbr;
};

const updateHit = (player, darts) => {
    darts.forEach(dart => {
        if (Number(dart) === 0) dart = 'Missed';
        if (player.hit[dart] > 0) player.hit[dart]--;
        if (player.hit[dart] === 0) delete player.hit[dart];
    });
};

const updateScoreRange = (game, playerId, score) => {
    const player = game.playerModels[playerId];
    const ranges = player.scoreRanges;
    const paths = [
        ranges.game,
        ranges['set-' + game.currentSet],
        ranges['set-' + game.currentSet]['leg-' + game.currentSetLeg]
    ];

    const updateRange = (obj, val) => {
        if (val === 0) { obj.ZERO--; if (obj.ZERO === 0) delete obj.ZERO; return; }
        if (val === 180) { obj['180']--; if (obj['180'] === 0) delete obj['180']; return; }

        Object.keys(obj).forEach(key => {
            const [min, max] = key.split('-').map(Number);
            if (val >= min && val <= max) {
                obj[key]--; if (obj[key] === 0) delete obj[key];
            }
        });
    };

    paths.forEach(p => updateRange(p, score));
};

const updateBestThreeDarts = (game, playerId) => {
    const player = game.playerModels[playerId];
    const best = player.bestThreeDarts;

    const reset = obj => obj.value = 0;
    reset(best.game);
    reset(best['set-' + game.currentSet]);
    reset(best['set-' + game.currentSet]['leg-' + game.currentSetLeg]);

    const calc = darts => getCurrentThrowScore(darts);

    // Durch aktuelle LegThrows
    game.currentLegThrows.forEach(r => {
        if (r.playerId !== playerId) return;
        best.game.value = Math.max(best.game.value, calc(r.darts));
        best['set-' + game.currentSet].value = Math.max(best['set-' + game.currentSet].value, calc(r.darts));
        best['set-' + game.currentSet]['leg-' + game.currentSetLeg].value = Math.max(best['set-' + game.currentSet]['leg-' + game.currentSetLeg].value, calc(r.darts));
    });

    // Durch alle Sets
    const sets = game.allSetsThrows || {};
    for (let s = 1; s <= game.currentSet; s++) {
        const legs = sets['set-' + s] || {};
        for (let l in legs) {
            legs[l].forEach(r => {
                if (r.playerId !== playerId) return;
                best.game.value = Math.max(best.game.value, r.roundScore || 0, calc(r.darts));
                if (s === game.currentSet) {
                    best['set-' + s].value = Math.max(best['set-' + s].value, r.roundScore || 0, calc(r.darts));
                    if (Number(l) === game.currentSetLeg) best['set-' + s]['leg-' + l].value = Math.max(best['set-' + s]['leg-' + l].value, r.roundScore || 0, calc(r.darts));
                }
            });
        }
    }
};

const updateCheckout = (game, playerId, darts) => {
    const player = game.playerModels[playerId];
    const checkout = player.checkout;
    let score = player.score - getCurrentThrowScore(darts);

    darts.slice().reverse().forEach(d => {
        const dartScore = getCurrentThrowScore([d]);
        score += dartScore;

        if ((score % 2 === 0 && score <= 40) || score === 50) {
            ['game', 'set-' + game.currentSet, 'set-' + game.currentSet]['leg-' + game.currentSetLeg].forEach(k => {
                checkout[k].miss--; checkout[k].total--;
            });
            if (checkout.sections[score / 2]) {
                checkout.sections[score / 2].miss--; checkout.sections[score / 2].total--;
                if (checkout.sections[score / 2].total === 0) delete checkout.sections[score / 2];
            }
        }
    });
};

const updateAverages = (game, playerId, darts) => {
    const player = game.playerModels[playerId];
    if (player.totalThrow.game.rounds === 1) {
        player.averages = { game: { overall: 0, begMidGame: 0, endGame: 0 } };
        return;
    }

    const score = getCurrentThrowScore(darts);
    const period = player.score > 140 ? 'begMidGame' : 'endGame';

    const update = (avg, total) => (avg * total - score) / (total - 1);
    const tt = player.totalThrow;
    const avg = player.averages;

    // Game / Set / Leg
    avg.game.overall = update(avg.game.overall, tt.game.rounds);
    avg['set-' + game.currentSet].overall = update(avg['set-' + game.currentSet].overall, tt['set-' + game.currentSet].rounds);
    avg['set-' + game.currentSet]['leg-' + game.currentSetLeg].overall = update(avg['set-' + game.currentSet]['leg-' + game.currentSetLeg].overall, tt['set-' + game.currentSet]['leg-' + game.currentSetLeg].rounds);

    // Beg/Mid or End Game
    const ttPeriod = period === 'begMidGame' ? player.totalThrowBegMidGame : player.totalThrowEndGame;
    const avgPeriod = period === 'begMidGame' ? avg.game.begMidGame : avg.game.endGame;

    avg.game[period] = update(avgPeriod, ttPeriod.game.rounds);
};

export default X01ReturnToPreviousPlayer;
