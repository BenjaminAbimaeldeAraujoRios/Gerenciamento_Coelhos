const Database = require('../database');

class Reprodutor {
  async adicionarReprodutor(reprodutor) {
    const sql = `
      INSERT INTO reprodutor (
        data_acasalamento,
        numero_matriz,
        numero_laparos,
        id_cruzamento,
        id_coelho
      ) VALUES ($1, $2, $3, $4, $5)
    `;
    const res = await Database.query(sql, [
      reprodutor.data_acasalamento,
      reprodutor.numero_matriz,
      reprodutor.numero_laparos,
      reprodutor.id_cruzamento,
      reprodutor.id_coelho
    ]);
    return res;
  }

  async listarReprodutores() {
    const sql = `
      SELECT 
        r.*,
        c.data_cruzamento,
        mae.nome_coelho AS nome_matriz,
        pai.nome_coelho AS nome_reprodutor
      FROM reprodutor r
      JOIN cruzamento c ON r.id_cruzamento = c.id_controle
      JOIN coelho mae ON c.matriz_coelho = mae.id_coelho
      JOIN coelho pai ON c.reprodutor_coelho = pai.id_coelho
    `;
    const res = await Database.query(sql);
    return res.rows;
  }

  async selecionarReprodutorPorId(id) {
    const sql = `
      SELECT 
        r.*,
        c.data_cruzamento,
        mae.nome_coelho AS nome_matriz,
        pai.nome_coelho AS nome_reprodutor
      FROM reprodutor r
      JOIN cruzamento c ON r.id_cruzamento = c.id_controle
      JOIN coelho mae ON c.matriz_coelho = mae.id_coelho
      JOIN coelho pai ON c.reprodutor_coelho = pai.id_coelho
      WHERE r.id_reprodutor = $1
    `;
    const res = await Database.query(sql, [id]);
    return res.rows[0];
  }

  async excluirReprodutor(id) {
    const sql = "DELETE FROM reprodutor WHERE id_reprodutor = $1";
    const res = await Database.query(sql, [id]);
    return res;
  }
}

module.exports = {
  Reprodutor,
};
