<!DOCTYPE html>
<html lang="pt-br">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		
		<link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet">
		<link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
		<link type="text/css" href="jojinho.css" rel="stylesheet">
		<link rel="stylesheet" href="rank.css">
		
		<title>Jojinho</title>
	</head>
	<body>
		<div style="position: absolute; user-select: none;"><img src="fff.png"></div>
		<div class="rain">
			<!-- INICIO JOGO-->
			<!-- <div><img src="asd.png" ></div> -->
			<section class="inicioJogo">
				<div>
					<!-- <button id="start" type="button" class="btnPadrao"  data-toggle="modal" data-backdrop="static" data-keyboard="false" data-target=".primeiraParte" onclick="escrever(1), playInicial()">Start the Game</button> -->
					<button id="start" type="button" class="btnPadrao btnModal" data-toggle="modal" data-target=".primeiraParte" autofocus onclick="escrever(1), playInicial(), modalBlock()"> Iniciar Jogo </button>
					<!-- <button id="start" type="button" class="btnPadrao btnModal" onclick="start()">Start the Game</button> -->
					<audio class="audioInicial">
						<source src="assets/midia/musicaMenor.mp3" type="audio/mpeg">
					</audio>
				</div>
			</section>
			<!-- .INICIO JOGO -->

			<!-- MAIN -->
			<main id="teste">
				<div class="menu" id="menu">
					<div class="tituloPause">
						<h1>Pause</h1>
					</div>
					<div class="botoes">
						<button id="option" class="btnPadrao" onclick="opcoes()"> Opção </button>
						<button id="return" class="btnPadrao" onclick="retornar()"> Voltar </button>
						<button id="exit" class="btnPadrao" data-toggle="modal" data-target=".confirmacao"> Quit </button>
					</div>
				</div>
				<div id="opcoes" class="menu">
					<div class="align-items-center justify-content-between rounded  p-2">
						<label class="w-50 m-0" for=""> Brilho </label>
						<input class="custom-range" type="range" value="100" min="0" step="1" max="200" id="brilho" name="brightness">
					</div>
					<div class="align-items-center justify-content-between rounded p-2">
						<label class="w-50 m-0" for=""> Música </label>
						<div class="midias">
								<button class="" onclick="playMusic()"> <img id="btnPlay" class="btnMidia" src="assets/imagens/play.png"> </button>    <!--botão de iniciar o jogo do último quadro-->
								<button class="" onclick="stopMusic()"> <img id="btnPause" class="btnMidia" src="assets/imagens/pause.png"> </button>      <!--botão de QUIT do jogo-->
						</div>
					</div>
					<button id="exit" class="voltar btnPadrao" onclick="voltar()"> voltar </button>
				</div>				
				
				<canvas id="tela">
					Seu navegador não suporta esse jogo!
				</canvas>
			</main>
			<!-- .MAIN -->

			<!-- CONFIRMACAO -->
			<div class="modal fade confirmacao" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
				<div class="modal-dialog modal-sm modal-dialog-centered" role="document">
					<div class="modal-content">
							<div class="modal-header">
									<button type="button" class="close" data-dismiss="modal" aria-label="Close">
									  <span aria-hidden="true">&times;</span>
									</button>
								 </div>
								 <div class="modal-body">
									<h5 style="text-align: center">Você realmente deseja sair do jogo?</p>
								 </div>
								 <div class="modal-footer">
									<button type="button" class="btnPadrao" style="font-size: 10px; left: 17px;" onclick="sair()">Sim</button>
									<button type="button" class="btnPadrao" data-dismiss="modal" style="position: relative; font-size: 10px;" >Não</button>
								 </div>
					</div>
				</div>
			</div>
			<!-- .CONFIRMACAO -->

			<!-- PRIMEIRA PARTE -->
			<div class="modal fade primeiraParte modalHistoria" id="parte_1" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
				<div class="modal-dialog modal-lg modal-dialog-centered" role="document">
					<div class="modal-content">
						<section class="section overview">
							<div class="container">
								<div class="grid">
									<a href="#" class="item">
										<img class="image" src="assets/img/QUADROS/QUADRO 1.png" alt="Img">
										<div class="details">
											<h3 style="user-select: none" >Parte 1</h3>
										</div>
										</a>
										<a href="#" class="item">
										<div class="image">
														<p id="historia_1" class="text"> Uma empresa que produzia armas biológicas acabou deixando escapar, por acidente, um vírus letal altamente contagioso. 

														</p>
													</div>
										<div class="details">
											<h3></h3>
											<p></p>
										</div>
									</a>
								</div>
							</div>
						</section>
						<div class="modal-footer">
							<button type="button" class="btn8" data-dismiss="modal" data-toggle="modal" data-target=".nomeUsuario"> Pular </button>
							<button type="button" autofocus class="btn8 btnModal" data-dismiss="modal" data-toggle="modal" data-target=".segundaParte" onclick="escrever(2)" > Próximo </button>
						</div>
					</div>
				</div>
			</div>
			<!-- .PRIMERIA PARTE -->
			<!-- SEGUNDA PARTE -->
			<div class="modal fade segundaParte modalHistoria" id="parte_2" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
				<div class="modal-dialog modal-lg modal-dialog-centered" role="document">
					<div class="modal-content">
						<section class="section overview">
							<div class="container">
								<div class="grid">
									<a href="#" class="item">
										<img class="image" src="assets/img/QUADROS/QUADRO 2.png" alt="Img">
										<div class="details">
											<h3 style="user-select: none" >Parte 2</h3>
										</div>
										</a>
										<a href="#" class="item">
										<div class="image">
														<p id="historia_2" class="text"> Vírus este que causava um grande desejo de canibalismo nas pessoas, tornando-os difíceis de matar e extremamente agressivos causando um desastre em escala global. O mundo entrou em um apocalipse, dando assim um nome aos contaminados: zumbi. </p>
													</div>
										<div class="details">
											<h3></h3>
											<p></p>
										</div>
									</a>
								</div>
							</div>
						</section>
						<div class="modal-footer">
							<button type="button" class="btn8 btnModal" data-toggle="modal" data-dismiss="modal" data-target=".terceiraParte" onclick="escrever(3)" autofocus>Próximo</button>
						</div>
					</div>
				</div>
			</div>
			<!-- .SEGUNDA PARTE -->
			<!-- TERCEIRA PARTE -->
			<div class="modal fade terceiraParte modalHistoria" id="parte_3" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
				<div class="modal-dialog modal-lg modal-dialog-centered" role="document">
					<div class="modal-content">
						<section class="section overview">
							<div class="container">
								<div class="grid">
									<a href="#" class="item">
										<img class="image" src="assets/img/QUADROS/QUADRO 3.png" alt="Img">
										<div class="details">
											<h3 style="user-select: none" >Parte 3</h3>
										</div>
										</a>
										<a href="#" class="item">
										<div class="image">
														<p id="historia_3" class="text"> Em meio a um cenário paradigmático da sociedade, o apocalipse tornou a vida de um pai de família num matador. </p>
													</div>
										<div class="details">
											<h3></h3>
											<p></p>
										</div>
									</a>
								</div>
							</div>
						</section>
						<div class="modal-footer">
							<button type="button" class="btn8 btnModal" data-toggle="modal" data-dismiss="modal" data-target=".nomeUsuario" >Próximo</button>
						</div>
					</div>
				</div>
			</div>
			<!-- .TERCEIRA PARTE -->
			<!-- MODAL - NOME JOGADOR -->
			<div class="modal fade nomeUsuario" id="modalNomeJogador" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
				<div class="modal-dialog modal-sm modal-dialog-centered" role="document">
					<div class="modal-content">
						<div class="modal-body">
							<form id="formPlayer">
								<div class="form-group">
									<label for="exampleInputEmail1">Digite seu nome</label>
									<input type="text" autocomplete="off" name="nome" class="form-control" id="nomeJogador" placeholder="Nome" required>
								</div>
							</form>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn8 btnModal" data-toggle="modal" data-dismiss="modal" data-target=".tutorial" >Próximo</button>
							<audio class="audioPrincipal">
								<source src="assets/midia/musicaJogo.mp3" type="audio/mpeg">
							</audio>
						</div>
					</div>
				</div>
			</div><!-- .MODAL - NOME JOGADOR -->
			<!-- MODAL - TUTORIAL -->
			<div class="modal fade tutorial modalHistoria" id="parte_tutorial" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
				<div class="modal-dialog modal-lg modal-dialog-centered" role="document">
					<div class="modal-content">
						<section class="section overview">
							<div class="container">
								<img src="assets/imagens/tutorial.png" alt="" style="width: 100%">
							</div>
						</section>
						<div class="modal-footer">
						<button type="button" autofocus class="btn8 btnModal" data-toggle="modal" data-dismiss="modal" data-target=".bs-example-modal-lg" onclick="start(), playMusic()">Iniciar</button>
						</div>
					</div>
				</div>
		</div><!-- .MODAL - TUTORIAL -->

		<!-- MODAL - RANK -->
		<div class="modal fade rank" id="rank" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
				<div class="modal-dialog modal-lg modal-dialog-centered" role="document">
					<div class="modal-content">
						<div class="modal-body">
							<table class="table" id="tabela">
								<thead align="center" >
									<tr>
										<th class="colocacao" id="colocao">#</th>
										<th class="nome" id="nome">Nome</th>
										<th class="ponto" id="ponto">Pontuação</th>
									</tr>
								</thead>
								<tbody>
									
								</tbody>
							</table>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn8 btnModal" data-toggle="modal" data-dismiss="modal" data-target=".bs-example-modal-lg" onclick="restart()">Recomeçar</button>
							<audio class="audioPrincipal">
								<source src="assets/midia/musicaJogo.mp3" type="audio/mpeg">
							</audio>
						</div>
					</div>
				</div>
			</div>
			<!-- .MODAL - RANK -->
		
		<script src="assets/js/jquery.js"></script>
		<script type="text/javascript" src="sprites.js"></script>
		<script type="text/javascript" src="jojinho.js"></script>
		<script src="assets/bootstrap/js/bootstrap.min.js"></script>
		<script>
			
			document.addEventListener('keydown', (event) => {
				let key = event.keyCode
				console.log(key)
				// let key = event.keyCode;
				// if(key == 13) {
				// 	start()
				// }
			})
		</script>
	</body>
</html>