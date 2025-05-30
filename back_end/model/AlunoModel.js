const Database = require('../database');
class Alunos{
  async  insertAluno(usuario){
  
    const sql=("INSERT INTO usuario (nome_usuario,email,senha)values($1,$2,$3)  RETURNING id_usuario ")
  
    const res= await Database.query(sql,[usuario.nome_usuario,usuario.email,usuario.senha]);
     
    const id_usuario =res[0].id_usuario;
  
    const sqlAluno = `
    INSERT INTO aluno (id_usuario)
    VALUES ($1)
`;


await Database.query(sqlAluno, [id_usuario]);


   
}
     async updateAluno(id,usuario){
    
        const sql=("UPDATE  usuario set  nome_usuario=$1,email=$2,senha=$3 where id_usuario=$4");
        const res= await Database.query(sql,[usuario.nome_usuario,usuario.email,usuario.senha,id]);
    
        return res;
    }
   async selectAlunos(){
       
        const res= await Database.query("Select * from usuario u, aluno a where u.id_usuario = a.id_usuario");
        return res;
    }
    async selectAlunos_por_id(id){
       
        const res= await Database.query("Select * from usuario u, aluno a where u.id_usuario = a.id_usuario  and  a.id_usuario=$1",[id]);
        return res;
    }
 async excluirAluno(id){
        const cliente=await conexao();
        // Exclui primeiro da tabela professor (por causa da FK)
        await Database.query("DELETE FROM aluno WHERE id_usuario = $1", [id]);
        // Depois exclui da tabela usuario
        const res = await Database.query("DELETE FROM usuario WHERE id_usuario = $1", [id]);
     
    }
    
    
}
module.exports={
    Alunos,
}