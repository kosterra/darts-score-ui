const {
    VITE_CF_CLIENT_ID,
    VITE_CF_CLIENT_SECRET
} = import.meta.env;

const getHeaders = (addContentTypeJSON) => {
    let headers = {};

    if (addContentTypeJSON) {
        headers['Content-Type'] = 'application/json';
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