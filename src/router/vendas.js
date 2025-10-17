const express = require('express');
const router = express.Router();
const controller = require('../controller/vendas');

/**
 * @swagger
 * tags:
 *   name: Vendas
 *   description: Operações relacionadas a vendas
 */

/**
 * @swagger
 * /vendas:
 *   get:
 *     summary: Lista todas as vendas
 *     tags: [Vendas]
 *     responses:
 *       200:
 *         description: Lista de vendas
 */
router.get('/', controller.listar);

/**
 * @swagger
 * /vendas/{id}:
 *   get:
 *     summary: Busca venda por ID
 *     tags: [Vendas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da venda
 *     responses:
 *       200:
 *         description: Venda encontrada
 *       404:
 *         description: Venda não encontrada
 */
router.get('/:id', controller.buscar);

/**
 * @swagger
 * /vendas:
 *   post:
 *     summary: Registra uma nova venda
 *     tags: [Vendas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               venda:
 *                 type: object
 *                 required: [vendedor_id, forma_pagamento, total]
 *                 properties:
 *                   vendedor_id:
 *                     type: integer
 *                   forma_pagamento:
 *                     type: string
 *                     enum: [dinheiro, pix]
 *                   total:
 *                     type: number
 *               itens:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [produto_id, quantidade, preco_unitario]
 *                   properties:
 *                     produto_id:
 *                       type: integer
 *                     quantidade:
 *                       type: integer
 *                     preco_unitario:
 *                       type: number
 *     responses:
 *       201:
 *         description: Venda registrada com sucesso
 */
router.post('/', controller.criar);

module.exports = router;
