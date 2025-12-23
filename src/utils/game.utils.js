const validateDartValue = dart => {
    if (!dart || Number(dart) === 0) return true;

    if (/^[SDT]\d{1,2}$/i.test(dart)) {
        const value = Number(dart.slice(1));
        if ((value >= 1 && value <= 20) || /^[SD]25$/i.test(dart)) return true;
    }

    return false;
};

const dartIsDouble = (value) => {
    if (/^d/i.test(value)) {
        return true
    } else {
        return false
    }
}

const dartIsTriple = (value) => {
    if (/^t/i.test(value)) {
        return true
    } else {
        return false
    }
}

const lastDart = (currentThrow) => currentThrow.slice().reverse().find(d => d !== '');
const lastDartIsDouble = (currentThrow) => lastDart(currentThrow)?.toLowerCase()?.startsWith('d');
const lastDartIsTriple = (currentThrow) => lastDart(currentThrow)?.toLowerCase()?.startsWith('t');

const changeCurrentPlayer = game => {
    const index = game.players.indexOf(game.currentPlayerTurn);
    game.currentPlayerTurn =
        index === 0
            ? game.players[game.players.length - 1]
            : game.players[index - 1];
};

const cricketGetCurrentScore = (currentThrow, score, sectionHit) => {
    if (!currentThrow.some(v => v !== '')) return score;

    return [15, 16, 17, 18, 19, 20, 25].reduce((acc, n) => {
        const hits = sectionHit[n] ?? 0;
        return acc + (hits > 3 ? (hits - 3) * n : 0);
    }, 0);
};

const getCurrentThrowScore = (throwArr = []) => {
    // Beispielhafte Berechnung:
    // ["T20", "S5", "D10"] → 60 + 5 + 20 = 85
    const multipliers = { S: 1, D: 2, T: 3 };
    return throwArr.reduce((sum, dart) => {
        if (!dart) return sum;
        const match = dart.match(/^([SDT])(\d{1,2}|25)$/);
        if (!match) return sum;
        const [, type, value] = match;
        return sum + multipliers[type] * Number(value);
    }, 0);
};

export {
    validateDartValue,
    dartIsDouble,
    dartIsTriple,
    lastDartIsDouble,
    lastDartIsTriple,
    changeCurrentPlayer,
    cricketGetCurrentScore,
    getCurrentThrowScore
};
