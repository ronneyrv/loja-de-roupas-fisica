DROP DATABASE IF EXISTS db_clubedovinho;

CREATE DATABASE IF NOT EXISTS db_clubedovinho;

USE db_clubedovinho;

DROP TABLE tb_produto IF EXISTS;

CREATE TABLE tb_categoria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR (30) NOT NULL
);

CREATE TABLE tb_produto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(30) NOT NULL,
    categoria_id INT NOT NULL,
    valor DECIMAL NOT NULL,
    FOREIGN KEY (categoria_id) REFERENCES tb_categoria(id)
);

INSERT INTO tb_categoria (nome)
VALUES 
('Agua'),
('Refrigerante'),
('Destilados'),
('Vinho'),
('Sucos');


INSERT INTO tb_produto 
    (nome, categoria_id, valor)
VALUES
    ('Vinho Sao Braz', 4, '10.89');

INSERT INTO tb_produto (nome, categoria_id, valor) 
VALUES
('Cerveja Nordestina', 1, '4.50'),
('Refrigerante Cajuína', 2, '3.20'),
('Cachaça do Sertão', 3, '15.75'),
('Suco de Umbu', 5, '5.00'),
('Água Mineral Cristalina', 1, '2.00'),
('Licor de Jenipapo', 3, '12.90'),
('Café Torrado Cariri', 1, '8.40'),
('Guaraná Jesus', 2, '4.10'),
('Chá de Ervas Mandacaru', 1, '6.30'),
('Vinho do Seridó', 4, '11.99');

SELECT 