const Database = require('../database');

class Cruzamento {
    async adicionarCruzamento(cruzamento) {
        const sql = `
            INSERT INTO cruzamento (id_coelho, coelho_matriz, reprodutor_coelho)
            VALUES ($1, $2, $3)
        `;
        await Database.query(sql, [
            cruzamento.id_coelho,
            cruzamento.coelho_matriz,
            cruzamento.reprodutor_coelho
        ]);
    }

    async excluirCruzamento(id) {
        const sql = "DELETE FROM cruzamento WHERE id_controle = $1";
        await Database.query(sql, [id]);
    }

    async selectCruzamento() {
        const res = await Database.query("SELECT * FROM cruzamento");
        return res.rows;
    }

    async selectCruzamento_por_id(id) {
        const res = await Database.query("SELECT * FROM cruzamento WHERE id_controle = $1", [id]);
        return res.rows[0];
    }

    async updateCruzamento(cruzamento, id) {
        const sql = `
            UPDATE cruzamento 
            SET id_coelho = $1, coelho_matriz = $2, reprodutor_coelho = $3 
            WHERE id_controle = $4
        `;
        await Database.query(sql, [
            cruzamento.id_coelho,
            cruzamento.coelho_matriz,
            cruzamento.reprodutor_coelho,
            id
        ]);
    }
}

module.exports = new Cruzamento();
