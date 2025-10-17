const database = require('../connection/database');

async function insert(item) {
  const { venda_id, produto_id, quantidade, preco_unitario } = item;
  const sql = `
    INSERT INTO tb_itens_venda (venda_id, produto_id, quantidade, preco_unitario)
    VALUES (?, ?, ?, ?)
  `;
  await database.execute(sql, [venda_id, produto_id, quantidade, preco_unitario]);
}

async function all() {
  const [rows] = await database.execute(`
    SELECT i.*, p.nome AS produto
    FROM tb_itens_venda i
    JOIN tb_produtos p ON i.produto_id = p.id_produto
  `);
  return rows;
}

async function findByVenda(venda_id) {
  const [rows] = await database.execute(`
    SELECT i.*, p.nome AS produto
    FROM tb_itens_venda i
    JOIN tb_produtos p ON i.produto_id = p.id_produto
    WHERE i.venda_id = ?
  `, [venda_id]);
  return rows;
}

module.exports = { insert, all, findByVenda };
