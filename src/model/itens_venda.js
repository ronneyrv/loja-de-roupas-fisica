const database = require('./../connection/database');

// Inserir item de venda
async function insert(item) {
    const { id_venda, id_produto, quantidade, preco_unitario, valor_total_produto } = item;

    const sql = `
        INSERT INTO tb_itens_venda
        (id_venda, id_produto, quantidade, preco_unitario, valor_total_produto)
        VALUES (${id_venda}, ${id_produto}, ${quantidade}, ${preco_unitario}, ${valor_total_produto})
    `;
    await database.execute(sql);
}

// Buscar todos os itens de venda
async function all() {
    const dados = await database.execute(`
        SELECT iv.*, p.nome AS produto, v.id_venda
        FROM tb_itens_venda iv
        LEFT JOIN tb_produtos p ON iv.id_produto = p.id_produto
        LEFT JOIN tb_vendas v ON iv.id_venda = v.id_venda
    `);
    return dados;
}

// Buscar item por ID
async function find(id) {
    const dados = await database.execute(`SELECT * FROM tb_itens_venda WHERE id_item_venda=${id}`);
    return dados[0];
}

// Remover item
async function remove(id) {
    await database.execute(`DELETE FROM tb_itens_venda WHERE id_item_venda=${id}`);
}

// Atualizar item
async function update(id, campos) {
    const updates = Object.entries(campos)
        .map(([chave, valor]) => `${chave}='${valor}'`)
        .join(', ');

    const sql = `UPDATE tb_itens_venda SET ${updates} WHERE id_item_venda=${id}`;
    await database.execute(sql);
}

module.exports = {
    all,
    find,
    insert,
    remove,
    update
};
