import {
    SET_LOADING,
    UPDATE_CURRENT_THROW,
    RESET_CURRENT_THROW,
    UPDATE_PLAYER_SCORE,
    UPDATE_ALL_THROWS,
    UPDATE_TOTAL_THROW,
    UPDATE_HITS,
    UPDATE_SECTION_HIT,
    CHANGE_CURRENT_PLAYER,
    GAME_HAS_WINNER,
    RETURN_PREV_PLAYER,
    FETCH_GAME_SUCCESS,
    FETCH_PLAYERS_SUCCESS
} from './constants';

const CricketReducer = (state, action) => {
    switch (action.type) {
        case FETCH_GAME_SUCCESS:
            return {
                ...state,
                game: { ...action.payload },
            };
        case FETCH_PLAYERS_SUCCESS:
            return {
                ...state,
                players: [...action.payload],
            };
        case UPDATE_CURRENT_THROW:
            return {
                ...state,
                game: { ...state.game, currentThrow: action.payload }
            };
        case RESET_CURRENT_THROW:
            return {
                ...state,
                game: {
                    ...state.game,
                    currentThrow: ['', '', '']
                }
            };
        case UPDATE_PLAYER_SCORE:
            return {
                ...state,
                game: {
                    ...state.game,
                    playerModels: {
                        ...state.game.playerModels,
                        [action.payload.playerId]: {
                            ...state.game.playerModels[action.payload.playerId],
                            score: action.payload.score
                        }
                    }
                }
            };
        case UPDATE_ALL_THROWS:
            return {
                ...state,
                game: {
                    ...state.game,
                    allThrows: action.payload
                }
            };
        case UPDATE_TOTAL_THROW:
            return {
                ...state,
                game: {
                    ...state.game,
                    playerModels: {
                        ...state.game.playerModels,
                        [action.payload.playerId]: {
                            ...state.game.playerModels[action.payload.playerId],
                            totalThrow: action.payload.totalThrow
                        }
                    }
                }
            };
        case UPDATE_SECTION_HIT:
            return {
                ...state,
                game: {
                    ...state.game,
                    playerModels: {
                        ...state.game.playerModels,
                        [action.payload.playerId]: {
                            ...state.game.playerModels[action.payload.playerId],
                            sectionHit: action.payload.sectionHit,
                        }
                    }
                }
            };
        case UPDATE_HITS:
            return {
                ...state,
                game: {
                    ...state.game,
                    playerModels: {
                        ...state.game.playerModels,
                        [action.payload.playerId]: {
                            ...state.game.playerModels[action.payload.playerId],
                            hit: action.payload.hit,
                        }
                    }
                }
            };
        case CHANGE_CURRENT_PLAYER:
            return {
                ...state,
                game: {
                    ...state.game,
                    currentPlayerTurn: action.payload
                }
            };
        case GAME_HAS_WINNER:
            return {
                ...state,
                game: {
                    ...state.game,
                    gameIsRunning: false,
                    hasWinner: true,
                    playerModels: {
                        ...state.game.playerModels,
                        [action.payload]: {
                            ...state.game.playerModels[action.payload],
                            hasWonGame: true
                        }
                    }
                }
            };
        case RETURN_PREV_PLAYER:
            return {
                ...state,
                game: action.payload,
            };
        case SET_LOADING:
            return {
                ...state,
                loading: { ...state.loading, [action.payload.eventName]: action.payload.setTo }
            };
        default:
            return {
                ...state
            }
    }
};

export default CricketReducer;
