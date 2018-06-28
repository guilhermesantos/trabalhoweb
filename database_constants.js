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