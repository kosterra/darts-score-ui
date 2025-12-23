import { changeCurrentPlayer } from './game.utils';

const EliminationReturnToPreviousPlayer = game => {
    const prevThrow = game.currentLegThrows.pop();
    const prevScore = getScore(prevThrow.darts);

    // Spieler zurücksetzen & Wurf wiederherstellen
    changeCurrentPlayer(game);
    game.currentThrow = prevThrow.darts;
    const player = game.playerModels[prevThrow.playerId];
    player.score += prevScore;

    // Statistiken aktualisieren
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

// --- Helper Functions ---

const getScore = darts =>
    darts.reduce((total, dart) => {
        if (!dart || Number(dart) === 0) return total;
        let score = Number(dart.slice(1));
        if (/t/i.test(dart[0])) score *= 3;
        if (/d/i.test(dart[0])) score *= 2;
        return total + score;
    }, 0);

const updateTotalThrow = (game, playerId, dartsNbr) => {
    const player = game.playerModels[playerId];
    const period = player.score > 140 ? 'BegMidGame' : 'EndGame';
    const reduce = t => {
        t.game.rounds--; t.game.darts -= dartsNbr;
        t[`set-${game.currentSet}`].rounds--; t[`set-${game.currentSet}`].darts -= dartsNbr;
        t[`set-${game.currentSet}`][`leg-${game.currentSetLeg}`].rounds--;
        t[`set-${game.currentSet}`][`leg-${game.currentSetLeg}`].darts -= dartsNbr;
    };
    reduce(player.totalThrow);
    reduce(player[`totalThrow${period}`]);
};

const updateHit = (player, darts) => {
    darts.forEach(d => {
        const key = Number(d) === 0 ? 'Missed' : d;
        if (player.hit[key] > 0) player.hit[key]--;
        if (player.hit[key] === 0) delete player.hit[key];
    });
};

const updateScoreRange = (game, playerId, score) => {
    const ranges = game.playerModels[playerId].scoreRanges;
    const dec = (obj, k) => { if (obj[k]) { obj[k]--; if (obj[k] === 0) delete obj[k]; } };
    if (score === 0 || score === 180) {
        ['game', `set-${game.currentSet}`, `leg-${game.currentSetLeg}`].forEach(l => dec(ranges[l], score === 0 ? 'ZERO' : '180'));
    } else {
        const update = obj => Object.keys(obj).forEach(r => {
            const [min, max] = r.split('-').map(Number);
            if (score >= min && score <= max) dec(obj, r);
        });
        update(ranges.game);
        update(ranges[`set-${game.currentSet}`]);
        update(ranges[`set-${game.currentSet}`][`leg-${game.currentSetLeg}`]);
    }
};

const updateBestThreeDarts = (game, playerId) => {
    const best = game.playerModels[playerId].bestThreeDarts;
    const reset = obj => obj.value = 0;
    reset(best.game); reset(best[`set-${game.currentSet}`]); reset(best[`set-${game.currentSet}`][`leg-${game.currentSetLeg}`]);
    const calc = r => getScore(r.darts);
    game.currentLegThrows.filter(r => r.playerId === playerId).forEach(r => {
        best.game.value = Math.max(best.game.value, calc(r));
        best[`set-${game.currentSet}`].value = Math.max(best[`set-${game.currentSet}`].value, calc(r));
        best[`set-${game.currentSet}`][`leg-${game.currentSetLeg}`].value = Math.max(best[`set-${game.currentSet}`][`leg-${game.currentSetLeg}`].value, calc(r));
    });
};

const updateCheckout = (game, playerId, darts) => {
    const checkout = game.playerModels[playerId].checkout;
    let prevScore = game.playerModels[playerId].score - getScore(darts);
    darts.reverse().forEach(d => {
        prevScore += getScore([d]);
        if ((prevScore % 2 === 0 && prevScore <= 40) || prevScore === 50) {
            ['game', `set-${game.currentSet}`, `leg-${game.currentSet}`].forEach(l => { checkout[l].miss--; checkout[l].total--; });
            checkout.sections[prevScore / 2].miss--; checkout.sections[prevScore / 2].total--;
            if (checkout.sections[prevScore / 2].total === 0) delete checkout.sections[prevScore / 2];
        }
    });
};

const updateAverages = (game, playerId, darts) => {
    const player = game.playerModels[playerId];
    const score = getScore(darts);
    const updateAvg = (avg, rounds) => (avg * rounds - score) / (rounds - 1);
    ['game', `set-${game.currentSet}`, `leg-${game.currentSetLeg}`].forEach(l => {
        const rounds = player.totalThrow[l]?.rounds || 1;
        if (rounds > 1) player.averages[l].overall = updateAvg(player.averages[l].overall, rounds);
    });
    const period = player.score > 140 ? 'BegMidGame' : 'EndGame';
    ['game', `set-${game.currentSet}`, `leg-${game.currentSetLeg}`].forEach(l => {
        const rounds = player[`totalThrow${period}`][l]?.rounds || 1;
        if (rounds > 1) player.averages[l][period.toLowerCase()] = updateAvg(player.averages[l][period.toLowerCase()], rounds);
    });
};

export default EliminationReturnToPreviousPlayer;
