import {
    getHeaders
} from '../utils/service.utils';

const {
    VITE_API_URL
} = import.meta.env;

const API_URL = VITE_API_URL + '/api/';

// Public methods to export
const createCricket = async (game) => {
    try {
        let method = 'POST';
        const response = await fetch(API_URL + 'games/cricket', {
            method: method,
            headers: getHeaders(method),
            body: JSON.stringify(game)
        });

        if (!response.ok) {
            throw Error(response.statusText);
        };

        return await response.json();
    } catch (error) {
        throw new Error(error);
    }
}

const loadRunningCricketGames = async () => {
    let data = await loadAllCricketGames();
    return data.filter(game => game.gameIsRunning).sort((a,b)=>{
        return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
}

const loadFinishedCricketGames = async () => {
    let data = await loadAllCricketGames();
    return data.filter(game => !game.gameIsRunning).sort((a,b)=>{
        return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
}

const loadAllCricketGames = async () => {
    try {
        let method = 'GET';
        const response = await fetch(API_URL + 'games/cricket', {
            method: method,
            headers: getHeaders(method)
        });
            
        if (!response.ok) {
            throw Error(response.statusText);
        };

        return await response.json();
    } catch (error) {
        throw new Error(error);
    }
}

const loadCricket = async (id) => {
    try {
        let method = 'GET';
        const response = await fetch(API_URL + 'games/cricket/' + id, {
            method: method,
            headers: getHeaders(method)
        });

        if (!response.ok) {
            throw Error(response.statusText);
        };

        return await response.json();
    } catch (error) {
        throw new Error(error);
    }
}

const updateCricket = async (game) => {
    try {
        let method = 'PUT';
        const response = await fetch(API_URL + 'games/cricket/' + game.id, {
            method: method,
            headers: getHeaders(method),
            body: JSON.stringify(game)
        });

        if (!response.ok) {
            throw Error(response.statusText);
        };

        return response.ok;
    } catch (error) {
        throw new Error(error);
    }
}

const deleteCricket = async (cricketId) => {
    try {
        let method = 'DELETE';
        const response = await fetch(API_URL + 'games/cricket/' + cricketId, {
            method: method,
            headers: getHeaders(method),
            body: JSON.stringify(game)
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
const CricketService = {
    createCricket,
    loadRunningCricketGames,
    loadFinishedCricketGames,
    loadAllCricketGames,
    loadCricket,
    updateCricket,
    deleteCricket
}

export default CricketService;