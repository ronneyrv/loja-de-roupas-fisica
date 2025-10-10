const database = require('../connection/database');
const app = require('express').Router();

// GET - Buscar todos os produtos
app.get('/api/produtos', async (req, res) => {
    try {
        const dados = await database.execute(`
            SELECT p.*, c.nome AS categoria_nome
            FROM tb_produtos p
            LEFT JOIN tb_categorias c ON p.id_categoria = c.id_categoria
        `);
        res.status(200).send(dados);
    } catch (err) {
        res.status(500).send({ erro: 'Erro ao buscar produtos.' });
    }
});

// GET - Buscar produto por ID
app.get('/api/produtos/:id', async (req, res) => {
    const id = req.params.id;
    const dados = await database.execute(`SELECT * FROM tb_produtos WHERE id_produto=${id}`);
    if (dados.length === 0) return res.status(404).send({ mensagem: 'Produto não encontrado.' });
    res.send(dados[0]);
});

// POST - Criar novo produto
app.post('/api/produtos', async (req, res) => {
    const { nome, tamanho, cor, preco, quantidade, id_categoria } = req.body;
    const sql = `
        INSERT INTO tb_produtos (nome, tamanho, cor, preco, quantidade, id_categoria)
        VALUES ('${nome}', '${tamanho}', '${cor}', ${preco}, ${quantidade}, ${id_categoria})
    `;
    await database.execute(sql);
    res.status(201).send({ mensagem: 'Produto criado com sucesso.' });
});

// PATCH - Atualizar produto
app.patch('/api/produtos/:id', async (req, res) => {
    const id = req.params.id;
    const campos = [];

    for (const campo in req.body) {
        campos.push(`${campo}='${req.body[campo]}'`);
    }

    if (campos.length === 0)
        return res.status(400).send({ mensagem: 'Nenhum campo para atualizar.' });

    const sql = `UPDATE tb_produtos SET ${campos.join(', ')} WHERE id_produto=${id}`;
    await database.execute(sql);
    res.send({ mensagem: 'Produto atualizado com sucesso.' });
});

// DELETE - Excluir produto
app.delete('/api/produtos/:id', async (req, res) => {
    const id = req.params.id;
    await database.execute(`DELETE FROM tb_produtos WHERE id_produto=${id}`);
    res.status(204).send();
});

module.exports = app;
