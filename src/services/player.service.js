import {
    getHeaders
} from '../utils/service.utils';

const {
    VITE_API_URL
} = import.meta.env;

const API_URL = VITE_API_URL + '/api/';

// Public methods to export
const createPlayer = async (player) => {
    var formData = new FormData();
    Object.keys(player).forEach(key => formData.append(key, player[key]));

    try {
        const response = await fetch(API_URL + 'players', {
            method: 'POST',
            headers: getHeaders(false),
            body: formData
        });

        if (!response.ok) {
            throw Error(response.statusText);
        }

        return response.ok;
    } catch (error) {
        throw Error(error.message);
    }
}

const getPlayer = async (playerId) => {
    try {
        const response = await fetch(API_URL + 'players/' + playerId, {
            method: 'GET',
            headers: getHeaders(false)
        });

        if (!response.ok) {
            throw Error(response.statusText);
        };

        return await response.json();
    } catch (error) {
        throw Error(error.message);
    }
}

const searchPlayers = async (searchTerm) => {
    try {
        const response = await fetch(API_URL + 'players/search?search=' + (searchTerm ? searchTerm : ''), {
            method: 'GET',
            headers: getHeaders(false)
        });

        if (!response.ok) {
            throw Error(response.statusText);
        };

        return await response.json();
    } catch (error) {
        throw Error(error.message);
    }
}

const findPlayersByIds = async (playerIds) => {
    let body = {
        playerIds: playerIds
    }
    try {
        const response = await fetch(API_URL + 'players/find', {
            method: 'POST',
            headers: getHeaders(true),
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

const updatePlayer = async (player) => {
    var formData = new FormData();
    Object.keys(player).forEach(key => formData.append(key, player[key]));

    try {
        const response = await fetch(API_URL + 'players/' + player.id, {
            method: 'PUT',
            headers: getHeaders(false),
            body: formData
        });

        if (!response.ok) {
            throw Error(response.statusText);
        };

        return response.ok;
    } catch (error) {
        throw Error(error.message);
    }
}

const deletePlayer = async (playerId) => {
    try {
        const response = await fetch(API_URL + 'players/' + playerId, {
            method: 'DELETE',
            headers: getHeaders(false)
        });

        if (!response.ok) {
            throw Error(response.statusText);
        };

        return response.ok;
    } catch (error) {
        throw Error(error.message);
    }
}

// Export methods
const PlayerService = {
    createPlayer,
    getPlayer,
    searchPlayers,
    findPlayersByIds,
    updatePlayer,
    deletePlayer
}

export default PlayerService