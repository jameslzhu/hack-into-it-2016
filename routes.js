var express = require('express');
var bodyParser = require('body-parser');

// Get the router
var router = express.Router();
 
var loadRankings = require('./loadRankings');
var Ranking = require('./models/ranking.js');

loadRankings.loadRankings();

// Middleware for all this routers requests
router.use(function timeLog(req, res, next) {
	console.log(req.method, ' Request Received: ', dateDisplayed(Date.now()));
	next();
});
 
// Welcome message for a GET at http://localhost:8080/restapi
router.get('/', function(req, res) {
	res.json({ message: 'Welcome to the REST API (debug mode)' });   
});
 
// GET all messages (using a GET at http://localhost:8080/messages)
router.route('/request')
	.get(function(req, res) {
		//var states = req.body.states;
		var industry = req.query.industry;
		var gender = req.query.gender;
		var pref = req.query.pref;
		var slider = req.query.slider;
		var states = req.query.states;

		var jsonResults = {}                                     
		console.log(req.query)
		for (var i = 0; i < states.length; i++) {
			var s = states[i]
			console.log(parseInt(s))
			console.log(parseInt(industry))
			Ranking.find({state: 6, industry: 0}, function(err, county){
				console.log(county)
				console.log(county)
				/*if (err)
					res.send(err);
				res.json(county)*/
			});	
		}
	});


/*router.route('/messages/:message_id')
	// GET message with id (using a GET at http://localhost:8080/messages/:message_id)
	.get(function(req, res) {
		Message.findById(req.params.message_id, function(err, message) {
			if (err)
				res.send(err);
			res.json(message);
		});
	})
 
	// Update message with id (using a PUT at http://localhost:8080/messages/:message_id)
	.put(function(req, res) {
		Message.findById(req.params.message_id, function(err, message) {
			if (err)
				res.send(err);
			// Update the message text
		message.text = req.body.text;
			message.save(function(err) {
				if (err)
					res.send(err);
				res.json({ message: 'Message successfully updated!' });
			});
 
		});
	})
 
	// Delete message with id (using a DELETE at http://localhost:8080/messages/:message_id)
	.delete(function(req, res) {
		Message.remove({
			_id: req.params.message_id
		}, function(err, message) {
			if (err)
				res.send(err);
 
			res.json({ message: 'Successfully deleted message!' });
		});
	});*/
 
module.exports = router;
 
function dateDisplayed(timestamp) {
	var date = new Date(timestamp);
	return (date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}