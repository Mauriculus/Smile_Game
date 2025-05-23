//definição de variáveis
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let moedas = 0;
let jogar = true;

const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');
const btnComprar = document.getElementById('comprar');
const imagemPinguimEl = document.getElementById("imagemPinguim"); // Cache a referência

const audioRuim = document.getElementById("tiro");
const audioBom = document.getElementById("moeda");

//definição de funções

function pararSom() {
  audioRuim.pause();
  audioRuim.currentTime = 0;

  audioBom.pause();
  audioBom.currentTime = 0;

  // Removido:
  // musica.pause();
  // musica.currentTime = 0;
}

function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  moedas = 0;
  jogar = true;
  jogarNovamente(); // Isso já redefine os divs e para o som
  atualizaPlacar(acertos, tentativas); // Será 0 acertos, 0 tentativas
  // pararSom(); // Já chamado em jogarNovamente
  btnJogarNovamente.className = 'visivel'; // Ou remova 'invisivel'
  btnReiniciar.className = 'invisivel';
  btnComprar.className = "invisivel";
  imagemPinguimEl.className = "invisivel"; // Esconder pinguim ao reiniciar
}

function jogarNovamente() {
  jogar = true;
  pararSom();
  // let divis = document.getElementsByTagName("div"); // Melhor ser mais específico
  const divsClicaveis = document.querySelectorAll('#linha1 > div.inicial, #linha1 > div.acertou, #linha1 > div.errou');

  for (let i = 0; i < divsClicaveis.length; i++) {
    const div = divsClicaveis[i];
    div.className = "inicial";
    div.innerHTML = div.id; // Restaura o número original como conteúdo
  }

  // Remover imagens não é mais necessário aqui se o innerHTML for resetado
  // let imagem = document.getElementById("imagem");
  // if (imagem != null) {
  //   imagem.remove();
  // }
  // let imagemErro = document.getElementById("imagem-erro");
  // if (imagemErro != null) {
  //   imagemErro.remove();
  // }

  // Não precisa esconder o pinguim aqui, apenas no reiniciar ou se a lógica mudar
  // imagemPinguimEl.className = "invisivel";
}

//atualizar placar
function atualizaPlacar(acertos, tentativas) {
  if (tentativas > 0) {
    desempenho = (acertos / tentativas) * 100;
  } else {
    desempenho = 0; // Evitar divisão por zero
  }
  document.getElementById("resposta").innerHTML = "Placar - Acertos: " + acertos + " Tentativas: " + tentativas + " Desempenho: " + Math.round(desempenho) + "%" + " Moedas: " + moedas;
  if (moedas >= 2) {
    btnComprar.className = "visivel"; // Ou remova 'invisivel'
  } else {
    btnComprar.className = "invisivel";
  }
}

//função erro e acerto e imagens e pinguim
function acertou(obj) {
  obj.className = "acertou";
  obj.innerHTML = ""; // Limpa o número antes de adicionar a imagem
  const img = new Image(100);
  img.id = "imagem-acerto-" + obj.id; // Dando IDs únicos, embora não estritamente necessário com a limpeza do innerHTML
  img.src = "https://www.caravelascolecoes.com.br/media/catalog/product/cache/1/image/430x430/bf8fb1d3de8d88c284fafe994ee50ff1/5/5/5591600095506frente.jpg";
  obj.appendChild(img);
}

function errou(obj) {
  audioRuim.play();
  obj.className = "errou";
  obj.innerHTML = ""; // Limpa o número antes de adicionar a imagem
  const img = new Image(100);
  img.id = "imagem-erro-" + obj.id; // Dando IDs únicos
  img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWdhShcKDdmFIKBAvqwob_3LGZdkwRApt4Z9bLGXhSe82sJuRRRm55ccIKz5JtJ91rSxk&usqp=CAU";
  obj.appendChild(img);
}

function comprarPinguim() {
  if (moedas >= 2) {
    moedas -= 2;
    atualizaPlacar(acertos, tentativas);
    // const imagemPinguim = document.getElementById("imagemPinguim"); // Corrigido
    imagemPinguimEl.className = "visivel"; // Ou remova 'invisivel'
  }
}

//verificação de acerto
function verifica(obj) {
  if (jogar) {
    jogar = false;
    tentativas++;
    //checa pra ver se tem tentativas
    if (tentativas >= 5) { // Use >= para garantir que pare em 5
      btnJogarNovamente.className = 'invisivel';
      btnReiniciar.className = 'visivel'; // Ou remova 'invisivel'
    }
    //sorteia a carta
    let sorteado = Math.floor(Math.random() * 5); // CORRIGIDO: sortear de 0 a 4
    
    if (obj.id == sorteado.toString()) { // Compare string com string (IDs são strings)
      //chama a função caso acertou
      acertou(obj);
      audioBom.play();
      acertos++;
      moedas++;
      //chama a função caso errou
    } else {
      errou(obj);
      const objSorteado = document.getElementById(sorteado.toString());
      if (objSorteado) { // Adiciona uma verificação para o caso de algo dar errado
         acertou(objSorteado);
      } else {
        console.error("Div sorteado não encontrado:", sorteado);
      }
    }
    atualizaPlacar(acertos, tentativas);
  } else {
    if (tentativas < 5) { // Só mostra o alerta se ainda pode jogar novamente
        alert('Clique em "Jogar novamente"');
    } else {
        alert('O jogo acabou! Clique em "Reiniciar" para começar de novo.');
    }
  }
}


//checa quando o botao é clicado
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);
btnComprar.addEventListener('click', comprarPinguim);

// Chamar para inicializar o placar
atualizaPlacar(acertos, tentativas);