const {
    VITE_API_HOST,
    VITE_API_PORT
} = import.meta.env;

const API_URL = 'http://' + VITE_API_HOST + ':' + VITE_API_PORT + '/api/';

// Public methods to export
const createPlayer = async (player) => {
    var formData = new FormData();
    Object.keys(player).forEach(key => formData.append(key, player[key]));

    try {
        const response = await fetch(API_URL + 'players', {
            method: 'POST',
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
        const response = await fetch(API_URL + 'players/' + playerId);
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw Error(error.message);
    }
}

const searchPlayers = async (searchTerm) => {
    try {
        const response = await fetch(API_URL + 'players/search?search=' + (searchTerm ? searchTerm : ''));
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const data = await response.json();
        return data;
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
        throw Error(error.message);
    }
}

const updatePlayer = async (player) => {
    var formData = new FormData();
    Object.keys(player).forEach(key => formData.append(key, player[key]));

    try {
        const response = await fetch(API_URL + 'players/' + player.id, {
            method: 'PUT',
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

const deletePlayer = async (playerId) => {
    try {
        const response = await fetch(API_URL + 'players/' + playerId, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw Error(response.statusText);
        }
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