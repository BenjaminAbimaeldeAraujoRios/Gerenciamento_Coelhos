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
    try {
      const res = await Database.query(sql, [
        reprodutor.data_acasalamento,
        reprodutor.numero_matriz,
        reprodutor.numero_laparos,
        reprodutor.id_cruzamento,
        reprodutor.id_coelho
      ]);
      return res;
    } catch (error) {
      console.error('Erro ao adicionar reprodutor:', error);
      throw error;
    }
  }

  async listarReprodutores() {
    try {
      const sql = `
        SELECT 
          r.*,
          c.data_cruzamento,
          mae.nome_coelho AS nome_matriz,
          pai.nome_coelho AS nome_reprodutor
        FROM reprodutor r
        LEFT JOIN cruzamento c ON r.id_cruzamento = c.id_controle
        LEFT JOIN coelho mae ON c.matriz_coelho = mae.id_coelho
        LEFT JOIN coelho pai ON c.reprodutor_coelho = pai.id_coelho
      `;
      const res = await Database.query(sql);
      return res; // Retorne 'res' diretamente, como no MatrizModel
    } catch (error) {
      console.error('Erro no listarReprodutores:', error);
      throw error;
    }
  }

    async listarReprodutores() {
    try {
      const sql = `
        SELECT 
          r.*,
          c.data_cruzamento,
          mae.nome_coelho AS nome_matriz,
          pai.nome_coelho AS nome_reprodutor
        FROM reprodutor r
        LEFT JOIN cruzamento c ON r.id_cruzamento = c.id_controle
        LEFT JOIN coelho mae ON c.matriz_coelho = mae.id_coelho
        LEFT JOIN coelho pai ON c.reprodutor_coelho = pai.id_coelho
      `;
      const res = await Database.query(sql);
      // >>> ADICIONE ESTE LOG AQUI <<<
      console.log('MODEL - ReprodutorModel.listarReprodutores: Dados brutos do DB:', res); 
      return res; // Isso deve ser um array vazio ou com dados
    } catch (error) {
      console.error('Erro no listarReprodutores:', error);
      throw error;
    }
  }

  async atualizarReprodutor(id, reprodutor) {
    // Você precisará implementar esta função no seu modelo se ainda não o fez
    // e se a rota PATCH /reprodutor/:id estiver sendo usada.
    // Seus campos de atualização podem ser diferentes.
    const sql = `
      UPDATE reprodutor SET
        data_acasalamento = $1,
        numero_matriz = $2,
        numero_laparos = $3,
        id_cruzamento = $4,
        id_coelho = $5
      WHERE id_reprodutor = $6
    `;
    try {
      const res = await Database.query(sql, [
        reprodutor.data_acasalamento,
        reprodutor.numero_matriz,
        reprodutor.numero_laparos,
        reprodutor.id_cruzamento,
        reprodutor.id_coelho,
        id
      ]);
      return res;
    } catch (error) {
      console.error('Erro ao atualizar reprodutor:', error);
      throw error;
    }
  }

  async excluirReprodutor(id) {
    try {
      const sql = "DELETE FROM reprodutor WHERE id_reprodutor = $1";
      const res = await Database.query(sql, [id]);
      return res;
    } catch (error) {
      console.error('Erro ao excluir reprodutor:', error);
      throw error;
    }
  }
}

module.exports = {
  Reprodutor,
};