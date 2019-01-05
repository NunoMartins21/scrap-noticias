var express = require('express');
var router = express.Router();

var Jornal = require("../models/Jornal.js");

var jornais = [
	new Jornal("Correio da Manhã", `https://www.cmjornal.pt/mais-cm/capas`, 0),
	new Jornal("Jornal de Notícias", `https://www.jn.pt/edicao-impressa.html`, 1),
	new Jornal("Jornal Público", `https://www.publico.pt/jornal`, 2)
];

/* Lista de Capas */
router.get('/capas', function(req, res, next) {
	let json = {};
	jornais.forEach(i => {
		json[parseInt(i.codigo)] = i.getCapa();	
	});
	res.json(json);
});

module.exports = router;
