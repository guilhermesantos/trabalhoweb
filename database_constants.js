const databaseName = "pet_shop";
const databaseUsersName = "users";
const databaseProductsName = "products";
const databaseServiceTypesName = "service_types";
const databaseScheduledServicesName = "scheduled_services";
const databasePetsName = "animals";
const DadosUsuarios = [
	{
		user: "admin",
		name: "Administrador",
		password: "admin",
		email: "admin@admin.com",
		phone: "(16) 9999-9999",
		city:"São Carlos",
		street: "Av. São Carlos",
		neighborhood: "",
		imageData: null,
		isAdmin: true
	},
	{
		user: "client",
		name: "John",
		password: "client",
		email: "john@client.com",
		phone: "(16) 1111-1111",
		city:"São Carlos",
		street: "Av. Francisco Pereira Lopes",
		neighborhood: "Arnold Schimidt",
		imageData: null,
		isAdmin: false
	}
];
const DadosProdutos = [
	{
		name: "Bolinha",
		description: "Ideal para seu cachorro!",
		price: 10.00,
		quantity: 50,
		imageData: null
	},
	{
		name: "Osso",
		description: "Cachorros gostam muito",
		price: 5.00,
		quantity: 20,
		imageData: null
	},
	{
		name: "Areia",
		description: "Para a higiene de seu gato",
		price: 20.00,
		quantity: 15,
		imageData: null
	}
];
const DadosTiposServicos = [
	{
		name: "Consulta",
		description: "consulta",
		price: 150,
		imageData: null
	},
	{
		name: "Tosa",
		description: "Tosa",
		price: 50,
		imageData: null
	},
	{
		name: "Banho",
		description: "Banho",
		price: 50,
		imageData: null
	},
	{
		name: "Banho e Tosa",
		description: "Kit banho e tosa",
		price: 80,
		imageData: null
	}
];
const DadosServicosAgendados = [
	{
		//serviceTypeId: "id",
		date: "2018-06-04",
		time: "14:30"
		//animalId: "id",
	},
	{
		//serviceTypeId: "id",
		date: "2019-01-02",
		time: "08:00"
		//animalId: "id",
	}
];
const DadosAnimais = [
	{
		name: "Billy",
		species: "Cachorro",
		age: 5,
		imageData: null,
		owner: "client"
	},
	{
		name: "Lua",
		species: "Gato",
		age: 2,
		imageData: null,
		owner: "client"
	},
	{
		name: "Per",
		species: "Gato",
		age: 9,
		imageData: null,
		owner: "client"
	}
];

module.exports = {
	databaseName: databaseName,
	databaseUsersName: databaseUsersName,
	databaseProductsName: databaseProductsName,
	databaseServiceTypesName: databaseServiceTypesName,
	databaseScheduledServicesName: databaseScheduledServicesName,
	databasePetsName: databasePetsName,
	DadosUsuarios: DadosUsuarios,
	DadosProdutos: DadosProdutos,
	DadosTiposServicos: DadosTiposServicos,
	DadosServicosAgendados: DadosServicosAgendados,
	DadosAnimais: DadosAnimais
};