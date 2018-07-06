let horizontalMenu = {
	index: 
	`
	`,
	client:
	`
		<li class="horizontal_menu_item" tab="gerenciarAnimais" onclick="menuClick(this)">Gerenciar animais</li>
		<li class="horizontal_menu_item" tab="agendarHorario" onclick="menuClick(this)">Agendar horário</li>
		<li class="horizontal_menu_item" tab="comprarProduto" onclick="menuClick(this)">Comprar produto</li>
		<li class="horizontal_menu_item" tab="carrinho" onclick="menuClick(this)">Carrinho</li>
		<li class="horizontal_menu_item" tab="editarRegistro" onclick="menuClick(this)">Editar registro</li>	
	`,
	admin:
	`
		<li class="horizontal_menu_item" tab="novosCadastros" onclick="adminMenuClick(this)">Cadastros</li>
		<li class="horizontal_menu_item" tab="servicosAgendados" onclick="adminMenuClick(this)">Serviços Agendados</li>
		<li class="horizontal_menu_item" tab="controleDeEstoque" onclick="adminMenuClick(this)">Controle de Estoque</li>
		<li class="horizontal_menu_item" tab="ganhos" onclick="adminMenuClick(this)">Ganhos</li>
		<li class="horizontal_menu_item" tab="editarRegistro" onclick="menuClick(this)">Editar registro</li>
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
		</span>
	</p>
	
	<form id="login_form">
		<fieldset>
			<legend>Autenticação</legend>						
			<div class="form_row_container">
				<div class="label_container">
					<label for="login_username"><span>Login: </span></label>
				</div>
				<div class="field_container">
					<input id="login_username" type="text">
				</div>
			</div>
			<div class="form_row_container">
				<div class="label_container">
					<label for="login_password"><span>Senha: </span></label>
				</div>
				<div class="field_container">
					<input id="login_password" type="password">
				</div>							
			</div>
			<div class="form_row_container">
				<input type="submit" value="Enviar">
			</div>
		</fieldset>
	</form>	
	`,

	admin: {
		novosCadastros:
		`
		<h3 class="page_title">Painel de controle</h3>
		<h4 class="section_title">Cadastros</h4>

		<button id="new_user_button" type="button" style="width: 18%;">Cadastrar Usuário</button>
		<button id="new_product_button" type="button" style="width: 18%;">Cadastrar Produto</button>
		<button id="new_service_button" type="button" style="width: 18%;">Cadastrar Serviço</button>

		<form id="new_user_form">
			<div class="form_row_container">
				<div class="label_container">
					<label for="register_username"><span>Usuário: </span></label>
				</div>
				<div class="field_container">
					<input type="text" id="register_username">
				</div>
			</div>
			<div class="form_row_container">
				<div class="label_container">
					<label for="register_name"><span>Nome: </span></label>
				</div>
				<div class="field_container">
					<input type="text" id="register_name" autocomplete="name">
				</div>
			</div>
			<div class="form_row_container">
				<div class="label_container">
					<label for="register_address_phone"><span>Telefone: </span></label>
				</div>
				<div class="field_container">
					<input type="text" id="register_address_phone" autocomplete="tel">
				</div>
			</div>
			<div class="form_row_container">
				<div class="label_container">
					<label for="register_address_email"><span>Email: </span></label>
				</div>
				<div class="field_container">
					<input type="email" id="register_address_email" autocomplete="email">
				</div>							
			</div>
			<div class="form_row_container">
				<div class="label_container">
					<label for="register_address_city"><span>Cidade: </span></label>
				</div>
				<div class="field_container">
					<input type="text" id="register_address_city" autocomplete="address-level2">
				</div>
			</div>
			<div class="form_row_container">
				<div class="label_container">
					<label for="register_address_neighborhood"><span>Bairro: </span></label>
				</div>
				<div class="field_container">
					<input type="text" id="register_address_neighborhood">
				</div>							
			</div>
			<div class="form_row_container">
				<div class="label_container">
					<label for="register_address_street"><span>Rua: </span></label>
				</div>
				<div class="field_container">														
					<input type="text" id="register_address_street" autocomplete="address-line1">
				</div>
			</div>
			<div class="form_row_container">
				<div class="label_container">
					<label for="register_password"><span>Senha: </span></label>
				</div>
				<div class="field_container">														
					<input type="password" id="register_password">
				</div>
			</div>
			<div class="form_row_container">
				<div class="label_container">
					<label for="register_repeat_password"><span>Repetir senha: </span></label>
				</div>
				<div class="field_container">														
					<input type="password" id="register_repeat_password">
				</div>
			</div>
			<div class="form_row_container">
				<div class="label_container">
					<label for="register_image"><span>Foto: </span></label>
				</div>
				<div class="field_container">														
					<input type="file" id="register_image" accept="image/png, image/jpeg"/>
				</div>
			</div>
			<div class="form_row_container">
				<div class="label_container">
					<label for="register_is_admin"><span>Administrador: </span></label>
				</div>
				<div class="field_container">														
					<input type="checkbox" id="register_is_admin">
				</div>
			</div>
			<div class="submit_container">
				<input type="submit" value="Enviar">
			</div>
		</form>

		<form id="new_product_form">
			<div class="form_row_container">
				<div class="label_container">
					<label for="register_product_name"><span>Nome: </span></label>
				</div>
				<div class="field_container">														
					<input type="text" id="register_product_name">
				</div>
			</div>
			<div class="form_row_container">
				<div class="label_container">
					<label for="register_product_description"><span>Descrição: </span></label>
				</div>
				<div class="field_container">														
					<input type="text" id="register_product_description">
				</div>
			</div>
			<div class="form_row_container">
				<div class="label_container">
					<label for="register_product_price"><span>Preço: </span></label>
				</div>
				<div class="field_container">														
					<input type="number" id="register_product_price" min="0" step="0.01">
				</div>
			</div>
			<div class="form_row_container">
				<div class="label_container">
					<label for="register_product_quantity"><span>Quantidade: </span></label>
				</div>
				<div class="field_container">														
					<input type="number" id="register_product_quantity" min="0" step="1">
				</div>
			</div>
			<div class="form_row_container">
				<div class="label_container">
					<label for="register_product_image"><span>Foto: </span></label>
				</div>
				<div class="field_container">														
					<input type="file" id="register_product_image" accept="image/png, image/jpeg"/>
				</div>
			</div>
			<div class="submit_container">
				<input type="submit" value="Salvar">
			</div>
		</form>

		<form id="new_service_form">
			<div class="form_row_container">
				<div class="label_container">
					<label for="register_service_name"><span>Nome: </span></label>
				</div>
				<div class="field_container">														
					<input type="text" id="register_service_name">
				</div>
			</div>
			<div class="form_row_container">
				<div class="label_container">
					<label for="register_service_description"><span>Descrição: </span></label>
				</div>
				<div class="field_container">														
					<input type="text" id="register_service_description">
				</div>
			</div>
			<div class="form_row_container">
				<div class="label_container">
					<label for="register_service_price"><span>Preço: </span></label>
				</div>
				<div class="field_container">													
					<input type="number" id="register_service_price" min="0" step="0.01">
				</div>
			</div>
			<div class="form_row_container">
				<div class="label_container">
					<label for="register_service_image"><span>Foto: </span></label>
				</div>
				<div class="field_container">														
					<input type="file" id="register_service_image" accept="image/png, image/jpeg"/>
				</div>
			</div>
			<div class="submit_container">
				<input type="submit" value="Enviar">
			</div>
		</form>
		`,
		servicosAgendados:
		`
		<h3 class="page_title">Painel de controle</h3>
		<h4 class="section_title">Serviços Agendados</h4>
		<div>
			<label>Filtrar por:</label>
		</div>
		<div id="filter_div" style="margin-bottom: 16px;">
			<select id="service_type_select">
				<option value="">Tipo de serviço</option>
			</select>
			<select id="animal_select">
				<option value="">Animal</option>
			</select>
			<select id="user_select">
				<option value="">Dono</option>
			</select>
		</div>
		<div class="services_container">
			<table id="service_table" class="service_table">
			</table>
		</div>
		`,
		controleDeEstoque:
		`
		<h3 class="page_title">Painel de controle</h3>
		<h4 class="section_title">Controle de Estoque</h4>
		<div>
			<label>Ordenar por:</label>
		</div>
		<div id="sort_div" style="margin-bottom: 16px;">
			<select id="sort_by_select">
				<option value="nome">Nome</option>
				<option value="preco">Preço</option>
				<option value="quantidade">Quantidade</option>
				<option value="vendidos">Vendidos</option>
			</select>
			<select id="sort_order_select">
				<option value="crescente">Crescente</option>
				<option value="decrescente">Decrescente</option>
			</select>
		</div>
		<div class="services_container">
			<table id="product_table" class="service_table">
			</table>
		</div>
		`,
		editarProduto:
		`
		<h3 class="page_title">Painel de controle</h3>
		<h4 class="section_title">Editar Produto</h4>
		<img id="edit_product_image" src="assets/no_image.png" height="200px">
		<form id="edit_product_form">
			<div class="form_row_container">
				<div class="label_container">
					<label for="edit_product_name"><span>Nome: </span></label>
				</div>
				<div class="field_container">														
					<input type="text" id="edit_product_name">
				</div>
			</div>
			<div class="form_row_container">
				<div class="label_container">
					<label for="edit_product_description"><span>Descrição: </span></label>
				</div>
				<div class="field_container">														
					<input type="text" id="edit_product_description">
				</div>
			</div>
			<div class="form_row_container">
				<div class="label_container">
					<label><span>Preço: </span></label>
				</div>
				<div class="field_container">														
					<input id="edit_product_price" type="number" min="0" step="0.01">
				</div>
			</div>
			<div class="form_row_container">
				<div class="label_container">
					<label for="edit_product_quantity"><span>Quantidade: </span></label>
				</div>
				<div class="field_container">														
					<input id="edit_product_quantity" type="number" min="0" step="1">
				</div>
			</div>
			<div class="label_container">
                <label for="edit_product_image_input"><span>Foto: </span></label>
            </div>
            <div class="field_container">
                <input type="file" id="edit_product_image_input" accept="image/png, image/jpeg"/>
            </div>
			<div class="submit_container">
				<input type="submit" value="Salvar">
			</div>
		</form>
		`,
		gains:
		`
		<h3 class="page_title">Painel de controle</h3>
		<h4 class="section_title">Ganhos</h4>
		<h5 id="total_gains_header" class="section_title">Total: </h5>
		<div>
			<label>Ordenar por:</label>
		</div>
		<div id="sort_div" style="margin-bottom: 16px;">
			<select id="sort_by_select">
				<option value="nome">Nome</option>
				<option value="preco">Preço</option>
				<option value="vendidos">Vendidos</option>
			</select>
			<select id="sort_order_select">
				<option value="crescente">Crescente</option>
				<option value="decrescente">Decrescente</option>
			</select>
		</div>
		<div class="services_container">
			<table id="table" class="service_table">
			</table>
		</div>
		`
	},

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
					</select>
				</div>
			</div>

			<div class="form_row_container">
				<div class="label_container">
					<label for="select_animal"><span>Animal: </span></label>
				</div>
				<div class="field_container">
					<select id="select_animal">
					</select>
				</div>
			</div>

			<div class="form_row_container">
				<div class="label_container">
					<label for="date_input"><span>Data:</span></label>
				</div>
				<div class="field_container">
					<input id="date_input" type="date">
				</div>							
			</div>

			<div class="form_row_container">
				<div class="label_container">
					<label for="select_time"><span>Horário:</span></label>
				</div>
				<div class="field_container">							
					<select id="select_time">
						<option value="09:00">09:00</option>
						<option value="09:30">09:30</option>
						<option value="10:00">10:00</option>
						<option value="10:30">10:30</option>
						<option value="11:00">11:00</option>
						<option value="11:30">11:30</option>
						<option value="12:00">12:00</option>
						<option value="12:30">12:30</option>
						<option value="13:00">13:00</option>
						<option value="13:30">13:30</option>
						<option value="14:00">14:00</option>
						<option value="14:30">14:30</option>
						<option value="15:00">15:00</option>
						<option value="15:30">15:30</option>
						<option value="16:00">16:00</option>
						<option value="16:30">16:30</option>
						<option value="17:00">17:00</option>
						<option value="17:30">17:30</option>
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
		<h3 class="page_title">Loja</h3>
		<h4 class="section_title">Comprar Produto</h4>
		<div>
			<label>Ordenar por:</label>
		</div>
		<div id="sort_div" style="margin-bottom: 16px;">
			<select id="sort_by_select">
				<option value="nome">Nome</option>
				<option value="preco">Preço</option>
			</select>
			<select id="sort_order_select">
				<option value="crescente">Crescente</option>
				<option value="decrescente">Decrescente</option>
			</select>
		</div>
		<div class="services_container">
			<table id="product_table" class="service_table">
			</table>
		</div>
		`,
		carrinho:
		`
		<h3 class="page_title">Loja</h3>
		<h4 class="section_title">Carrinho</h4>
		<div>
			<label>Ordenar por:</label>
		</div>
		<div id="sort_div" style="margin-bottom: 16px;">
			<select id="sort_by_select">
				<option value="nome">Nome</option>
				<option value="quantidade">Quantidade</option>
				<option value="preco">Preço</option>
				<option value="precoTotal">Preço Total</option>
			</select>
			<select id="sort_order_select">
				<option value="crescente">Crescente</option>
				<option value="decrescente">Decrescente</option>
			</select>
		</div>
		<div class="services_container">
			<table id="cart_table" class="service_table" style="float: none;">
			</table>
		</div>
		<button id="buy_button" class="buy_button">Finalizar Compra</button>
		<button id="clear_cart_button" class="buy_button">Limpar Carrinho</button>
		`,
		detalhesProduto:
		`
		<h3 class="page_title">Loja</h3>
		<h4 id="product_name_header" class="section_title"></h4>
		<img id="product_image" src="assets/no_image.png" height="200px">
		<div id="description_div"></div>
		<div>
			<div class="form_row_container">
				<div class="label_container">
					<label>Preço: </label>
				</div>
				<div class="field_container">
					<div id="price_div"></div>
				</div>
			</div>
		</div>
		<form id="buy_form">
			<div class="form_row_container">
				<div class="label_container">
					<label for="product_quantity"><span>Quantidade: </span></label>
				</div>
				<div class="field_container">
					<input type="number" id="product_quantity" min="0" step="1" value="0">
				</div>
			</div>
			<div class="submit_container">
				<input type="submit" class="buy_button" value="Adicionar ao Carrinho">
			</div>
		</form>
		`,
		editarRegistro:
		`
		<h3 class="page_title">Painel de controle</h3>

		<form id="editar_registro_form">
			<h4 class="section_title">Editar registro</h4>
			<div class="form_row_container">
				<div class="label_container">
					<label for="register_name"><span>Nome: </span></label>
				</div>
				<div class="field_container">
					<input type="text" id="register_name" autocomplete="name">
				</div>
			</div>
			<div class="form_row_container">
				<div class="label_container">
					<label for="register_address_phone"><span>Telefone: </span></label>
				</div>
				<div class="field_container">
					<input type="text" id="register_address_phone" autocomplete="tel">
				</div>
			</div>
			<div class="form_row_container">
				<div class="label_container">
					<label for="register_address_email"><span>Email: </span></label>
				</div>
				<div class="field_container">
					<input type="email" id="register_address_email" autocomplete="email">
				</div>							
			</div>
			<div class="form_row_container">
				<div class="label_container">
					<label for="register_address_city"><span>Cidade: </span></label>
				</div>
				<div class="field_container">
					<input type="text" id="register_address_city" autocomplete="address-level2">
				</div>
			</div>
			<div class="form_row_container">
				<div class="label_container">
					<label for="register_address_neighborhood"><span>Bairro: </span></label>
				</div>
				<div class="field_container">
					<input type="text" id="register_address_neighborhood">
				</div>							
			</div>
			<div class="form_row_container">
				<div class="label_container">
					<label for="register_address_street"><span>Rua: </span></label>
				</div>
				<div class="field_container">														
					<input type="text" id="register_address_street" autocomplete="address-line1">
				</div>
			</div>
			<div class="form_row_container">
				<div class="label_container">
					<label for="register_password"><span>Nova senha: </span></label>
				</div>
				<div class="field_container">														
					<input type="password" id="register_password">
				</div>
			</div>
			<div class="form_row_container">
				<div class="label_container">
					<label for="register_repeat_password"><span>Repetir senha: </span></label>
				</div>
				<div class="field_container">														
					<input type="password" id="register_repeat_password">
				</div>
			</div>
			<div class="submit_container">
				<input type="submit" value="Enviar">
			</div>
		</form>
		`,
		gerenciarAnimais:
		`
		<h3 class="page_title">Painel de controle</h3>

		<img id="animal_image">

		<form id="gerenciar_animais_form">
			<h4 class="section_title">Gerenciar animais</h4>
			<div id="gerenciar_animais_list"></div>
		</form>
		<div id="cadastrar_animal_button">
			<input type="button" value="+Cadastrar animal" onClick="showAnimalRegisterForm()">
		</div>
		<form id="animal_register_form">
            <div class="label_container">
                <label for="animal_name_field"><span>Nome: </span></label>
            </div>                    
            <div class="field_container">
                <input type="text" id="animal_name_field">
            </div>
            
            <div class="label_container">
                <label for="animal_race_field"><span>Raça: </span></label>
            </div>
            <div class="field_container">
                <input type="text" id="animal_race_field">
            </div>

            <div class="label_container">
                <label for="animal_age_field"><span>Idade: </span></label>
            </div>
            <div class="field_container">
                <input type="number" min="0" step="1" id="animal_age_field">
            </div>

            <div class="label_container">
                <label for="animal_image_field"><span>Foto: </span></label>
            </div>
            <div class="field_container">
                <input type="file" id="animal_image_field" accept="image/png, image/jpeg"/>
            </div>

            <div class="submit_container">
                <input id="register_animal_input" type="submit" value="Enviar">
            </div>
        </form>
		`,
		visualizarAnimal : 
		`
		<h3 class="page_title">Painel de controle</h3>

		<h4 id="animal_name_title"></h4>
		<img id="animal_image" src="assets/no_image.png" height="200px">
		<h5 id="animal_race_title">Espécie: </h5>
		<h5 id="animal_age_title">Idade: </h5>
		<h5>Serviços: </h5>

		<div class="services_container">
			<table id="service_table" class="service_table">
			</table>
		</div>
		`
	}
}