var express = require('express');

// Get the router
var router = express.Router();
 
var loadCounties = require('./loadCounties.js');
var County = require('./models/county');

loadCounties.loadCounties();

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
router.route('/signin')
	.get(function(req, res) {
		County.find({sex: 2}, function(err, account){
			if (err)
				res.send(err);
			res.json(account)
			console.log(account.length)
		});
		
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