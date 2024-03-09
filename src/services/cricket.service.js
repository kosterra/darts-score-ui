const {
    VITE_API_HOST,
    VITE_API_PORT
} = import.meta.env;

const API_URL = 'http://' + VITE_API_HOST + ':' + VITE_API_PORT + '/api/';

// Public methods to export
const createCricket = async (game) => {
    try {
        const response = await fetch(API_URL + 'games/cricket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(game)
        });
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const data = await response.json();
        return data;
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
        const response = await fetch(API_URL + 'games/cricket');
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error);
    }
}

const loadCricket = async (id) => {
    try {
        const response = await fetch(API_URL + 'games/cricket/' + id);
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error);
    }
}

const updateCricket = async (game) => {
    try {
        const response = await fetch(API_URL + 'games/cricket/' + game.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(game)
        });
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.ok;
    } catch (error) {
        throw new Error(error);
    }
}

const deleteCricket = async (cricketId) => {
    try {
        const response = await fetch(API_URL + 'games/cricket/' + cricketId, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.ok;
    } catch (error) {
        throw Error(error);
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