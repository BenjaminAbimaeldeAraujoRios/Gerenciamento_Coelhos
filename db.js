async function conexao(){
    
    if (global.conexao)
        return global.conexao.connect();

    

    const {Pool}=require('pg');
    const pool =new Pool({
        connectionString: process.env.CONNECTION_STRING


    });
    const cliente=await pool.connect();
   
    console.log("Criou o pool de conexão")
    const res=await cliente.query("select now()")
   console.log(res.rows[0]);
   cliente.release();

   global.conexao=pool;

   return pool.connect();
}  
conexao();
//Usuário
async function selectUsuarios(){
    const cliente=await conexao();
    const res= await cliente.query("Select * from usuario");
    return res.rows;
}
async function selectUsuarios_por_id(id){
    const cliente=await conexao();
    const res= await cliente.query("Select * from usuario WHERE id=$1",[id]);
    return res.rows;
}
async function insertUsuario(usuario){
    const cliente=await conexao();
    const sql=("INSERT INTO usuario (nome_usuario,email,senha)values($1,$2,$3) ")
    const res= await cliente.query(sql,[usuario.nome_usuario,usuario.email,usuario.senha]);
    
}
async function updateUsuario(id,usuario){
    const cliente=await conexao();
    const sql=("UPDATE  usuario set  nome_usuario=$1,email=$2,senha=$3 where id_usuario=$4")
    const res= await cliente.query(sql,[usuario.nome_usuario,usuario.email,usuario.senha,id]);

    
}
async function excluirUsuario(id){
    const cliente=await conexao();
    const sql=("DELETE FROM   usuario   where id_usuario=$1")
    const res= await cliente.query(sql,[id]); 

    
}
//Professor

async function insertProfessor(usuario){
    const cliente=await conexao();
    const sql=("INSERT INTO usuario (nome_usuario,email,senha)values($1,$2,$3)  RETURNING id_usuario ")
    const res= await cliente.query(sql,[usuario.nome_usuario,usuario.email,usuario.senha]);
    const id_usuario = res.rows[0].id_usuario;
    
    const sqlProfessor = `
    INSERT INTO professor (id_usuario)
    VALUES ($1)
`;
await cliente.query(sqlProfessor, [id_usuario]);

    
}
async function updateProfessor(id,usuario){
    const cliente=await conexao();
    const sql=("UPDATE  usuario set  nome_usuario=$1,email=$2,senha=$3 where id_usuario=$4");
    const res= await cliente.query(sql,[usuario.nome_usuario,usuario.email,usuario.senha,id]);

    
}
async function selectProfessores(){
    const cliente=await conexao();
    const res= await cliente.query("Select * from usuario u, professor p where u.id_usuario = p.id_usuario");
    return res.rows;
}
async function selectProfessores_por_id(id){
    const cliente=await conexao();
    const res= await cliente.query("Select * from professor WHERE id_usuario=$1",[id]);
    return res.rows;
}
async function excluirProfessor(id){
    const cliente=await conexao();
    // Exclui primeiro da tabela professor (por causa da FK)
    await cliente.query("DELETE FROM professor WHERE id_usuario = $1", [id]);
    // Depois exclui da tabela usuario
    const res = await cliente.query("DELETE FROM usuario WHERE id_usuario = $1", [id]);

    
}
//Alunos
async function insertAlunos(usuario){
    const cliente=await conexao();
    const sql=("INSERT INTO usuario (nome_usuario,email,senha)values($1,$2,$3)  RETURNING id_usuario ")
    const res= await cliente.query(sql,[usuario.nome_usuario,usuario.email,usuario.senha]);
    const id_usuario = res.rows[0].id_usuario;
    
    const sqlAluno = `
    INSERT INTO aluno (id_usuario)
    VALUES ($1)
`;
await cliente.query(sqlAluno, [id_usuario]);

    
}
async function updateAluno(id,usuario){
    const cliente=await conexao();
    const sql=("UPDATE  usuario set  nome_usuario=$1,email=$2,senha=$3 where id_usuario=$4");
    const res= await cliente.query(sql,[usuario.nome_usuario,usuario.email,usuario.senha,id]);

    return res.rowCount;
}
async function selectAlunos(){
    const cliente=await conexao();
    const res= await cliente.query("Select * from usuario u, aluno a where u.id_usuario = a.id_usuario");
    return res.rows;
}
async function selectAlunos_por_id(id){
    const cliente=await conexao();
    const res= await cliente.query("Select * from aluno WHERE id_usuario=$1",[id]);
    return res.rows;
}
async function excluirAluno(id){
    const cliente=await conexao();
    // Exclui primeiro da tabela professor (por causa da FK)
    await cliente.query("DELETE FROM aluno WHERE id_usuario = $1", [id]);
    // Depois exclui da tabela usuario
    const res = await cliente.query("DELETE FROM usuario WHERE id_usuario = $1", [id]);
 
}





module.exports={
    //Usuario
selectUsuarios,
selectUsuarios_por_id,
insertUsuario,
updateUsuario,
excluirUsuario,
//Professor
selectProfessores,
insertProfessor,
updateProfessor,
selectProfessores_por_id,
excluirProfessor,
//Aluno
insertAlunos,
updateAluno,
selectAlunos,
selectAlunos_por_id,
excluirAluno,

};