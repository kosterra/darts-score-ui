const {
    VITE_API_HOST,
    VITE_API_PORT
} = import.meta.env;

const API_URL = 'http://' + VITE_API_HOST + ':' + VITE_API_PORT + '/api/';

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

const loadX01PlayersStats = async (body) => {
    try {
        const response = await fetch(API_URL + 'stats/players/x01', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw Error(error);
    }
}

const loadPlayersCricketStats = async (playerId) => {
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
    loadX01GameStats,
    loadX01PlayersStats
}

export default StatsService;