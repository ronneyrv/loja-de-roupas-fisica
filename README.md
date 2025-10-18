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

## Diagrama de Classes

```mermaid
classDiagram
    class Venda {
        int id_venda
        datetime data_venda
        float valor_total (Calculado)
        string forma_pagamento
    }

    class ItemVenda {
        int id_item
        int quantidade
        float preco_unitario
        float subtotal (Calculado)
        int venda_id (FK)
        int produto_id (FK)
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
        int quantidade (Estoque)
    }

    class Categoria {
        int id_categoria
        string nome
    }

    %% Relacionamentos
    Usuario --> Venda : realiza
    Venda "1" -- "N" ItemVenda : contem
    Produto "1" -- "N" ItemVenda : vendido_em
    Categoria --> Produto : classifica
```

---

## API REST

```mermaid
graph TD
    A[Cliente Frontend] --> B{Requisicao HTTP};

    subgraph API_REST_NodeJS_Express
        B --> C[Router];
        C --> D[Controller];
        D --> F[Model Acesso DB];
        F --> G[(Banco de Dados MySQL)];
    end

    G --> F;
    F --> D;
    D --> H[Resposta JSON];

    H --> A;

    style A fill:#F0F0F0,stroke:#666
    style G fill:#E8E8E8,stroke:#666
    style C fill:#F8F8F8,stroke:#666
    style D fill:#F8F8F8,stroke:#666
    style F fill:#F8F8F8,stroke:#666
    style H fill:#F0F0F0,stroke:#666