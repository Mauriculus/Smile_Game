//definição de variáveis
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let moedas = 0;
let jogar = true;

const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');
const btnComprar = document.getElementById('comprar');

const audioRuim = document.getElementById("tiro");
const audioBom = document.getElementById("moeda");

//definição de funções


function pararSom() {
  audioRuim.pause();
  audioRuim.currentTime = 0;

  audioBom.pause()
  audioBom.currentTime = 0;

  musica.pause();
  musica.currentTime = 0;
}

function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  moedas = 0;
  jogar = true;
  jogarNovamente();
  atualizaPlacar(0, 0);
  pararSom();
  btnJogarNovamente.className = 'visivel';
  btnReiniciar.className = 'invisivel';
  btnComprar.className = "invisivel"
}

function jogarNovamente() {
  jogar = true;
  pararSom();
  let divis = document.getElementsByTagName("div");
  for (i = 0; i < divis.length; i++) {
    if (divis[i].id == 0 || divis[i].id == 1 || divis[i].id == 2 || divis[i].id == 3 || divis[i].id == 4) {
      divis[i].className = "inicial";
    }
  }
  //remover imagem
  let imagem = document.getElementById("imagem");
  if (imagem != null) {
    imagem.remove();
  }
  
  let imagemErro = document.getElementById("imagem-erro");
  if (imagemErro != null) {
    imagemErro.remove();
  }
    let Pinguim = document.getElementById("pinguim");
  if (imagemErro != null) {
    imagemErro.remove();
  }
}
//atualizar placar
function atualizaPlacar(acertos, tentativas) {
  desempenho = (acertos / tentativas) * 100;
  document.getElementById("resposta").innerHTML = "Placar - Acertos: " + acertos + " Tentativas: " + tentativas + " Desempenho: " + Math.round(desempenho) + "%" + " Moedas: " + moedas;
  if (moedas >= 2){
    btnComprar.className = "visivel"
  } else{
    btnComprar.className = "invisivel"
  }
}
//função erro e acerto e imagens e pinguim
function acertou(obj) {
  obj.className = "acertou";
  const img = new Image(100);
  img.id = "imagem";
  img.src = "https://www.caravelascolecoes.com.br/media/catalog/product/cache/1/image/430x430/bf8fb1d3de8d88c284fafe994ee50ff1/5/5/5591600095506frente.jpg";
  obj.appendChild(img);
}

function errou(obj) {
  audioRuim.play();
  obj.className = "errou";
  const img = new Image(100);
  img.id = "imagem-erro";
  img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWdhShcKDdmFIKBAvqwob_3LGZdkwRApt4Z9bLGXhSe82sJuRRRm55ccIKz5JtJ91rSxk&usqp=CAU";
  obj.appendChild(img);
}

function comprarPinguim(){
  if(moedas >= 2){
    moedas -= 2;
    alert("Boa")
    atualizaPlacar(acertos, tentativas)
  }
}

//verificação de acerto
function verifica(obj) {
  if (jogar) {
    jogar = false;
    tentativas++;
    //checa pra ver se tem tentativas
    if (tentativas == 5) {
      btnJogarNovamente.className = 'invisivel';
      btnReiniciar.className = 'visivel';
    }
    //sorteia a carta
    let sorteado = Math.floor(Math.random() * 0);
    if (obj.id == sorteado) {
      //chama a função caso acertou
      acertou(obj);
      audioBom.play()
      acertos++;
      moedas++;
      //chama a função caso errou
    } else {
      errou(obj);
      const objSorteado = document.getElementById(sorteado);
      acertou(objSorteado);
    }
    atualizaPlacar(acertos, tentativas);
  } else {
    alert('Clique em "Jogar novamente"');
  }
}


//checa quando o botao é clicado
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);
btnComprar.addEventListener('click', comprarPinguim);