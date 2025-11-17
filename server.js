// -----------------------------------------------------------------------------
//  IMPORTACIONES Y CONFIGURACIÓN INICIAL
// -----------------------------------------------------------------------------

// Importamos el framework 'express', que simplifica la creación de servidores HTTP
// y el manejo de rutas, middleware y peticiones.
const express = require("express");

// Creamos una instancia de la aplicación Express.
const app = express();

// Importamos el módulo nativo 'path' para gestionar rutas de archivos en el sistema.
// Es muy útil para construir rutas absolutas sin depender del sistema operativo.
const path = require("path");

// Definimos el puerto en el que escuchará el servidor.
const PORT = 3000;

// Librería para manejar fechas de forma cómoda y legible.
// dayjs es similar a moment.js, pero más liviana.
const dayjs = require("dayjs");
require("dayjs/locale/es"); // Cargamos el idioma español
dayjs.locale("es");         // Establecemos el idioma por defecto

// Librerías para cookies y sesiones.
// cookie-parser analiza las cookies recibidas en la cabecera HTTP.
// express-session permite mantener datos persistentes entre peticiones (sesiones).
const cookieParser = require("cookie-parser");
const session = require("express-session");

// -----------------------------------------------------------------------------
//  MIDDLEWARES GLOBALES
// -----------------------------------------------------------------------------

// Middleware: funciones que interceptan las peticiones antes de llegar a las rutas.
// Son el corazón de Express: transforman, validan o añaden información al 'req' o 'res'.

// 2.1 Servir archivos estáticos
// Esto hace que Express sirva automáticamente archivos desde la carpeta "public".
// Por ejemplo, al acceder a http://localhost:3000/style.css, buscará "public/style.css".
app.use(express.static(path.join(__dirname, "public")));

// 2.2 Motor de plantillas EJS
// EJS permite usar plantillas HTML dinámicas con variables (<%= %>).
// Aquí indicamos que las vistas se encuentran en la carpeta /views y usan extensión .ejs.
app.set("view engine", "ejs");

// 2.3 Procesar datos enviados por formularios (body-parser integrado)
// Permite acceder a los datos enviados por POST en req.body.
// extended:true → permite analizar estructuras anidadas (objeto dentro de objeto).
app.use(express.urlencoded({ extended: true }));

// 2.4 Middleware de cookies
app.use(cookieParser());

// 2.5 Middleware de sesión
// - secret: clave usada para firmar las cookies (proteger integridad de sesión).
// - resave: false → no guarda la sesión en cada petición si no ha cambiado.
// - saveUninitialized: false → no guarda sesiones vacías.
// - cookie: configuración del comportamiento de la cookie de sesión.
app.use(session({
    secret: "clave para sesiones",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,            // no accesible desde JS del cliente (seguridad)
        maxAge: 1000 * 60 * 30     // caduca a los 30 minutos de inactividad
    }
}));

