
/*
 * GET cats
 */

var Cat = require('../models/catschema')
	, mongoose = require('mongoose');

function randomize(arraylist) {
  var picker = Math.floor((Math.random()*arraylist.length));
  return arraylist[picker];
}

var catnames = ["Marley", "Killer", "Captain Sushi", "Buttercupp", "Audrey", "Doughnut", "Kifi", "Zeke", "Mitsey"];
var catcolors = ["red", "orange", "yellow", "green", "blue", "violet", "black", "brown", "gold", "white", "pink", "translucent"];

var catage = Math.floor((Math.random()*20)+1);

exports.newcat = function(req, res){
	var kitage = catage;
	var kitcolor;
	var kitcolor1 = randomize(catcolors);
	var kitcolor2 = randomize(catcolors);
	if (kitcolor1 == kitcolor2) {
		kitcolor2 = randomize(catcolors);
	}

	kitcolor = [kitcolor1, kitcolor2];

	var kitname = randomize(catnames);
	var kitteh = new Cat({age: kitage, color: kitcolor, name: kitname});

	kitteh.save(function (err) {
		if (err) {
			console.log("Problem saving kitteh", err);
		} else {
			console.log(kitteh.name, kitteh.age, kitteh.color);
			res.send("Your new cat is named " + kitteh.name + ". Your cat is " + kitteh.color[0] + " and " + kitteh.color[1] + " and it is " + kitteh.age + " years old.");
		}
	});
};



exports.list = function(req, res) {
	var cats = Cat.find({}).sort('age').exec(function (err, response) {
		if (err) {
			return console.log("error", err);
		}
		res.render('cats', {cats: response, title: 'ALL the kittens.'});
  })  
};


exports.colorSort = function(req, res) {
	var colorful = req.params.color;
	var cats = Cat.find({'color': colorful}).sort('age').exec(function (err, response) {
		if (err) {
			return console.log("error", err);
		}
	res.render('cats', {cats: response, title: 'Cats that have the color ' + req.params.color});
	})
};

exports.deleteOld = function(req, res) {
	var cats = Cat.findOneAndRemove({}).sort('-age').exec(function (err, response) {
		if (err) {
			return console.log("error", err);
		}
	res.redirect('/cats');
	})
};