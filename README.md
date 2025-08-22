# loja-de-roupas-física

# Sistema de Vendas

Este projeto representa o **modelo conceitual de um sistema de vendas** com 4 entidades principais:  
- **Venda**  
- **Usuário**  
- **Produto**  
- **Categoria**  

---

## Diagrama de Classes

```mermaid
classDiagram
    class vendas {
        int id_venda
        int id_usuario
        datetime data_venda
        float valor_total
        string forma_pg
    }

    class item_Venda {
        int id_item_venda
        int id_venda
        int id_produto
        int quantidade
        float preco_unitario
        decimal valor_total_produto
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
    Usuario --> vendas : realiza
    vendas --> item_Venda : contem
    Produto --> item_Venda : vendido_em
    Categoria --> Produto : classifica


