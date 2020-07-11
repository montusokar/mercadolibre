var express = require('express');
var router = express.Router();
var itemsController = require("../controller/itemsController")

router.get("/", function (req, res) {
  res.send("Health Check, status: UP");
});

router.route('/items').get(itemsController.getItems);

router.route('/items/:id').get(itemsController.getItem);

module.exports = router;
