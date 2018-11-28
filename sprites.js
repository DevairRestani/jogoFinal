function Sprite(x, y, largura, altura){
    this.x = x;
    this.y = y;
    this.largura = largura;
    this.altura = altura;

    this.desenha = function (xCanvas, yCanvas){
        ctx.drawImage(imagem, this.x, this.y, this.largura, this.altura, xCanvas, yCanvas, this.largura, this.altura);
    }
}

var background = new Sprite(0, 0, 1000, 450);
var onibus = [new Sprite(0, 0, 120, 296), new Sprite(1, 0, 100, 230), new Sprite(4, 0, 100, 212)];
var braco = new Sprite(0, 0, 26, 10);
var spritePersonagem = [new Sprite(0, 0, 19, 52), new Sprite(27, 2, 18, 50)];
var personagemPerdeu = new Sprite(0, 0, 33, 52);
var spriteInimigo = [[new Sprite(0, 0, 23, 53), new Sprite(38, 1, 61, 53)], 
                     [new Sprite(0, 0, 28, 53), new Sprite(36, 0, 65, 53)], 
                     [new Sprite(0, 0, 26, 46), new Sprite(39, 32, 90, 48)]];