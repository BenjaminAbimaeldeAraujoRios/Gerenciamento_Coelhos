
const cookieParser = require('cookie-parser');
const express = require("express");
const Database = require('./database');
const { rotas } = require("./controller/admin"); 

const app = express();
app.use(cookieParser());

Database.conectar(
);


app.use(express.json());

app.use("/front_end", express.static("front_end"))
rotas(app);

app.listen(3000, () => {
  console.log("Servidor ligado na porta 3000!");
});













