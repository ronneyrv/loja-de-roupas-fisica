const ItensVenda = require('../model/itens_venda');

module.exports = {
  async listar(req, res) {
    res.json(await ItensVenda.all());
  },

  async buscarPorVenda(req, res) {
    res.json(await ItensVenda.findByVenda(req.params.id));
  }
};
