const Database = require('../database');

class Matriz {
  async adicionarMatriz(matriz) {
    const sql = `
      INSERT INTO matriz (
        data_parto,
        laparos,
        laparos_mortos,
        laparos_transferidos,
        peso_total_ninhada,
        id_controle,
        numero_reprodutor
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    const res = await Database.query(sql, [
      matriz.data_parto,
      matriz.laparos,
      matriz.laparos_mortos,
      matriz.laparos_transferidos,
      matriz.peso_total_ninhada,
      matriz.id_controle,
      matriz.numero_reprodutor
    ]);
    return res;
  }

  async listarMatrizes() {
    const sql = `
      SELECT 
        m.*,
        c.data_cruzamento,
        mae.nome_coelho AS nome_matriz,
        pai.nome_coelho AS nome_reprodutor
      FROM matriz m
      JOIN cruzamento c ON m.id_controle = c.id_controle
      JOIN coelho mae ON c.matriz_coelho = mae.id_coelho
      JOIN coelho pai ON c.reprodutor_coelho = pai.id_coelho
    `;
    const res = await Database.query(sql);
    return res.rows;
  }

  async selecionarMatrizPorId(id) {
    const sql = `
      SELECT 
        m.*,
        c.data_cruzamento,
        mae.nome_coelho AS nome_matriz,
        pai.nome_coelho AS nome_reprodutor
      FROM matriz m
      JOIN cruzamento c ON m.id_controle = c.id_controle
      JOIN coelho mae ON c.matriz_coelho = mae.id_coelho
      JOIN coelho pai ON c.reprodutor_coelho = pai.id_coelho
      WHERE m.id_matriz = $1
    `;
    const res = await Database.query(sql, [id]);
    return res.rows[0];
  }

  async atualizarMatriz(id, matriz) {
    const sql = `
      UPDATE matriz SET
        data_parto = $1,
        laparos = $2,
        laparos_mortos = $3,
        laparos_transferidos = $4,
        peso_total_ninhada = $5,
        id_controle = $6,
        numero_reprodutor = $7
      WHERE id_matriz = $8
    `;
    const res = await Database.query(sql, [
      matriz.data_parto,
      matriz.laparos,
      matriz.laparos_mortos,
      matriz.laparos_transferidos,
      matriz.peso_total_ninhada,
      matriz.id_controle,
      matriz.numero_reprodutor,
      id
    ]);
    return res;
  }

  async excluirMatriz(id) {
    const sql = "DELETE FROM matriz WHERE id_matriz = $1";
    const res = await Database.query(sql, [id]);
    return res;
  }
}

module.exports = {
  Matriz
};
