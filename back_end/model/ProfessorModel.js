class Professor{
      async insertProfessor(usuario){
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
  async updateProfessor(id,usuario){
        const cliente=await conexao();
        const sql=("UPDATE  usuario set  nome_usuario=$1,email=$2,senha=$3 where id_usuario=$4");
        const res= await cliente.query(sql,[usuario.nome_usuario,usuario.email,usuario.senha,id]);
    
        
    }
     async selectProfessores(){
        const cliente=await conexao();
        const res= await cliente.query("Select * from usuario u, professor p where u.id_usuario = p.id_usuario");
        return res.rows;
    }
   async selectProfessores_por_id(id){
        const cliente=await conexao();
        const res= await cliente.query("Select * from professor WHERE id_usuario=$1",[id]);
        return res.rows;
    }
     async excluirProfessor(id){
        const cliente=await conexao();
        // Exclui primeiro da tabela professor (por causa da FK)
        await cliente.query("DELETE FROM professor WHERE id_usuario = $1", [id]);
        // Depois exclui da tabela usuario
        const res = await cliente.query("DELETE FROM usuario WHERE id_usuario = $1", [id]);
    
        
    }
}