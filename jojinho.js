var ctx, ALTURA = 450, LARGURA = 1000, frame = 0,
intervaloTiro, intervaloFrameZumbi,
xMouse = 0, yMouse = 0, //Coordenadas do mouse
xEixo = LARGURA/2, yEixo = ALTURA/2, //Coordenadas do Eixo do Braço do personagem
xPersonagem = xEixo - 5, yPersonagem = yEixo - 20, //Coordenadas do personagem
keyUp = false, keyDown = false, pause = false,//Variaveis para teclado
coefAngular = -10,//Angulo de inclinação da plataforma,personagem e arma
tamanhoVetorBala = 0, tamanhoVetorInimigos = 0 //Tamanho de vetores
tempoSpawn = 2, //tempo de spawn de inimigos
imagem = new Image(),

coefLinear = {
    eixo: encontrarCoefLinear(-xEixo, yEixo, coefAngular),
    personagem: encontrarCoefLinear(-xPersonagem, yPersonagem, coefAngular),
},

jogador = {
    nome: "",
    score: 0,

    desenharPontuacao: function(){
        let pontuacao = this.score.toString();

        console.log(pontuacao);

        let nCaracteres = pontuacao.length;
        let textoFinal = "";

        while(nCaracteres < 6){
            textoFinal += "0";
            nCaracteres++;
        }

        textoFinal += pontuacao;

        ctx.font = "18px 'Press Start 2P'"
        ctx.fillStyle = "#FFF";
        ctx.fillText("Pontuacao", LARGURA - 200, 45);
        ctx.fillText(textoFinal, LARGURA - 170, 65);
    }
},

chao = {
    y: [ALTURA - 115, ALTURA - 70, ALTURA - 15],
    alturaImagem: 145
},

inimigos = {
    QTDE: [],
    vemDaEsquerda: 0,
    estado: {
        andando: 0,
        atacando: 1,
        morrendo: 2
    },
    limite: [],
    tipos: [
        {
            larguraBase: 25,
            alturaBase: 65, 
            velocidadeBase: 10,
            // dano: 2.5,
            dano: 10,
            pontuacao: 5
        }
    ],
    inimigos: this,

    criar: function(){
        if(frame % tempoSpawn == 0){
            let tipo = Math.floor(0 * Math.random());
            let lado = Math.floor(2 * Math.random());
            let yInicial = Math.floor(3 * Math.random());
            let xInicial = lado * LARGURA;

            if(xInicial != LARGURA){
                xInicial -= inimigos.tipos[tipo]["larguraBase"];
            }

            let objeto = {
                x: xInicial,
                y: yInicial,
                localizacao: lado,
                especie: tipo,
                vida: 100,
                spriteAtual: 0,
                status: inimigos.estado.andando,
                contador: 0,
                somadorTerreno: 0, //Temporario para FATEC aberta
                decrescimoTamanho: 0, //Temporario para FATEC aberta
                intervaloSprites: setInterval(function(){
                                                          objeto.spriteAtual++;
                                                        }, 400)
            }

            if(lado == 1)
                inimigos.QTDE.push(objeto);
            else{
                inimigos.QTDE.unshift(objeto);
                inimigos.vemDaEsquerda++;
            }

            tamanhoVetorInimigos++;

            tempoSpawn = Math.floor(300 * Math.random()) + 1;
        }
    },

    atualizar: function(){
        let i, atual;

        inimigos.criar();

        for(i = 0; i < tamanhoVetorInimigos; i++){
            atual = inimigos.QTDE[i];

            if(atual.status == inimigos.estado.morrendo && atual.spriteAtual == spriteInimigo[atual.status].length){
                if(i < inimigos.vemDaEsquerda){
                    inimigos.vemDaEsquerda--;
                }

                inimigos.QTDE.splice(i, 1);
                tamanhoVetorInimigos--;
            }else if(atual.vida <= 0 && atual.status != inimigos.estado.morrendo){
                jogador.score += inimigos.tipos[atual.especie]["pontuacao"];
                atual.status = inimigos.estado.morrendo;
                atual.spriteAtual = 0;
            }else if(atual.status == inimigos.estado.andando){
                if(atual.localizacao == 1){ // 1 = Vem da direita
                    if(atual.x <= inimigos.limite[atual.y] + plataforma.largura){
                        atual.status = inimigos.estado.atacando;
                        atual.contador = -1;
                    }
                    atual.x -= inimigos.tipos[atual.especie]["velocidadeBase"];
                }else{
                    if(atual.x + inimigos.tipos[atual.especie]["larguraBase"] >= inimigos.limite[atual.y]){
                        atual.status = inimigos.estado.atacando;
                        atual.contador = -1;
                    }
                    atual.x += inimigos.tipos[atual.especie]["velocidadeBase"];
                }
            }else if(atual.status == inimigos.estado.atacando && atual.contador == 30){
                plataforma.vida -= inimigos.tipos[atual.especie]["dano"];
                atual.contador = -1;
            }else if(atual.spriteAtual == 0 && atual.status == inimigos.estado.morrendo){ //Temporario
                atual.decrescimoTamanho = 10;
            }else if(atual.spriteAtual == 1 && atual.status == inimigos.estado.morrendo){ //Temporario
                atual.decrescimoTamanho = 40;
            }

            atual.contador++;
        }
    },

    desenhar: function(inicio, fim){
        for(let i = inicio; i < fim; i++){
            let atual = inimigos.QTDE[i];

            imagem = new Image();
            imagem.src = "imagens/Inimigos/Zumbi " + atual.especie + "/" + atual.localizacao + "/" + atual.status + ".png";

            spriteInimigo[atual.status][atual.spriteAtual % spriteInimigo[atual.status].length].desenha(atual.x, chao.y[atual.y] - 
                                                                                                        inimigos.tipos[atual.especie]["alturaBase"] -
                                                                                                        atual.somadorTerreno + atual.decrescimoTamanho);                                                                                            
        }
    }
},

