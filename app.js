const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

const app = express();

const databaseConstants = require('./database_constants.js');

let server;

app.use(express.static('public'));

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
	server = app.listen(3000, 'localhost', () => {
		let host = server.address().address;
		let port = server.address().port;
		console.log("Server listening at http://%s:%s", host, port);
	});
}