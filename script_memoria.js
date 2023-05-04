let card_images = [
    "https://www.viastral.com.br/assets/images/signos/escorpiao.png",
    "https://www.viastral.com.br/assets/images/signos/aquario.png",
    "https://www.viastral.com.br/assets/images/signos/gemeos.png",
    "https://www.viastral.com.br/assets/images/signos/escorpiao.png",
    "https://www.viastral.com.br/assets/images/signos/leao.png",
    "https://www.viastral.com.br/assets/images/signos/aries.png",
    "https://www.viastral.com.br/assets/images/signos/sagitario.png",
    "https://www.viastral.com.br/assets/images/signos/sagitario.png",
    "https://www.viastral.com.br/assets/images/signos/gemeos.png",
    "https://www.viastral.com.br/assets/images/signos/aquario.png",
    "https://www.viastral.com.br/assets/images/signos/leao.png",
    "https://www.viastral.com.br/assets/images/signos/aries.png"
];

let card_images_medium = [
    "https://www.viastral.com.br/assets/images/signos/escorpiao.png",
    "https://www.viastral.com.br/assets/images/signos/aquario.png",
    "https://www.viastral.com.br/assets/images/signos/gemeos.png",
    "https://www.viastral.com.br/assets/images/signos/escorpiao.png",
    "https://www.viastral.com.br/assets/images/signos/leao.png",
    "https://www.viastral.com.br/assets/images/signos/aries.png",
    "https://www.viastral.com.br/assets/images/signos/sagitario.png",
    "https://www.viastral.com.br/assets/images/signos/sagitario.png",
    "https://www.viastral.com.br/assets/images/signos/gemeos.png",
    "https://www.viastral.com.br/assets/images/signos/aquario.png",
    "https://www.viastral.com.br/assets/images/signos/leao.png",
    "https://www.viastral.com.br/assets/images/signos/aries.png",
    "https://www.viastral.com.br/assets/images/signos/libra.png",
    "https://www.viastral.com.br/assets/images/signos/libra.png",
    "https://www.viastral.com.br/assets/images/signos/capricornio.png",
    "https://www.viastral.com.br/assets/images/signos/capricornio.png"
];

let card_images_hard = [
    "https://www.viastral.com.br/assets/images/signos/escorpiao.png",
    "https://www.viastral.com.br/assets/images/signos/aquario.png",
    "https://www.viastral.com.br/assets/images/signos/gemeos.png",
    "https://www.viastral.com.br/assets/images/signos/escorpiao.png",
    "https://www.viastral.com.br/assets/images/signos/leao.png",
    "https://www.viastral.com.br/assets/images/signos/aries.png",
    "https://www.viastral.com.br/assets/images/signos/sagitario.png",
    "https://www.viastral.com.br/assets/images/signos/sagitario.png",
    "https://www.viastral.com.br/assets/images/signos/gemeos.png",
    "https://www.viastral.com.br/assets/images/signos/aquario.png",
    "https://www.viastral.com.br/assets/images/signos/leao.png",
    "https://www.viastral.com.br/assets/images/signos/aries.png",
    "https://www.viastral.com.br/assets/images/signos/libra.png",
    "https://www.viastral.com.br/assets/images/signos/libra.png",
    "https://www.viastral.com.br/assets/images/signos/capricornio.png",
    "https://www.viastral.com.br/assets/images/signos/capricornio.png",
    "https://www.viastral.com.br/assets/images/signos/cancer.png",
    "https://www.viastral.com.br/assets/images/signos/cancer.png",
    "https://www.viastral.com.br/assets/images/signos/virgem.png",
    "https://www.viastral.com.br/assets/images/signos/virgem.png"
];

/*JavaScript implementation of the Durstenfeld shuffle, an optimized version of Fisher-Yates:
https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm*/
function shuffleArray(card_images) {
    for (let i = card_images.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let shuffle = card_images[i];
        card_images[i] = card_images[j];
        card_images[j] = shuffle;
    }
}


