const Database = require('../database');

class Cruzamento{
    async  adcionarCruzamento(cruzamento){
    const sql=("Insert into  cruzamento( id_coelho,mae_coelho,pai_coelho) values($1,$2,$3) ")
    const res=await Database.query(sql,[cruzamento.id_coelho,cruzamento.mae_coelho,cruzamento.pai_coelho]);


}
async  excluirCruzamento(id){
  
    const sql=("DELETE FROM   cruzamento   where id_controle=$1")
    const res= await Database.query(sql,[id]);


   
}
async  selectCruzamento(){
  
    const res= await Database.query("Select * from  cruzamento ");
    return res;
}
async  selectCruzamento_por_id(id){
   
    const res= await Database.query("Select * from cruzamento WHERE id_controle=$1",[id]);
    return res;
}
async  updateCruzamento(cruzamento, id) {
  
    const sql = "UPDATE cruzamento SET id_coelho = $1, mae_coelho = $2, pai_coelho = $3 WHERE id_controle = $4";
    const res = await Database.query(sql, [
        cruzamento.id_coelho,
        cruzamento.mae_coelho,
        cruzamento.pai_coelho,
        id
    ]);
   
    return res;
}

}
module.exports={
   Cruzamento

};