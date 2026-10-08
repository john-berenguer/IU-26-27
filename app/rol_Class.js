class rol extends Validations {
	constructor(esTest) {
		super();
		this.dom = new dom();
		this.access_functions = new ExternalAccess();

		this.columnasamostrar = ["id_rol", "rol_name", "rol_description"];
		this.nombreentidad = "rol";

		if (esTest == "test") {
		} else {
			//visualizar seccion tabla y botones
			document.getElementById("IU_manage_entity").style.display = "block";

			//crear el formulario vacio
			document.getElementById("IU_form").innerHTML =
				this.manual_form_creation();

			//invocar busqueda en back con el formulario vacio
			this.SEARCH();
		}
	}

    
	/**
	 * creates a variable with a form for a particular entity menu
	 * @returns a variable with the form definition
	 */
	manual_form_creation() {
		var form_content = `
			<form id='form_iu' action="http://193.147.87.202/procesaform.php" method="POST" enctype="multipart/form-data" onsubmit="if (typeof entidad.ADD_submit_rol() === 'object') {return false} else {return true};">

			<label class="id_rol">Id de Rol</label>
			<input type='text' id='id_rol' name='id_rol' onblur=" return entidad.ADD_id_rol_validation();"></input>
			<span id="span_error_id_rol"><a id="error_id_rol"></a></span>
			<br>
			
			<label class="rol_name">Nombre de Rol</label>
			<input type='text' id='rol_name' name='rol_name' onblur=" return entidad.ADD_rol_name_validation();"></input>
			<span id="span_error_rol_name" ><a id="error_rol_name"></a></span>
			<br>
			
			<label class="rol_description">Descripcion de Rol</label>
			<input type='text' id='rol_description' name='rol_description' onblur=" return entidad.ADD_rol_description_validation();"></input>
			<span id="span_error_rol_description" ><a id="rol_description"></a></span>
			<br>

			<input id="submit_button" type="submit" value="Submit">

		</form>
		`;
		return form_content;
	}

	/**********************************************************************************************
		fields validations for ADD
	***********************************************************************************************/

	/** 
		
		@return	{string} Error code of field value (fieldname_validationfunction_ko) or
		@return {bool} true due the field value is correct

	*/
	ADD_id_rol_validation() {
		if (!this.min_size("id_rol", 1)) {
			this.dom.mostrar_error_campo("id_rol", "id_rol_min_size_ko");
			return "id_rol_min_size_ko";
		}
		if (!this.max_size("id_rol", 11)) {
			this.dom.mostrar_error_campo("id_rol", "id_rol_max_size_ko");
			return "id_rol_max_size_ko";
		}
        if (!this.format("id_rol", "^[0-9]*$")) {
			this.dom.mostrar_error_campo(
				"id_rol",
				"id_rol_format_ko",
		    );
			return "id_rol_format_ko";
		}

		this.dom.mostrar_exito_campo("rol_id");
		return true;
	}

	ADD_rol_name_validation() {
		if (!this.min_size("rol_name", 5)) {
			this.dom.mostrar_error_campo(
				"rol_name",
				"rol_name_min_size_ko",
			);
			return "rol_name_min_size_ko";
		}
		if (!this.max_size("rol_name", 48)) {
			this.dom.mostrar_error_campo(
				"rol_name",
				"rol_name_max_size_ko",
			);
			return "rol_name_max_size_ko";
		}
		// allowed format aA to zZ letter
		if (!this.format("rol_name", "^[A-Za-z]*$")) {
			this.dom.mostrar_error_campo(
				"rol_name",
				"rol_name_format_ko",
			);
			return "rol_name_format_ko";
		}
		this.dom.mostrar_exito_campo("rol_name");
		return true;
	}

	ADD_rol_description_validation() {
		if (!this.min_size("rol_description", 5)) {
			this.dom.mostrar_error_campo(
				"rol_description",
				"rol_description_min_size_ko",
			);
			return "rol_description_min_size_ko";
		}
		if (!this.max_size("rol_description", 200)) {
			this.dom.mostrar_error_campo(
				"rol_description",
				"rol_description_max_size_ko",
			);
			return "rol_description_max_size_ko";
		}
		if (!this.format("rol_description", "^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\\s,.;:¿?¡!'\\-]+$")) {
			this.dom.mostrar_error_campo(
				"rol_description",
				"rol_description_format_ko",
			);
			return "rol_description_format_ko";
		}
		this.dom.mostrar_exito_campo("rol_description");
		return true;
	}

	ADD_submit_rol() {
		// object to store de fields validations
		var set_result = {};

		// store in key (id element) value (result of field validation method)
		set_result.id_rol = this.ADD_id_rol_validation();
		set_result.rol_name = this.ADD_rol_name_validation();
		set_result.rol_description = this.ADD_rol_description_validation();

		// calculate combination of all field validations
		let result =
			set_result.id_rol === true &&
			set_result.rol_name === true &&
			set_result.rol_description === true;

		// if boolean and true return true
		if (result === true) {
			return true;
		} // if not boolean or false return the object with id element as key and code error as value
		else {
			return set_result;
		}
	}

	/**********************************************************************************************
		fields validations for EDIT
	***********************************************************************************************/

	EDIT_id_rol_validation() {
		return this.ADD_id_rol_validation();
	}

	EDIT_rol_name_validation() {
		return this.ADD_rol_name_validation();
	}

	EDIT_rol_description_validation() {
		return this.ADD_rol_description_validation();
	}

	/**********************************************************************************************
		fields validations for SEARCH
	***********************************************************************************************/

	SEARCH_id_rol_validation() {

		return this.ADD_id_rol_validation();
	}

	SEARCH_rol_name_validation() {
		return this.ADD_rol_name_validation();
	}

	SEARCH_rol_description_validation() {
		return this.ADD_rol_description_validation();
	}

	/**********************************************************************************************
		forms creation
	***********************************************************************************************/

	createForm_EDIT(fila) {
		alert("crear formulario EDIT " + fila.id_rol);
	}

	createForm_DELETE(fila) {
		alert("crear formulario DELETE " + fila.id_rol);
	}

	createForm_SHOWCURRENT(fila) {
		alert("crear formulario DETALLE " + fila.id_rol);
	}

	createForm_ADD() {
		alert("crear formulario ADD");
	}

	createForm_SEARCH() {
		alert("crear formulario SEARCH");
	}

	/**********************************************************************************************
		data table
	***********************************************************************************************/

	/**
	 * Recibe la información a mostrar en columnas y el array de columnas a las cuales se modificara su contenido para mostrarsele al usuario
	 * Se le incluyen tres columnas mas a cada fila para poder tener un icono con la accion a realizar para esa fila y se le coloca un evento onclick
	 * para poder llamar a los metodos createForm_accion pasando como parametros de esos metodos la información de la fila de datos
	 *
	 * @param {Objeto} datos
	 * @param {Array} mostrarespecial
	 */
	crearTablaDatos(datos, mostrarespecial) {
		var misdatos = datos;
		/*
		recorrer todas las filas de datos y cada atributo para si tiene una funcion de transformación de valor modificarlo en el momento
		*/
		if (mostrarespecial.length > 0) {
			for (var i = 0; i < misdatos.length; i++) {
				for (var clave in misdatos[i]) {
					if (mostrarespecial.includes(clave)) {
						//misdatos[i][clave] = this.cambiarmostrarespecial(clave, misdatos[i][clave]);
					}
				}
			}
		}
		// proceso los datos de la tabla para incluir en cada fila los tres botones conectados a createForm_ACCION()
		for (var i = 0; i < misdatos.length; i++) {
			var linedit =
				`<img id='botonEDIT' src='./iconos/EDIT.png' onclick='entidad.createForm_EDIT(` +
				JSON.stringify(misdatos[i]) +
				`);'>`;
			var lindelete =
				`<img id='botonDELETE' src='./iconos/DELETE.png' onclick='entidad.createForm_DELETE(` +
				JSON.stringify(misdatos[i]) +
				`);'>`;
			var linshowcurrent =
				`<img id='botonSHOWCURRENT' src='./iconos/SHOWCURRENT.png' onclick='entidad.createForm_SHOWCURRENT(` +
				JSON.stringify(misdatos[i]) +
				`);'>`;
			misdatos[i]["EDIT"] = linedit;
			misdatos[i]["DELETE"] = lindelete;
			misdatos[i]["SHOWCURRENT"] = linshowcurrent;
		}

		//muestro datos en tabla
		this.dom.showData("IU_manage_table", misdatos);
		this.mostrarocultarcolumnas();
		this.crearSeleccionablecolumnas(this.columnasamostrar, this.atributos);
	}

	/**
	 * Redibuja el select en funcion del contenido de columnasamostrar
	 *
	 * @param {Array} columnasamostrar
	 * @param {Array} atributos
	 */
	crearSeleccionablecolumnas(columnasamostrar, atributos) {
		document.getElementById("seleccioncolumnas").innerHTML = "";

		for (let atributo of atributos) {
			var optionselect = document.createElement("option");
			optionselect.className = atributo;
			optionselect.innerHTML = atributo;
			var textofuncion =
				"entidad.modificarcolumnasamostrar('" + atributo + "');";
			optionselect.setAttribute("onclick", textofuncion);
			if (columnasamostrar.includes(atributo)) {
				optionselect.selected = true;
			}
			document.getElementById("seleccioncolumnas").append(optionselect);
		}
	}

	/**
	 * muestra o no las columnas de la tabla segun indique columnasamostrar
	 */
	mostrarocultarcolumnas() {
		var estadodisplay = "";
		// recorro todos los atributos de la tabla
		for (let columna of this.atributos) {
			// si el atributo esta en columnas a mostrar lo dejo como esta
			if (this.columnasamostrar.includes(columna)) {
				estadodisplay = "";
			}
			// si el atributo no esta en columnas a mostrar lo oculto
			else {
				estadodisplay = "none";
			}
			document.querySelector(
				"th[class='tabla-th-" + columna + "']",
			).style.display = estadodisplay;
			let arraytds = document.querySelectorAll(
				"td[class='tabla-td-" + columna + "']",
			);
			for (let i = 0; i < arraytds.length; i++) {
				arraytds[i].style.display = estadodisplay;
			}
		}
	}

	/**
	 * Modifica el array de columnas a mostrar al hacer click sobre el atributo en el select poniendolo como oculto o como visible
	 * @param {string} atributo
	 */
	modificarcolumnasamostrar(atributo) {
		if (this.columnasamostrar.includes(atributo)) {
			// borrar ese atributo
			this.columnasamostrar = this.columnasamostrar.filter(
				(columna) => columna != atributo,
			);
		} else {
			// añadir
			this.columnasamostrar.push(atributo);
		}

		this.mostrarocultarcolumnas();
		this.crearSeleccionablecolumnas(this.columnasamostrar, this.atributos);
	}

	/**********************************************************************************************
		back access
	***********************************************************************************************/

	/**
	 * el método realiza una petición de search al back pudiendo enviar un formulario con datos, enviando
	 * el nombre de la entidad del back y la acción a realizar sobre la misma.
	 * los datos respondidos se usan para indicar o bien que no hay datos o mostrandolos en una tabla.
	 */
	async SEARCH() {
		await this.access_functions
			.peticionBackGeneral("form_iu", this.nombreentidad, "SEARCH")
			.then((respuesta) => {
				//limpiar el formulario
				document.getElementById("IU_form").innerHTML =
					this.manual_form_creation();

				if (respuesta["code"] == "RECORDSET_DATOS") {
					this.datos = respuesta["resource"];
					this.atributos = Object.keys(this.datos[0]);
					//crear la tabla de datos de la entidad del back
					this.crearTablaDatos(this.datos, this.mostrarespecial);
				} else {
					document.getElementById("IU_manage_table").style.display =
						"block";
					document.getElementById("IU_manage_table").innerHTML =
						"No se han encontrado elementos que coincidan con la búsqueda";
					document.getElementById("IU_manage_table").className =
						"RECORDSET_VACIO";
				}
			});
	}
}
