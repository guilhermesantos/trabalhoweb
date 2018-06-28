	const databaseName = "Database";
	const databaseUsersName = "Usuarios";
	const databaseProductsName = "Produtos";
	const databaseServiceTypesName = "TiposServicos";
	const databaseScheduledServicesName = "ServicosAgendados";
	const databasePetsName = "Animais";
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
	
	//var express = require('express');
	//var app = express();
	
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";
	
	var dbps;
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		
		//app.listen(3000);
		
		dbps = db.db(databaseName);
		dbps.collections(function(err, res){
			if (err) throw err;
			if (res == ""){
				dbps.collection(databaseUsersName).insertMany( DadosUsuarios, function(err, res) {	if(err) throw err;	});
				dbps.collection(databaseProductsName).insertMany( DadosProdutos, function(err, res) {	if(err) throw err;	});
				dbps.collection(databaseServiceTypesName).insertMany( DadosTiposServicos, function(err, res) {	if(err) throw err;	});
				dbps.collection(databaseScheduledServicesName).insertMany( DadosServicosAgendados, function(err, res) {	if(err) throw err;	});
				dbps.collection(databasePetsName).insertMany( DadosAnimais, function(err, res) {	if(err) throw err;	});
			}
		});
	});
	
	//app.get('/', function(req, res) {
	//...
	//});
	
	
