<?php
/**
 * Configuração do Banco de Dados
 * Este arquivo centraliza as configurações de conexão com o banco
 */

// Obtém as variáveis de ambiente do Docker (ou usa valores padrão)
$db_host = getenv('DB_HOST') ?: '127.0.0.1';
$db_name = getenv('DB_NAME') ?: 'jogoscore';
$db_user = getenv('DB_USER') ?: 'root';
$db_pass = getenv('DB_PASS') ?: '';

// String de conexão DSN
$dsn = "mysql:dbname={$db_name};host={$db_host};charset=utf8mb4";

// Função para obter conexão PDO
function getConnection() {
    global $dsn, $db_user, $db_pass;

    try {
        $pdo = new PDO($dsn, $db_user, $db_pass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        return $pdo;
    } catch(PDOException $e) {
        error_log("Erro de conexão: " . $e->getMessage());
        throw $e;
    }
}
?>
