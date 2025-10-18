# 🧾 API - Loja de Roupas Física

Trabalho final da turma **FS44 - Digital College**

---

## 📦 Sistema de Vendas

Este projeto representa o **modelo conceitual de um sistema de vendas**, contendo **4 entidades principais**:

- 👕 **Produto**  
- 🧍 **Usuário**  
- 💰 **Venda**  
- 🏷️ **Categoria**

---

## 🧰 Tecnologias Utilizadas

- Node.js
- Express
- MySQL
- OpenAPI / Swagger
- JavaScript (ES6+)
- Mermaid (para diagramas)


## 📊 Diagrama de Classes

```mermaid
classDiagram
    class Venda {
        int id_venda
        datetime data_venda
        int quantidade
        float valor_total
        string forma_pagamento
    }

    class Usuario {
        int id_usuario
        string cargo
        string nome
        string CPF
        string email
        string telefone
        string senha
        datetime data_cadastro
        boolean ativo
    }

    class Produto {
        int id_produto
        string nome
        string tamanho
        string cor
        float preco
        int quantidade
    }

    class Categoria {
        int id_categoria
        string nome
    }

    %% Relacionamentos
    Usuario --> Venda : realiza
    Produto --> Venda : vendido_em
    Categoria --> Produto : classifica
