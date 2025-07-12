const { Usuario } = require("../model/UsuárioModel");
const{Professor}=require("../model/ProfessorModel");
const{Alunos}=require("../model/AlunoModel");
const{CoelhoModel}=require("../model/CoelhoModel");
const{Cruzamento}=require("../model/CruzamentoModel");
const {Matriz}= require('../model/MatrizModel');
const {Reprodutor} = require('../model/ReprodutorModel');


module.exports.rotas = function(app) {
    const UsuarioRota = new Usuario();//Instância a classe Usuario para usar as funções da mesma
    const ProfessorRota=new Professor();
    const AlunoRota=new Alunos();
    const CoelhosRota=new CoelhoModel();
   const MatrizRota=new Matriz();
   const CruzamentoRota=new Cruzamento();
   const ReprodutorRota= new Reprodutor();



//Usuário
    app.get('/usuario/:id', async (req, res) => {
        const usuarios = await UsuarioRota.selectUsuarios_por_id(req.params.id);
        res.json(usuarios);
    });

    app.get('/usuarios', async (req, res) => {
        const usuarios = await UsuarioRota.selectUsuarios();  
        res.json(usuarios);
    });
 app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).send("Email e senha são obrigatórios.");
    }

    const usuario = await UsuarioRota.login(email);

    if (!usuario) {
        return res.status(404).send("Usuário não encontrado.");
    }

   
    const resultado = await UsuarioRota.criarHash(senha, usuario.tempero);

  console.log(resultado.hash);
  console.log(usuario.senha);

    if (resultado.hash !== usuario.senha) {
        return res.status(401).send("Senha incorreta.");
    }


    res.status(200).json({ mensagem: "Login realizado com sucesso", usuario });
});
app.post('/alterarSenha', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).send("Email e senha são obrigatórios.");
    }

    const usuario = await UsuarioRota.login(email);

    if (!usuario) {
        return res.status(404).send("Usuário não encontrado.");
    }

    console.log("Senha digitada"+senha);
    const resultado = await UsuarioRota.criarHash(senha);
     console.log(usuario.id_usuario);
    console.log(resultado.salt);
    console.log(resultado.hash);
    const nova_senha =await UsuarioRota.alterar_senha_tempero(resultado.hash,resultado.salt,usuario.id_usuario);
    if(!nova_senha){
     return res.status(404).send("Erro na alteração de senha.");
    }

    res.status(200).json({ mensagem: "Alteração de senha realizada com sucesso!!", usuario });
});



    app.post('/usuario',async (req, res) => {
         const { nome_usuario, email, senha } = req.body;
        if(!req.body.nome_usuario){
             return res.status(400).send("Faltou o nome!");
        }
         if(!req.body.email
            || !/[a-z]+@[a-z\.]+\.com/.test(email)
            || req.body.email?.length > 300)
        return res.status(400).send("Faltou o email!!");

    if(!req.body.senha || req.body.senha?.length < 8)
        return res.status(400).send("Faltou a senha, ou ta curta. Mínimo de 8 caracteres");

     const resultado =   await UsuarioRota.criarHash(senha);
    const novoUsuario = {
        nome_usuario,
        email,
        senha: resultado.hash,
        tempero: resultado.salt
    };
    
        
    
     const usuario=await UsuarioRota.insertUsuario(novoUsuario);
        res.status(201).json(usuario);
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
  
///Coelho
app.post('/coelho',async (require,response)=>{
    
    await CoelhosRota.insertCoelho(require.body);
    response.sendStatus(201);
});
app.get('/coelhos',async (require,response)=>{
    const coelhos=await CoelhosRota.selectCoelhos();
    response.json(coelhos);
});
app.get('/coelho/:id',async (require,response)=>{
    const coelho=await CoelhosRota.selectCoelhos_por_id(require.params.id);
    response.json(coelho);
});
app.delete('/coelho/:id',async (require,response)=>{
  
    await CoelhosRota.excluirCoelho(require.params.id);
    response.sendStatus(204);
});
app.patch('/coelho/:id',async (require,response)=>{
   
    await CoelhosRota.updateCoelho(require.params.id,require.body);
    response.sendStatus(200);
});
//Cruzamento
app.post('/cruzamento',async (require,response)=>{
    
    await CruzamentoRota.adcionarCruzamento(require.body);
    response.sendStatus(201);
});
app.delete('/cruzamento/:id',async (require,response)=>{
  
    await CruzamentoRota.excluirCruzamento(require.params.id);
    response.sendStatus(204);
});
app.get('/cruzamento',async (require,response)=>{
    const cruzamento=await CruzamentoRota.selectCruzamento();
    response.json(cruzamento);
});
app.get('/cruzamento/:id',async (require,response)=>{
    const cruzamento=await CruzamentoRota.selectCruzamento_por_id(require.params.id);
    response.json(cruzamento);
});
app.patch('/cruzamento/:id', async (require, response) => {
    
    await CruzamentoRota.updateCruzamento(require.body, require.params.id);
    response.sendStatus(200);
});
//Matriz
    app.post('/matriz', async (req, res) => {
        await Matriz.adicionarMatriz(req.body);
        res.sendStatus(201);
    });

    app.get('/matriz', async (req, res) => {
        const matrizes = await Matriz.listarMatrizes();
        res.json(matrizes);
    });

    app.delete('/matriz/:id', async (req, res) => {
        await Matriz.excluirMatriz(req.params.id);
        res.sendStatus(204);
    });
//Reprodutor
    app.post('/reprodutor', async (req, res) => {
        await Reprodutor.adicionarReprodutor(req.body);
        res.sendStatus(201);
    });

    app.get('/reprodutor', async (req, res) => {
        const reprodutores = await Reprodutor.listarReprodutores();
        res.json(reprodutores);
    });

    app.delete('/reprodutor/:id', async (req, res) => {
        await Reprodutor.excluirReprodutor(req.params.id);
        res.sendStatus(204);
    });
};
