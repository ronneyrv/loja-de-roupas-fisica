-- =====================================================
-- BANCO DE DADOS: loja_roupas
-- Descrição: Estrutura das tabelas principais do sistema
-- Módulos: Usuários, Produtos, Vendas e Caixa
-- Autor: Ronney Rocha
-- Data: 2025-10-16
-- =====================================================

CREATE DATABASE IF NOT EXISTS loja_roupas;
USE loja_roupas;

CREATE TABLE tb_usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cargo ENUM('vendedor', 'dono') NOT NULL DEFAULT 'vendedor',
    cpf VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    senha VARCHAR(255) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE tb_produtos (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    tamanho VARCHAR(10) NOT NULL,
    cor VARCHAR(50) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    estoque INT DEFAULT 0,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE tb_vendas (
    id_venda INT AUTO_INCREMENT PRIMARY KEY,
    data_venda DATETIME DEFAULT CURRENT_TIMESTAMP,
    vendedor_id INT NOT NULL,
    forma_pagamento ENUM('dinheiro', 'pix') NOT NULL,
    total DECIMAL(10,2) DEFAULT 0,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vendedor_id) REFERENCES tb_usuarios(id_usuario) ON DELETE SET NULL
);

CREATE TABLE tb_itens_venda (
    id_item INT AUTO_INCREMENT PRIMARY KEY,
    venda_id INT NOT NULL,
    produto_id INT NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) GENERATED ALWAYS AS (quantidade * preco_unitario) STORED,
    FOREIGN KEY (venda_id) REFERENCES tb_vendas(id_venda) ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES tb_produtos(id_produto) ON DELETE CASCADE
);

CREATE TABLE tb_categorias (
  id_categoria INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tb_caixa (
    id_caixa INT AUTO_INCREMENT PRIMARY KEY,
    data_abertura DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_fechamento DATETIME NULL,
    total_vendas DECIMAL(10,2) DEFAULT 0,
    status ENUM('aberto', 'fechado') DEFAULT 'aberto',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- RELACIONAMENTO ENTRE CAIXA E VENDAS
CREATE TABLE tb_caixa_vendas (
    id_relacao INT AUTO_INCREMENT PRIMARY KEY,
    caixa_id INT NOT NULL,
    venda_id INT NOT NULL,
    FOREIGN KEY (caixa_id) REFERENCES tb_caixa(id_caixa) ON DELETE CASCADE,
    FOREIGN KEY (venda_id) REFERENCES tb_vendas(id_venda) ON DELETE CASCADE
);

-- RELATORIO: RESUMO FINANCEIRO DIÁRIO
CREATE OR REPLACE VIEW relatorio_resumo_diario AS
SELECT 
    DATE(v.data_venda) AS data,
    COUNT(v.id_venda) AS total_vendas,
    SUM(v.total) AS valor_total,
    SUM(CASE WHEN v.forma_pagamento = 'dinheiro' THEN v.total ELSE 0 END) AS total_dinheiro,
    SUM(CASE WHEN v.forma_pagamento = 'pix' THEN v.total ELSE 0 END) AS total_pix
FROM tb_vendas v
GROUP BY DATE(v.data_venda)
ORDER BY data DESC;
