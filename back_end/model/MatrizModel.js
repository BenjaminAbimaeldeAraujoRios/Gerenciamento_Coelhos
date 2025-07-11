const Database = require('../database');

class Matriz {
    async adicionarMatriz(matriz) {
        const sql = `
            INSERT INTO matriz (
                data_parto, laparos, laparos_mortos, laparos_transferidos, 
                peso_total_ninhada, id_controle
            ) VALUES ($1, $2, $3, $4, $5, $6)
        `;
        await Database.query(sql, [
            matriz.data_parto,
            matriz.laparos,
            matriz.laparos_mortos,
            matriz.laparos_transferidos,
            matriz.peso_total_ninhada,
            matriz.id_controle
        ]);
    }

    async listarMatrizes() {
        const res = await Database.query("SELECT * FROM matriz");
        return res.rows;
    }

    async excluirMatriz(id) {
        await Database.query("DELETE FROM matriz WHERE id_matriz = $1", [id]);
    }
}

module.exports = new Matriz();