arma = {
    velocidadeLocomocao: 0.25,
    largura: 25,
    altura: 10,
    CD: 1 * 500,
    desenharPrimeiro: false,

    atualizar: function(event){
        xMouse = event.clientX - window.innerWidth/2 + LARGURA/2;
        yMouse = event.clientY - window.innerHeight/2 + ALTURA/2 + 4.5;
    },

    atualizarEixo: function(){
        if(keyUp && yPersonagem + personagem.altura > ALTURA - chao.alturaImagem - plataforma.altura + plataforma.extremoSuperior){
            xEixo -= this.velocidadeLocomocao;
            yEixo = encontrarY(coefAngular, -xEixo, coefLinear.eixo);
        }else if(keyDown && yPersonagem + personagem.altura < ALTURA - plataforma.altura){
            xEixo += this.velocidadeLocomocao;
            yEixo = encontrarY(coefAngular, -xEixo, coefLinear.eixo);
        }
    },

    desenhar: function(){
        if(personagem.perdeu == false){
            imagem = new Image();

            ctx.save();
            ctx.translate(xEixo, yEixo);
    
            let x = xMouse - xEixo;
            let y = yMouse - yEixo;
            
            if(x >= 0){
                ctx.rotate(Math.atan(y/x));
                imagem.src = "imagens/Personagem/bracoDireita.png";
                this.desenharPrimeiro = false;
                braco.desenha(0, -7);
            }else{
                ctx.rotate(Math.atan(y/x) + Math.PI);
                imagem.src = "imagens/Personagem/bracoEsquerda.png";
                this.desenharPrimeiro = true;
                braco.desenha(-2, -2);
            }
            ctx.restore();
        }
    }
},

