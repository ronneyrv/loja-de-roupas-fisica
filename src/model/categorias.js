const database = require('../connection/database');

// Inserir nova categoria
async function insert(categoria) {
  const { nome } = categoria;
  const sql = `INSERT INTO tb_categorias (nome) VALUES (?)`;
  await database.execute(sql, [nome]);
}

// Listar todas as categorias
async function all() {
  const [rows] = await database.execute('SELECT * FROM tb_categorias');
  return rows;
}

// Buscar categoria por ID
async function find(id) {
  const [rows] = await database.execute('SELECT * FROM tb_categorias WHERE id_categoria = ?', [id]);
  return rows[0];
}

// Atualizar categoria
async function update(id, campos) {
  const updates = Object.keys(campos).map(k => `${k}=?`).join(', ');
  const values = Object.values(campos);
  await database.execute(`UPDATE tb_categorias SET ${updates} WHERE id_categoria = ?`, [...values, id]);
}

// Remover categoria
async function remove(id) {
  await database.execute('DELETE FROM tb_categorias WHERE id_categoria = ?', [id]);
}

module.exports = { insert, all, find, update, remove };
