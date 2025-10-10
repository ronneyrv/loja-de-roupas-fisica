const database = require('./../connection/database');

// Inserir novo produto
async function insert(produto) {
    const { nome, tamanho, cor, preco, quantidade, id_categoria } = produto;

    const sql = `
        INSERT INTO tb_produtos (nome, tamanho, cor, preco, quantidade, id_categoria)
        VALUES ('${nome}', '${tamanho}', '${cor}', ${preco}, ${quantidade}, ${id_categoria})
    `;
    await database.execute(sql);
}

// Buscar todos os produtos
async function all() {
    const dados = await database.execute(`
        SELECT p.*, c.nome AS categoria
        FROM tb_produtos p
        LEFT JOIN tb_categorias c ON p.id_categoria = c.id_categoria
    `);
    return dados;
}

// Buscar produto por ID
async function find(id) {
    const dados = await database.execute(`SELECT * FROM tb_produtos WHERE id_produto=${id}`);
    return dados[0];
}

// Remover produto
async function remove(id) {
    await database.execute(`DELETE FROM tb_produtos WHERE id_produto=${id}`);
}

// Atualizar produto
async function update(id, campos) {
    const updates = Object.entries(campos)
        .map(([chave, valor]) => `${chave}='${valor}'`)
        .join(', ');

    const sql = `UPDATE tb_produtos SET ${updates} WHERE id_produto=${id}`;
    await database.execute(sql);
}

module.exports = {
    all,
    find,
    insert,
    remove,
    update
};
