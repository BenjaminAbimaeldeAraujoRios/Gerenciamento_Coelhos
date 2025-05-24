

const express = require("express");
const Database = require('./database');
const { rotas } = require("./controller/admin"); 

const app = express();


Database.conectar(
);


app.use(express.json());

rotas(app);

app.listen(3000, () => {
  console.log("Servidor ligado na porta 3000!");
});













