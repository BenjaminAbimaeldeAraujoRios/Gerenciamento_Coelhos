const Database = require('../database');


class CoelhoModel{
async  insertCoelho(coelho){
  
 const sql = (
  "INSERT INTO coelho (numero_coelho,nome_coelho,raca_coelho,data_nascimento_coelho,sexo_coelho,observacoes_coelho,peso_nascimento,peso_atual,tipo_coelho,data_desmame,matriz_coelho,reprodutor_coelho,id_usuario) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)"
);

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
    coelho.matriz_coelho,
    coelho.reprodutor_coelho,
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
async updateCoelho(id, coelho) {
    const sql = (
      "UPDATE coelho SET nome_coelho=$1, raca_coelho=$2, data_nascimento_coelho=$3, sexo_coelho=$4, observacoes_coelho=$5, peso_nascimento=$6, peso_atual=$7, tipo_coelho=$8, data_desmame=$9, matriz_coelho=$10, reprodutor_coelho=$11 WHERE id_coelho=$12"
    );

    const res = await Database.query(sql, [
      coelho.nome_coelho,
      coelho.raca_coelho,
      coelho.data_nascimento_coelho,
      coelho.sexo_coelho,
      coelho.observacoes_coelho,
      coelho.peso_nascimento,
      coelho.peso_atual,
      coelho.tipo_coelho,
      coelho.data_desmame,
      coelho.matriz_coelho,
      coelho.reprodutor_coelho,
      id
    ]);
  }
}

module.exports = {
  CoelhoModel,
};