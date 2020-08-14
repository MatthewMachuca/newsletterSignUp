const express = require('express');
const request = require('body-parser');
const app = express();
const https = require('https');

const bodyParser = require('body-parser');
const { stringify } = require('querystring');
const { post } = require('request');
const { response } = require('express');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/signup.html');
});

app.post('/', function(req, res) {
	let firstName = req.body.userFirstName;
	let lastName = req.body.userLastName;
	let email = req.body.userEmail;

	const data = {
		members: [
			{
				email_address: email,
				status: 'subscribed',
				merge_fields: {
					FNAME: firstName,
					LNAME: lastName
				}
			}
		]
	};

	const jsonData = JSON.stringify(data);

	const url = 'https://us17.api.mailchimp.com/3.0/lists/0327d2ad2b';

	const options = {
		method: 'post',
		auth: 'admin1: **API KEY**'
	};
	const request = https.request(url, options, function(response) {
		if (response.statusCode === 200) {
			res.sendFile(__dirname + '/success.html');
		} else {
			res.sendFile(__dirname + '/failure.html');
		}

		response.on('data', function(data) {
			console.log(JSON.parse(data));
		});
	});
	request.write(jsonData);
	request.end();
});

app.post('/failure', function() {
	response.redirect('/');
});

app.listen(process.env.PORT || 3000, function() {
	console.log('server running');
});

//test
//1