function criarDivContainer(itens) {
    shuffleArray(itens);
    let div_container = `<div class="second_div"><h1 class="game">Jogo da Memória</h1>
<h2 class="timer">00:00</h2>
        <div class=\"container\" style=\"border: black\"><div class="row">`
    itens.forEach(function (card_image) {
        let item = `
                        <div class="col-3">
                            <div class="card">
                                <img class="card_images" src=${card_image} alt="Card image cap">
                            </div>
                        </div>
                    `;
        div_container += item;
    })
    div_container += `</div></div>`
    return div_container
}

let div2 = document.querySelector(".div2")
let div3 = document.querySelector(".div3")
let div4 = document.querySelector(".div4")


let sec = 0;
let min = 0;

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
    document.querySelector(".timer").textContent = (min > 60 ? min : "0" + min)
        + ":" + (sec > 9 ? sec : "0" + sec);
    timer();
}

function timer() {
    t = setTimeout(add, 1000);
}

function historico() {
    let historico = JSON.parse(localStorage.getItem("historico"));
    if (historico == null) historico = [];
    let recorde =
        {
            tipoJogo: document.querySelector(".game").textContent,
            data: new Date().toString().slice(4,21),
            tempo: document.querySelector(".timer").textContent,
        };
    historico.push(recorde);
    localStorage.setItem("historico", JSON.stringify(historico));
    gameOver = true;
}

let dificuldade = "";
function endGame() {
    let matching_images = document.querySelectorAll(".card_images.acertou");
    if (dificuldade === "easy" && matching_images.length === 12) {
        let modal = document.querySelector(".modal");
        modal.style.display = "block";
        clearInterval(t);
        historico();
    }
    else if (dificuldade === "medium" && matching_images.length === 16) {
        let modal = document.querySelector(".modal");
        modal.style.display = "block";
        clearInterval(t);
        historico();
        }
    else if (dificuldade === "hard" && matching_images.length === 20) {
        let modal = document.querySelector(".modal");
        modal.style.display = "block";
        clearInterval(t);
        historico();
    }
}


function startGame() {
    timer();

    let click_images = document.querySelectorAll(".card_images");

    click_images.forEach(function (image) {
        console.log(image)
        image.addEventListener("click", function () {
            console.log(image)
            image.classList.add("visible");

            let visible_images = document.querySelectorAll(".card_images.visible");
            console.log(visible_images[0], visible_images[1]);

            if (visible_images.length === 2) {
                console.log(visible_images[0], visible_images[1])

                if (visible_images[0].src === visible_images[1].src) {
                    image.classList.add("acertou");
                    console.log("é igual")
                    visible_images.forEach(function (imag) {
                        imag.classList.add("acertou");
                        imag.classList.remove("visible");
                    })
                } else {
                    setTimeout(function () {
                        visible_images.forEach(function (imag) {
                            imag.classList.remove("visible");
                        })
                    }, 1000)
                }
            }
            endGame();
        })
    });
}


let btn_easy = document.querySelector(".easy");
btn_easy.addEventListener("click", function () {
    div2.innerHTML = criarDivContainer(card_images);
    startGame();
    let first_div = document.querySelector(".first_div");
    first_div.style.display = "none";
    let div_easy = document.querySelector(".div2");
    div_easy.style.display = "block";
    dificuldade = "easy";
});


let btn_medium = document.querySelector(".medium");
btn_medium.addEventListener("click", function () {
    div3.innerHTML = criarDivContainer(card_images_medium);
    startGame();
    let first_div = document.querySelector(".first_div");
    first_div.style.display = "none";
    let div_medium = document.querySelector(".div3");
    div_medium.style.display = "block";
    dificuldade = "medium";
});


let btn_hard = document.querySelector(".hard");
btn_hard.addEventListener("click", function () {
    div4.innerHTML = criarDivContainer(card_images_hard);
    startGame();
    let first_div = document.querySelector(".first_div");
    first_div.style.display = "none";
    let div_hard = document.querySelector(".div4");
    div_hard.style.display = "block";
    dificuldade = "hard";
});

let menubtn = document.querySelector(".menubtn");
menubtn.addEventListener("click", function(){
    window.location.href="homepage.html"
})