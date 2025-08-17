const Database = require('../database');

class Matriz {
  // Insere um registro de matriz (parto)
  async insertMatriz(matriz) {
    if (!matriz || !matriz.id_coelho) {
      throw new Error('Matriz.insertMatriz: id_coelho (pai) é obrigatório');
    }
    const sql = `
      INSERT INTO matriz (
        id_coelho,
        data_parto,
        laparos,
        laparos_mortos,
        laparos_transferidos,
        peso_total_ninhada,
        numero_reprodutor
      ) VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING id_matriz
    `;
    const res = await Database.query(sql, [
      matriz.id_coelho,
      matriz.data_parto,
      matriz.laparos,
      matriz.laparos_mortos,
      matriz.laparos_transferidos,
      matriz.peso_total_ninhada,
      matriz.numero_reprodutor || null
    ]);
    return res && res[0] ? res[0] : null;
  }

  // Seleciona todas as matrizes
  async selectMatrizes(coelhoId = null) {
  // Ordena por data do parto (mais recente primeiro). Se coelhoId fornecido, filtra por id_coelho.
  try {
      // Only filter when coelhoId is a real number (not null and not NaN).
      if (coelhoId !== null && !Number.isNaN(coelhoId)) {
        const sql = `SELECT * FROM matriz WHERE id_coelho=$1 ORDER BY data_parto DESC`;
        const res = await Database.query(sql, [coelhoId]);
        return res || [];
      } else {
        // No valid coelhoId provided; return all matrizes
        console.log('MatrizModel.selectMatrizes: no valid coelhoId provided, returning all records');
        const sql = `SELECT * FROM matriz ORDER BY data_parto DESC`;
        const res = await Database.query(sql);
        return res || []; // Database.query retorna array de rows
      }
  } catch (error) {
    console.error('MatrizModel.selectMatrizes error:', error && error.stack ? error.stack : error);
    throw error;
  }
  }

  // Seleciona uma matriz por ID
  async selectMatrizPorId(id) {
    const sql = `SELECT * FROM matriz WHERE id_matriz = $1`;
    const res = await Database.query(sql, [id]);
  return res && res[0] ? res[0] : null;
  }

  // Atualiza um registro de matriz
  async updateMatriz(id, matriz) {
    const sql = `
      UPDATE matriz SET
        id_coelho=$1,
        data_parto=$2,
        laparos=$3,
        laparos_mortos=$4,
        laparos_transferidos=$5,
        peso_total_ninhada=$6,
        numero_reprodutor=$7
      WHERE id_matriz=$8
      RETURNING *
    `;
    const res = await Database.query(sql, [
      matriz.id_coelho,
      matriz.data_parto,
      matriz.laparos,
      matriz.laparos_mortos,
      matriz.laparos_transferidos,
      matriz.peso_total_ninhada,
      matriz.numero_reprodutor || null,
      id
    ]);
    return res && res[0] ? res[0] : null;
  }

  // Exclui um registro de matriz
  async deleteMatriz(id) {
    const sql = `DELETE FROM matriz WHERE id_matriz=$1`;
    await Database.query(sql, [id]);
    return true;
  }
}

module.exports = {
  Matriz
};
