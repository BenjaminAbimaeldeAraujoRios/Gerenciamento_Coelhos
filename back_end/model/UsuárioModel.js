const Database = require('../database');
class Usuario{

    async selectUsuarios(){
        
        const res= await Database.query("Select * from usuario");
        return res;
        
    }
     async selectUsuarios_por_id(id){
        
        const res= await Database.query("Select * from usuario WHERE id_usuario=$1",[id]);
          return res;
    }
   async insertUsuario(usuario){
        
        const sql=("INSERT INTO usuario (nome_usuario,email,senha)values($1,$2,$3) ")
        const res= await Database.query(sql,[usuario.nome_usuario,usuario.email,usuario.senha]);
        
    }
     async updateUsuario(id,usuario){
    
        const sql=("UPDATE  usuario set  nome_usuario=$1,email=$2,senha=$3 where id_usuario=$4")
        const res= await Database.query(sql,[usuario.nome_usuario,usuario.email,usuario.senha,id]);
      return res;
        
    }
      async excluirUsuario(id){
       
        const sql=("DELETE FROM   usuario   where id_usuario=$1")
        const res= await Database.query(sql,[id]); 
    
        
    }
    
   
}
module.exports={
   Usuario,

};