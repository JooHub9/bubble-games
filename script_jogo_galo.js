//variaveis

//timer
let h2 = document.getElementsByTagName('h2')[0];
let sec = 0;
let min = 0;
let t;
//jogadores
let jogador1;
let jogador2;
let player;
let rondasJogadas = 0;
let rondasMax = 5
let contadorVitoriasJogador1 = 0;
let contadorVitoriasJogador2 = 0;
let botaoComecar = document.querySelector("#botaoComecar");

//as declaraçoes das funçoes podem estar depois das suas chamadas
//açoes a tomar depois de clicar no botao começar
botaoComecar.addEventListener("click", function (e) {
    iniciar();

    //gravar os valores introduzidos nos inputs dos nomes dos jogadores
    jogador1 = document.querySelector("#nome_jogador1").value
    jogador2 = document.querySelector("#nome_jogador2").value

    //introduz os nomes gravados anteriormente nas caixas
    let caixa1 = document.querySelector("#jogador1")
    let caixa2 = document.querySelector("#jogador2")
    caixa1.innerHTML = "X " + jogador1
    caixa1.style.color="#FF0000"
    caixa2.innerHTML = "O " + jogador2

    //garante que o primeiro jogador é sempre "X"
    player = "X"

    atualizarContadores()

    //esconde a div class pagina1 e mostra div class pagina2
    let pagina1 = document.querySelector(".pagina1")
    pagina1.style.display = "none"
    let pagina2 = document.querySelector(".pagina2")
    pagina2.style.display = "contents"

    timer();
})


//contadores
//selector seleciona o elemento existente no html; innerHTML iguala o conteudo desse selector à variável
function atualizarContadores() {
    document.querySelector("#contadorJ1").innerHTML = contadorVitoriasJogador1
    document.querySelector("#contadorJ2").innerHTML = contadorVitoriasJogador2
    document.querySelector(".ronda2 span").innerHTML = rondasJogadas
    document.querySelector("#totalRondas").innerHTML = rondasMax
}

function iniciar() {
    rondasJogadas++
    atualizarContadores()

    //esconde o popup no inicio do jogo
    let popupHTML = document.querySelector(".popup");
    //na primeira vez nao existe a div da class popup por isso
    //verifiquei se é null antes de esconder o popup
    if (popupHTML !== null) {
        popupHTML.style.display = "none";
    }
    document.querySelectorAll(".game button").forEach(function (button) {
        button.innerHTML = "";
        button.className = "";
        button.addEventListener("click", newMove);
    });
}

//nova jogada
function newMove(e) {
    let posicao = e.target.getAttribute("i");
    e.target.innerHTML = player;
    if (player === "X") {
        e.target.classList.add("corPlayer1")
    } else {
        e.target.classList.add("corPlayer2")
    }

    //para remover o evento do botão onde cliquei
    e.target.removeEventListener("click", newMove);
    player = player === "X" ? "O" : "X";

    setTimeout(check, 100);
    alternarJogadorAtivo()
}

//para alternar a janela do jogador ativo
function alternarJogadorAtivo() {
    let j1 = document.querySelector(".jogadorContador")
    j1.classList.toggle("jogadorAtivo");

    let j2 = document.querySelector(".jogadorContador2")
    j2.classList.toggle("jogadorAtivo");
}

/*Verificar caixa (vc)*/
function vc(n, j) {
    return document.querySelector("#caixa_" + n).textContent === j;
}
//ternario, alternancia - se o jogador for X troca para O se não troca para X
function check() {
    let playerLastMove = player === "X" ? "O" : "X";
    if (
        (vc(1, playerLastMove) && vc(2, playerLastMove) && vc(3,
            playerLastMove)) ||
        (vc(4, playerLastMove) && vc(5, playerLastMove) && vc(6,
            playerLastMove)) ||
        (vc(7, playerLastMove) && vc(8, playerLastMove) && vc(9,
            playerLastMove)) ||
        (vc(1, playerLastMove) && vc(4, playerLastMove) && vc(7,
            playerLastMove)) ||
        (vc(2, playerLastMove) && vc(5, playerLastMove) && vc(8,
            playerLastMove)) ||
        (vc(3, playerLastMove) && vc(6, playerLastMove) && vc(9,
            playerLastMove)) ||
        (vc(1, playerLastMove) && vc(5, playerLastMove) && vc(9,
            playerLastMove)) ||
        (vc(3, playerLastMove) && vc(5, playerLastMove) && vc(7,
            playerLastMove))) {
        if (playerLastMove === "X") {
            contadorVitoriasJogador1++
        } else {
            contadorVitoriasJogador2++
        }
        let jogoAcabou = verificarFinalJogo();
        atualizarContadores();

        if(!jogoAcabou) {
            popupFinalRonda(playerLastMove);
        }

    } else {
        let rondaAcabou = verificarEmpateFinalRonda()

        if (rondaAcabou) {
            popupEmpatados();

        }
    }
}

