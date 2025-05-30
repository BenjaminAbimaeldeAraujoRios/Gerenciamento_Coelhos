const { Usuario } = require("../model/UsuárioModel");
const{Professor}=require("../model/ProfessorModel");
const{Alunos}=require("../model/AlunoModel");

module.exports.rotas = function(app) {
    const UsuarioRota = new Usuario();//Instância a classe Usuario para usar as funções da mesma
    const ProfessorRota=new Professor();
    const AlunoRota=new Alunos();

//Usuário
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
    //Professor
 app.post('/professor', async (require, response) => {
  
    await ProfessorRota.insertProfessor(require.body);
    response.sendStatus(201);
});
app.patch('/professor/:id',async (require,response)=>{
  
    await ProfessorRota.updateProfessor(require.params.id,require.body);
    response.sendStatus(200);
});
app.get('/professores',async (require,response)=>{
    const professor=await  ProfessorRota.selectProfessores();
    response.json(professor);
});
app.get('/professor/:id',async (require,response)=>{
    const professor=await  ProfessorRota.selectProfessores_por_id(require.params.id);
    response.json(professor);
});
app.delete('/professor/:id',async (require,response)=>{
   
    await  ProfessorRota.excluirProfessor(require.params.id);
    response.sendStatus(204);
});
//Alunos
app.post('/aluno',async (require,response)=>{
    console.log(require.body)
    await AlunoRota.insertAluno(require.body);
    response.sendStatus(201);

   
});
app.patch('/aluno/:id',async (require,response)=>{
    console.log(require.body)
    await AlunoRota.updateAluno(require.params.id,require.body);
    response.sendStatus(200);
});
app.get('/alunos',async (require,response)=>{
    const alunos=await AlunoRota.selectAlunos();
    response.json(alunos);
});
app.get('/aluno/:id',async (require,response)=>{
    const alunos=await AlunoRota.selectAlunos_por_id(require.params.id);
    response.json(alunos);
});
app.delete('/aluno/:id',async (require,response)=>{
    console.log(require.body)
    await AlunoRota.excluirAluno(require.params.id);
    response.sendStatus(204);
});



};

