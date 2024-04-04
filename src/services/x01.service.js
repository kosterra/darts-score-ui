import {
    getHeaders
} from '../utils/service.utils';

const {
    VITE_API_URL
} = import.meta.env;

const API_URL = VITE_API_URL + '/api/';

// Public methods to export
const createX01 = async (game) => {
    try {
        let method = 'POST';
        const response = await fetch(API_URL + 'games/x01', {
            method: method,
            headers: getHeaders(method),
            body: JSON.stringify(game)
        });

        if (!response.ok) {
            throw Error(response.statusText);
        };

        return await response.json();
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
        let method = 'GET';
        const response = await fetch(API_URL + 'games/x01', {
            method: method,
            headers: getHeaders(method)
        });

        if (!response.ok) {
            throw Error(response.statusText);
        };
        
        let data = await response.json();
        return data.sort((a, b) => {
            return new Date(b.updatedAt) - new Date(a.updatedAt);
        });
    } catch (error) {
        throw new Error(error.message);
    }
}

const loadX01Games = async (body) => {
    try {
        let method = 'POST';
        const response = await fetch(API_URL + 'games/x01/find', {
            method: method,
            headers: getHeaders(method),
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw Error(response.statusText);
        };

        let data = await response.json();
        return data.sort((a, b) => {
            return new Date(b.updatedAt) - new Date(a.updatedAt);
        });
    } catch (error) {
        throw Error(error.message);
    }
}

const loadX01 = async (id) => {
    try {
        let method = 'GET';
        const response = await fetch(API_URL + 'games/x01/' + id, {
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

const updateX01 = async (game) => {
    try {
        let method = 'PUT';
        const response = await fetch(API_URL + 'games/x01/' + game.id, {
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

const deleteX01 = async (x01Id) => {
    try {
        let method = 'DELETE';
        const response = await fetch(API_URL + 'games/x01/' + x01Id, {
            method: method,
            headers: getHeaders(method)
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