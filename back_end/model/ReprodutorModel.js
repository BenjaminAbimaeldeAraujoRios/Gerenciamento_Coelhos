const Database = require('../database');

class Reprodutor {
  async adicionarReprodutor(reprodutor) {
    const sql = `
      INSERT INTO reprodutor (
        data_acasalamento,
        numero_matriz,
        numero_laparos,
        id_controle
      ) VALUES ($1, $2, $3, $4)
    `;
    const res = await Database.query(sql, [
      reprodutor.data_acasalamento,
      reprodutor.numero_matriz,
      reprodutor.numero_laparos,
      reprodutor.id_controle
    ]);
    return res;
  }

  async listarReprodutores() {
    const res = await Database.query("SELECT * FROM reprodutor");
    return res;
  }

  async selecionarReprodutorPorId(id) {
    const sql = "SELECT * FROM reprodutor WHERE id_reprodutor = $1";
    const res = await Database.query(sql, [id]);
    return res;
  }

  async atualizarReprodutor(id, reprodutor) {
    const sql = `
      UPDATE reprodutor SET
        data_acasalamento = $1,
        numero_matriz = $2,
        numero_laparos = $3,
        id_controle = $4
      WHERE id_reprodutor = $5
    `;
    const res = await Database.query(sql, [
      reprodutor.data_acasalamento,
      reprodutor.numero_matriz,
      reprodutor.numero_laparos,
      reprodutor.id_controle,
      id
    ]);
    return res;
  }

  async excluirReprodutor(id) {
    const sql = "DELETE FROM reprodutor WHERE id_reprodutor = $1";
    const res = await Database.query(sql, [id]);
    return res;
  }
}

module.exports = {
  Reprodutor
};
