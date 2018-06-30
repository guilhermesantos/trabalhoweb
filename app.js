const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
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

function purifyProduct(product) {
	product.id = product._id;
	delete product._id;
}

function validBody(params, body) {
	for (let i = 0; i < params.length; i++) {
		const param = params[i];
		if (typeof param == 'string') {
			if (body[param] == null) {
				return false;
			}
		} else if (typeof params[i] == 'object') {
			const keys = Object.keys(param);
			if (keys.length == 0) {
				return false;
			} else {
				const paramName = keys[0];
				const paramType = param[paramName];
				const bodyParam = body[paramName];
				if (bodyParam == null || typeof bodyParam != paramType) {
					return false;
				}
			}
		}
	}

	return true;
}

// Express
//Login
app.post('/login', function(req, res) {
	console.log("POST /login");

	if (!validBody(['user', 'password'], req.body)) {
		res.status(400).json(buildJsonPayload("Faltam credenciais", null));
		return;
	}

	const user = req.body.user.toLowerCase();
	const password = req.body.password;

	const query = {user: user, password: password};
	dbps.collection(databaseConstants.databaseUsersName).find(query).toArray(function(err, result) {
		if (err) {
			res.status(404).json(buildJsonPayload("Algo inesperado aconteceu", null));
		} else if (result.length == 0) {
			res.status(404).json(buildJsonPayload("Nome de usuário ou senha incorreta", null));
		} else {
			const user = result[0];
			res.status(200).json(buildJsonPayload(null, purifyUser(user)));
		}
	});
});

//New User
app.post('/new_user', function(req, res) {
	console.log("POST /new_user");

	if (!validBody(['user', 'name', 'phone', 'email', 'city', 'neighborhood', 'street', 'password', 'repeatPassword', {'isAdmin' : 'boolean'}], req.body)) {
		res.status(400).json(buildJsonPayload("Faltam informações", null));
		return;
	}

	const user = req.body.user.toLowerCase();
	const name = req.body.name;
	const phone = req.body.phone;
	const email = req.body.email;
	const city = req.body.city;
	const neighborhood = req.body.neighborhood;
	const street = req.body.street;
	const password = req.body.password;
	const repeatPassword = req.body.repeatPassword;
	const isAdmin = req.body.isAdmin;

	if (user.length == 0) {
		res.status(400).json(buildJsonPayload("Nome de usuário não informado", null));
	} else if (name.length == 0) {
		res.status(400).json(buildJsonPayload("Nome não informado", null));
	} else if (phone.length == 0) {
		res.status(400).json(buildJsonPayload("Telefone não informado", null));
	} else if (email.length == 0) {
		res.status(400).json(buildJsonPayload("Email não informado", null));
	} else if (password.length == 0) {
		res.status(400).json(buildJsonPayload("Senha não informada", null));
	} else if (password != repeatPassword) {
		res.status(400).json(buildJsonPayload("As senhas são diferentes", null));
	} else {
		const userObject = {
			user: user,
			name: name,
			password: password,
			email: email,
			phone: phone,
			city: city,
			street: street,
			neighborhood: neighborhood,
			isAdmin: isAdmin
		}
		dbps.collection(databaseConstants.databaseUsersName).insertOne(userObject, function(err, response) {
			if (err) {
				console.log(err);
				if (err.code == 11000) {
					res.status(400).json(buildJsonPayload("Este usuário já existe", null));
				} else {
					res.status(400).json(buildJsonPayload("Algo inesperado aconteceu", null));
				}
			} else {
				const message = isAdmin ? "Administrador cadastrado com sucesso" : "Cliente cadastrado com sucesso";
				res.status(200).json(buildJsonPayload(message, null));
			}
		});
	}
});

//New Product
app.post('/new_product', function(req, res) {
	console.log("POST /new_product");

	if (!validBody(['name', 'description', {'price' : 'number'}, {'quantity' : 'number'}], req.body)) {
		res.status(400).json(buildJsonPayload("Faltam informações", null));
		return;
	}

	const name = req.body.name;
	const description = req.body.description;
	const price = Number(req.body.price);
	const quantity = Number(req.body.quantity);

	if (name.length == 0) {
		res.status(400).json(buildJsonPayload("Nome do produto não informado", null));
	} else {
		const productObject = {
			name: name,
			description: description,
			price: price,
			quantity: quantity
		}
		dbps.collection(databaseConstants.databaseProductsName).insertOne(productObject, function(err, response) {
			if (err) {
				console.log(err);
				if (err.code == 11000) {
					res.status(400).json(buildJsonPayload("Este produto já existe", null));
				} else {
					res.status(400).json(buildJsonPayload("Algo inesperado aconteceu", null));
				}
			} else {
				res.status(200).json(buildJsonPayload("Produto criado com sucesso", null));
			}
		});
	}
});

