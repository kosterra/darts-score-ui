const {
    VITE_CF_CLIENT_ID,
    VITE_CF_CLIENT_SECRET
} = import.meta.env;

const getHeaders = (method) => {
    let headers = {};

    if (method === 'POST' || method === 'PUT') {
        headers['Content-Type'] = 'application/json';
        //headers['accept'] = 'application/json';
    }

    if (VITE_CF_CLIENT_ID) {
        headers['CF-Access-Client-Id'] = VITE_CF_CLIENT_ID;
    }

    if (VITE_CF_CLIENT_SECRET) {
        headers['CF-Access-Client-Secret'] = VITE_CF_CLIENT_SECRET;
    }
    
    return headers;
}

export {
    getHeaders
}