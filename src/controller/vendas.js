const Venda = require('../model/vendas');
const ItensVenda = require('../model/itens_venda');

module.exports = {
  async listar(req, res) {
    res.json(await Venda.all());
  },

  async buscar(req, res) {
    const venda = await Venda.find(req.params.id);
    if (!venda) return res.status(404).json({ erro: 'Venda não encontrada' });

    const itens = await ItensVenda.findByVenda(req.params.id);
    res.json({ ...venda, itens });
  },

  async criar(req, res) {
    const { venda, itens } = req.body;
    const vendaId = await Venda.insert(venda);

    for (const item of itens) {
      await ItensVenda.insert({ ...item, venda_id: vendaId });
    }

    res.status(201).json({ mensagem: 'Venda registrada com sucesso', id_venda: vendaId });
  }
};