//New Service Type
app.post('/new_service_type', function(req, res) {
	console.log("POST /new_service_type");

	if (!validBody(['name', {'price' : 'number'}], req.body)) {
		res.status(400).json(buildJsonPayload("Faltam informações", null));
		return;
	}

	const name = req.body.name;
	const price = Number(req.body.price);

	if (name.length == 0) {
		res.status(400).json(buildJsonPayload("Nome do produto não informado", null));
	} else {
		const serviceTypeObject = {
			name: name,
			price: price
		}
		dbps.collection(databaseConstants.databaseServiceTypesName).insertOne(serviceTypeObject, function(err, response) {
			if (err) {
				console.log(err);
				if (err.code == 11000) {
					res.status(400).json(buildJsonPayload("Este tipo de serviço já existe", null));
				} else {
					res.status(400).json(buildJsonPayload("Algo inesperado aconteceu", null));
				}
			} else {
				res.status(200).json(buildJsonPayload("Tipo de serviço criado com sucesso", null));
			}
		});
	}
});

//All Products
app.get('/products', function(req, res) {
	console.log("GET /products");

	let products = [];
	const cursor = dbps.collection(databaseConstants.databaseProductsName).find().toArray(function(err, products) {
		if (err) {
			res.status(400).json(buildJsonPayload("Algo inesperado aconteceu", null));
		} else {
			products.forEach(function(product) {
				purifyProduct(product);
			});
			res.status(200).json(buildJsonPayload(null, products));
		}
	});
});

app.get('/products/:productId', function(req, res) {
	console.log("GET /products/" + req.params.productId);

	if (ObjectId.isValid(req.params.productId)) {
		const productId = ObjectId(req.params.productId);

		const query = {_id : productId};
		dbps.collection(databaseConstants.databaseProductsName).findOne(query, function(err, product) {
			if (err || typeof product == 'undefined' || product == null) {
				res.status(400).json(buildJsonPayload("Produto não encontrado", null));
			} else {
				purifyProduct(product);
				res.status(200).json(buildJsonPayload(null, product));
			}
		});
	} else {
		res.status(400).json(buildJsonPayload("Produto não encontrado", null));
	}
});

app.post('/products/:productId', function(req, res) {
	if (!validBody(['name', 'description', {'price' : 'number'}, {'quantity' : 'number'}], req.body)) {
		res.status(400).json(buildJsonPayload("Faltam informações", null));
		return;
	}

	const id = req.params.productId;
	const name = req.body.name;
	const description = req.body.description;
	const price = Number(req.body.price);
	const quantity = Number(req.body.quantity);

	if (ObjectId.isValid(id)) {
		const productId = ObjectId(id);

		if (name.length == 0) {
			res.status(400).json(buildJsonPayload("Nome do produto não informado", null));
		} else {
			const query = {_id : productId};
			const productObject = {
				name: name,
				description: description,
				price: price,
				quantity: quantity
			}
			dbps.collection(databaseConstants.databaseProductsName).updateOne(query, {$set : productObject}, function(err, response) {
				if (err) {
					res.status(400).json(buildJsonPayload("Algo inesperado aconteceu", null));
				} else {
					res.status(200).json(buildJsonPayload("Produto editado com sucesso", null));
				}
			});
		}
	} else {
		res.status(400).json(buildJsonPayload("Produto não encontrado", null));
	}
});

app.delete('/products/:productId', function(req, res) {
	console.log("DELETE /products/" + req.params.productId);

	if (ObjectId.isValid(req.params.productId)) {
		const productId = ObjectId(req.params.productId);

		const query = {_id : productId};
		dbps.collection(databaseConstants.databaseProductsName).deleteOne(query, function(err, result) {
			if (err || result.result.n == 0) {
				res.status(400).json(buildJsonPayload("Erro ao deletar produto", null));
			} else {
				res.status(200).json(buildJsonPayload("Produto deletado", null));
			}
		});
	} else {
		res.status(400).json(buildJsonPayload("Erro ao deletar produto", null));
	}
});