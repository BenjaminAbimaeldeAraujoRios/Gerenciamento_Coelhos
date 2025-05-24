const { Usuario } = require("../model/UsuárioModel");

module.exports.rotas = function(app) {
    const UsuarioRota = new Usuario();//Instância da classe Usuario para usar as funções da mesma
 


    app.get('/usuario/:id', async (req, res) => {
        const usuarios = await UsuarioRota.selectUsuarios_por_id(req.params.id);
        res.json(usuarios);
    });

    app.get('/usuarios', async (req, res) => {
        const usuarios = await UsuarioRota.selectUsuarios();  
        res.json(usuarios);
    });

    app.post('/usuario', async (req, res) => {
        console.log(req.body);
        await UsuarioRota.insertUsuario(req.body);
        res.sendStatus(201);
    });

    app.patch('/usuario/:id', async (req, res) => {
        console.log(req.body);
        await UsuarioRota.updateUsuario(req.params.id, req.body);
        res.sendStatus(200);
    });

    app.delete('/usuario/:id', async (req, res) => {
        console.log(req.body);
        await UsuarioRota.excluirUsuario(req.params.id);
        res.sendStatus(204);
    });
};

