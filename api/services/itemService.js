const fetch = require('node-fetch');
var categoriesService = require('./categoriesService')

const author = {
    name: "Gabriel",
    lastname: "Quijada"
}

const searchUrl = "https://api.mercadolibre.com/sites/MLA/search?q=";
const itemUrl = "https://api.mercadolibre.com/items/";

module.exports = {

    searchItems: async function (query, limit) {
        try {
            var url = searchUrl + query;
            if (limit && limit > 0) url += "&limit=" + limit;
            console.log(url);
            const response = await fetch(url);
            const json = await response.json();

            var items = retrieveItemsFromResponse(json);
            var category = await retrieveOrderedCategories(json);

            var searchResponse = { author: author, categories: category.path_from_root, items: items }
            return (searchResponse);

        } catch (e) {
            throw Error('Error while retrieving results')
        }
    },
    searchItem: async function (itemId) {
        try {
 
            const itemResponse = await fetch(itemUrl + itemId);
            const itemJson = await itemResponse.json();

            const descriptionResponse = await fetch(itemUrl + itemId + "/description");

            const descriptionJson = await descriptionResponse.json();
           
            var category = await categoriesService.getCategory(itemJson.category_id);
            
            
            var item = {
                id: itemJson.id,
                title: itemJson.title,
                price: {
                    currency: itemJson.currency_id,
                    amount: Math.floor(itemJson.price),
                    decimals: Math.round((itemJson.price % 1) * 100),
                },
                picture: itemJson.thumbnail,
                condition: itemJson.condition,
                free_shipping: itemJson.shipping.free_shipping,
                sold_quantity: itemJson.sold_quantity,
                description: descriptionJson.plain_text,
                categories: category.path_from_root
            }
            return ({ author: author, item: item });
        } catch (e) {
            return ({});
        }


    }
}

async function retrieveOrderedCategories(json) {

    if (json.filters.length > 0) {
        let categories_filter = {};
        json.filters.forEach(filter => {
            if (filter.id === "category") {
                categories_filter = filter;
            }
        })
        return categories_filter.values.shift();
    } else {
        let categories_filter = {};
        json.available_filters.forEach(filter => {
            if (filter.id === "category") {
                categories_filter = filter;
            }
        })

        let categories = categories_filter.values.sort((a, b) => { return b.results - a.results })

        let category = categories.shift();
        var topCategory = await categoriesService.getCategory(category.id);

        return topCategory;
    }
}

function retrieveItemsFromResponse(json) {
    var items = [];
    json.results.forEach(result => {
        var item = {
            id: result.id,
            title: result.title,
            price: {
                currency: result.currency_id,
                amount: Math.floor(result.price),
                decimals: Math.round((result.price % 1) * 100),
            },
            picture: result.thumbnail,
            condition: result.condition,
            free_shipping: result.shipping.free_shipping,
        };
        items.push(item);
    });
    return items;
}
