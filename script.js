let carro = document.getElementById("character");
let bloco = document.getElementById("block");
let jogo = document.getElementsByTagName("BODY")[0];
let inicioBtn = document.getElementById("inicio");

let comeco = new Audio('/assets/audio/comeco.mp3');
let fim = new Audio('/assets/audio/fim.mp3');
let trilha = new Audio('/assets/audio/trilha.mp3');

document.addEventListener("keydown", e => {
  if(e.key==="ArrowLeft"){moveLeft();}
  if(e.key==="ArrowRight"){moveRight();}
});

inicioBtn.addEventListener('click', (e) => {
    e.preventDefault();
    inicio();
    comeco.play();
})


function restartJogo() {
    window.location.reload();
}

function moveLeft(){
    let left = parseInt(window.getComputedStyle(carro).getPropertyValue("left"));
    left -= 100;
    if(left>=0){
        carro.style.left = left + "px";
    }
}

function moveRight(){
    let left = parseInt(window.getComputedStyle(carro).getPropertyValue("left"));
    left += 100;
    if(left<300){
        carro.style.left = left + "px";
    }
}


let counter = 0;
bloco.addEventListener('animationiteration', () => {
    let random = Math.floor(Math.random() * 3);
    left = random * 100;
    bloco.style.left = left + "px";
    counter++;
});

function inicio() {
    bloco.style.animation = "slide 1s infinite linear";
    inicioBtn.remove();
    trilha.play();
    trilha.loop = true;
    
    return setInterval(() => {
        let carroLeft = parseInt(window.getComputedStyle(carro).getPropertyValue("left"));
        let blocoLeft = parseInt(window.getComputedStyle(bloco).getPropertyValue("left"));
        let blocoTop = parseInt(window.getComputedStyle(bloco).getPropertyValue("top"));
        
        if(carroLeft==blocoLeft && blocoTop<500 && blocoTop>300){
            jogo.innerHTML = `<div id='game-over-container'><h1 id='gameover-title'>PONTUAÇÃO: ${counter}</h1><button class='jogar-novamente' id='jogar-novamente' onClick={restartJogo()}>Jogar novamente</button></div>` 
            bloco.style.animation = "none";
            fim.play();
            trilha.pause();
        }
    }, 1);
}

document.getElementById("right").addEventListener("touchstart", moveRight);
document.getElementById("left").addEventListener("touchstart", moveLeft);
