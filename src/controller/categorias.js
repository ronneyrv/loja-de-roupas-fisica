const Categoria = require("../model/categorias");

module.exports = {
  async listar(req, res) {
    const categorias = await Categoria.all();
    res.json(categorias);
  },

  async buscar(req, res) {
    const categoria = await Categoria.find(req.params.id);
    if (!categoria) {
      return res.status(404).json({ erro: "Categoria não encontrada" });
    }
    res.json(categoria);
  },

  async criar(req, res) {
    await Categoria.insert(req.body);
    res.status(201).json({ mensagem: "Categoria criada com sucesso" });
  },

  async atualizar(req, res) {
    await Categoria.update(req.params.id, req.body);
    res.json({ mensagem: "Categoria atualizada com sucesso" });
  },

  async remover(req, res) {
    await Categoria.remove(req.params.id);
    res.status(204).send();
  },
};