bala = {
    QTDE: [],
    velTraj: 30,
    dano: 20,
    alcanceMax: Math.sqrt(Math.pow(LARGURA/2, 2) + Math.pow(ALTURA/2, 2)),

    criarTiro: function() {
        tamanhoVetorBala++;
        let x = xMouse - xEixo;
        let y = yMouse - yEixo;
        let anguloBala = Math.atan(y/x);

        if(x < 0)
            anguloBala += Math.PI;

        bala.QTDE.push({
            eixoX: xEixo,
            eixoY: yEixo,
            angulo: anguloBala,
            raio: [0]
        });
    },

    desativarTiro: function(event){
        clearInterval(intervaloTiro);  
    },
    
    buscarColisao: function(angulo, bala){
        let x, y, sinalOriginal = [1, 1]; //sinalOriginal[x, y]

        //(Inicio) salvando sinais de x e y originais e convertendo para um angulo de primeiro quadrante (Menor que 90 graus)
        if(angulo > Math.PI){
            sinalOriginal[0] = -1;
            sinalOriginal[1] = -1;
            angulo -= Math.PI;
        }else if(bala.angulo < 0){
            sinalOriginal[1] = -1;
            angulo *= -1;
        }
        //(Fim) salvando sinais de x e y originais e convertendo para um angulo de primeiro quadrante (Menor que 90 graus)

        //(Inicio) nivelando x e y com o context
        x = bala.raio * Math.cos(angulo) * sinalOriginal[0] + bala.eixoX;
        y = bala.raio * Math.sin(angulo) * sinalOriginal[1] + bala.eixoY;
        //(Fim) nivelando x e y com o context

        for(let i = 0; i < tamanhoVetorInimigos; i++){
            inimigo = inimigos.QTDE[i];

            if(inimigo.status != inimigos.estado.morrendo && x >= inimigo.x && x <= inimigo.x + inimigos.tipos[inimigo.especie]['larguraBase'] &&
            y >= chao.y[inimigo.y] - inimigos.tipos[inimigo.especie]['alturaBase'] && y <= chao.y[inimigo.y]){
        
                inimigo.vida -= this.dano;
                return(true);
            }
        }

        return(false);
    },

    atualizar: function() {
        let atual;

        for(var i = 0; i < tamanhoVetorBala; i++) {
            atual = this.QTDE[i];

            atual.raio[0] += this.velTraj;

            if(atual.raio > this.alcanceMax || this.buscarColisao(atual.angulo, atual)){
                tamanhoVetorBala--;
                this.QTDE.splice(i, 1);
            }
        };
    },

    desenhar: function() {
        for(var i = 0; i < tamanhoVetorBala; i++) {
            let aux = bala.QTDE[i];

            ctx.save();
            ctx.translate(aux.eixoX, aux.eixoY);
            ctx.rotate(aux.angulo);
            ctx.strokeStyle = "#FFC100";
            ctx.lineWidth = 2;

            ctx.beginPath();
            if(aux.raio[0] - 30 > arma.largura)
                ctx.moveTo(aux.raio[0] - 30, -4.5);
            else
                ctx.moveTo(arma.largura, -4.5);

            ctx.lineTo(aux.raio[0], -4.5);
            ctx.stroke();
            ctx.closePath();

            ctx.restore();
        };
    }
},

personagem = {
    largura: 15,
    altura: 30,
    spriteAtual: 0,
    frameTroca: 10,
    velocidadeLocomocao: arma.velocidadeLocomocao,
    perdeu: false,

    atualizar: function(){
        if(keyUp && yPersonagem + this.altura > ALTURA - chao.alturaImagem - plataforma.altura + plataforma.extremoSuperior){
            xPersonagem -= this.velocidadeLocomocao;
            yPersonagem = encontrarY(coefAngular, -xPersonagem, coefLinear.personagem);
        }else if(keyDown && yPersonagem + this.altura < ALTURA - plataforma.altura){
            xPersonagem += this.velocidadeLocomocao;
            yPersonagem = encontrarY(coefAngular, -xPersonagem, coefLinear.personagem);
        }
    },

    centralizado: function(){
        if(yPersonagem > 290){ 
            keyUp = true;
            return(false);
        }else if(yPersonagem < 290){
            keyDown = true;
            return(false);
        }else{
            keyUp = false;
            keyDown = false;
            return(true);
        }
    },

    desenhar: function(){
        imagem = new Image();

        if(this.perdeu == false){
            if(arma.desenharPrimeiro == true)
                imagem.src = "imagens/Personagem/esquerda.png";
            else
                imagem.src = "imagens/Personagem/direita.png";
    
            if((keyUp || keyDown) && frame % this.frameTroca == 0){
                this.spriteAtual++;
    
                if(this.spriteAtual == spritePersonagem.length){
                    this.spriteAtual = 0;
                }
            }
                
            spritePersonagem[this.spriteAtual].desenha(xPersonagem, yPersonagem);
        }else{
            imagem.src = "imagens/Personagem/morto.png";
            personagemPerdeu.desenha(xPersonagem - 5, yPersonagem + 10);
        }
    }
},

