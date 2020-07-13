const fetch = require('node-fetch');
const config = require('config');

const url = config.get('api.url') + config.get('api.resources.categories');

module.exports = {
    getCategory: async function (categoryId) {
        try {
            const response = await fetch(url + categoryId);
            const json = await response.json();

            var category = {
                id: json.id,
                name: json.name,
                path_from_root: json.path_from_root
            }
            return category;
        } catch (e) {
            throw Error('Error while retrieving category results')
        }
    }
}