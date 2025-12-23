import { Fragment, useEffect, useRef, useReducer } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Toast } from 'primereact/toast';

import EliminationContext from './elimination.context';
import EliminationReducer from './elimination.reducer';
import EliminationService from '../services/elimination.service';
import EliminationReturnToPreviousPlayer from './elimination.return.to.previous.player';
import PlayerService from '../services/player.service';

import {
    validateDartValue,
    dartIsDouble,
    dartIsTriple,
    lastDartIsDouble,
    lastDartIsTriple
} from './game.utils';

import {
    SET_LOADING,
    UPDATE_CURRENT_THROW,
    SAVE_ALL_GAME_THROWS,
    RESET_CURRENT_THROW,
    UPDATE_PLAYER_SCORE,
    CHANGE_CURRENT_PLAYER,
    GAME_HAS_WINNER,
    RETURN_PREV_PLAYER,
    FETCH_GAME_SUCCESS,
    FETCH_PLAYERS_SUCCESS
} from './constants';

const EliminationState = ({ children }) => {
    const { id } = useParams();
    const toast = useRef(null);
    const navigate = useNavigate();

    const initialState = {
        game: {},
        players: [],
        loading: { initGameLoading: true, validateThrow: false }
    };
    const [state, dispatch] = useReducer(EliminationReducer, initialState);

    // -------------------- API Fetch --------------------
    useEffect(() => {
        const fetchGame = async () => {
            try {
                setLoading('initGameLoading', true);
                const game = await EliminationService.loadEliminationGameById(id);
                dispatch({ type: FETCH_GAME_SUCCESS, payload: game });

                const players = await Promise.all(game.players.map(PlayerService.getPlayer));
                dispatch({ type: FETCH_PLAYERS_SUCCESS, payload: players });

                setLoading('initGameLoading', false);
            } catch (err) {
                toast.current.show({ severity: 'error', summary: 'Load Game', detail: 'Failed to load game. ' + err.message, life: 3000 });
                navigate("/", { replace: true });
            }
        };
        fetchGame();
    }, [id, navigate]);

    // -------------------- Helper Functions --------------------
    const setLoading = (eventName, setTo) =>
        dispatch({ type: SET_LOADING, payload: { eventName, setTo } });

    const updateCurrentThrowManual = (score, value, index) => {
        if (state.game.gameType === score && value !== '' && validateDartValue(value)) {
            if (state.gameInMode === 'Double In') {
                let startedInDouble = dartIsDouble(value);
                if (!startedInDouble) {
                    value = '0'
                }
            } else if (state.gameInMode === 'Master In') {
                let startedInMaster = dartIsDouble(value) || dartIsTriple(value);
                if (!startedInMaster) {
                    value = '0';
                }
            }
        }

        const newCurrentThrow = state.game.currentThrow.map((dart, i) => {
            if (i === index) {
                dart = value;
            }
            return dart
        });

        dispatch({
            type: UPDATE_CURRENT_THROW,
            payload: newCurrentThrow
        })
    }

    const updateCurrentThrowDartBoard = (score, value) => {
        const newCurrentThrow = [...state.game.currentThrow];

        for (let index = 0; index < newCurrentThrow.length; index++) {
            if (state.game.gameType === score && validateDartValue(value)) {
                if (state.gameInMode === 'Double In') {
                    let startedInDouble = dartIsDouble(value);
                    if (!startedInDouble) {
                        value = '0'
                    }
                } else if (state.gameInMode === 'Master In') {
                    let startedInMaster = dartIsDouble(value) || dartIsTriple(value);
                    if (!startedInMaster) {
                        value = '0';
                    }
                }
            }

            if (newCurrentThrow[index] === '') {
                newCurrentThrow[index] = value;
                break;
            }
        }

        dispatch({
            type: UPDATE_CURRENT_THROW,
            payload: newCurrentThrow
        })

    }

    const getCurrentThrowScore = () =>
        state.game.currentThrow.reduce((total, dart) => {
            if (!validateDartValue(dart) || dart === '' || dart === 0) return total;
            let score = Number(dart.slice(1));
            if (/t/i.test(dart[0])) score *= 3;
            if (/d/i.test(dart[0])) score *= 2;
            return total + score;
        }, 0);

    // Bust-Check
    const checkIfScoreIsBusted = (currentScore) => {
        // Wenn das Spiel bereits beendet ist → niemals BUST
        if (state.game.gameHasWinner) return false;

        let busted = currentScore > state.game.targetScore;

        if (!busted) {
            const mode = state.game.gameOutMode;
            if (mode === 'Double Out') {
                busted =
                    currentScore === state.game.targetScore - 1 ||
                (currentScore === state.game.targetScore && !lastDartIsDouble(state.game.currentThrow));
            } else if (mode === 'Master Out') {
                busted =
                    currentScore === state.game.targetScore &&
                    !lastDartIsDouble(state.game.currentThrow) &&
                    !lastDartIsTriple(state.game.currentThrow);
            }
        }

        return busted;
    };

    // Nur werfen, wenn <3 Darts und kein Bust
    const checkCanThrowMoreDarts = (currentScore) => {
        if (state.game.gameHasWinner) return false;
        const dartsThrown = state.game.currentThrow.filter(d => d.trim() !== '').length;
        return dartsThrown < 3 && (!checkIfScoreIsBusted(currentScore) && currentScore < state.game.targetScore);
    };

    // Punkteabstand zum nächsten Spieler
    // optional projectedScore verwenden (nur für playerId)
    const getPointsToNextPlayer = (playerId) => {
        if (!state.players?.length || !state.game?.playerModels) return '-';

        // Live-Score für alle Spieler berechnen
        const liveScores = state.players.map(p => {
            let score = state.game.playerModels[p.id]?.score ?? 0;
            if (p.id === state.game.currentPlayerTurn) {
                const currentThrowScore = state.game.currentThrow.reduce((total, dart) => {
                    if (!validateDartValue(dart) || dart === '') return total;
                    let s = Number(dart.slice(1));
                    if (/t/i.test(dart[0])) s *= 3;
                    if (/d/i.test(dart[0])) s *= 2;
                    return total + s;
                }, 0);
                score += currentThrowScore;
            }
            return { id: p.id, score };
        });

        // Spieler nach Score sortieren (aufsteigend, da Elimination von 0 hoch spielt)
        const sorted = [...liveScores].sort((a, b) => a.score - b.score);

        const index = sorted.findIndex(p => p.id === playerId);
        if (index === -1) return '-';

        // Nächstplatzierten finden (höheren Score)
        const nextPlayer = sorted[index + 1];
        if (!nextPlayer) return '-'; // Führender Spieler hat keinen "nächstplatzierten"

        const diff = nextPlayer.score - sorted[index].score;
        return diff > 0 ? diff : '-';
    };

    // -------------------- Main Game Logic --------------------
    const onClickValidateThrow = (currentScore) => {
        setLoading('validateThrow', true);
        const currentThrow = [...state.game.currentThrow];
        const playerId = state.game.currentPlayerTurn;

        // Ungültige Eingaben prüfen
        if (currentThrow.some(d => !validateDartValue(d))) {
            toast.current.show({
                severity: 'error',
                summary: 'Validate Throw',
                detail: 'One or more darts are invalid',
                life: 3000
            });
            setLoading('validateThrow', false);
            return;
        }

        // Validate Whole Throw
        let throwIsValid = validateWholeThrow(currentThrow, currentScore);
        if (!throwIsValid) {
            setLoading('validateThrow', false);
            return;
        }

        let baseScore = state.game.playerModels[playerId]?.score ?? 0;
        const allThrows = [...(state.game.allThrows || [])];
        let totalRoundScore = 0;

        // Jeden Dart einzeln prüfen
        for (let i = 0; i < currentThrow.length; i++) {
            const dart = currentThrow[i];
            if (!dart || dart === '') continue;

            let dartScore = Number(dart.slice(1));
            if (/t/i.test(dart[0])) dartScore *= 3;
            if (/d/i.test(dart[0])) dartScore *= 2;

            const projectedScore = baseScore + dartScore;

            // Gegner-Score prüfen (Reset bei Gleichstand)
            (state.game.players || [])
                .filter(pid => pid !== playerId)
                .forEach(pid => {
                    const otherScore = state.game.playerModels[pid]?.score ?? 0;
                    if (otherScore === projectedScore) {
                        dispatch({ type: UPDATE_PLAYER_SCORE, payload: { playerId: pid, score: 0 } });
                        const playerObj = state.players?.find(p => p.id === pid);
                        toast.current.show({
                            severity: 'warn',
                            summary: 'Reset',
                            detail: `${playerObj?.nickname || playerObj?.name || 'Ein Spieler'} wurde auf 0 zurückgesetzt (Score egalisiert).`,
                            life: 2500
                        });
                    }
                });

            baseScore = projectedScore;
            totalRoundScore += dartScore;

            // Bust prüfen
            if (!state.game.gameHasWinner && checkIfScoreIsBusted(baseScore)) {
                toast.current.show({
                    severity: 'warn',
                    summary: 'Busted',
                    detail: `Der Wurf ist ungültig. Punkte bleiben bei ${state.game.playerModels[playerId]?.score ?? 0}.`,
                    life: 3000
                });
                dispatch({ type: RESET_CURRENT_THROW });
                manageCurrentPlayerChange();
                setLoading('validateThrow', false);
                return;
            }

            // Sieg prüfen
            if (baseScore === state.game.targetScore) {
                const mode = state.game.gameOutMode;
                const isDouble = lastDartIsDouble(state.game.currentThrow);
                const isTriple = lastDartIsTriple(state.game.currentThrow);

                if ((mode === 'Double Out' && !isDouble) || (mode === 'Master Out' && !isDouble && !isTriple)) {
                    continue; // Kein gültiger Abschluss
                }

                // ✅ Spiel gewonnen – Score direkt setzen
                dispatch({ type: UPDATE_PLAYER_SCORE, payload: { playerId, score: baseScore } });
                dispatch({ type: GAME_HAS_WINNER, payload: playerId });

                toast.current.show({
                    severity: 'success',
                    summary: 'Game Won',
                    detail: `${state.players.find(p => p.id === playerId)?.nickname || 'Ein Spieler'} gewinnt das Spiel!`,
                    life: 3500
                });

                // Wurf speichern
                allThrows.push({
                    darts: currentThrow,
                    playerId,
                    roundScore: totalRoundScore,
                    scoreLeft: 0
                });
                dispatch({ type: SAVE_ALL_GAME_THROWS, payload: allThrows });
                dispatch({ type: RESET_CURRENT_THROW });
                setLoading('validateThrow', false);
                return;
            }
        }

        // Wurf normal speichern – kein Sieg
        allThrows.push({
            darts: currentThrow,
            playerId,
            roundScore: totalRoundScore,
            scoreLeft: Math.max(state.game.targetScore - baseScore, 0)
        });
        dispatch({ type: SAVE_ALL_GAME_THROWS, payload: allThrows });
        dispatch({ type: UPDATE_PLAYER_SCORE, payload: { playerId, score: baseScore } });
        dispatch({ type: RESET_CURRENT_THROW });

        // Nächster Spieler
        manageCurrentPlayerChange();
        setLoading('validateThrow', false);
    };


    const validateWholeThrow = (values, currentScore) => {
        let getWhiteSpaces = values.filter(value => value.trim() === '');

        if (
            (currentScore < state.game.targetScore && getWhiteSpaces.length) ||
            values[0] === '' ||
            (values[1] === '' && values[2] !== '')
        ) {
            toast.current.show(
                {
                    severity: 'error',
                    summary: 'Validate Throw',
                    detail: 'You need to add a value for each dart',
                    life: 3000
                }
            );
            return false;
        }

        return true;
    };

    const manageCurrentPlayerChange = () => {
        const idx = state.game.players.indexOf(state.game.currentPlayerTurn);
        const next = idx < state.game.players.length - 1 ? state.game.players[idx + 1] : state.game.players[0];
        dispatch({ type: CHANGE_CURRENT_PLAYER, payload: next });
    };

    const onClickReturnToPreviousPlayer = () => {
        if (!state.game.currentLegThrows.length) return;
        const newGame = EliminationReturnToPreviousPlayer(state.game);
        dispatch({ type: RETURN_PREV_PLAYER, payload: newGame });
    };

    // -------------------- Context Provider --------------------
    return (
        <Fragment>
            <EliminationContext.Provider value={{
                game: state.game,
                players: state.players,
                loading: state.loading,
                updateCurrentThrowManual,
                updateCurrentThrowDartBoard,
                getCurrentThrowScore,
                checkIfScoreIsBusted,
                checkCanThrowMoreDarts,
                onClickValidateThrow,
                onClickReturnToPreviousPlayer,
                getPointsToNextPlayer
            }}>
                {children}
            </EliminationContext.Provider>
            <Toast ref={toast} position="bottom-right" />
        </Fragment>
    );
};

export default EliminationState;