plataforma = {
    largura: 85,
    altura: 90,
    vida: 200,
    vidaMax: 200,
    extremoSuperior: 0,

    buscarExtremidades: function(){
        let xAux = LARGURA/2 - this.largura/2;
        let yAux = ALTURA/2 - this.altura/2;
        let coLinear;

        yAux += this.altura;

        coLinear = encontrarCoefLinear(-xAux, yAux, coefAngular);
        inimigos.limite.push(encontrarX(coefAngular, chao.y[0], coLinear));
        inimigos.limite.push(encontrarX(coefAngular, chao.y[1], coLinear));
        inimigos.limite.push(encontrarX(coefAngular, chao.y[2], coLinear));
        xAux = encontrarX(coefAngular, ALTURA, coLinear);
    },

    atualizar25: function(){
        let alturaAnterior = this.altura; 

        this.altura = 65;
        this.extremoSuperior = 15;
        this.largura = 70;

        if(alturaAnterior - this.altura != 0){
            yPersonagem += alturaAnterior - this.altura + this.extremoSuperior;
            xPersonagem = encontrarX(coefAngular, yPersonagem, coefLinear.personagem);

            yEixo += alturaAnterior - this.altura + this.extremoSuperior;
            xEixo = encontrarX(coefAngular, yEixo, coefLinear.eixo);
        }
    },

    atualizar0: function(){
        this.altura = 55;
        inimigos.limite = 0;

        for(i=0;i<tamanhoVetorInimigos;i++){
            temporario = inimigos.QTDE[i];

            if(temporario.status == inimigos.estado.atacando){
                temporario.somadorTerreno = 8;
                temporario.status = inimigos.estado.andando;
            }
        }
    },

    desenhar: function(){
        let xAux = LARGURA/2 - this.largura/2;
        let yAux = ALTURA - chao.alturaImagem - this.altura;

        imagem = new Image();

        if(this.vida > this.vidaMax * 0.25){
            imagem.src = "imagens/Onibus/100.png";
            onibus[0].desenha(xAux, yAux);
        }else if(this.vida > 0){
            imagem.src = "imagens/Onibus/25.png";
            this.atualizar25();
            onibus[1].desenha(xAux - 4, yAux);
        }else if(this.vida <= 0 && personagem.perdeu == false){
            gameover(xAux - 4, yAux);
        }else{
            imagem.src = "imagens/Onibus/0.png";
            plataforma.atualizar0();
            onibus[2].desenha(xAux - 4, yAux);    
        }
    },

    desenharVida: function(){
        let green = 200;
        let red = (green - this.vida) * 2;
        let xInicial = 25;
        let yInicial = 25;

        if(red > green){
            green = green - (red - green);
        }

        ctx.fillStyle = "#000";
        ctx.fillRect(xInicial - 2, yInicial - 2, this.vidaMax + 4, yInicial + 4);

        ctx.fillStyle = "rgba("+ red +", "+ green +", 0)";
        if(this.vida >= 0)
            ctx.fillRect(xInicial, yInicial, this.vida, yInicial);
        
        ctx.fillStyle = "#FFF";
        ctx.font = "10px 'Press Start 2P'";
        ctx.fillText("ONIBUS", xInicial + 4, yInicial + yInicial/1.20);
    }
};

