const { Usuario } = require("../model/UsuárioModel");
const{Professor}=require("../model/ProfessorModel");
const{Alunos}=require("../model/AlunoModel");
const{CoelhoModel}=require("../model/CoelhoModel");
const {Matriz}= require('../model/MatrizModel');
const Database = require('../database');
const {Reprodutor} = require('../model/ReprodutorModel');


module.exports.rotas = function(app) {
    const UsuarioRota = new Usuario();//Instância a classe Usuario para usar as funções da mesma
    const ProfessorRota= new Professor();
    const AlunoRota=new Alunos();
    const CoelhosRota=new CoelhoModel();
   const MatrizRota=new Matriz();
  // Cruzamento model removed; not used
   const ReprodutorRota= new Reprodutor();





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

 app.post('/matriz', async (req, res) => {
  console.log('POST /matriz - req.body:', req.body);
  console.log('POST /matriz - req.query:', req.query);
  try {
    // validate required parent id
    const idCoelho = req.body && (req.body.id_coelho || req.body.coelho_id || req.query.coelho_id);
    console.log('POST /matriz - idCoelho extraído:', idCoelho);
    if (!idCoelho) {
      return res.status(400).json({ erro: 'id_coelho (coelho pai) é obrigatório ao criar uma matriz' });
    }
    // coerce to integer
    req.body.id_coelho = parseInt(idCoelho, 10);
    console.log('POST /matriz - req.body final:', req.body);
    const result = await MatrizRota.insertMatriz(req.body);
    console.log('POST /matriz - resultado da inserção:', result);
    res.sendStatus(201);
  } catch (error) {
    console.error('Erro ao adicionar matriz:', error);
    console.error('Stack trace:', error.stack);
    res.status(500).json({ erro: 'Erro interno' });
  }
});

app.get('/matriz', async (req, res) => {
  console.log('ENTER /matriz');
  try {
    // quick DB test from controller
    try {
      const test = await Database.query('SELECT 1 as ok');
      console.log('DEBUG DB test for /matriz:', test);
    } catch (e) {
      console.error('DEBUG DB test error:', e && e.stack ? e.stack : e);
    }
  // support optional filter by coelho id: /matriz?coelho_id=123 or /matriz?id=123
  // Prefer explicit undefined checks so values like '0' are preserved if provided by a client.
  let coelhoIdRaw = (req.query.coelho_id !== undefined) ? req.query.coelho_id : (req.query.id !== undefined ? req.query.id : null);
  // parseInt only when we actually have something; keep null otherwise
  const coelhoId = (coelhoIdRaw !== null) ? parseInt(coelhoIdRaw, 10) : null;
  console.log('DEBUG /matriz - received coelhoIdRaw:', coelhoIdRaw, 'parsed:', coelhoId, 'isValidNumber:', coelhoId !== null && !Number.isNaN(coelhoId));
  const matrizes = await MatrizRota.selectMatrizes(coelhoId);
  console.log('DEBUG /matriz - type:', typeof matrizes, 'isArray:', Array.isArray(matrizes));
  console.log('DEBUG /matriz - sample:', matrizes && matrizes.length ? matrizes[0] : matrizes);
  res.json(matrizes);  
  } catch (error) {
    console.error('Erro ao buscar matrizes:', error && error.stack ? error.stack : error);
    res.status(500).json({ erro: 'Erro interno' });
  }
});

app.get('/matriz/:id', async (req, res) => {
  try {
    const matriz = await MatrizRota.selectMatrizPorId(req.params.id);
    if (matriz) {
      res.json(matriz);
    } else {
      res.status(404).json({ mensagem: 'Matriz não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao buscar matriz por ID:', error);
    res.status(500).json({ erro: 'Erro interno' });
  }
});

app.patch('/matriz/:id', async (req, res) => {
  try {
    await MatrizRota.updateMatriz(req.params.id, req.body);
    res.sendStatus(200);
  } catch (error) {
    console.error('Erro ao atualizar matriz:', error);
    res.status(500).json({ erro: 'Erro interno' });
  }
});

app.delete('/matriz/:id', async (req, res) => {
  try {
    await MatrizRota.deleteMatriz(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    console.error('Erro ao excluir matriz:', error);
    res.status(500).json({ erro: 'Erro interno' });
  }
});

  // Reprodutor
 app.post('/reprodutor', async (req, res) => {
    try {
      // accept either id_coelho or numero_matriz (from older clients)
      const idCoelho = req.body && (req.body.id_coelho || req.body.numero_matriz);
      if (!idCoelho) {
        return res.status(400).json({ erro: 'id_coelho (matriz pai) ou numero_matriz é obrigatório ao criar um reprodutor' });
      }
      req.body.id_coelho = parseInt(idCoelho, 10);
      await ReprodutorRota.adicionarReprodutor(req.body);
      res.sendStatus(201);
    } catch (error) {
      console.error('Erro ao adicionar reprodutor:', error);
      res.status(500).json({ erro: 'Erro interno' });
    }
  });

  app.get('/reprodutor', async (req, res) => {
    console.log('GET /reprodutor - query params:', req.query);
    try {
      // accept either ?coelho_id= or ?id=
      let coelhoIdRaw = req.query.coelho_id || req.query.id || null;
      const coelhoId = coelhoIdRaw ? parseInt(coelhoIdRaw, 10) : null;
      console.log('GET /reprodutor - coelhoIdRaw:', coelhoIdRaw, 'parsed:', coelhoId);
      
      const reprodutores = await ReprodutorRota.listarReprodutores(coelhoId);
      console.log('GET /reprodutor - retornando:', reprodutores ? reprodutores.length : 0, 'reprodutores');
      res.json(reprodutores);
    } catch (error) {
      console.error('Erro ao buscar reprodutores:', error);
      res.status(500).json({ erro: 'Erro interno' });
    }
  });
  app.get('/reprodutor/:id', async (req, res) => {
    try {
      const reprodutor = await ReprodutorRota.selecionarReprodutorPorId(req.params.id);
      if (reprodutor) {
        res.json(reprodutor);
      } else {
        res.status(404).json({ mensagem: 'Reprodutor não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao buscar reprodutor por ID:', error);
      res.status(500).json({ erro: 'Erro interno' });
    }
  });

  app.patch('/reprodutor/:id', async (req, res) => {
    try {
      await ReprodutorRota.atualizarReprodutor(req.params.id, req.body);
      res.sendStatus(200);
    } catch (error) {
      console.error('Erro ao atualizar reprodutor:', error);
      res.status(500).json({ erro: 'Erro interno' });
    }
  });

  app.delete('/reprodutor/:id', async (req, res) => {
    try {
      await ReprodutorRota.excluirReprodutor(req.params.id);
      res.sendStatus(204);
    } catch (error) {
      console.error('Erro ao excluir reprodutor:', error);
      res.status(500).json({ erro: 'Erro interno' });
    }
  });

  
}
