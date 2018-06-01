let horizontalMenu = {
	index: 
	`
	<li class="horizontal_menu_item" tab="bla" onclick="menuClick(this)">asda</li>

	`,
	client:
	`
		<li class="horizontal_menu_item" tab="agendarHorario" onclick="menuClick(this)">Agendar horário</li>
		<li class="horizontal_menu_item" tab="comprarProduto" onclick="menuClick(this)">Comprar produto</li>
		<li class="horizontal_menu_item" tab="editarRegistro" onclick="menuClick(this)">Editar registro</li>
		<li class="horizontal_menu_item" tab="gerenciarAnimais" onclick="menuClick(this)">Gerenciar animais</li>	
	`,
	admin:
	`
	`
};


let siteContent = {
 	logoutBox : 
 	`
	<p id="user_login_box">
		<span id="welcome_span">Seja bem vindo, user_name.<br/><a id="logout" href="#">Logout</a></span>
	</p>
	`,


	index: 
	`
		<h3 class="page_title">Página principal</h3>
		<p id="introductory_text">
			<span>Seja bem vindo. Para utilizar as funcionalidades e ter acesso ao dados do seu pet, entre abaixo no sistema.<br/>
			Se ainda não tiver um cadastro, clique <em>	aqui</em>
			</span>
		</p>
		
		<form id="login_form">
			<fieldset>
				<legend>Autenticação</legend>						
				<div class="form_row_container">
					<div class="label_container">
						<label for="login"><span>Login: </span></label>
					</div>
					<div class="field_container">
						<input id="login_username" type="text"></input>
					</div>
				</div>
				<div class="form_row_container">
					<div class="label_container">
						<label for="password"><span>Senha: </span></label>
					</div>
					<div class="field_container">
						<input id="login_password" type="password"></input>
					</div>							
				</div>
				<div class="form_row_container">
					<input type="submit" value="Enviar""></input>
				</div>
			</fieldset>
		</form>	
		`,

	client: {
		agendarHorario: 
		`
		<h3 class="page_title">Painel de controle</h3>
		<form id="agendar_horario_form">
			<h4 class="section_title">Agendamento de horário</h4>
			<div class="form_row_container">
				<div class="label_container">
					<label for="select_service"><span>Serviço: </span></label>
				</div>
				<div class="field_container">
					<select id="select_service">
						<option>Serviço 1</option>
						<option>Serviço 2</option>
						<option>Serviço 3</option>		
					</select>
				</div>
			</div>

			<div class="form_row_container">
				<div class="label_container">
					<label for="data"><span>Data:</span></label>
				</div>
				<div class="field_container">
					<input type="date"></input>
				</div>							
			</div>

			<div class="form_row_container">
				<div class="label_container">
					<label for><span>Horário:</span></label>
				</div>
				<div class="field_container">							
					<select id="select_time">
						<option value="14h30">14h30</option>
						<option value="15h00">15h00</option>
						<option value="15h30">15h30</option>
						<option value="16h00">16h00</option>
					</select>
				</div>
			</div>
			<div class="submit_container">
				<button type="submit">Enviar</button>
			</div>
		</form>

		`,
		comprarProduto:
		`
		<h3 class="page_title">Painel de controle</h3>

		<form id="comprar_produto_form">
			<h4 class="section_title">Comprar produto</h3>
			<div class="product_grid">
				<div class="product">
					<img src="casa_cachorro.jpeg" class="product_img"></img>
					<input type="button" value="Adicionar ao carrinho"></input>
				</div>
				<div class="product">
					<img src="caixa_transportadora.jpg" class="product_img"></img>
					<input type="button" value="Adicionar ao carrinho"></input>
				</div>
				<div class="product">
					<img src="pote_racao.jpg" class="product_img"></img>
					<input type="button" value="Adicionar ao carrinho"></input>
				</div>
				<div class="product">
					<img src="casa_cachorro.jpeg" class="product_img"></img>
					<input type="button" value="Adicionar ao carrinho"></input>
				</div>
				<div class="product">
					<img src="caixa_transportadora.jpg" class="product_img"></img>
					<input type="button" value="Adicionar ao carrinho"></input>
				</div>
				<div class="product">
					<img src="pote_racao.jpg" class="product_img"></img>
					<input type="button" value="Adicionar ao carrinho"></input>
				</div>
				<div class="product">
					<img src="casa_cachorro.jpeg" class="product_img"></img>
					<input type="button" value="Adicionar ao carrinho"></input>
				</div>
				<div class="product">
					<img src="caixa_transportadora.jpg" class="product_img"></img>
					<input type="button" value="Adicionar ao carrinho"></input>
				</div>
				<div class="product">
					<img src="pote_racao.jpg" class="product_img"></img>
					<input type="button" value="Adicionar ao carrinho"></input>
				</div>
				<div class="product">
					<img src="casa_cachorro.jpeg" class="product_img"></img>
					<input type="button" value="Adicionar ao carrinho"></input>
				</div>							
			</div>
		</form>		
		`,
		editarRegistro:
		`
		<h3 class="page_title">Painel de controle</h3>

		<form id="editar_registro_form">
			<h4 class="section_title">Editar registro</h3>
			<div class="form_row_container">
				<div class="label_container">
					<label for="register_address_phone"><span>Telefone: </span></label>
				</div>
				<div class="field_container">
					<input type="text" id="register_address_phone"></input>
				</div>
			</div>
			<div class="form_row_container">
				<div class="label_container">
					<label for="register_address_email"><span>Email: </span></label>
				</div>
				<div class="field_container">
					<input type="email" id="register_address_email"></input>
				</div>							
			</div>
			<div class="form_row_container">
				<div class="label_container">
					<label for="register_address_city"><span>Cidade: </span></label>
				</div>
				<div class="field_container">
					<input type="text" id="register_address_city"></input>
				</div>
			</div>
			<div class="form_row_container">
				<div class="label_container">
					<label for="register_address_neighborhood"><span>Bairro: </span></label>
				</div>
				<div class="field_container">
					<input type="text" id="register_address_neighborhood"></input>
				</div>							
			</div>
			<div class="form_row_container">
				<div class="label_container">
					<label for="register_address_street"><span>Rua: </span></label>
				</div>
				<div class="field_container">														
					<input type="text" id="register_address_street"></input>
				</div>
			</div>
			<div class="submit_container">
				<input type="submit" value="Enviar"></input>
			</div>
		</form>
		`,
		gerenciarAnimais:
		`
		<h3 class="page_title">Painel de controle</h3>

		<form id="gerenciar_animais_form">
			<h4 class="section_title">Gerenciar animais</h4>
			<div class="listed_animal_container">
				<div class="animal_info_container">
					<span>Nome do animal 1</span>
				</div>
				<div class="icons_container">
					<a onclick="animalDetailsClick();"><img src="icons/clipboard.png"></img></a>
					<a href="deleteAnimalClick()"><img src="icons/delete.png"></img></a>
				</div>
			</div>

			<div class="listed_animal_container">
				<div class="animal_info_container">
					<span>Nome do animal 2</span>
				</div>
				<div class="icons_container">
					<a href="animal_details.html"><img src="icons/clipboard.png"></img></a>
					<a href="#"><img src="icons/delete.png"></img></a>
				</div>
			</div>

			<div class="listed_animal_container">
				<div class="animal_info_container">
					<span>Nome do animal 3</span>
				</div>
				<div class="icons_container">
					<a href="animal_details.html"><img src="icons/clipboard.png"></img></a>
					<a href="#"><img src="icons/delete.png"></img></a>
				</div>
			</div>
		</form>
		<div id="cadastrar_animal_button">
			<input type="button" value="+Cadastrar animal" onClick="showAnimalRegisterForm()"></div>
		</div>
		`,
		gerenciarAnimaisRegisterVisible:
		`
		<h3 class="page_title">Painel de controle</h3>

		<form id="gerenciar_animais_form">
			<h4 class="section_title">Gerenciar animais</h4>
			<div class="listed_animal_container">
				<div class="animal_info_container">
					<span>Nome do animal 1</span>
				</div>
				<div class="icons_container">
					<a onclick="animalDetailsClick();"><img src="icons/clipboard.png"></img></a>
					<a href="deleteAnimalClick()"><img src="icons/delete.png"></img></a>
				</div>
			</div>

			<div class="listed_animal_container">
				<div class="animal_info_container">
					<span>Nome do animal 2</span>
				</div>
				<div class="icons_container">
					<a href="animal_details.html"><img src="icons/clipboard.png"></img></a>
					<a href="#"><img src="icons/delete.png"></img></a>
				</div>
			</div>

			<div class="listed_animal_container">
				<div class="animal_info_container">
					<span>Nome do animal 3</span>
				</div>
				<div class="icons_container">
					<a href="animal_details.html"><img src="icons/clipboard.png"></img></a>
					<a href="#"><img src="icons/delete.png"></img></a>
				</div>
			</div>
		</form>
		<div id="cadastrar_animal_button">
			<input type="button" value="+Cadastrar animal" onClick="showAnimalRegisterForm()"></div>
		</div>

		<form id="animal_register_form">
			<div class="label_container">
				<label for="animal_name_field"><span>Nome: </span></label>
			</div>					
			<div class="field_container">
				<input type="text" id="animal_name_field"></input>
			</div>
			
			<div class="label_container">
				<label for="animal_race_field"><span>Raça: </span></label>
			</div>
			<div class="field_container">
				<input type="text" id="animal_race_field"></input>
			</div>

			<div class="submit_container">
				<input type="submit" value="Enviar" onClick="hideAnimalRegisterForm()"></input>
			</div>
		</form>
		`,
		visualizarAnimal : 
		`
		<div class="animal_picture_container">
			<img class="animal_picture slides" src="raccoon.jpg" ></img>
		</div>	


		<p id="animal_info_text_container">
			<span>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
			</span>
		</p>

		<div class="services_container">
			<table class="service_table">
				<tr class="service_table_row">
					<td class="service_table_data">Serviço 1</td>
					<td>$50.00</td>
				</tr>
				<tr class="service_table_row">
					<td class="service_table_data">Serviço 2</td>
					<td>$50.00</td>
				</tr>
				<tr class="service_table_row">
					<td class="service_table_data">Serviço 3</td>
					<td>$50.00</td>
				</tr>
				<tr class="service_table_row">
					<td class="service_table_data">Serviço 4</td>
					<td>$50.00</td>
				</tr>
				<tr class="service_table_row">
					<td class="service_table_data">Serviço 5</td>
					<td>$50.00</td>
				</tr>							
				<tr class="service_table_row">
					<td class="service_table_data">Total </td>
					<td>$250.00</td>
				</tr>							
			</table>

		`,
	}

}