const express = require("express");

const app = express();

const path = require("path");

const PORT = 3000;

const dayjs = require("dayjs");
require("dayjs/locale/es"); 
dayjs.locale("es");         

const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

//FORMULARIO
//RUTA GET
app.get("/form", (req, res) => {
  res.render("form", {
    name: "",
    email:"",
    options: "",
    type: [],
    message: " ",
    errores: []
  });
});

//RUTA POST 
app.post("/form", (req, res) => {
  console.log(req.body);
  const { name, email, options, message } = req.body;
  let type = req.body.type || [];

  if(!Array.isArray(type)) {type = [type];} 

  let errores = [];

  if (!type || !type.length) {
    errores.push("Debe elegir un complemento");
  }
  
  if (!name || name.trim().length < 3) {
    errores.push("El nombre es obligatorio y debe tener al menos 3 caracteres.");
  }

  if(!message || message.trim().length < 10) {
    errores.push("El mensaje es obligatorio y debe tener al menos 10 caracteres.");
  }

  if (errores.length) { 
    return res 
    .status(400)
    .render("form", {name, email, options, type, message, errores}); 
  }

  res.render("resultado", {
    name, 
    email,
    options,
    type,
    message
  } );

});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en: http://localhost:${PORT}`);
});
