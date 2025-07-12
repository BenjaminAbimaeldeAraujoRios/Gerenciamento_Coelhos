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
    const res = await Database.query("SELECT * FROM matriz");
    return res;
  }

  async selecionarMatrizPorId(id) {
    const sql = "SELECT * FROM matriz WHERE id_matriz = $1";
    const res = await Database.query(sql, [id]);
    return res;
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
