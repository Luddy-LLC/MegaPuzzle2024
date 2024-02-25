const cols = document.getElementsByClassName("col");
const audios = [new Audio("./assets/audio1.wav"), new Audio("./assets/audio2.wav"), new Audio("./assets/audio3.wav"), 
                new Audio("./assets/audio4.wav"), new Audio("./assets/audio5.wav"), new Audio("./assets/audio6.wav")]
const audioSrcs = ["./assets/audio1.wav", "./assets/audio2.wav", "./assets/audio3.wav", 
"./assets/audio4.wav", "./assets/audio5.wav", "./assets/audio6.wav"]

const audioElement = document.getElementById("current-audio");

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);


// blur removes focus

let soundCD = 0;

function playSound(index, col) {
    for(let i=0; i<cols.length; ++i) cols[i].setAttribute("data-focus", "false");
    for(let i=0; i<audios.length; ++i) {audios[i].pause(); audios[i].currentTime = 0;}


    audioElement.src = audioSrcs[index];
    audioElement.style.visibility = "visible";
    audioElement.play();
    noElementFocused = false;
    col.setAttribute("data-focus", "true");

    soundCD = 10;
}

function stopSound(){
    if(soundCD <= 0){
        for (let index = 0; index < cols.length; index++) {
            const col = cols[index];
            const audio = audios[index];

            audioElement.pause();
            
            audioElement.style.visibility = "hidden";
            col.setAttribute("data-focus", "false");
        }
    }

    soundCD = 0;
}

if(!isMobile) document.addEventListener("click", e => stopSound());

window.onkeydown = document.onkeydown = e => {
    let keyCode = e.key || e.code;
    if (keyCode == 'Escape') stopSound();
}



for (let index = 0; index < cols.length; index++) {
    const col = cols[index];
    const audio = audios[index];

    col.addEventListener("click", e => playSound(index, col));

    col.onkeypress = e => {
        let keyCode = e.code || e.key;
        if (keyCode == 'Enter' && document.activeElement == col){
            playSound(index, col);
        }
    }

    col.onkeydown = e => {
        let keyCode = e.key || e.code;
        if (keyCode == 'Escape') stopSound();
    }

    audio.addEventListener("ended", e => {
        col.setAttribute("data-focus", "false");
        soundCD = 0;
    });
}