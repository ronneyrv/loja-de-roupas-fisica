const database = require('./../connection/database');

// Inserir nova venda
async function insert(venda) {
    const { id_usuario, data_venda, valor_total, forma_pg } = venda;

    const sql = `
        INSERT INTO tb_vendas (id_usuario, data_venda, valor_total, forma_pg)
        VALUES (${id_usuario}, '${data_venda}', ${valor_total}, '${forma_pg}')
    `;
    await database.execute(sql);
}

// Buscar todas as vendas
async function all() {
    const dados = await database.execute(`
        SELECT v.*, u.nome AS usuario
        FROM tb_vendas v
        LEFT JOIN tb_usuarios u ON v.id_usuario = u.id_usuario
    `);
    return dados;
}

// Buscar venda por ID
async function find(id) {
    const dados = await database.execute(`SELECT * FROM tb_vendas WHERE id_venda=${id}`);
    return dados[0];
}

// Remover venda
async function remove(id) {
    await database.execute(`DELETE FROM tb_vendas WHERE id_venda=${id}`);
}

// Atualizar venda
async function update(id, campos) {
    const updates = Object.entries(campos)
        .map(([chave, valor]) => `${chave}='${valor}'`)
        .join(', ');

    const sql = `UPDATE tb_vendas SET ${updates} WHERE id_venda=${id}`;
    await database.execute(sql);
}

module.exports = {
    all,
    find,
    insert,
    remove,
    update
};
