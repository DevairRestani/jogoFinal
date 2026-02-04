-- Cria o banco de dados se não existir
CREATE DATABASE IF NOT EXISTS jogoscore;

-- Usa o banco de dados
USE jogoscore;

-- Cria a tabela de scores
CREATE TABLE IF NOT EXISTS score (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    pontos INT NOT NULL,
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_pontos (pontos DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insere alguns dados de exemplo (opcional)
INSERT INTO score (nome, pontos) VALUES
    ('Jogador Demo', 1000),
    ('Player 2', 850),
    ('Zumbi Hunter', 750);
