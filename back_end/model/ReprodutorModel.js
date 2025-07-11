const Database = require('../database');

class Reprodutor {
    async adicionarReprodutor(reprodutor) {
        const sql = `
            INSERT INTO reprodutor (
                data_acasalamento, numero_matriz, numero_laparos, id_controle
            ) VALUES ($1, $2, $3, $4)
        `;
        await Database.query(sql, [
            reprodutor.data_acasalamento,
            reprodutor.numero_matriz,
            reprodutor.numero_laparos,
            reprodutor.id_controle
        ]);
    }

    async listarReprodutores() {
        const res = await Database.query("SELECT * FROM reprodutor");
        return res.rows;
    }

    async excluirReprodutor(id) {
        await Database.query("DELETE FROM reprodutor WHERE id_reprodutor = $1", [id]);
    }
}

module.exports = new Reprodutor();
