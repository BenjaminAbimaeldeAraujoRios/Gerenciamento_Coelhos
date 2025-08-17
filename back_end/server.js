
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
// Simple request logger for debugging
app.use((req, res, next) => {
  console.log('REQ', req.method, req.url);
  next();
});
// quick health endpoint
app.get('/health', (req, res) => res.json({ok: true}));
rotas(app);

app.listen(3000, () => {
  console.log("Servidor ligado na porta 3000!");
});













