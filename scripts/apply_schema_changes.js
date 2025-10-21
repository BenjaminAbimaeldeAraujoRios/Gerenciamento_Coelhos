const { Pool } = require('pg');

(async function(){
  const pool = new Pool({ host:'localhost', user:'postgres', password:'alegrete', database:'Coelhos', port:5432 });
  try{
    console.log('Connected, applying safe DDL changes...');

    const steps = [
      {
        name: 'add_tipoususario_to_usuario',
        sql: `ALTER TABLE usuario ADD COLUMN IF NOT EXISTS tipoususario TEXT;`
      },
      {
        name: 'add_numero_matriz_to_reprodutor',
        sql: `ALTER TABLE reprodutor ADD COLUMN IF NOT EXISTS numero_matriz INTEGER;`
      },
      {
        name: 'add_id_coelho_to_reprodutor_if_missing',
        sql: `ALTER TABLE reprodutor ADD COLUMN IF NOT EXISTS id_coelho INTEGER;`
      },
      {
        name: 'add_numero_reprodutor_to_matriz_if_missing',
        sql: `ALTER TABLE matriz ADD COLUMN IF NOT EXISTS numero_reprodutor INTEGER;`
      }
    ];

    for(const s of steps){
      try{
        console.log('Running:', s.name);
        await pool.query(s.sql);
        console.log('OK:', s.name);
      }catch(e){
        console.error('ERROR running', s.name, e && e.message ? e.message : e);
      }
    }

    console.log('DDL script finished.');
  }catch(e){
    console.error('FATAL', e && e.stack ? e.stack : e);
  }finally{
    await pool.end();
  }
})();
