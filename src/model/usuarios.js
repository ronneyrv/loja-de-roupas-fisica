const database = require('./../connection/database');

// Inserir novo usuário
async function insert(usuario) {
    const { cargo, nome, cpf, email, telefone, senha, data_cadastro, ativo } = usuario;

    const sql = `
        INSERT INTO tb_usuarios 
        (cargo, nome, cpf, email, telefone, senha, data_cadastro, ativo)
        VALUES ('${cargo}', '${nome}', '${cpf}', '${email}', '${telefone}', '${senha}', '${data_cadastro}', ${ativo})
    `;
    await database.execute(sql);
}

// Buscar todos os usuários
async function all() {
    const dados = await database.execute('SELECT * FROM tb_usuarios');
    return dados;
}

// Buscar usuário por ID
async function find(id) {
    const dados = await database.execute(`SELECT * FROM tb_usuarios WHERE id_usuario=${id}`);
    return dados[0];
}

// Remover usuário
async function remove(id) {
    await database.execute(`DELETE FROM tb_usuarios WHERE id_usuario=${id}`);
}

// Atualizar usuário
async function update(id, campos) {
    const updates = Object.entries(campos)
        .map(([chave, valor]) => `${chave}='${valor}'`)
        .join(', ');

    const sql = `UPDATE tb_usuarios SET ${updates} WHERE id_usuario=${id}`;
    await database.execute(sql);
}

module.exports = {
    all,
    find,
    insert,
    remove,
    update
};
