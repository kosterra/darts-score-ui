const validateDartValue = dart => {

    if (Number(dart) === 0 || dart === '') {
        return true;
    }

    if (/^[SDT]\d{1,2}$/i.test(dart)) {

        let score = Number(dart.slice(1));
        if ((score >= 1 && score <= 20) || /[SD]25/i.test(dart)) {
            return true
        }

    }
    return false;
}

const changeCurrentPlayer = game => {
    let index = game.players.indexOf(game.currentPlayerTurn);
    if (index === 0) {
        game.currentPlayerTurn = game.players[game.players.length - 1];
    } else {
        game.currentPlayerTurn = game.players[index - 1];
    }
}

const cricketGetCurrentScore = (currentThrow, score, sectionHit) => {
    let currentScore = 0;
    const containsNonEmpty = (element) => element !== '';

    if (currentThrow.some(containsNonEmpty)) {
        if (sectionHit["15"] > 3) {
            currentScore += (sectionHit["15"] - 3) * 15
        }

        if (sectionHit["16"] > 3) {
            currentScore += (sectionHit["16"] - 3) * 16
        }

        if (sectionHit["17"] > 3) {
            currentScore += (sectionHit["17"] - 3) * 17
        }

        if (sectionHit["18"] > 3) {
            currentScore += (sectionHit["18"] - 3) * 18
        }

        if (sectionHit["19"] > 3) {
            currentScore += (sectionHit["19"] - 3) * 19
        }

        if (sectionHit["20"] > 3) {
            currentScore += (sectionHit["20"] - 3) * 20
        }

        if (sectionHit["25"] > 3) {
            currentScore += (sectionHit["25"] - 3) * 25
        }
    } else {
        currentScore = score;
    }

    return currentScore;
}

export {
    validateDartValue,
    changeCurrentPlayer,
    cricketGetCurrentScore
}