const Usuario = require("../model/usuarios");

module.exports = {
  async listar(req, res) {
    res.json(await Usuario.all());
  },

  async buscar(req, res) {
    const usuario = await Usuario.find(req.params.id);
    usuario
      ? res.json(usuario)
      : res.status(404).json({ erro: "Usuário não encontrado" });
  },

  async criar(req, res) {
    await Usuario.insert(req.body);
    res.status(201).json({ mensagem: "Usuário criado com sucesso" });
  },

  async atualizar(req, res) {
    await Usuario.update(req.params.id, req.body);
    res.json({ mensagem: "Usuário atualizado com sucesso" });
  },

  async remover(req, res) {
    await Usuario.remove(req.params.id);
    res.status(204).send();
  },

  async login(req, res) {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: "Email e senha são obrigatórios" });
    }

    const usuario = await Usuario.autenticar(email, senha);

    if (!usuario) {
      return res.status(401).json({ erro: "Credenciais inválidas" });
    }

    res.json({
      mensagem: "Login realizado com sucesso",
      usuario,
    });
  },
};
