const Database = require('../database');

class Reprodutor {
  async adicionarReprodutor(reprodutor) {
    // Ajuste: alguns bancos têm a coluna 'id_coelho' em vez de 'numero_matriz'.
    // Aceitamos payloads com 'numero_matriz' e os mapeamos para 'id_coelho' ao inserir.
    const sql = `
      INSERT INTO reprodutor (
        data_acasalamento,
        numero_laparos,
        peso_total_ninhada,
        id_coelho
      ) VALUES ($1, $2, $3, $4)
      RETURNING id_reprodutor
    `;
    try {
  const idCoelhoRaw = reprodutor.id_coelho || reprodutor.numero_matriz || null;
  if (!idCoelhoRaw) throw new Error('Reprodutor.adicionarReprodutor: id_coelho (matriz pai) é obrigatório');
  const idCoelho = parseInt(idCoelhoRaw, 10);
      const res = await Database.query(sql, [
        reprodutor.data_acasalamento,
        reprodutor.numero_laparos,
        reprodutor.peso_total_ninhada || null,
        idCoelho
      ]);
      return res && res[0] ? res[0] : null;
    } catch (error) {
      console.error('Erro ao adicionar reprodutor:', error);
      throw error;
    }
  }

  // agora aceita filtro opcional por coelho (id da matriz) para retornar apenas os reprodutores relacionados
  async listarReprodutores(coelhoId = null) {
    try {
      const baseSql = `
        SELECT r.*, mae.nome_coelho AS nome_matriz
        FROM reprodutor r
        LEFT JOIN coelho mae ON r.id_coelho = mae.id_coelho
      `;
      let sql;
      let params = [];
      if (coelhoId) {
        sql = baseSql + ` WHERE r.id_coelho = $1 ORDER BY r.data_acasalamento DESC NULLS LAST`;
        params = [coelhoId];
      } else {
        sql = baseSql + ` ORDER BY r.data_acasalamento DESC NULLS LAST`;
      }
      const res = await Database.query(sql, params);
      console.log('MODEL - ReprodutorModel.listarReprodutores: rows count =', Array.isArray(res) ? res.length : 0, 'filter coelhoId=', coelhoId);
      return res; // retorna array de rows
    } catch (error) {
      console.error('Erro no listarReprodutores:', error && error.stack ? error.stack : error);
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
        numero_laparos = $2,
        peso_total_ninhada = $3,
        id_coelho = $4
      WHERE id_reprodutor = $5
      RETURNING *
    `;
    try {
      const idCoelho = reprodutor.id_coelho || reprodutor.numero_matriz || null;
      const res = await Database.query(sql, [
        reprodutor.data_acasalamento,
        reprodutor.numero_laparos,
        reprodutor.peso_total_ninhada,
        idCoelho,
        id
      ]);
      return res && res[0] ? res[0] : null;
    } catch (error) {
      console.error('Erro ao atualizar reprodutor:', error);
      throw error;
    }
  }

  async selecionarReprodutorPorId(id) {
    try {
      const sql = `
        SELECT r.*, mae.nome_coelho AS nome_matriz
        FROM reprodutor r
        LEFT JOIN coelho mae ON r.id_coelho = mae.id_coelho
        WHERE r.id_reprodutor = $1
      `;
      const res = await Database.query(sql, [id]);
  return res && res[0] ? res[0] : null;
    } catch (error) {
      console.error('Erro ao selecionar reprodutor por id:', error);
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