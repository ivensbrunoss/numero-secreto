let listaDeNumerosEscolhidos = [];
let numeroLimite = 10;
let numeroAleatorio = gerarNumeroAleatorio();
let tentativas = 1;

function exibirtextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirtextoNaTela('h1', 'Jogo do número secreto');
    exibirtextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}`);
}

exibirMensagemInicial()

function verificarChute() {
    let numeroChute = document.querySelector('input').value;
    
    if ( numeroChute == numeroAleatorio) {
        exibirtextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `Você adivinhou o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirtextoNaTela('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (numeroChute > numeroAleatorio) {
            exibirtextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirtextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeNumerosSorteados = listaDeNumerosEscolhidos.length;

    if(quantidadeDeNumerosSorteados == numeroLimite) {
        listaDeNumerosEscolhidos = [];
    }

    if(listaDeNumerosEscolhidos.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosEscolhidos.push(numeroEscolhido);
        console.log(listaDeNumerosEscolhidos);
        return numeroEscolhido;
    }
}

function limparCampo () {
    campo = document.querySelector('input');
    campo.value = '';
}

function reiniciarJogo() {
    numeroAleatorio = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}