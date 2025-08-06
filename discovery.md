# Discovery – Sistema de Gestão para Loja de Roupas

## 🧩 Visão Geral do Projeto

Este projeto tem como objetivo criar um sistema de gestão para uma loja de roupas localizada no **Centro Fashion**, atendendo às necessidades do cliente em relação ao controle de estoque, vendas e fluxo de caixa.

---

## 👤 Cliente

- **Segmento:** Loja de Roupas Física
- **Localização:** Centro Fashion
- **Usuários do sistema:**
  - 2 Vendedores
  - 1 Dono (Administrador)

---

## 🎯 Objetivo do Sistema

Desenvolver um sistema simples, funcional e rápido para auxiliar a loja nas seguintes operações:

- **Controle de estoque:** cadastro e atualização da quantidade de produtos.
- **Gestão de vendas:** registro de vendas realizadas em dinheiro ou via PIX.
- **Fluxo de caixa:** acompanhamento da entrada de valores no caixa.
- **Perfis de acesso:** separação de permissões entre vendedores e dono.

---

## 🛠️ Funcionalidades Principais

### Produtos
- Cadastro de produtos (nome, tamanho, cor, preço, categoria)
- Atualização de estoque
- Consulta de produtos disponíveis

### Vendas
- Registro de vendas (produto, quantidade, valor, forma de pagamento, vendedor)
- Suporte para pagamentos em **dinheiro** e **PIX**
- Consulta de vendas por período e vendedor

### Caixa
- Registro da abertura e fechamento do caixa
- Histórico de movimentações financeiras
- Resumo diário de entradas

### Usuários
- Login de vendedor e dono
- Permissões por perfil:
  - **Vendedor:** registrar vendas e consultar produtos
  - **Dono:** acesso completo, incluindo relatórios e controle de caixa

---

## ⚙️ Requisitos Técnicos

### Requisitos Funcionais
- RF01 – O sistema deve permitir o cadastro de produtos com nome, preço, categoria, tamanho e cor.
- RF02 – O sistema deve permitir registrar uma venda com forma de pagamento (dinheiro/PIX).
- RF03 – O sistema deve atualizar automaticamente o estoque após uma venda.
- RF04 – O sistema deve permitir visualizar o fluxo de caixa diário.
- RF05 – O sistema deve ter login e senha com controle de permissões.

### Requisitos Não-Funcionais
- RNF01 – O sistema deve ser acessível via navegador (aplicação web).
- RNF02 – A API deve ser RESTful e desenvolvida com Node.js.
- RNF03 – O banco de dados deve ser relacional (PostgreSQL ou MySQL).
- RNF04 – O sistema deve ter boa usabilidade para ser utilizado em um ambiente de loja.

---

## 📅 Requisitos Futuros (Desejáveis)
- Relatório de produtos mais vendidos
- Histórico de movimentações por vendedor
- Emissão de comprovante de venda (PDF)
- Controle de entrada de novos produtos (compra de fornecedores)

---

## 🧪 Critérios de Aceite

- O vendedor consegue registrar uma venda de forma rápida.
- O dono consegue acompanhar o total vendido no dia.
- O estoque é atualizado automaticamente após uma venda.
- A listagem de produtos disponíveis está sempre atualizada.
- O acesso ao sistema é protegido por login com senha.

---

## 📌 Considerações Finais

O sistema será desenvolvido com foco na praticidade e agilidade para uso diário em loja física, respeitando a estrutura de um MVP funcional e evolutivo.

