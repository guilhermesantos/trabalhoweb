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
app.use(bodyParser.json({limit: '50mb'}));

//MongoDB Connection
MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
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
			let serviceTypeIds = [];
			let animalIds = [];
			console.log("Initializing database with data");
			const usersPromise = new Promise(function(resolve, reject) {
				dbps.collection(databaseConstants.databaseUsersName).insertMany(databaseConstants.DadosUsuarios, function(err, res) {
					if (err) {
						throw err;
					}
					console.log(databaseConstants.databaseUsersName + " collection created!");
					dbps.collection(databaseConstants.databaseUsersName).createIndex({"user" : 1}, {unique : true});
					resolve();
				});
			});
			const productsPromise = new Promise(function(resolve, reject) {
				dbps.collection(databaseConstants.databaseProductsName).insertMany(databaseConstants.DadosProdutos, function(err, res) {
					if (err) {
						throw err;
					}
					console.log(databaseConstants.databaseProductsName + " collection created!");
					resolve();
				});
			});
			const serviceTypesPromise = new Promise(function(resolve, reject) {
				dbps.collection(databaseConstants.databaseServiceTypesName).insertMany(databaseConstants.DadosTiposServicos, function(err, res) {
					if (err) {
						throw err;
					}
					console.log(databaseConstants.databaseServiceTypesName + " collection created!");
					res.ops.forEach(function(serviceType) {
						serviceTypeIds.push(serviceType._id);
					});
					resolve();
				});
			});
			const petsPromise = new Promise(function(resolve, reject) {
				dbps.collection(databaseConstants.databasePetsName).insertMany(databaseConstants.DadosAnimais, function(err, res) {
					if (err) {
						throw err;
					}
					console.log(databaseConstants.databasePetsName + " collection created!");
					res.ops.forEach(function(animal) {
						animalIds.push(animal._id);
					});
					resolve();
				});
			});
			Promise.all([usersPromise, productsPromise, serviceTypesPromise, petsPromise]).then(function() {
				let scheduledServicesData = databaseConstants.DadosServicosAgendados;
				for (let i = 0; i < scheduledServicesData.length; i++) {
					scheduledServicesData[i].serviceTypeId = serviceTypeIds[i % serviceTypeIds.length];
					scheduledServicesData[i].animalId = animalIds[i % animalIds.length];
				}
				dbps.collection(databaseConstants.databaseScheduledServicesName).insertMany(scheduledServicesData, function(err, res) {
					if (err) {
						throw err;
					}
					dbps.collection(databaseConstants.databaseScheduledServicesName).createIndex({"serviceTypeId" : 1, "date" : 1, "time" : 1}, {unique : true});
					dbps.collection(databaseConstants.databaseScheduledServicesName).createIndex({"animalId" : 1, "date" : 1, "time" : 1}, {unique : true});
					console.log(databaseConstants.databaseScheduledServicesName + " collection created!");
					startServer();
				});
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
	if (typeof user == 'undefined' || user == null) {
		return;
	}
	delete user._id;
	delete user.password;
}

function purifyProduct(product) {
	if (typeof product == 'undefined' || product == null) {
		return;
	}

	product.id = product._id;
	delete product._id;
}

function purifyServiceType(serviceType) {
	if (typeof serviceType == 'undefined' || serviceType == null) {
		return;
	}

	serviceType.id = serviceType._id;
	delete serviceType._id;
}

function purifyAnimal(animal) {
	if (typeof animal == 'undefined' || animal == null) {
		return;
	}

	animal.id = animal._id;
	delete animal._id;
}

function purifyScheduledService(scheduledService) {
	if (typeof scheduledService == 'undefined' || scheduledService == null) {
		return;
	}

	scheduledService.id = scheduledService._id;
	delete scheduledService._id;
	delete scheduledService.serviceTypeId;
	delete scheduledService.animalId;

	if (typeof scheduledService.serviceType != 'undefined' && scheduledService.serviceType.length > 0) {
		let serviceType = scheduledService.serviceType[0];
		purifyServiceType(serviceType);
		scheduledService.serviceType = serviceType;
	}

	if (typeof scheduledService.animal != 'undefined' && scheduledService.animal.length > 0) {
		let animal = scheduledService.animal[0];
		purifyAnimal(animal);
		scheduledService.animal = animal;
	}

	if (typeof scheduledService.animalOwner != 'undefined' && scheduledService.animalOwner.length > 0) {
		let animalOwner = scheduledService.animalOwner[0];
		purifyUser(animalOwner);
		scheduledService.animalOwner = animalOwner;
	}
}

//Returns wheter or not the body has all the requested parameters
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
			purifyUser(user);
			res.status(200).json(buildJsonPayload(null, user));
		}
	});
});

