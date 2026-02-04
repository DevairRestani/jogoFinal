<?php
	// Inclui o arquivo de configuração do banco de dados
	require_once 'db_config.php';

	try {
		$pdo = getConnection();

		$sql = "SELECT * FROM score ORDER BY pontos DESC LIMIT 5";
		$stmt = $pdo->query($sql);

		$dados = [];
		if($stmt->rowCount() > 0){
			foreach($stmt->fetchAll() as $jogador){
				$dados[] = $jogador;
			}
		} else {
			echo "Não foi encontrado nenhum registro!";
		}

		$result = json_encode($dados);
		echo $result;

	} catch(PDOException $e){
		echo "Erro: ".$e->getMessage();
	}

?>
