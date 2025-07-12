const Database = require('../database');

class Cruzamento {
  async adicionarCruzamento(cruzamento) {
    const sql = `
      INSERT INTO cruzamento (matriz_coelho, reprodutor_coelho)
      VALUES ($1, $2)
    `;
    await Database.query(sql, [
      cruzamento.matriz_coelho,
      cruzamento.reprodutor_coelho
    ]);
  }

  async excluirCruzamento(id) {
    const sql = "DELETE FROM cruzamento WHERE id_controle = $1";
    await Database.query(sql, [id]);
  }

  async selectCruzamento() {
    const sql = `
      SELECT 
        c.*,
        mae.nome_coelho AS nome_matriz,
        pai.nome_coelho AS nome_reprodutor
      FROM cruzamento c
      JOIN coelho mae ON c.matriz_coelho = mae.id_coelho
      JOIN coelho pai ON c.reprodutor_coelho = pai.id_coelho
    `;
    const res = await Database.query(sql);
    return res.rows;
  }

  async selectCruzamento_por_id(id) {
    const sql = `
      SELECT 
        c.*,
        mae.nome_coelho AS nome_matriz,
        pai.nome_coelho AS nome_reprodutor
      FROM cruzamento c
      JOIN coelho mae ON c.matriz_coelho = mae.id_coelho
      JOIN coelho pai ON c.reprodutor_coelho = pai.id_coelho
      WHERE c.id_controle = $1
    `;
    const res = await Database.query(sql, [id]);
    return res.rows[0];
  }

  async updateCruzamento(cruzamento, id) {
    const sql = `
      UPDATE cruzamento 
      SET matriz_coelho = $1, reprodutor_coelho = $2
      WHERE id_controle = $3
    `;
    await Database.query(sql, [
      cruzamento.matriz_coelho,
      cruzamento.reprodutor_coelho,
      id
    ]);
  }
}

module.exports = {
  Cruzamento,
};
