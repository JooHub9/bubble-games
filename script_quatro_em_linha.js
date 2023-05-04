/*-----Tabuleiro de jogo-----*/
function iniciarJogo() {
    let tabuleiro = document.querySelector("#grelha");
    let aux = "";
    for (let i = 0; i < 7; i++) {
        aux +=
            `<div class="grelha_col">`
        for (let j = 0; j < 6; j++) {

            aux +=
                `<div class="quadrado"><div class="bola"></div></div>`
            if (j === 5) {
                aux +=
                    `</div>`
            }
        }
        tabuleiro.innerHTML = aux;
    }
}

/*-----Temporizador-----*/
let segundos = 0,
    minutos = 0,
    horas = 0,
    tempo = document.getElementsByClassName("tempo")[0],
    t;

function temporizador() {
    segundos++;
    if (segundos === 60) {
        minutos++;
        segundos = 0;
    }
    if (minutos === 60) {
        horas++;
        minutos = 0;
    }
}

function relogio() {
    temporizador();
    tempo.textContent =
        (horas ? horas + ":" : "") +
        (minutos < 10 ? "0" + minutos : minutos) + ":" +
        (segundos < 10 ? "0" + segundos : segundos);
    temporizadorFinal();
}

function temporizadorFinal() {
    t = setTimeout(relogio, 1000);
}

/*-----Pagina Inicial-----*/

/*-----Logica Botao Comecar-----*/
document.querySelector("#comecar").addEventListener("click", function () {
    document.querySelector(".pagina1").style.display = "none";
    document.querySelector(".pagina2").style.display = "block";

//Guardar Nomes

    //Jogador 1
    let nomeJog1 = document.querySelector("#nomeJog1").value;
    let jogEsq = document.querySelector("#jogEsquerda");
    jogEsq.innerHTML = nomeJog1;

    //Jogador 2
    let nomeJog2 = document.querySelector("#nomeJog2").value;
    let jogDrt = document.querySelector("#jogDireita");
    jogDrt.innerHTML = nomeJog2;
   // inputPreenchido(nomeJog1 && nomJog2);// se fiz para os dois inputs ao mesmo tempo, mostra popup duas vezes!

    temporizadorFinal()
})

//Tentativa de confirmar inputs preenchidos -> Não funciona, mas tentei :(
/*function inputPreenchido(nomeJogador) {
    while (nomeJogador === "" || nomeJogador == null) {
        document.querySelector(".janelaVitoria").style.display = "block";
        let frase = document.querySelector("#vencedor");
        frase.innerHTML += "Preencha o(s) nome(s) antes de iniciar o jogo!";
        if (nomeJogador !== "" || nomeJogador !== null) {
            document.querySelector("#menu").style.display = "none"
            document.querySelector("#jogar").addEventListener("click", function () {
                document.querySelector(".janelaVitoria").style.display = "none"
            })
            document.querySelector("#jogar").innerHTML = "Fechar"
            return;
        }
    }
}*/

iniciarJogo()
let jogadorAtual = "jogador1";
let gameOver = false;

/*-----Matriz -> horizontal representa colunas/vertical linhas-----*/
let posicoes = [
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""]
]

/*-----Preenchimento de Espacos-----*/
let colunas = document.querySelectorAll(".grelha_col");
colunas.forEach((coluna, index_coluna) => {
    coluna.addEventListener("click", function () {
            if (gameOver) {
                return;
            }
            let espaco = coluna.querySelectorAll(".bola");
            for (let index_linha = espaco.length - 1; index_linha >= 0; index_linha--) {
                if (!espaco[index_linha].classList.contains("jogador1") && !espaco[index_linha].classList.contains("jogador2")) {
                    espaco[index_linha].classList.add(jogadorAtual);
                    posicoes[index_coluna][index_linha] = jogadorAtual;
                    ganharJogo(jogadorAtual);
                    break;
                }
            }
            alternarJogador()
        }
    )
})

/*-----Mudar jogador-----*/
function alternarJogador() {
    jogadorAtual = jogadorAtual === "jogador1" ? "jogador2" : "jogador1";
    let jogEsq = document.querySelector("#jogEsquerda");
    jogEsq.classList.toggle("jogadorAtualStyle");
    let jogDrt = document.querySelector("#jogDireita");
    jogDrt.classList.toggle("jogadorAtualStyle");
}

