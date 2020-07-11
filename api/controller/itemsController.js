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
            try {
                var searchResponse = await itemService.searchItems(query, limit);
                res.send(searchResponse);
            } catch (e) {
                res.send(e);
            }
        })();
    },
    getItem: function (req, res) {
        (async () => {
            var itemId = req.params.id ? req.params.id : null; 
            if(itemId != null){
                try {
                    var response = await itemService.searchItem(itemId);
                    res.send(response);
                } catch (e) {
                    res.send(e);
                }
            }else{
                res.send({error : {
                    message: "No item id was provided.",
                }})
            }
        })();

    }
}