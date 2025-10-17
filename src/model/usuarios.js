const database = require('../connection/database');

// Inserir novo usuário
async function insert(usuario) {
  const { nome, cargo, cpf, email, telefone, senha, ativo } = usuario;
  const sql = `
    INSERT INTO tb_usuarios (nome, cargo, cpf, email, telefone, senha, ativo)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  await database.execute(sql, [nome, cargo, cpf, email, telefone, senha, ativo]);
}

// Listar todos os usuários
async function all() {
  const [rows] = await database.execute('SELECT * FROM tb_usuarios');
  return rows;
}

// Buscar usuário por ID
async function find(id) {
  const [rows] = await database.execute('SELECT * FROM tb_usuarios WHERE id_usuario = ?', [id]);
  return rows[0];
}

// Atualizar usuário
async function update(id, campos) {
  const updates = Object.keys(campos).map(k => `${k}=?`).join(', ');
  const values = Object.values(campos);
  await database.execute(`UPDATE tb_usuarios SET ${updates} WHERE id_usuario = ?`, [...values, id]);
}

// Remover usuário
async function remove(id) {
  await database.execute('DELETE FROM tb_usuarios WHERE id_usuario = ?', [id]);
}

module.exports = { insert, all, find, update, remove };
