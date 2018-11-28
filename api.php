<?php
	$dsn = "mysql:dbname=jogoscore;host=127.0.0.1";
	$dbuser = "root";
	$dbpass = "";

	try {
		$pdo = new PDO($dsn, $dbuser, $dbpass);

		$nome = $_POST['nome'];
		$ponto = $_POST['ponto'];
		
		$sql = "INSERT INTO score SET pontos = '$ponto', nome = '$nome'";
		$sql = $pdo->query($sql);

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
