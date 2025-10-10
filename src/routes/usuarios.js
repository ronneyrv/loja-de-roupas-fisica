const database = require('../connection/database');
const app = require('express').Router();

// GET - Buscar todos os usuários
app.get('/api/usuarios', async (req, res) => {
    try {
        const dados = await database.execute(`
            SELECT * FROM tb_usuarios
        `);
        res.status(200).send(dados);
    } catch (err) {
        console.error(err);
        res.status(500).send({ erro: 'Erro ao buscar usuários.' });
    }
});

// GET - Buscar usuário por ID
app.get('/api/usuarios/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const dados = await database.execute(`
            SELECT * FROM tb_usuarios WHERE id_usuario=${id}
        `);

        if (dados.length === 0) {
            return res.status(404).send({ mensagem: 'Usuário não encontrado.' });
        }

        res.status(200).send(dados[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send({ erro: 'Erro ao buscar usuário.' });
    }
});

// DELETE - Excluir usuário
app.delete('/api/usuarios/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await database.execute(`DELETE FROM tb_usuarios WHERE id_usuario=${id}`);
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).send({ erro: 'Erro ao excluir usuário.' });
    }
});

// POST - Inserir novo usuário
app.post('/api/usuarios', async (req, res) => {
    try {
        const { cargo, nome, cpf, email, telefone, senha, data_cadastro, ativo } = req.body;

        const sql = `
            INSERT INTO tb_usuarios 
            (cargo, nome, cpf, email, telefone, senha, data_cadastro, ativo)
            VALUES ('${cargo}', '${nome}', '${cpf}', '${email}', '${telefone}', '${senha}', '${data_cadastro}', ${ativo})
        `;

        await database.execute(sql);

        res.status(201).send({ mensagem: 'Usuário criado com sucesso.' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ erro: 'Erro ao criar usuário.' });
    }
});

// PATCH - Atualizar parcialmente usuário
app.patch('/api/usuarios/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const campos = [];

        // Atualiza apenas os campos enviados no corpo da requisição
        for (const campo in req.body) {
            campos.push(`${campo}='${req.body[campo]}'`);
        }

        if (campos.length === 0) {
            return res.status(400).send({ mensagem: 'Nenhum campo para atualizar.' });
        }

        const sql = `
            UPDATE tb_usuarios
            SET ${campos.join(', ')}
            WHERE id_usuario=${id}
        `;

        await database.execute(sql);
        res.status(200).send({ mensagem: 'Usuário atualizado com sucesso.' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ erro: 'Erro ao atualizar usuário.' });
    }
});

module.exports = app;
