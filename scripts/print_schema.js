const {Pool} = require('pg');
(async ()=>{
  const p = new Pool({host:'localhost',user:'postgres',password:'alegrete',database:'Coelhos',port:5432});
  try{
  const tables = ['coelho','matriz','reprodutor'];
    for(const t of tables){
      try{
        const col = await p.query(`SELECT column_name,data_type,is_nullable FROM information_schema.columns WHERE table_name=$1 ORDER BY ordinal_position`,[t]);
        console.log('---',t,'---');
        console.log(JSON.stringify(col.rows,null,2));
      }catch(e){
        console.error('ERR for',t, e.message);
      }
    }
  }catch(e){
    console.error('FATAL', e.stack||e.message);
  }finally{
    await p.end();
  }
})();
