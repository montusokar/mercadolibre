
const dev = {
    urls: {
        REACT_APP_ITEM_URL: "http://localhost:9000/api/items/",
        REACT_APP_SEARCH_URL: "http://localhost:9000/api/items"
    },
};

const prod = {
    urls: {
        REACT_APP_ITEM_URL: "http://localhost:9000/api/items/",
        REACT_APP_SEARCH_URL: "http://localhost:9000/api/items"
    },
};

const config = process.env.REACT_APP_STAGE === 'production'
    ? prod
    : dev;

export default {
    ...config
};
