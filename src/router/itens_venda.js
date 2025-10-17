const express = require('express');
const router = express.Router();
const controller = require('../controller/itens_venda');

/**
 * @swagger
 * tags:
 *   name: ItensVenda
 *   description: Operações relacionadas aos itens de venda
 */

/**
 * @swagger
 * /itens_venda:
 *   get:
 *     summary: Lista todos os itens de venda
 *     tags: [ItensVenda]
 *     responses:
 *       200:
 *         description: Lista de itens
 */
router.get('/', controller.listar);

/**
 * @swagger
 * /itens_venda/venda/{id}:
 *   get:
 *     summary: Lista os itens de uma venda específica
 *     tags: [ItensVenda]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da venda
 *     responses:
 *       200:
 *         description: Itens da venda encontrados
 */
router.get('/venda/:id', controller.buscarPorVenda);

module.exports = router;
