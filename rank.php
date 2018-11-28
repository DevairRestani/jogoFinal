<?php 
	$dsn = "mysql:dbname=jogoscore;host=127.0.0.1";
	// $dsn = "mysql:dbname=test;host=localhost";
	$dbuser = "root";
	$dbpass = "";

	try {
		$pdo = new PDO($dsn, $dbuser, $dbpass);

		$sql = "SELECT * FROM score ORDER BY pontos DESC LIMIT 5";
		$sql = $pdo->query($sql); //Requisicao ao banco

		$dados = [];
		if($sql->rowCount() > 0){
			foreach($sql->fetchAll() as $jogador){
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
