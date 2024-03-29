const {
    VITE_API_HOST,
    VITE_API_PORT
} = import.meta.env;

const API_URL = 'http://' + VITE_API_HOST + ':' + VITE_API_PORT + '/api/';

// Public methods to export
const createX01 = async (game) => {
    try {
        const response = await fetch(API_URL + 'games/x01', {
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
        throw new Error(error.message);
    }
}

const loadRunningX01Games = async () => {
    let data = await loadAllX01Games();
    return data.filter(game => game.gameIsRunning).sort((a,b)=>{
        return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
}

const loadFinishedX01Games = async () => {
    let data = await loadAllX01Games();
    return data.filter(game => !game.gameIsRunning).sort((a,b)=>{
        return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
}

const loadAllX01Games = async () => {
    try {
        const response = await fetch(API_URL + 'games/x01');
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const data = await response.json();
        return data.sort((a,b)=>{
            return new Date(b.updatedAt) - new Date(a.updatedAt);
        });
    } catch (error) {
        throw new Error(error.message);
    }
}

const loadX01Games = async (body) => {
    try {
        const response = await fetch(API_URL + 'games/x01/find', {
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
        return data.sort((a, b) => {
            return new Date(b.updatedAt) - new Date(a.updatedAt);
        });
    } catch (error) {
        throw Error(error.message);
    }
}

const loadX01 = async (id) => {
    try {
        const response = await fetch(API_URL + 'games/x01/' + id);
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error);
    }
}

const updateX01 = async (game) => {
    try {
        const response = await fetch(API_URL + 'games/x01/' + game.id, {
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

const deleteX01 = async (x01Id) => {
    try {
        const response = await fetch(API_URL + 'games/x01/' + x01Id, {
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
const X01Service = {
    createX01,
    loadRunningX01Games,
    loadFinishedX01Games,
    loadAllX01Games,
    loadX01Games,
    loadX01,
    updateX01,
    deleteX01
}

export default X01Service;