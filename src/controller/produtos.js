const Produto = require('../model/produtos');

module.exports = {
  async listar(req, res) {
    res.json(await Produto.all());
  },

  async buscar(req, res) {
    const produto = await Produto.find(req.params.id);
    produto ? res.json(produto) : res.status(404).json({ erro: 'Produto não encontrado' });
  },

  async criar(req, res) {
    await Produto.insert(req.body);
    res.status(201).json({ mensagem: 'Produto criado com sucesso' });
  },

  async atualizar(req, res) {
    await Produto.update(req.params.id, req.body);
    res.json({ mensagem: 'Produto atualizado com sucesso' });
  },

  async remover(req, res) {
    await Produto.remove(req.params.id);
    res.status(204).send();
  }
};
