const fetch = require('node-fetch');
var categoriesService = require('./categoriesService')
const config = require('config');

const searchUrl = config.get('api.url') + config.get('api.resources.search') + "?q=";
const itemUrl = config.get('api.url') + config.get('api.resources.items');

module.exports = {

    searchItems: async function (query, limit, author) {
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
            return {error:"MIDDLEWARE_ERROR",  message: e.message}
        }
    },
    searchItem: async function (itemId, author) {
        try {

            const itemResponse = await fetch(itemUrl + itemId);
            if(itemResponse.status === 200){
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
            }
            return {error:"NOT_FOUND",  message: "Item not found."}
        } catch (e) {
            return {error:"MIDDLEWARE_ERROR",  message: e.message}
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
        if (json.available_filters.length > 0) {
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
        }else{
            return [];
        }

    }
}

function retrieveItemsFromResponse(json) {
    var items = [];
    if(json.results.length > 0){
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
    }
    return items;
}
