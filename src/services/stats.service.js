const {
    REACT_APP_API_HOST,
    REACT_APP_API_PORT
} = process.env;

const API_URL='http://' + REACT_APP_API_HOST + ':' + REACT_APP_API_PORT + '/api/';

// Public methods to export
const loadPlayerStats = (playerId) => {
    return fetch(API_URL + 'stats/player/' + playerId)
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        }).then(data => {
            return data;
        }).catch(error => {
            throw Error(error);
        });
}

// Export methods
const StatsService = {
    loadPlayerStats
}

export default StatsService;