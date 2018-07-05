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
		isAdmin: false
	}
];
const DadosProdutos = [
	{
		name: "Bolinha",
		description: "Ideal para seu cachorro!",
		price: 10.00,
		quantity: 50
	},
	{
		name: "Osso",
		description: "Cachorros gostam muito",
		price: 5.00,
		quantity: 20
	},
	{
		name: "Areia",
		description: "Para a higiene de seu gato",
		price: 20.00,
		quantity: 15
	}
];
const DadosTiposServicos = [
	{
		name: "Consulta",
		price: 150
	},
	{
		name: "Tosa",
		price: 50
	},
	{
		name: "Banho",
		price: 50
	},
	{
		name: "Banho e Tosa",
		price: 80
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
		imagePath: null,
		owner: "client"
	},
	{
		name: "Lua",
		species: "Gato",
		age: 2,
		imagePath: null,
		owner: "client"
	},
	{
		name: "Per",
		species: "Gato",
		age: 9,
		imagePath: null,
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