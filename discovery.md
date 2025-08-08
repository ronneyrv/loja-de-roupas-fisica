# 📄 Escopo do Sistema – Loja Física de Roupas no Centro Fashion

## 1. 🧭 Resumo Executivo

Este projeto tem como objetivo o desenvolvimento de um **sistema web simples e funcional** para uma **loja de roupas localizada no Centro Fashion**, voltado para o gerenciamento de **estoque**, **vendas** e **fluxo de caixa**, com perfis diferenciados de acesso (vendedor e dono).

---

## 2. 👤 Público-Alvo e Perfis de Usuário

- **Usuários:**
  - **Vendedor:** realiza vendas, consulta produtos.
  - **Dono (Administrador):** possui acesso completo ao sistema (produtos, vendas, caixa e relatórios).
  
- **Necessidade:**
  - Eliminar controles manuais
  - Garantir agilidade no atendimento
  - Ter visibilidade clara do fluxo de caixa e desempenho de vendas

---

## 3. 🎯 Objetivos do Sistema

- Facilitar o **cadastro e gerenciamento de produtos**
- Agilizar o **registro de vendas**
- Controlar o **fluxo financeiro diário**
- Separar **permissões por tipo de usuário**
- Disponibilizar **relatórios simples e diretos** para o dono da loja

---

## 4. 🛠️ Funcionalidades por Módulo

### 4.1. Produtos
- [x] Cadastro de produtos com:
  - Nome
  - Tamanho
  - Cor
  - Categoria
  - Preço
- [x] Atualização de estoque
- [x] Consulta/listagem de produtos

### 4.2. Vendas
- [x] Registro de vendas com:
  - Itens vendidos (produto e quantidade)
  - Vendedor responsável
  - Forma de pagamento: dinheiro ou PIX
- [x] Consulta de vendas por período
- [x] Consulta de vendas por vendedor

### 4.3. Caixa
- [x] Registro de abertura e fechamento de caixa
- [x] Registro das entradas por vendas
- [x] Resumo financeiro diário

### 4.4. Usuários
- [x] Login com controle de acesso
- [x] Perfil de **vendedor** com permissões limitadas
- [x] Perfil de **dono** com acesso completo

---

## 5. ⚙️ Requisitos Técnicos

### 5.1. Requisitos Funcionais (RF)
| Código | Descrição |
|--------|-----------|
| RF01 | Permitir o cadastro de produtos com seus atributos |
| RF02 | Registrar vendas com escolha de forma de pagamento |
| RF03 | Atualizar estoque automaticamente após venda |
| RF04 | Visualizar o fluxo de caixa diário |
| RF05 | Autenticar usuários com login e senha |
| RF06 | Permitir filtro de vendas por data e vendedor |

### 5.2. Requisitos Não Funcionais (RNF)
| Código | Descrição |
|--------|-----------|
| RNF01 | O sistema deve funcionar via navegador (aplicação web responsiva) |
| RNF02 | A API deve ser RESTful em Node.js |
| RNF03 | Banco de dados relacional (PostgreSQL ou MySQL) |
| RNF04 | Interface amigável para uso rápido em loja |

---

## 6. 📚 Casos de Uso (Use Cases)

### 🎫 UC01 – Cadastro de Produto
- **Ator:** Dono
- **Descrição:** O dono acessa o sistema com seu login e cadastra o produtos informando nome, preço, tamanho, cor e categoria.
- **Pré-condição:** Usuário logado com perfil de dono.
- **Pós-condição:** Produto salvo no banco de dados.

### 💰 UC02 – Registro de Venda
- **Ator:** Vendedor
- **Descrição:** O vendedor seleciona os produtos vendidos, define a quantidade, escolhe a forma de pagamento (dinheiro ou PIX) e confirma a venda.
- **Pré-condição:** Usuário logado com perfil de vendedor.
- **Pós-condição:** Venda registrada e estoque atualizado.

### 📦 UC03 – Consulta de Estoque
- **Ator:** Vendedor / Dono
- **Descrição:** O usuário visualiza a listagem dos produtos disponíveis no estoque com seus respectivos saldos.
- **Pré-condição:** Usuário logado.
- **Pós-condição:** Dados exibidos na interface.

### 💼 UC04 – Abertura e Fechamento de Caixa
- **Ator:** Dono
- **Descrição:** O dono inicia o caixa com valor inicial e encerra no final do dia, visualizando entradas acumuladas por vendas.
- **Pré-condição:** Usuário logado com perfil de dono.
- **Pós-condição:** Registro das movimentações no histórico de caixa.

### 📊 UC05 – Geração de Relatórios
- **Ator:** Dono
- **Descrição:** O dono acessa os relatórios para ver vendas por período e desempenho por vendedor.
- **Pré-condição:** Usuário logado com perfil de dono.
- **Pós-condição:** Relatórios apresentados com filtros aplicados.

### 🔐 UC06 – Autenticação de Usuário
- **Ator:** Vendedor / Dono
- **Descrição:** O usuário informa seu login e senha para acessar o sistema.
- **Pré-condição:** Sistema disponível.
- **Pós-condição:** Acesso liberado conforme o perfil.

---

## 7. 🔮 Funcionalidades Futuras Desejadas

- Relatórios de produtos mais vendidos
- Emissão de comprovante de venda em PDF
- Histórico de ações por vendedor
- Dashboard com gráficos de desempenho

---

## 8. ✅ Critérios de Aceite

- Vendedor consegue registrar uma venda sem travas
- Dono vê o total vendido no dia com facilidade
- Estoque é atualizado automaticamente
- Sistema acessível por login com senha
- Listagem de produtos sempre atualizada

---

## 9. 📅 Prazos e Entregas

- MVP funcional com:
  - Cadastro de produtos
  - Registro de vendas
  - Login e permissões
  - Controle de caixa básico

- Funcionalidades futuras serão avaliadas após testes do MVP

---

## 10. 📁 Tecnologias e Ferramentas

- Backend: **Node.js + Express**
- Banco de Dados: **PostgreSQL** ou **MySQL**
- API: RESTful
- Frontend: (opcional neste escopo)
- Testes: Jest + Supertest (API)
- Documentação: Markdown + Swagger
- Versionamento: Git + GitHub (repositório público)
