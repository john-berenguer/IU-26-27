/**
 * Uso: node empaquetar.js
 */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ENTREGA = "1"
const GRUPO = "IU262722"

const CARPETA_ENTREGA = "ET" + ENTREGA + "_" + GRUPO;
const CARPETA_TESTS = "app";

const raiz = __dirname;
const destino = path.join(raiz, CARPETA_ENTREGA);
const origen = path.join(raiz, CARPETA_TESTS);

// copiar todos los <entidad>_tests.js de app/ a la carpeta de entrega
const tests = fs.readdirSync(origen).filter((f) => f.endsWith("_tests.js"));
for (const fichero of tests) {
	fs.copyFileSync(path.join(origen, fichero), path.join(destino, fichero));
	console.log("copiado " + CARPETA_TESTS + "/" + fichero);
}

// buscar el ejecutable de WinRAR para crear el .rar
const posiblesRar = [
	"C:\\Program Files\\WinRAR\\Rar.exe",
	"C:\\Program Files (x86)\\WinRAR\\Rar.exe",
];
const rar = posiblesRar.find((ruta) => fs.existsSync(ruta));
const ficheroRar = path.join(raiz, CARPETA_ENTREGA + ".rar");

if (rar) {
	// borro el rar anterior para que no queden ficheros antiguos dentro
	fs.rmSync(ficheroRar, { force: true });
	execFileSync(rar, ["a", "-r", ficheroRar, CARPETA_ENTREGA], {
		cwd: raiz,
		stdio: "inherit",
	});
	console.log("creado " + CARPETA_ENTREGA + ".rar");
} else {
	console.log(
		"WinRAR no encontrado: comprime la carpeta " +
			CARPETA_ENTREGA +
			" a mano en formato RAR con el nombre " +
			CARPETA_ENTREGA +
			".rar",
	);
}
