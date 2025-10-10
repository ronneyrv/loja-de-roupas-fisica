const express = require('express');

// Importando as rotas
const rotaUsuarios = require('./src/routes/usuarios');
const rotaCategorias = require('./src/routes/categorias');
const rotaProdutos = require('./src/routes/produtos');
const rotaVendas = require('./src/routes/vendas');
const rotaItensVenda = require('./src/routes/itens_venda');

// Inicializando o express
const app = express();

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Registrando as rotas na aplicação
app.use(rotaUsuarios);
app.use(rotaCategorias);
app.use(rotaProdutos);
app.use(rotaVendas);
app.use(rotaItensVenda);

// Subindo o servidor
app.listen(8001, () => {
    console.log('Servidor rodando em: http://localhost:8001');
});

// Para iniciar: npx nodemon index.js
