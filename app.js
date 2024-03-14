// Declaração de variáveis globais
let listaDeNumerosSorteados = []; // Lista para armazenar os números sorteados
let numeroLimite = 10; // Define o limite para o número secreto
let numeroSecreto = gerarNumeroAleatorio(); // Gera o número secreto aleatório
let tentativas = 1; // Contador de tentativas do jogador

// Função para exibir texto na tela usando a API responsiveVoice
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

// Função para exibir a mensagem inicial do jogo
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

// Chamada da função para exibir a mensagem inicial ao carregar a página
exibirMensagemInicial();

// Função para verificar o chute do jogador
function verificarChute() {
    let chute = document.querySelector('input').value;
    
    // Verifica se o chute é igual ao número secreto
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        // Se o chute for incorreto, exibe uma dica e incrementa o contador de tentativas
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

// Função para gerar um número aleatório e garantir que não seja repetido
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    // Se todos os números no intervalo já foram sorteados, reinicia a lista
    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    // Se o número já foi sorteado, chama recursivamente para gerar outro número
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        // Adiciona o número à lista de números sorteados e retorna o número
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    }
}

// Função para limpar o campo de entrada após cada tentativa
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    // Gera um novo número secreto, limpa o campo de entrada, reinicia as tentativas e exibe a mensagem inicial
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}
