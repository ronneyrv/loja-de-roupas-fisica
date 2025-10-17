const database = require('../connection/database');

async function insert(venda) {
  const { vendedor_id, forma_pagamento, total } = venda;
  const sql = `
    INSERT INTO tb_vendas (vendedor_id, forma_pagamento, total)
    VALUES (?, ?, ?)
  `;
  const [result] = await database.execute(sql, [vendedor_id, forma_pagamento, total]);
  return result.insertId;
}

async function all() {
  const [rows] = await database.execute(`
    SELECT v.*, u.nome AS vendedor
    FROM tb_vendas v
    JOIN tb_usuarios u ON v.vendedor_id = u.id_usuario
    ORDER BY v.data_venda DESC
  `);
  return rows;
}

async function find(id) {
  const [rows] = await database.execute('SELECT * FROM tb_vendas WHERE id_venda = ?', [id]);
  return rows[0];
}

module.exports = { insert, all, find };
