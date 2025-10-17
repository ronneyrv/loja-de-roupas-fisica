const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ROTEADORES
const usuarioRouter = require("./src/router/usuarios");
const produtoRouter = require("./src/router/produtos");
const vendaRouter = require("./src/router/vendas");
const itensVendaRouter = require("./src/router/itens_venda");

app.use("/api/usuarios", usuarioRouter);
app.use("/api/produtos", produtoRouter);
app.use("/api/vendas", vendaRouter);
app.use("/api/itens_venda", itensVendaRouter);

// CONFIGURAÇÃO DO SWAGGER
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Loja de Roupas",
      description: "Documentação da API da Loja de Roupas",
    },
    servers: [
      { url: "http://localhost:3000/api", description: "Servidor local" },
    ],
  },
  apis: ["./src/router/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ROTA RAIZ
app.get("/api", (req, res) => {
  res.send(`
    <h1>API Loja de Roupas</h1>
    <p>Endpoints disponíveis:</p>
    <ul>
      <li>/api/usuarios</li>
      <li>/api/produtos</li>
      <li>/api/vendas</li>
      <li>/api/itens_venda</li>
      <li>/api/docs → documentação interativa</li>
    </ul>
  `);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/api`);
  console.log(`Swagger docs em http://localhost:${PORT}/api/docs`);
});

// Para iniciar: node server.js
// para acessar a documentação interativa: http://localhost:3000/api/docs
