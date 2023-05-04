/*-----Criar Bloco de Recorde-----*/
let divHistorico = document.querySelector(".div_historico");
let aux = ""
let historico = JSON.parse(localStorage.getItem("historico"));

if(historico == null){
    aux += `<div class="recorde">"Não existe registos de jogos a apresentar."</div>`
}
for (let i = 0; i < historico.length; i++) {
    if (historico[i].tipoJogo === "Jogo da Memória") {
        aux += `<div class="recorde">
    <div class="esq">
                <div id="tipoJogo">
                    <h3>${historico[i].tipoJogo}</h3>
                </div>
                <div id="data">
                    ${historico[i].data}
                </div>
    </div>
    <div class="drt"><img class="icon" src="Images/icontimer.png" alt="relogio">
                <div id="tempo">
                    ${historico[i].tempo}
                </div>
    </div>
    </div>`;
        console.log("recorde", i)
    } else {
        aux += `<div class="recorde">
    <div class="esq">
                <div id="tipoJogo">
                    <h3>${historico[i].tipoJogo}</h3>
                </div>
                <div id="data">
                ${historico[i].data}
                </div>
    </div> 
    <div class="drt"><img class="icon" src="Images/iconVencedor.png" alt="medalha">
                <div id="vencedor">
                ${historico[i].vencedor}
                </div>
            </div>
    </div>`;
        console.log("recorde", i)
    }
    console.log("aux final:", aux)
    divHistorico.innerHTML = aux;
}

/*-----Botao voltar-----*/
document.querySelector("#voltar").addEventListener("click", function () {
    window.location.href = "homepage.html";
});
