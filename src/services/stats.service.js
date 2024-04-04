import {
    getHeaders
} from '../utils/service.utils';

const {
    VITE_API_URL
} = import.meta.env;

const API_URL = VITE_API_URL + '/api/';

// Public methods to export
const loadPlayerStats = async (playerId) => {
    try {
        let method = 'GET';
        const response = await fetch(API_URL + 'stats/player/' + playerId, {
            method: method,
            headers: getHeaders(method)
        });

        if (!response.ok) {
            throw Error(response.statusText);
        };

        return await response.json();
    } catch (error) {
        throw Error(error.message);
    }
}

const loadX01PlayersStats = async (body) => {
    try {
        let method = 'POST';
        const response = await fetch(API_URL + 'stats/players/x01', {
            method: method,
            headers: getHeaders(method),
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw Error(response.statusText);
        };

        return await response.json();
    } catch (error) {
        throw Error(error.message);
    }
}

const loadPlayersCricketStats = async (playerId) => {
    try {
        let method = 'GET';
        const response = await fetch(API_URL + 'stats/player/' + playerId, {
            method: method,
            headers: getHeaders(method)
        });

        if (!response.ok) {
            throw Error(response.statusText);
        };

        return await response.json();
    } catch (error) {
        throw Error(error.message);
    }
}

const loadX01GameStats = async (gameId) => {
    try {
        let method = 'GET';
        const response = await fetch(API_URL + 'stats/games/x01/' + gameId, {
            method: method,
            headers: getHeaders(method)
        });

        if (!response.ok) {
            throw Error(response.statusText);
        };

        return await response.json();
    } catch (error) {
        throw Error(error.message);
    }
}

// Export methods
const StatsService = {
    loadPlayerStats,
    loadX01GameStats,
    loadX01PlayersStats
}

export default StatsService;