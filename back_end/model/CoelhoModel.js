const Database = require('../database');


class CoelhoModel{
async  insertCoelho(coelho){
  
    const sql=(
    "INSERT INTO coelho (numero_coelho,nome_coelho,raca_coelho,data_nascimento_coelho,sexo_coelho,observacoes_coelho,peso_nascimento,peso_atual,tipo_coelho,data_desmame,id_usuario) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) ")
    const res = await Database.query(
        sql,
        [
          coelho.numero_coelho,
          coelho.nome_coelho,
          coelho.raca_coelho,
          coelho.data_nascimento_coelho,
          coelho.sexo_coelho,
          coelho.observacoes_coelho,
          coelho.peso_nascimento,
          coelho.peso_atual,
          coelho.tipo_coelho,
          coelho.data_desmame,
          coelho.id_usuario
        ]
      );
   
}
async  selectCoelhos(){
 
    const res= await Database.query("Select * from  coelho ");
    return res;
}
async  selectCoelhos_por_id(id){
   
    const res= await Database.query("Select * from coelho WHERE id_coelho=$1",[id]);
    return res;
}
async excluirCoelho(id){
   
    const sql=("DELETE FROM   coelho  where id_coelho=$1")
    const res= await Database.query(sql,[id]);


   
}
async  updateCoelho(id,coelho){
   
    const sql=("UPDATE  coelho set  nome_coelho=$1,raca_coelho=$2,data_nascimento_coelho=$3,sexo_coelho=$4,observacoes_coelho=$5,peso_nascimento=$6,peso_atual=$7,tipo_coelho=$8,data_desmame=$9 where id_coelho=$10")//mesmo nome os atributos do db
    const res= await Database.query(sql,[
        coelho.nome_coelho,
        coelho.raca_coelho,
        coelho.data_nascimento_coelho,
        coelho.sexo_coelho,
        coelho.observacoes_coelho,
        coelho.peso_nascimento,
        coelho.peso_atual,
        coelho.tipo_coelho,
        coelho.data_desmame,
        id ]);
}


    
}
module.exports={
    CoelhoModel,
};