//Users
//New user
app.post('/users', function(req, res) {
	console.log("POST /users");

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
	const imageData = req.body.imageData;
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
			password: password,
			name: name,
			email: email,
			phone: phone,
			city: city,
			street: street,
			neighborhood: neighborhood,
			imageData: imageData,
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

//Edit user
app.post('/users/:user', function(req, res) {
	console.log("POST /users/" + req.params.user);

	if (!validBody(['name', 'phone', 'email', 'city', 'neighborhood', 'street', 'password', 'repeatPassword'], req.body)) {
		res.status(400).json(buildJsonPayload("Faltam informações", null));
		return;
	}

	const user = req.params.user;
	const name = req.body.name;
	const phone = req.body.phone;
	const email = req.body.email;
	const city = req.body.city;
	const neighborhood = req.body.neighborhood;
	const street = req.body.street;
	const password = req.body.password;
	const repeatPassword = req.body.repeatPassword;
	const imageData = req.body.imageData;

	if (name.length == 0) {
		res.status(400).json(buildJsonPayload("Nome não informado", null));
	} else if (phone.length == 0) {
		res.status(400).json(buildJsonPayload("Telefone não informado", null));
	} else if (email.length == 0) {
		res.status(400).json(buildJsonPayload("Email não informado", null));
	} else if (password.length > 0 && password != repeatPassword) {
		res.status(400).json(buildJsonPayload("As senhas são diferentes", null));
	} else {
		const query = {user: user};
		const userObject = {
			name: name,
			email: email,
			phone: phone,
			city: city,
			street: street,
			neighborhood: neighborhood
		}
		if (imageData) {
			userObject.imageData = imageData;
		}
		if (password.length > 0) {
			userObject.password = password;
		}
		dbps.collection(databaseConstants.databaseUsersName).findOneAndUpdate(query, {$set : userObject}, {returnOriginal : false}, function(err, response) {
			if (err) {
				res.status(400).json(buildJsonPayload("Algo inesperado aconteceu", null));
			} else {
				const user = response.value;
				purifyUser(user);
				res.status(200).json(buildJsonPayload("Informações alterada com sucesso", user));
			}
		});
	}
});

//Service Types
//Get all service types
app.get('/service_types', function(req, res) {
	console.log("GET /service_types");

	dbps.collection(databaseConstants.databaseServiceTypesName).find().toArray(function(err, serviceTypes) {
		if (err) {
			res.status(400).json(buildJsonPayload("Algo inesperado aconteceu", null));
		} else {
			serviceTypes.forEach(function(serviceType) {
				purifyServiceType(serviceType);
			});
			serviceTypes.sort(function(serviceType1, serviceType2) {
				return serviceType1.name > serviceType2.name;
			});
			res.status(200).json(buildJsonPayload(null, serviceTypes));
		}
	});
});

//Services gains
app.get('/service_gains', function(req, res) {
	console.log("GET /service_gains");

	dbps.collection(databaseConstants.databaseScheduledServicesName).find().toArray(function(err, scheduledServices) {
		if (err) {
			res.status(400).json(buildJsonPayload("Algo inesperado aconteceu"), null);
		} else {
			let serviceQuantities = {};
			scheduledServices.forEach(function(scheduledService) {
				if (serviceQuantities[scheduledService.serviceTypeId] == undefined) {
					serviceQuantities[scheduledService.serviceTypeId] = 1;
				} else {
					serviceQuantities[scheduledService.serviceTypeId]++;
				}
			});

			let serviceTypePromises = [];
			Object.keys(serviceQuantities).forEach(function(serviceTypeId) {
				if (ObjectId.isValid(serviceTypeId)) {
					const serviceTypeObjectId = ObjectId(serviceTypeId);
					const serviceTypePromise = new Promise(function(resolve, reject) {
						const quantity = serviceQuantities[serviceTypeId];
						const query = {_id : serviceTypeObjectId};
						dbps.collection(databaseConstants.databaseServiceTypesName).findOne(query, function(err, serviceType) {
							if (err) {
								reject();
							} else {
								serviceType.sold = quantity;
								resolve(serviceType);
							}
						});
					});
					serviceTypePromises.push(serviceTypePromise);
				}
			});

			Promise.all(serviceTypePromises).then(function(serviceTypes) {
				res.status(200).json(buildJsonPayload(null, serviceTypes));
			});
		}
	});
});

//New Service Type
app.post('/service_types', function(req, res) {
	console.log("POST /service_types");

	if (!validBody(['name', 'description', {'price' : 'number'}], req.body)) {
		res.status(400).json(buildJsonPayload("Faltam informações", null));
		return;
	}

	const name = req.body.name;
	const description = req.body.description;
	const price = Number(req.body.price);
	const imageData = req.body.imageData;

	if (name.length == 0) {
		res.status(400).json(buildJsonPayload("Nome do produto não informado", null));
	} else {
		const serviceTypeObject = {
			name: name,
			description: description,
			price: price,
			imageData: imageData
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

//Products
//All products
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

//New product
app.post('/products', function(req, res) {
	console.log("POST /products");

	if (!validBody(['name', 'description', {'price' : 'number'}, {'quantity' : 'number'}], req.body)) {
		res.status(400).json(buildJsonPayload("Faltam informações", null));
		return;
	}

	const name = req.body.name;
	const description = req.body.description;
	const price = Number(req.body.price);
	const quantity = Number(req.body.quantity);
	const imageData = req.body.imageData;

	if (name.length == 0) {
		res.status(400).json(buildJsonPayload("Nome do produto não informado", null));
	} else {
		const productObject = {
			name: name,
			description: description,
			price: price,
			quantity: quantity,
			imageData: imageData
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

//Get specific product
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

//Edit product
app.post('/products/:productId', function(req, res) {
	console.log("POST /products/" + req.params.productId);

	if (!validBody(['name', 'description', {'price' : 'number'}, {'quantity' : 'number'}], req.body)) {
		res.status(400).json(buildJsonPayload("Faltam informações", null));
		return;
	}

	const id = req.params.productId;
	const name = req.body.name;
	const description = req.body.description;
	const price = Number(req.body.price);
	const quantity = Number(req.body.quantity);
	const imageData = req.body.imageData;

	if (ObjectId.isValid(id)) {
		const productId = ObjectId(id);

		if (name.length == 0) {
			res.status(400).json(buildJsonPayload("Nome do produto não informado", null));
		} else {
			const query = {_id : productId};
			let productObject = {
				name: name,
				description: description,
				price: price,
				quantity: quantity
			}
			if (imageData) {
				productObject.imageData = imageData;
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

//Delete product
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

//Buy products
app.post('/buy', function(req, res) {
	console.log("POST /buy");

	const cart = req.body.cart;

	if (typeof cart != 'undefined') {
		let validKeys = Object.keys(cart).filter(function(productId) {
			return ObjectId.isValid(productId);
		});
		if (validKeys.length > 0) {
			let quantityPromises = [];
			let unavailableProducts = false;

			validKeys.map(function(productId) {
				return {productId: productId, quantity: cart[productId]};
			}).forEach(function(productInfo) {
				const query = {_id : ObjectId(productInfo.productId)};
				let promise = new Promise(function(resolve, reject) {
					dbps.collection(databaseConstants.databaseProductsName).findOne(query, function(err, product) {
						if (err) {
							resolve();
						} else if (product.quantity < productInfo.quantity) {
							unavailableProducts = true;
							resolve();
						} else {
							const quantity = {
								quantity: -Number(productInfo.quantity),
								sold: +Number(productInfo.quantity)
							};
							dbps.collection(databaseConstants.databaseProductsName).findOneAndUpdate(query, {$inc : quantity}, function(err, response) {
								resolve();
							});
						}
					});
				});
			});

			Promise.all([quantityPromises]).then(function() {
				if (unavailableProducts) {
					res.status(200).json(buildJsonPayload("Compra finalizada! Porém alguns produtos estavam indisponiveis", null));
				} else {
					res.status(200).json(buildJsonPayload("Obrigado por finalizar a compra!", null));
				}
			});
		} else {
			res.status(400).json(buildJsonPayload("Produtos inválidos", null));
		}
	} else {
		res.status(400).json(buildJsonPayload("Faltam informafasfsações", null));
	}
});

//Scheduled Services
//All scheduled services
app.get('/scheduled_services', function(req, res) {
	console.log("GET /scheduled_services");

	const cursor = dbps.collection(databaseConstants.databaseScheduledServicesName).aggregate([{$lookup: {from: databaseConstants.databaseServiceTypesName,
																									      localField: "serviceTypeId",
																									      foreignField: "_id",
																									      as: "serviceType" }},
																							   {$lookup: {from: databaseConstants.databasePetsName,
																									      localField: "animalId",
																									      foreignField: "_id",
																									      as: "animal" }},
																							   {$lookup: {from: databaseConstants.databaseUsersName,
																									      localField: "animal.owner",
																									      foreignField: "user",
																									      as: "animalOwner" }}]);
	cursor.toArray(function(err, scheduledServices) {
		if (err) {
			res.status(404).json(buildJsonPayload("Algo inesperado aconteceu", null));
		} else {
			scheduledServices.forEach(function(scheduledService) {
				purifyScheduledService(scheduledService);
			});
			res.status(200).json(buildJsonPayload(null, scheduledServices));
		}
	});
});

app.post('/scheduled_services', function(req, res) {
	console.log("POST /scheduled_services");

	if (!validBody(['date', 'time', 'serviceTypeId', 'animalId', 'cardNumber'], req.body)) {
		res.status(400).json(buildJsonPayload("Faltam informações", null));
		return;
	}

	const cardNumber = req.body.cardNumber;
	if (cardNumber.length != 16 || !(new RegExp("[0-9]{16}")).test(cardNumber)) {
		res.status(400).json(buildJsonPayload("Cartão de crédito invalido", null));
		return;
	}

	if (ObjectId.isValid(req.body.serviceTypeId) && ObjectId.isValid(req.body.animalId)) {
		const date = req.body.date;
		const time = req.body.time;
		const serviceTypeId = ObjectId(req.body.serviceTypeId);
		const animalId = ObjectId(req.body.animalId);

		const scheduledServiceObject = {
			date: date,
			time: time,
			serviceTypeId: serviceTypeId,
			animalId: animalId
		}
		dbps.collection(databaseConstants.databaseScheduledServicesName).insertOne(scheduledServiceObject, function(err, response) {
			if (err) {
				if (err.code == 11000) {
					res.status(400).json(buildJsonPayload("Já existe outro serviço agendado nesta data", null));
				} else {
					res.status(400).json(buildJsonPayload("Algo inesperado aconteceu", null));
				}
			} else {
				res.status(200).json(buildJsonPayload("Serviço agendado com sucesso", null));
			}
		});
	} else if (!ObjectId.isValid(req.body.serviceTypeId)) {
		res.status(400).json(buildJsonPayload("Tipo de serviço não encontrado"));
	} else {
		res.status(400).json(buildJsonPayload("Animal não encontrado"));
	}
});

//Delete scheduled service
app.delete('/scheduled_services/:scheduledServiceId', function(req, res) {
	console.log("DELETE /scheduled_services/" + req.params.scheduledServiceId);

	if (ObjectId.isValid(req.params.scheduledServiceId)) {
		const scheduledServiceId = ObjectId(req.params.scheduledServiceId);

		const query = {_id : scheduledServiceId};
		dbps.collection(databaseConstants.databaseScheduledServicesName).deleteOne(query, function(err, result) {
			if (err || result.result.n == 0) {
				res.status(400).json(buildJsonPayload("Erro ao deletar serviço agendado", null));
			} else {
				res.status(200).json(buildJsonPayload("Serviço agendado deletado", null));
			}
		});
	} else {
		res.status(400).json(buildJsonPayload("Erro ao deletar serviço agendado", null));
	}
});

//Animal
//Get animal
app.get('/animals/:animalId', function(req, res) {
	console.log("GET /animals/" + req.params.animalId);

	if (ObjectId.isValid(req.params.animalId)) {
		const animalId = ObjectId(req.params.animalId);

		const animalQuery = {_id : animalId};
		const animalPromise = new Promise(function(resolve, reject) {
			dbps.collection(databaseConstants.databasePetsName).findOne(animalQuery, function(err, animal) {
				if (err) {
					reject();
				} else {
					purifyAnimal(animal);
					resolve(animal);
				}
			});
		});

		const scheduledServicesQuery = {animalId : animalId};
		const cursor = dbps.collection(databaseConstants.databaseScheduledServicesName).aggregate([
																							   {$match : scheduledServicesQuery},
																							   {$lookup: {from: databaseConstants.databaseServiceTypesName,
																								localField: "serviceTypeId",
																								foreignField: "_id",
																								as: "serviceType" }}]);
		let scheduledServicesPromise = new Promise(function(resolve, reject) {
			cursor.toArray(function(err, scheduledServices) {
				if (err) {
					reject();
				} else {
					scheduledServices.forEach(function(scheduledService) {
						purifyScheduledService(scheduledService);
					});
					resolve(scheduledServices);
				}
			});
		});

		Promise.all([animalPromise, scheduledServicesPromise]).then(function(values) {
			let animal = values[0];
			let scheduledServices = values[1].map(function(scheduledService) {
				return {name: scheduledService.serviceType.name,
						price: scheduledService.serviceType.price,
						date: scheduledService.date, 
						time: scheduledService.time};
			});
			animal.services = scheduledServices;
			res.status(200).json(buildJsonPayload(null, animal));
		}).catch(function() {
			res.status(400).json(buildJsonPayload("Algo inesperado aconteceu", null));
		});
	} else {
		res.status(400).json(buildJsonPayload("Animal não encontrado", null));
	}
});

//New animal
app.post('/animals', function(req, res) {
	console.log("POST /animals");

	if (!validBody(['name', 'species', {'age' : 'number'}, 'owner'], req.body)) {
		res.status(400).json(buildJsonPayload("Faltam informações", null));
		return;
	}

	const name = req.body.name;
	const species = req.body.species;
	const user = req.body.owner;
	const age = req.body.age;
	const imageData = req.body.imageData;

	if (name.length == 0) {
		res.status(400).json(buildJsonPayload("Nome do animal não informado", null));
	} else if (species.length == 0) {
		res.status(400).json(buildJsonPayload("Espécie não informada", null));
	} else {
		let animalObject = {
			name: name,
			species: species,
			age: age,
			imageData: imageData,
			owner: user
		}
		dbps.collection(databaseConstants.databasePetsName).insertOne(animalObject, function(err, response) {
			if (err) {
				if (err.code == 11000) {
					res.status(400).json(buildJsonPayload("Este animal já existe", null));
				} else {
					res.status(400).json(buildJsonPayload("Algo inesperado aconteceu", null));
				}
			} else {
				res.status(200).json(buildJsonPayload("Animal cadastrado com sucesso", null));
			}
		});
	}
});


//Delete animal
app.delete('/animals/:animalId', function(req, res) {
	console.log("DELETE /animals/" + req.params.animalId);

	if (ObjectId.isValid(req.params.animalId)) {
		const animalId = ObjectId(req.params.animalId);

		const animalQuery = {_id : animalId};
		let deleteAnimalPromise = new Promise(function(resolve, reject) {
			dbps.collection(databaseConstants.databasePetsName).deleteOne(animalQuery, function(err, result) {
				if (err || result.result.n == 0) {
					reject();
				} else {
					resolve();
				}
			});
		});

		deleteAnimalPromise.then(function() {
			const scheduledServicesQuery = {animalId : animalId};
			dbps.collection(databaseConstants.databaseScheduledServicesName).deleteMany(scheduledServicesQuery, function(err, result) {
				res.status(200).json(buildJsonPayload("Animal deletado", null));
			});
		}).catch(function(err) {
			res.status(400).json(buildJsonPayload("Erro ao deletar animal", null));
		});
	} else {
		res.status(400).json(buildJsonPayload("Erro ao deletar animal", null));
	}
});

//Get owner animals
app.get('/users/:user/animals', function(req, res) {
	console.log("GET /users/" + req.params.user + "/animals/");

	const user = req.params.user;
	const query = {owner : user};
	dbps.collection(databaseConstants.databasePetsName).find(query).toArray(function(err, result) {
		if (err) {
			res.status(400).json(buildJsonPayload("Algo inesperado aconteceu", null));
		} else {
			result.forEach(function(animal) {
				purifyAnimal(animal);
			});
			res.status(200).json(buildJsonPayload(null, result));
		}
	});
});