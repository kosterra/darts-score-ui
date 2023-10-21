const {
    REACT_APP_API_HOST,
    REACT_APP_API_PORT
} = process.env;

const API_URL='http://' + REACT_APP_API_HOST + ':' + REACT_APP_API_PORT + '/api/';

// Public methods to export
const loadPlayerStats = async (playerId) => {
    try {
        const response = await fetch(API_URL + 'stats/player/' + playerId);
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw Error(error);
    }
}

const loadX01GameStats = async (gameId) => {
    try {
        const response = await fetch(API_URL + 'stats/games/x01/' + gameId);
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw Error(error);
    }
}

// Export methods
const StatsService = {
    loadPlayerStats,
    loadX01GameStats
}

export default StatsService;