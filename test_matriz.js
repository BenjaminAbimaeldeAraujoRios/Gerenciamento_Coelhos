const Database = require('./back_end/database');

Database.conectar();

async function testMatriz() {
  try {
    console.log('Testando conexão com banco...');
    
    // Teste simples de conexão
    const test = await Database.query('SELECT 1 as ok');
    console.log('Conexão OK:', test);
    
    // Teste de inserção básica
    console.log('Testando inserção básica...');
    const result = await Database.query(`
      INSERT INTO matriz (
        id_coelho,
        data_parto,
        laparos
      ) VALUES ($1,$2,$3)
      RETURNING id_matriz
    `, [1, '2025-08-20', 5]);
    
    console.log('Resultado da inserção:', result);
    
    // Listar matrizes
    const matrizes = await Database.query('SELECT * FROM matriz');
    console.log('Matrizes no banco:', matrizes);
    
  } catch (error) {
    console.error('Erro no teste:', error);
    console.error('Stack:', error.stack);
  } finally {
    process.exit();
  }
}

testMatriz();
