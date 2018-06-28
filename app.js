const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

const app = express();

let server;

const databaseName = "pet_shop";
const databaseUsersName = "users";
const databaseProductsName = "products";
const databaseServiceTypesName = "service_types";
const databaseScheduledServicesName = "scheduled_services";
const databasePetsName = "animals";
const DadosUsuarios = [
	{
		usuario: "admin",
		nome: "Administrador",
		senha: "admin",
		email: "admin@admin.com",
		telefone: "(16) 9999-9999",
		cidade:"São Carlos",
		rua: "Av. São Carlos",
		bairro: "",
		isAdmin: true
	},
	{
		usuario: "client",
		nome: "John",
		senha: "client",
		email: "john@client.com",
		telefone: "(16) 1111-1111",
		cidade:"São Carlos",
		rua: "Av. Francisco Pereira Lopes",
		bairro: "Arnold Schimidt",
		isAdmin: false
	}
];
const DadosProdutos = [
	{
		nome: "Bolinha",
		descricao: "Ideal para seu cachorro!",
		preco: 10.00,
		quantidade: 50
	},
	{
		nome: "Osso",
		descricao: "Cachorros gostam muito",
		preco: 5.00,
		quantidade: 20
	},
	{
		nome: "Areia",
		descricao: "Para a higiene de seu gato",
		preco: 20.00,
		quantidade: 15
	}
];
const DadosTiposServicos = [
	{
		nome: "Consulta",
		preco: 150
	},
	{
		nome: "Tosa",
		preco: 50
	},
	{
		nome: "Banho",
		preco: 50
	},
	{
		nome: "Banho e Tosa",
		preco: 80
	}
];
const DadosServicosAgendados = [
	{
		servico: 1,
		data: "2018-06-04",
		hora: "14:30",
		animal: 2
	},
	{
		servico: 4,
		data: "2019-01-02",
		hora: "08:00",
		animal: 1
	}
];
const DadosAnimais = [
	{
		nome: "Billy",
		especie: "Cachorro",
		dono: "client"
	},
	{
		nome: "Lua",
		especie: "Gato",
		dono: "client"
	},
	{
		nome: "Per",
		especie: "Gato",
		dono: "client"
	}
];

//MongoDB Connection
MongoClient.connect(url, function(err, db) {
	if (err) {
		console.log("Failed to connect to MongoDB");
		throw err;
	}
	
	console.log("Connected to " + databaseName + " database");
	
	dbps = db.db(databaseName);
	dbps.collections(function(err, collections){
		if (err) {
			console.log("Failed to get collection list");
			throw err;
		}
		if (collections.length == 0) {
			console.log("Initializing database with data");
			const usersPromise = new Promise(function(resolve, reject) {
				dbps.collection(databaseUsersName).insertMany(DadosUsuarios, function(err, res) {
					if(err) throw err;
					console.log(databaseUsersName + " collection created!");
					resolve();
				});
			});
			const productsPromise = new Promise(function(resolve, reject) {
				dbps.collection(databaseProductsName).insertMany(DadosProdutos, function(err, res) {
					if(err) throw err;
					console.log(databaseProductsName + " collection created!");
					resolve();
				});
			});
			const serviceTypesPromise = new Promise(function(resolve, reject) {
				dbps.collection(databaseServiceTypesName).insertMany(DadosTiposServicos, function(err, res) {
					if(err) throw err;
					console.log(databaseServiceTypesName + " collection created!");
					resolve();
				});
			});
			const scheduledServicesPromise = new Promise(function(resolve, reject) {
				dbps.collection(databaseScheduledServicesName).insertMany(DadosServicosAgendados, function(err, res) {
					if(err) throw err;
					console.log(databaseScheduledServicesName + " collection created!");
					resolve();
				});
			});
			const petsPromise = new Promise(function(resolve, reject) {
				dbps.collection(databasePetsName).insertMany(DadosAnimais, function(err, res) {
					if(err) throw err;	
					console.log(databasePetsName + " collection created!");
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