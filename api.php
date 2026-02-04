<?php
	// Inclui o arquivo de configuração do banco de dados
	require_once 'db_config.php';

	try {
		$pdo = getConnection();

		$nome = $_POST['nome'];
		$ponto = $_POST['ponto'];

		// Usa prepared statements para prevenir SQL injection
		$sql = "INSERT INTO score (nome, pontos) VALUES (:nome, :ponto)";
		$stmt = $pdo->prepare($sql);
		$stmt->bindParam(':nome', $nome);
		$stmt->bindParam(':ponto', $ponto);
		$stmt->execute();

		echo "Usuário inserido: ".$pdo->lastInsertId();

	} catch(PDOException $e){
		echo "Erro: ".$e->getMessage();
	}










	// $servername = 'localhost';
	// $database = 'jogoscore';
	// $username = 'root';
	// $password = '';

	// $con = new mysqli($servername, $username, $password, $database);

	// if(mysqli_connect_error()){
	// 	var_dump('erro na conexao');
	// }else{

	// 	if (isset($_POST['nome']) && isset($_POST['ponto'])) {


	// 		$nome = $_POST['nome'];
	// 	 	$ponto = $_POST['ponto'];

	// 		$sql = "INSERT INTO score (nome, pontos) VALUES ('".$nome."', '".$ponto."')";

	// 		if($con->query($sql)){
	// 			echo(strval($con->insert_id));
	// 		}else{
	// 			var_dump('Erro ao gravar!!!');
	// 		}
	// 	}else{
	// 		var_dump('algo deu errado');
	// 	}
	// }
