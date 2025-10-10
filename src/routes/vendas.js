const database = require('../connection/database');
const app = require('express').Router();

// GET - Buscar todas as vendas
app.get('/api/vendas', async (req, res) => {
    try {
        const dados = await database.execute(`
            SELECT v.*, u.nome AS usuario_nome
            FROM tb_vendas v
            LEFT JOIN tb_usuarios u ON v.id_usuario = u.id_usuario
        `);
        res.status(200).send(dados);
    } catch (err) {
        res.status(500).send({ erro: 'Erro ao buscar vendas.' });
    }
});

// GET - Buscar venda por ID
app.get('/api/vendas/:id', async (req, res) => {
    const id = req.params.id;
    const dados = await database.execute(`SELECT * FROM tb_vendas WHERE id_venda=${id}`);
    if (dados.length === 0) return res.status(404).send({ mensagem: 'Venda não encontrada.' });
    res.send(dados[0]);
});

// POST - Criar nova venda
app.post('/api/vendas', async (req, res) => {
    const { id_usuario, data_venda, valor_total, forma_pg } = req.body;

    const sql = `
        INSERT INTO tb_vendas (id_usuario, data_venda, valor_total, forma_pg)
        VALUES (${id_usuario}, '${data_venda}', ${valor_total}, '${forma_pg}')
    `;
    await database.execute(sql);
    res.status(201).send({ mensagem: 'Venda criada com sucesso.' });
});

// PATCH - Atualizar venda
app.patch('/api/vendas/:id', async (req, res) => {
    const id = req.params.id;
    const campos = [];

    for (const campo in req.body) {
        campos.push(`${campo}='${req.body[campo]}'`);
    }

    if (campos.length === 0)
        return res.status(400).send({ mensagem: 'Nenhum campo para atualizar.' });

    const sql = `UPDATE tb_vendas SET ${campos.join(', ')} WHERE id_venda=${id}`;
    await database.execute(sql);
    res.send({ mensagem: 'Venda atualizada com sucesso.' });
});

// DELETE - Excluir venda
app.delete('/api/vendas/:id', async (req, res) => {
    const id = req.params.id;
    await database.execute(`DELETE FROM tb_vendas WHERE id_venda=${id}`);
    res.status(204).send();
});

module.exports = app;