function main(){
    let canvas;

    canvas = document.getElementById('tela');
    canvas.width = LARGURA;
    canvas.height = ALTURA;

    ctx = canvas.getContext('2d');

    window.addEventListener("mousemove", arma.atualizar);
    window.addEventListener("keydown", teclaPressionada);
    window.addEventListener("keyup", inativarTecla);
    window.addEventListener("mousedown", mousePressionado);
    window.addEventListener("mouseup", bala.desativarTiro);

    jogador.score = 0;
    
    ctx.font = "10px 'Press Start 2P'";
    ctx.fillText(" ", 0, 0);

    plataforma.buscarExtremidades();
    rodar();
}

function gameover(x, y){
    if(personagem.centralizado()){
        personagem.perdeu = true;

        window.setTimeout(function(){
                                    $(".nomeUsuarioShow").modal();
                                    console.log("dasdas");
                                    }, 500);
        plataforma.desenhar();
    }else{
        imagem.src = "imagens/Onibus/25.png";
        onibus[1].desenha(x, y);
    }
    salvar(jogador.score);
}

function mousePressionado(event) {
    if(event.button == 0 && plataforma.vida > 0 && pause != true){
        bala.criarTiro();
        intervaloTiro = setInterval(bala.criarTiro, arma.CD);
    }
}

function teclaPressionada(event){
    console.log(event)
    if(plataforma.vida > 0 && (event.keyCode == 38 || event.keyCode == 87) && keyDown == false)
        keyUp = true;
    else if(plataforma.vida > 0 && (event.keyCode == 40 || event.keyCode == 83) && keyUp == false)
        keyDown = true;
    else if(event.keyCode == 80 && pause == false && plataforma.vida > 0) {
        pause = true;
        document.querySelector('#option').style.display = "block";
        document.querySelector('#exit').style.display = "block";
        document.querySelector('#menu').style.display = "block";
    }else if(event.keyCode == 80 && pause == true || event == 80 && pause == true) {
        pause = false;
        document.querySelector('#option').style.display = "none";
        document.querySelector('#exit').style.display = "none";
        document.querySelector('#menu').style.display = "none";
    } 
}

function inativarTecla(event){
    if(keyUp){
        keyUp = false;
    }else if(keyDown){
        keyDown = false;
    }

    personagem.spriteAtual = 0;
}

function encontrarX(a, y, b){
    return(((y - b)/a)*-1);
}

function encontrarY(a, x, b){
    return(a*x + b);
}

function angulo(x1, y1, x2, y2) { 
    return((y2 - y1)/(x2 - x1));
}

function encontrarCoefLinear(x, y, a){
    return(y - a*x);
}

function rodar(){
    frame++;
    atualizar();
    desenhar();

    window.requestAnimationFrame(rodar);
}

function atualizar(){
    if(pause != true){
        inimigos.atualizar();
        arma.atualizarEixo();
        personagem.atualizar();
        bala.atualizar();
    }
}

function desenhar(){
    if(pause !=true){
        imagem = new Image();
        imagem.src = "imagens/background.png";
        background.desenha(0, 0);

        if(personagem.perdeu == false){
            inimigos.desenhar(inimigos.vemDaEsquerda, tamanhoVetorInimigos);
            plataforma.desenhar();
            inimigos.desenhar(0, inimigos.vemDaEsquerda);
        }else{
            plataforma.desenhar();
            inimigos.desenhar(0, tamanhoVetorInimigos);
        }
        plataforma.desenharVida();

        if(arma.desenharPrimeiro == true){
            arma.desenhar();
            personagem.desenhar();
        }else{
            personagem.desenhar();
            arma.desenhar();
        }

        bala.desenhar();
        jogador.desenharPontuacao();
    }
}

