const database = require('../connection/database');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10; // nível de segurança da hash

// Inserir novo usuário (criptografando a senha)
async function insert(usuario) {
  const { nome, cargo, cpf, email, telefone, senha, ativo } = usuario;

  const senhaCriptografada = await bcrypt.hash(senha, SALT_ROUNDS);

  const sql = `
    INSERT INTO tb_usuarios (nome, cargo, cpf, email, telefone, senha, ativo)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  await database.execute(sql, [nome, cargo, cpf, email, telefone, senhaCriptografada, ativo]);
}

// Listar todos os usuários (NUNCA retornar senha)
async function all() {
  const [rows] = await database.execute(`
    SELECT id_usuario, nome, cargo, cpf, email, telefone, ativo
    FROM tb_usuarios
  `);
  return rows;
}

// Buscar usuário por ID (sem senha)
async function find(id) {
  const [rows] = await database.execute(`
    SELECT id_usuario, nome, cargo, cpf, email, telefone, ativo
    FROM tb_usuarios
    WHERE id_usuario = ?
  `, [id]);
  return rows[0];
}

// Atualizar usuário (criptografa se a senha for alterada)
async function update(id, campos) {
  if (campos.senha) {
    campos.senha = await bcrypt.hash(campos.senha, SALT_ROUNDS);
  }

  const updates = Object.keys(campos).map(k => `${k}=?`).join(', ');
  const values = Object.values(campos);

  await database.execute(
    `UPDATE tb_usuarios SET ${updates} WHERE id_usuario = ?`,
    [...values, id]
  );
}

// Remover usuário
async function remove(id) {
  await database.execute('DELETE FROM tb_usuarios WHERE id_usuario = ?', [id]);
}

// Função para autenticação (login)
async function autenticar(email, senha) {
  const [rows] = await database.execute('SELECT * FROM tb_usuarios WHERE email = ?', [email]);
  const usuario = rows[0];

  if (!usuario) {
    return null; // usuário não encontrado
  }

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
  if (!senhaCorreta) {
    return null; // senha incorreta
  }

  // Retorna usuário sem a senha
  const { senha: _, ...dados } = usuario;
  return dados;
}

module.exports = { insert, all, find, update, remove, autenticar };