//para jogo só acabar quando os quadrados estiverem todos preenchidos
function verificarEmpateFinalRonda() {
    let todosQuadradosPreenchidos
    document.querySelectorAll(".game button").forEach(function (button) {
        if (todosQuadradosPreenchidos === false) {
            return
        }

        if (button.innerHTML != "") {
            todosQuadradosPreenchidos = true
        } else {
            todosQuadradosPreenchidos = false
        }
    });
    return todosQuadradosPreenchidos
}

//no final do jogo e de todas as rondas
function popupFinalJogo(jogadorVencedor) {
    //console.log("popupFinalJogo", rondasJogadas, contadorVitoriasJogador1, contadorVitoriasJogador2);
    document.querySelector(".popup").style.display = "block";
    let botao = document.querySelector("#menu")
    botao.addEventListener("click", irParaMenu, {once: true})
    botao.innerHTML = "Menu"


    let vencedor = document.querySelector("#vencedor");

    if (contadorVitoriasJogador1 > contadorVitoriasJogador2) {
        vencedor.innerHTML = " O vencedor das rondas é " +
            jogador1 + "!";
    } else if (contadorVitoriasJogador2 > contadorVitoriasJogador1) {
        vencedor.innerHTML = " O vencedor das rondas é " +
            jogador2 + "!";
    } else vencedor.innerHTML = " As rondas terminaram empatadas!";
}


function popupEmpatados(jogoAcabou) {
    //console.log("popupEmpatados", jogoAcabou, rondasJogadas, contadorVitoriasJogador1, contadorVitoriasJogador2);
    if (jogoAcabou) {
        popupFinalJogo();
    }
    else {

        document.querySelector(".popup").style.display = "block";
        let botao = document.querySelector("#menu")
        botao.addEventListener("click", iniciar, {once: true})

        let vencedor = document.querySelector("#vencedor");
        vencedor.innerHTML = " Empatados!";
    }
}

//para finalizar o jogo depois das rondas estipuladas
function verificarFinalJogo() {
    let jogoAcabou = false;
    if (rondasJogadas === rondasMax) {
        jogoAcabou = true;
        if (contadorVitoriasJogador1 > contadorVitoriasJogador2) {
            popupFinalJogo("X")
        } else if (contadorVitoriasJogador2 > contadorVitoriasJogador1) {
            popupFinalJogo("O")
        } else {
            popupEmpatados(jogoAcabou)
        }
    }

    return jogoAcabou

}


function popupFinalRonda(jogadorAtual) {
    //console.log("popupFinalRonda", jogadorAtual, rondasJogadas, contadorVitoriasJogador1, contadorVitoriasJogador2);
    document.querySelector(".popup").style.display = "block";
    let botao = document.querySelector("#menu")
    botao.addEventListener("click", iniciar, {once: true})

    if (rondasJogadas === rondasMax) {
        botao.innerHTML = "Menu"
    } else {
        botao.innerHTML = "Nova Ronda"
    }
    let jogadorA = document.querySelector("#nome_jogador1").value;
    let jogadorB = document.querySelector("#nome_jogador2").value;
    let vencedor = document.querySelector("#vencedor");

    if (jogadorAtual === "X") {
        return vencedor.innerHTML = jogadorA + " Venceu!";
    } else if (jogadorAtual === "O") {
        return vencedor.innerHTML = jogadorB + " Venceu!";
    }
}

function irParaMenu() {
    document.querySelector(".pagina2").style.display = "none";
    document.querySelector(".popup").style.display = "none";
    document.querySelector(".pagina1").style.display = "block";
    reiniciarContadores();
}

//temporizador
function tick() {
    sec++;
    if (sec >= 60) {
        sec = 0;
        min++;
        if (min >= 60) {
            min = 0;
        }
    }
}

function add() {
    tick();
    h2.textContent = (min > 60 ? min : "0" + min)
        + ":" + (sec > 9 ? sec : "0" + sec);
    timer();
}

function timer() {
    t = setTimeout(add, 1000);
}

function reiniciarContadores() {
    contadorVitoriasJogador1 = 0
    contadorVitoriasJogador2 = 0
    rondasJogadas = 0
    sec = 0
    min = 0
    clearInterval(t)
    historico()

}

//pagina historico dos jogos
function historico(){
    function vencedor(){
    if (contadorVitoriasJogador1 > contadorVitoriasJogador2) {
        return jogador1
    }else return jogador2}

    let historico = JSON.parse(localStorage.getItem("historico"));
    if (historico == null) historico = [];
    let recorde =
        {
            tipoJogo: document.querySelector(".titulo").textContent,
            data: new Date().toString().slice(4,21),
            vencedor: vencedor()
            //vencedor: document.querySelector(".jogador").textContent
            //vencedor: player
        };
    historico.push(recorde);
    localStorage.setItem("historico", JSON.stringify(historico));

}


