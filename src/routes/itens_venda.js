const database = require('../connection/database');
const app = require('express').Router();

// GET - Buscar todos os itens de venda
app.get('/api/itens-venda', async (req, res) => {
    try {
        const dados = await database.execute(`
            SELECT iv.*, p.nome AS produto_nome, v.id_venda
            FROM tb_itens_venda iv
            LEFT JOIN tb_produtos p ON iv.id_produto = p.id_produto
            LEFT JOIN tb_vendas v ON iv.id_venda = v.id_venda
        `);
        res.status(200).send(dados);
    } catch (err) {
        res.status(500).send({ erro: 'Erro ao buscar itens de venda.' });
    }
});

// POST - Criar item de venda
app.post('/api/itens-venda', async (req, res) => {
    const { id_venda, id_produto, quantidade, preco_unitario, valor_total_produto } = req.body;

    const sql = `
        INSERT INTO tb_itens_venda 
        (id_venda, id_produto, quantidade, preco_unitario, valor_total_produto)
        VALUES (${id_venda}, ${id_produto}, ${quantidade}, ${preco_unitario}, ${valor_total_produto})
    `;
    await database.execute(sql);
    res.status(201).send({ mensagem: 'Item de venda adicionado com sucesso.' });
});

// DELETE - Remover item
app.delete('/api/itens-venda/:id', async (req, res) => {
    const id = req.params.id;
    await database.execute(`DELETE FROM tb_itens_venda WHERE id_item_venda=${id}`);
    res.status(204).send();
});

module.exports = app;
