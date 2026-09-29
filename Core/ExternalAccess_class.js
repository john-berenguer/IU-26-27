class ExternalAccess {
	constructor() {}

	/**
	 * realiza una petición POST al back enviando los datos del formulario (si se indica),
	 * la entidad (controlador), la acción y los datos extra (si se indican)
	 *
	 * @param {string} formulario id del formulario cuyos datos se envían ('' para no enviar datos de formulario)
	 * @param {string} controlador nombre de la entidad en el back
	 * @param {string} action acción a realizar en el back (ADD, EDIT, DELETE, SEARCH...)
	 * @param {object} datosextra objeto clave/valor con datos adicionales a enviar
	 * @returns {Promise} promesa que se resuelve con la respuesta del back {ok, code, resource}
	 */
	peticionBackGeneral(formulario, controlador, action, datosextra = null) {
		var datos;

		if (formulario === "") {
			datos = new FormData();
		} else {
			var formulario = document.getElementById(formulario);
			datos = new FormData(formulario);
		}

		datos.append("controlador", controlador);
		datos.append("action", action);

		if (datosextra == null) {
		} else {
			for (var clave in datosextra) {
				datos.append(clave, datosextra[clave]);
			}
		}

		return new Promise(function (resolve) {
			$.ajax({
				type: "POST",
				url: "http://193.147.87.202/ET2/index.php",
				data: datos,
				processData: false,
				contentType: false,
			})
				.done((res) => {
					resolve(res);
				})
				.fail((res) => {
					alert("error : " + res.status);
				});
		});
	}
}
