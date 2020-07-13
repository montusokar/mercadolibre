const fetch = require('node-fetch');
var itemService = require('../services/itemService')

const author = {
    name: "Gabriel",
    lastname: "Quijada"
}

module.exports = {

    getItems: function (req, res) {
        (async () => {
            var query = req.query.q ? req.query.q : "";
            var limit = req.query.limit ? req.query.limit : 4;
            const author = {
                name: req.get('first'),
                lastname: req.get('last'),
            }
            try {
                var searchResponse = await itemService.searchItems(query, limit, author);
                res.send(searchResponse);
            } catch (e) {
                res.send(e);
            }
        })();
    },
    getItem: function (req, res) {
        (async () => {
            var itemId = req.params.id ? req.params.id : null;
            const author = {
                name: req.get('first'),
                lastname: req.get('last'),
            }
            if (itemId != null) {
                try {
                    var response = await itemService.searchItem(itemId, author);
                    res.send(response);
                } catch (e) {
                    res.send(e);
                }
            } else {
                res.send({
                    error: {
                        message: "No item id was provided.",
                    }
                })
            }
        })();

    }
}