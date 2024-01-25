// Criando uma variável para receber uma determinada tag do HTML

// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do número secreto';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

// Para fins de boa prática de produção cria-se uma função para gerar os textos puxados pela tag

function exibirMensagemInicial() {
    exibirTexto('h1','Jogo do número secreto');
    exibirTexto('p','Escolha um número entre 1 e 10:');
}

function exibirTexto(tag ,texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2})
}

exibirMensagemInicial();
// Criando lista para ver quais números já foram sorteados.
let listaNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function verificarChute(){
    // Para buscar um valor de um input utilizo o .value
    let chute = document.querySelector('input').value;
    // console.log(chute == numeroSecreto);
    // console.log(numeroSecreto);
    if(numeroSecreto == chute){
        exibirTexto('h1','Parabéns!');
        // operador ternário
        let palavraTentativa = tentativas > 1 ? 'tentativas':'tentativa';
        let mensagemTentativas = `Você acertou após ${tentativas} ${palavraTentativa}!`
        exibirTexto('p', mensagemTentativas);
        // Capturando um elemento do HTML usando o método getElementById e removendo o atributo 'disabled'.
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if(chute > numeroSecreto){
            exibirTexto('h1','Você errou!');
            exibirTexto('p','O número é menor...');
            limparCampo();
        } else {
            exibirTexto('h1','Você errou!');
            exibirTexto('p','O número é maior...');
            limparCampo();
        }   
    }
    tentativas++;
    
}

function gerarNumeroAleatorio(){
   let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
   let quantidadeElementosNaLista = listaNumerosSorteados.length;
    if(quantidadeElementosNaLista == numeroLimite){
        listaNumerosSorteados = [];
    }

   if(listaNumerosSorteados.includes(numeroEscolhido)){
    return gerarNumeroAleatorio();
   } else {
    // Adicionando o número escolhido a lista.
    listaNumerosSorteados.push(numeroEscolhido);
    return numeroEscolhido;
   }
    // O includes verifica se o item selecionado está dentro da lista
}

// função para limpar o campo em caso de erro
function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    // passo 1 - número secreto foi sorteado.
    numeroSecreto = gerarNumeroAleatorio;
    // passo 2 - o campo precisa estar limpo.
    limparCampo();
    //passo 3 - precisa resetar as tentativas;.
    tentativas = 1;
    // passo 4 - reintroduz o texto inicial.
    exibirMensagemInicial();
    // passo 5 - para manter o status d botão desabilitado enquanto a resposta não for correta.
    // Usando agora o método setAttribute para validar o atributo 'disabled' do botão reiniciar. 
    documento.getElementById('reiniciar').setAttribute('disabled',true);

}