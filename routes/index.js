var express = require('express');
var router = express.Router();
var stockget = require('../models/strategyDataGet');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/strategy', function(req, res, next) {
	stockget.getId("strategyDatabase", "test", function(data, err){
		res.render('strategy', { stock: data });
	});
});

router.post("/strategy", function(req, res){
	var id = req.body.id;
	stockget.getData(id, "updateDatabase", function(data, err){
		res.send(data);
	});
});

module.exports = router;
