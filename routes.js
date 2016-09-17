var express = require('express');

// Get the router
var router = express.Router();
 
var County = require('./models/county');
 
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
/*router.route('/accounts')
	.get(function(req, res) {
		Account.find(function(err, accounts) {
			if (err)
				res.send(err);
			res.json(accounts);
		});
	})

// Create an account (using POST at http://localhost:8080/messages)
	.post(function(req, res) {
		if (req.body.firstName && req.body.lastName && req.body.email && req.body.password) {
			// Set account values from request
			var account = new Account();
			account.id = "hohoho";
			account.firstName = req.body.firstName;
			account.lastName = req.body.lastName;
			account.email = req.body.email;
			account.password = req.body.password;
			// Save message and check for errors
			account.save(function(err) {
				if (err)
					res.send(err);
				res.json({ message: 'Account created successfully!' });
			});
		}
		else {
			res.send("fill in all form areas");
		}
	});

router.route('/signin')
	.post(function(req, res) {
		if (req.body.email && req.body.password) {
			Account.find({email: req.body.email, password: req.body.password}, function(err, account){
				if (err)
					res.send(err);
				res.json(account)
			});
		}
		else {
			res.send("fill in all form areas");
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