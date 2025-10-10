const database = require('../connection/database');
const app = require('express').Router();

// GET - Buscar todas as categorias
app.get('/api/categorias', async (req, res) => {
    try {
        const dados = await database.execute(`SELECT * FROM tb_categorias`);
        res.status(200).send(dados);
    } catch (err) {
        res.status(500).send({ erro: 'Erro ao buscar categorias.' });
    }
});

// GET - Buscar categoria por ID
app.get('/api/categorias/:id', async (req, res) => {
    const id = req.params.id;
    const dados = await database.execute(`SELECT * FROM tb_categorias WHERE id_categoria=${id}`);
    if (dados.length === 0) return res.status(404).send({ mensagem: 'Categoria não encontrada.' });
    res.send(dados[0]);
});

// POST - Criar nova categoria
app.post('/api/categorias', async (req, res) => {
    const { nome } = req.body;
    await database.execute(`INSERT INTO tb_categorias (nome) VALUES ('${nome}')`);
    res.status(201).send({ mensagem: 'Categoria criada com sucesso.' });
});

// PATCH - Atualizar categoria
app.patch('/api/categorias/:id', async (req, res) => {
    const id = req.params.id;
    const { nome } = req.body;
    await database.execute(`UPDATE tb_categorias SET nome='${nome}' WHERE id_categoria=${id}`);
    res.send({ mensagem: 'Categoria atualizada.' });
});

// DELETE - Excluir categoria
app.delete('/api/categorias/:id', async (req, res) => {
    const id = req.params.id;
    await database.execute(`DELETE FROM tb_categorias WHERE id_categoria=${id}`);
    res.status(204).send();
});

module.exports = app;
