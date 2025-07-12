const { Usuario } = require("../model/UsuárioModel");
const { Professor } = require("../model/ProfessorModel");
const { Alunos } = require("../model/AlunoModel");
const { CoelhoModel } = require("../model/CoelhoModel");
const { Cruzamento } = require("../model/CruzamentoModel");
const { Matriz } = require('../model/MatrizModel');
const { Reprodutor } = require('../model/ReprodutorModel');

module.exports.rotas = function(app) {
  const UsuarioRota = new Usuario();
  const ProfessorRota = new Professor();
  const AlunoRota = new Alunos();
  const CoelhosRota = new CoelhoModel();
  const CruzamentoRota = new Cruzamento();
  const MatrizRota = new Matriz();
  const ReprodutorRota = new Reprodutor();

  // Usuário
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

    if (resultado.hash !== usuario.senha) {
      return res.status(401).send("Senha incorreta.");
    }

    res.status(200).json({ mensagem: "Login realizado com sucesso", usuario });
  });

  app.post('/usuario', async (req, res) => {
    const { nome_usuario, email, senha } = req.body;

    if(!nome_usuario) {
      return res.status(400).send("Faltou o nome!");
    }

    if(!email || !/[a-z]+@[a-z\.]+\.com/.test(email) || email.length > 300) {
      return res.status(400).send("Email inválido!");
    }

    if(!senha || senha.length < 8) {
      return res.status(400).send("Senha faltando ou muito curta. Mínimo 8 caracteres.");
    }

    const resultado = await UsuarioRota.criarHash(senha);
    const novoUsuario = {
      nome_usuario,
      email,
      senha: resultado.hash,
      tempero: resultado.salt
    };

    const usuario = await UsuarioRota.insertUsuario(novoUsuario);
    res.status(201).json(usuario);
  });

  app.patch('/usuario/:id', async (req, res) => {
    await UsuarioRota.updateUsuario(req.params.id, req.body);
    res.sendStatus(200);
  });

  app.delete('/usuario/:id', async (req, res) => {
    await UsuarioRota.excluirUsuario(req.params.id);
    res.sendStatus(204);
  });

  // Coelho
  app.post('/coelho', async (req, res) => {
    await CoelhosRota.insertCoelho(req.body);
    res.sendStatus(201);
  });

  app.get('/coelhos', async (req, res) => {
    const coelhos = await CoelhosRota.selectCoelhos();
    res.json(coelhos);
  });

  app.get('/coelho/:id', async (req, res) => {
    const coelho = await CoelhosRota.selectCoelhos_por_id(req.params.id);
    res.json(coelho);
  });

  app.delete('/coelho/:id', async (req, res) => {
    await CoelhosRota.excluirCoelho(req.params.id);
    res.sendStatus(204);
  });

  app.patch('/coelho/:id', async (req, res) => {
    await CoelhosRota.updateCoelho(req.params.id, req.body);
    res.sendStatus(200);
  });

  // Cruzamento
  app.post('/cruzamento', async (req, res) => {
    await CruzamentoRota.adicionarCruzamento(req.body);
    res.sendStatus(201);
  });

  app.get('/cruzamento', async (req, res) => {
    const cruzamentos = await CruzamentoRota.selectCruzamento();
    res.json(cruzamentos);
  });

  app.get('/cruzamento/:id', async (req, res) => {
    const cruzamento = await CruzamentoRota.selectCruzamento_por_id(req.params.id);
    res.json(cruzamento);
  });

  app.patch('/cruzamento/:id', async (req, res) => {
    await CruzamentoRota.updateCruzamento(req.body, req.params.id);
    res.sendStatus(200);
  });

  app.delete('/cruzamento/:id', async (req, res) => {
    await CruzamentoRota.excluirCruzamento(req.params.id);
    res.sendStatus(204);
  });

  // Matriz (apenas UMA rota GET)
  app.post('/matriz', async (req, res) => {
    await MatrizRota.adicionarMatriz(req.body);
    res.sendStatus(201);
  });

  app.get('/matriz', async (req, res) => {
  try {
    const matrizes = await MatrizRota.listarMatrizes();
    console.log('Matrizes encontradas:', matrizes);
    res.json(matrizes);  
  } catch (error) {
    console.error('Erro ao buscar matrizes:', error);
    res.status(500).json({ erro: 'Erro interno' });
  }
});

  app.delete('/matriz/:id', async (req, res) => {
    await MatrizRota.excluirMatriz(req.params.id);
    res.sendStatus(204);
  });

  // Reprodutor
  app.post('/reprodutor', async (req, res) => {
    await ReprodutorRota.adicionarReprodutor(req.body);
    res.sendStatus(201);
  });

  app.get('/reprodutor', async (req, res) => {
    const reprodutores = await ReprodutorRota.listarReprodutores();
    res.json(reprodutores);
  });

  app.get('/reprodutor/:id', async (req, res) => {
    const reprodutor = await ReprodutorRota.selecionarReprodutorPorId(req.params.id);
    res.json(reprodutor);
  });

  app.delete('/reprodutor/:id', async (req, res) => {
    await ReprodutorRota.excluirReprodutor(req.params.id);
    res.sendStatus(204);
  });
};