let start = () => {
    document.querySelector('main').style.display = "block";
    document.querySelector('#start').style.display = "none";

    jogador.nome = document.querySelector('#nomeJogador').value;

    main();
}

let restart = () => {
    document.location.reload();
}

let opcoes = () => {
    document.querySelector('#opcoes').style.display = "block";
    document.querySelector('#menu').style.display = "none";
    
    document.querySelector('#opcoes').style.webKitTransition = "all 2s";
    document.querySelector('#opcoes').style.transition = "all 2s"; 
}

let retornar = () => {
    teclaPressionada(80);    
}  

let sair = () => {
    location.reload();
}


var brightness = document.querySelector('input#brilho');

var rangeValue = function() {
    var brightnessVal = brightness.value;
    var target = document.querySelector("#tela");

    target.style.filter = "brightness("+brightnessVal+"%)";
};
addEventListener("input", rangeValue);

let voltar= () => {
    document.querySelector('#opcoes').style.display = "none";
    document.querySelector('#menu').style.display = "block";
}

function escrever(text) {
            
    if(text == 1){
        const titulo = document.querySelector('#historia_'+1);
            const textArray = titulo.innerHTML.split('');
            titulo.innerHTML = '';
            textArray.forEach((letra, i) => {
                setTimeout(() => titulo.innerHTML += letra, 45 * i);
        });
    } else if(text == 2){
        const titulo = document.querySelector('#historia_'+2);
            const textArray = titulo.innerHTML.split('');
            titulo.innerHTML = '';
            textArray.forEach((letra, i) => {
                setTimeout(() => titulo.innerHTML += letra, 45 * i);
        });
    } else if(text == 3) {
        const titulo = document.querySelector('#historia_'+3);
            const textArray = titulo.innerHTML.split('');
            titulo.innerHTML = '';
            textArray.forEach((letra, i) => {
                setTimeout(() => titulo.innerHTML += letra, 45 * i);
        });
    }
}

    var audioInicial = document.querySelector('.audioInicial');
    var audioPrincipal = document.querySelector('.audioPrincipal');
    function playInicial(){
        audioInicial.play();
        audioInicial.setAttribute('loop', true);
    }
    function playMusic() {
        audioInicial.pause();
        audioPrincipal.play();
        audioPrincipal.setAttribute('loop', true);
    }
    function stopMusic(){
        audio.pause();
        audio.currentTime=0;
    }

    var antiRepete = true;

    let formName = document.getElementById('formPlayer')
    formName.addEventListener('submit', function(evt){
        evt.preventDefault()
        start()
        playMusic()
        $('#modalNomeJogador').modal('hide')
    })

    function salvar(ponto){
        if(personagem.perdeu && antiRepete){
            antiRepete = false;
            var nome = document.querySelector("#nomeJogador").value;

            $.ajax({
                method: 'POST',
                url: 'api.php',
                data: {
                        nome: nome,
                        ponto: ponto
                },
                success: function(data){
                    gameOver();
                }
            })
        }
    }
    function gameOver() {
        $.ajax({
            url: 'rank.php',
            type: 'GET',
            success: function(res) {
                var result = JSON.parse(res)
                var len = result.length;
                for(var i = 0; i < len; i++){
                    var id = result[i].id;
                    var nome = result[i].nome;
                    var pontos = result[i].pontos;
                    var tr_str = "<tr>" +
                                    "<td align='center'>" + (i+1) + "</td>" +
                                    "<td align='center'>" + nome + "</td>" +
                                    "<td align='center'>" + pontos + "</td>" +
                                "</tr>";

                    $("#tabela tbody").append(tr_str);
                }
                $('#rank').modal('show')
            }
        })
    }
    
    let modalBlock = () => {
        let modal = document.querySelectorAll('.btnModal')
        let modalHistoria = document.querySelectorAll('.btnModal').length

        for(var i = 0; i < modalHistoria; i++){
            modal[i].setAttribute('data-backdrop', 'static')
            modal[i].setAttribute('data-keyboard', false)
        }
    } 
