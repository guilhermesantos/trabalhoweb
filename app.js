const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

const app = express();

const databaseConstants = require('./database_constants.js');

let server;

app.use(express.static('public'));
app.use(bodyParser.json());

//MongoDB Connection
MongoClient.connect(url, function(err, db) {
	if (err) {
		console.log("Failed to connect to MongoDB");
		throw err;
	}
	
	console.log("Connected to " + databaseConstants.databaseName + " database");
	
	dbps = db.db(databaseConstants.databaseName);
	dbps.collections(function(err, collections){
		if (err) {
			console.log("Failed to get collection list");
			throw err;
		}
		if (collections.length == 0) {
			console.log("Initializing database with data");
			const usersPromise = new Promise(function(resolve, reject) {
				dbps.collection(databaseConstants.databaseUsersName).insertMany(databaseConstants.DadosUsuarios, function(err, res) {
					if(err) throw err;
					console.log(databaseConstants.databaseUsersName + " collection created!");
					dbps.collection(databaseConstants.databaseUsersName).createIndex({"user" : 1}, {unique : true});
					resolve();
				});
			});
			const productsPromise = new Promise(function(resolve, reject) {
				dbps.collection(databaseConstants.databaseProductsName).insertMany(databaseConstants.DadosProdutos, function(err, res) {
					if(err) throw err;
					console.log(databaseConstants.databaseProductsName + " collection created!");
					resolve();
				});
			});
			const serviceTypesPromise = new Promise(function(resolve, reject) {
				dbps.collection(databaseConstants.databaseServiceTypesName).insertMany(databaseConstants.DadosTiposServicos, function(err, res) {
					if(err) throw err;
					console.log(databaseConstants.databaseServiceTypesName + " collection created!");
					resolve();
				});
			});
			const scheduledServicesPromise = new Promise(function(resolve, reject) {
				dbps.collection(databaseConstants.databaseScheduledServicesName).insertMany(databaseConstants.DadosServicosAgendados, function(err, res) {
					if(err) throw err;
					console.log(databaseConstants.databaseScheduledServicesName + " collection created!");
					resolve();
				});
			});
			const petsPromise = new Promise(function(resolve, reject) {
				dbps.collection(databaseConstants.databasePetsName).insertMany(databaseConstants.DadosAnimais, function(err, res) {
					if(err) throw err;	
					console.log(databaseConstants.databasePetsName + " collection created!");
					resolve();
				});
			});
			Promise.all([usersPromise, productsPromise, serviceTypesPromise, scheduledServicesPromise, petsPromise]).then(function() {
				startServer();
			});
		} else {
			startServer();
		}
	});
});

//Server startup
function startServer() {
	server = app.listen(80, 'localhost', () => {
		let host = server.address().address;
		let port = server.address().port;
		console.log("Server listening at http://%s:%s", host, port);
	});

	//Repeated keys (user) test
	/*
	const admin = {
		user: "admin",
		name: "Administrador 2",
		password: "admin2",
		email: "admin@admin.com2",
		phone: "(16) 9999-99992",
		city:"São Carlos2",
		street: "Av. São Carlos2",
		neighborhood: "2",
		isAdmin: true
	};
	dbps.collection(databaseConstants.databaseUsersName).insertOne(admin, function(err, res) {
		if (err) {
			console.log(err);
		}
		const cursor = dbps.collection(databaseConstants.databaseUsersName).find();
		cursor.each(function(err, item) {
			if (item == null) {
				return;
			} else {
				console.log(item);
			}
		});
	});
	*/
}

//Utils
function buildJsonPayload(message, data) {
	return {message: message, data: data};
}

function purifyUser(user) {
	return {user: user.user,
			name: user.name, 
			email: user.email,
			phone: user.phone,
			city: user.city,
			street: user.street,
			neighborhood: user.neighborhood, 
			isAdmin: user.isAdmin};
}

//Express
app.post('/login', function(req, res) {
	console.log("POST /login");

	const user = req.body.user;
	const password = req.body.password;

	if (typeof user == 'undefined' || typeof password == 'undefined') {
		res.status(400).json(buildJsonPayload("Missing credentials", null));
		return;
	}

	const query = {user: user, password: password};
	dbps.collection(databaseConstants.databaseUsersName).find(query).toArray(function(err, result) {
		if (err) {
			res.status(404).json(buildJsonPayload("An error ocurred. Please try again.", null));
		} else if (result.length == 0) {
			res.status(404).json(buildJsonPayload("Username or password is incorrect.", null));
		} else {
			const user = result[0];
			res.status(200).json(buildJsonPayload(null, purifyUser(user)));
		}
	});
});