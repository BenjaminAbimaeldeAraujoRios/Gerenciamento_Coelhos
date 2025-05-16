require("dotenv").config();
const db=require('./db');
const port =process.env.port;//dá acesso as configurações do arquivo .env
const express=require("express");
const app=express();

app.listen(port);
app.use(express.json());
console.log("Funcionando");

app.get("/",(require,response)=>{
   response.json({
    massage:"funciona"
});
});
//Usuario
app.get('/usuario/:id',async (require,response)=>{
    const usuarios=await db.selectUsuarios_por_id(require.params.id);
    response.json(usuarios);
});

app.get('/usuarios',async (require,response)=>{
     const usuarios=await db.selectUsuarios();
     response.json(usuarios);
});

app.post('/usuario',async (require,response)=>{
    console.log(require.body)
    await db.insertUsuario(require.body);
    response.sendStatus(201);
});

app.patch('/usuarios/:id',async (require,response)=>{
    console.log(require.body)
    await db.updateUsuario(require.params.id,require.body);
    response.sendStatus(200);
});
app.delete('/usuarios/:id',async (require,response)=>{
    console.log(require.body)
    await db.excluirUsuario(require.params.id);
    response.sendStatus(204);
});
 //Professor
app.post('/professor',async (require,response)=>{
    console.log(require.body)
    await db.insertProfessor(require.body);
    response.sendStatus(201).json({
        mensagem:"Professor criado com sucesso",
        id_usuario:id_usuario
    });
    console.log("Professor criado com sucesso. ID:", id_usuario);
    
});
app.patch('/professor/:id',async (require,response)=>{
    console.log(require.body)
    await db.updateProfessor(require.params.id,require.body);
    response.sendStatus(200);
});
app.get('/professores',async (require,response)=>{
    const professor=await db.selectProfessores();
    response.json(professor);
});
app.get('/professor/:id',async (require,response)=>{
    const professor=await db.selectProfessores_por_id(require.params.id);
    response.json(professor);
});
app.delete('/professor/:id',async (require,response)=>{
    console.log(require.body)
    await db.excluirProfessor(require.params.id);
    response.sendStatus(204);
});
//Aluno
app.post('/aluno',async (require,response)=>{
    console.log(require.body)
    await db.insertAlunos(require.body);
    response.sendStatus(201).json({
        mensagem:"Aluno criado com sucesso",
        id_usuario:id_usuario
    });
    console.log("Aluno criado com sucesso. ID:", id_usuario);
    
});
app.patch('/aluno/:id',async (require,response)=>{
    console.log(require.body)
    await db.updateAluno(require.params.id,require.body);
    response.sendStatus(200);
});
app.get('/alunos',async (require,response)=>{
    const alunos=await db.selectAlunos();
    response.json(alunos);
});
app.get('/aluno/:id',async (require,response)=>{
    const alunos=await db.selectAlunos_por_id(require.params.id);
    response.json(alunos);
});
app.delete('/aluno/:id',async (require,response)=>{
    console.log(require.body)
    await db.excluirAluno(require.params.id);
    response.sendStatus(204);
});







