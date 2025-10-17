const database = require('../connection/database');

async function insert(produto) {
  const { nome, tamanho, cor, categoria, preco, estoque } = produto;
  const sql = `
    INSERT INTO tb_produtos (nome, tamanho, cor, categoria, preco, estoque)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  await database.execute(sql, [nome, tamanho, cor, categoria, preco, estoque]);
}

async function all() {
  const [rows] = await database.execute('SELECT * FROM tb_produtos');
  return rows;
}

async function find(id) {
  const [rows] = await database.execute('SELECT * FROM tb_produtos WHERE id_produto = ?', [id]);
  return rows[0];
}

async function update(id, campos) {
  const updates = Object.keys(campos).map(k => `${k}=?`).join(', ');
  const values = Object.values(campos);
  await database.execute(`UPDATE tb_produtos SET ${updates} WHERE id_produto = ?`, [...values, id]);
}

async function remove(id) {
  await database.execute('DELETE FROM tb_produtos WHERE id_produto = ?', [id]);
}

module.exports = { insert, all, find, update, remove };