/*-----Lógica do Vencedor-----*/
function ganharJogo() {
    /*-----Horizontal-----*/
    for (let c = 0; c < 4; c++) {
        for (let l = 0; l < 6; l++) {
            if (posicoes[c][l] === ("jogador1") &&
                posicoes[c + 1][l] === ("jogador1") &&
                posicoes[c + 2][l] === ("jogador1") &&
                posicoes[c + 3][l] === ("jogador1")) {
                return janelaVitoria(jogadorAtual);
            } else if (posicoes[c][l] === "jogador2" &&
                posicoes[c + 1][l] === "jogador2" &&
                posicoes[c + 2] [l] === "jogador2" &&
                posicoes[c + 3][l] === "jogador2") {
                return janelaVitoria(jogadorAtual);
            }
        }
    }
    /*-----Vertical-----*/
    for (let c = 0; c < 7; c++) {
        for (let l = 0; l < 3; l++) {
            if (posicoes[c][l] === ("jogador1") &&
                posicoes[c][l + 1] === ("jogador1") &&
                posicoes[c][l + 2] === ("jogador1") &&
                posicoes[c][l + 3] === ("jogador1")) {
                return janelaVitoria(jogadorAtual);

            } else if (posicoes[c][l] === "jogador2" &&
                posicoes[c][l + 1] === "jogador2" &&
                posicoes[c][l + 2] === "jogador2" &&
                posicoes[c][l + 3] === "jogador2") {
                return janelaVitoria(jogadorAtual);
            }
        }
    }
    /*-----Diagonal-direita-----*/
    for (let c = 0; c < 4; c++) {
        for (let l = 0; l < 3; l++) {
            if (posicoes[c][l] === ("jogador1") &&
                posicoes[c + 1][l + 1] === ("jogador1") &&
                posicoes[c + 2][l + 2] === ("jogador1") &&
                posicoes[c + 3][l + 3] === ("jogador1")) {
                return janelaVitoria(jogadorAtual);
            } else if (posicoes[c][l] === "jogador2" &&
                posicoes[c + 1][l + 1] === "jogador2" &&
                posicoes[c + 2][l + 2] === "jogador2" &&
                posicoes[c + 3][l + 3] === "jogador2") {
                return janelaVitoria(jogadorAtual);
            }
        }
    }
    /*-----Diagonal-esquerda-----*/
    for (let c = 0; c < 4; c++) {
        for (let l = 3; l < 6; l++) {
            if (posicoes[c][l] === ("jogador1") &&
                posicoes[c + 1][l - 1] === ("jogador1") &&
                posicoes[c + 2][l - 2] === ("jogador1") &&
                posicoes[c + 3][l - 3] === ("jogador1")) {
                return janelaVitoria(jogadorAtual);

            } else if (posicoes[c][l] === "jogador2" &&
                posicoes[c + 1][l - 1] === "jogador2" &&
                posicoes[c + 2][l - 2] === "jogador2" &&
                posicoes[c + 3][l - 3] === "jogador2") {
                return janelaVitoria(jogadorAtual);
            }
        }
    }
    /*-----Empate-----*/
    let num_posicoes_preenchidas = posicoes.flat().filter((espaco) => !!espaco).length;
    if (num_posicoes_preenchidas === 42) {
        empate();
        finalizarJogo();
    }
}

/*-----Janela Empate-----*/
function empate() {
    document.querySelector(".janelaVitoria").style.display = "block";
    let vencedor = document.querySelector("#vencedor");
    vencedor.innerHTML += "Empate! :(";
}

/*-----Janela Vitoria e Respetivos Botoes-----*/
function janelaVitoria(jogadorAtual) {
    document.querySelector(".janelaVitoria").style.display = "block";

    let jogador1 = document.querySelector("#nomeJog1").value;
    let jogador2 = document.querySelector("#nomeJog2").value;
    let vencedor = document.querySelector("#vencedor");

    if (jogadorAtual === "jogador1") {
        vencedor.innerHTML += jogador1 + " venceu!";
    } else if (jogadorAtual === "jogador2") {
        vencedor.innerHTML += jogador2 + " venceu!";

    }
    finalizarJogo();
}

/*-----Ir para Menu-----*/
document.querySelector("#menu").addEventListener("click", function () {
    document.querySelector(".janelaVitoria").style.display = "none";
    window.location.href = "homepage.html"
});

/*-----Jogar de novo-----*/
document.querySelector("#jogar").addEventListener("click", function () {
    document.querySelector(".janelaVitoria").style.display = "none";
    location.reload()
});


/*-----Finalizar jogo e Guardar no Histórico-----*/
function finalizarJogo() {

    clearInterval(t);
    let historico = JSON.parse(localStorage.getItem("historico"));
    if (historico == null) {
        historico = []
    }
    let recorde =
        {
            tipoJogo: document.querySelector("#jogo").textContent,
            data: new Date().toString().slice(4, 21),
            vencedor: document.querySelector(".jogadorAtualStyle").textContent
        };
    historico.push(recorde);
    localStorage.setItem("historico", JSON.stringify(historico));
    gameOver = true;

}







