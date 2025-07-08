const { Usuario } = require("../model/UsuárioModel");
const{Professor}=require("../model/ProfessorModel");
const{Alunos}=require("../model/AlunoModel");
const{CoelhoModel}=require("../model/CoelhoModel");
const{Cruzamento}=require("../model/CruzamentoModel");

module.exports.rotas = function(app) {
    const UsuarioRota = new Usuario();//Instância a classe Usuario para usar as funções da mesma
    const ProfessorRota=new Professor();
    const AlunoRota=new Alunos();
    const CoelhosRota=new CoelhoModel();
    const CruzamentoRota= new Cruzamento();



//Usuário
    app.get('/usuario/:id', async (req, res) => {
        const usuarios = await UsuarioRota.selectUsuarios_por_id(req.params.id);
        res.json(usuarios);
    });

    app.get('/usuarios', async (req, res) => {
        const usuarios = await UsuarioRota.selectUsuarios();  
        res.json(usuarios);
    });
     app.get('/login', async (req, res) => {
         if (!req.body.email || !req.body.senha) {
            return res.status(400).send("Email e senha são obrigatórios.");
        }
      const  usuario= UsuarioRota.verificarSenha(req.body.email);
       const senhaBanco= await UsuarioRota.login(req.body.email ,req.usuario.body.senha);

         if(!senhaBanco){
           return res.status(200).send("Login feito com sucesso.");
         }
         else{
           return res.status(400).send("Senha errada."); 
         }
       
          
       
    
    });


    app.post('/usuario',async (req, res) => {
        console.log(req.body);
        if(!req.body.nome_usuario){
             return res.status(400).send("Faltou o nome!");
        }
         if(!req.body.email
            || !/[a-z]+@[a-z\.]+\.com/.test(req.body.email)
            || req.body.email?.length > 300)
        return res.status(400).send("Faltou o email!!");

    if(!req.body.senha || req.body.senha?.length < 8)
        return res.status(400).send("Faltou a senha, ou ta curta. Mínimo de 8 caracteres");

     const resultado =   await UsuarioRota.criarHash(req.body.senha);
     req.body.tempero = resultado.salt;  
     req.body.senha = resultado.hash; 
    
        
     delete resultado.senha;
       delete resultado.tempero;
     const usuario=await UsuarioRota.insertUsuario(req.body);
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




};

