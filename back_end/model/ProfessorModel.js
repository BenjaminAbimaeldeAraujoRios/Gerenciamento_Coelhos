const Database = require('../database');

class Professor{

      async  insertProfessor(usuario){
  
    const sql=("INSERT INTO usuario (nome_usuario,email,senha)values($1,$2,$3)  RETURNING id_usuario ")
  
    const res= await Database.query(sql,[usuario.nome_usuario,usuario.email,usuario.senha]);
     
    const id_usuario =res[0].id_usuario;
  
    const sqlProfessor = `
    INSERT INTO professor (id_usuario)
    VALUES ($1)
`;


await Database.query(sqlProfessor, [id_usuario]);


   
}

  async updateProfessor(id,usuario){
      
        const sql=("UPDATE  usuario set  nome_usuario=$1,email=$2,senha=$3 where id_usuario=$4");
        const res= await Database.query(sql,[usuario.nome_usuario,usuario.email,usuario.senha,id]);
        return res
        
    }
     async selectProfessores(){
   
        const res= await Database.query("Select * from usuario u, professor p where u.id_usuario = p.id_usuario");
        return res;
    }
   async selectProfessores_por_id(id){
      
        const res= await Database.query("Select * from usuario u, professor p where u.id_usuario = p.id_usuario and p.id_usuario=$1",[id]);
        return res;
    }
     async excluirProfessor(id){
       
        await Database.query("DELETE FROM professor WHERE id_usuario = $1", [id]);
        const res = await Database.query("DELETE FROM usuario WHERE id_usuario = $1", [id]);
    
        
    }
}
module.exports={
   Professor,

};