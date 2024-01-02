const cols = document.getElementsByClassName("col");
const audios = [new Audio("./assets/audio1.wav"), new Audio("./assets/audio2.wav"), new Audio("./assets/audio3.wav"), 
                new Audio("./assets/audio4.wav"), new Audio("./assets/audio5.wav"), new Audio("./assets/audio6.wav")]

// blur removes focus
let noElementFocused = true;

alert("Sound is required for this puzzle.");

for (let index = 0; index < cols.length; index++) {
    const col = cols[index];
    const audio = audios[index];


    col.addEventListener("keydown", e => { // making it tabbable 
         if(e.keyCode == 32 || e.keyCode == 13){
            for(let i=0; i<cols.length; ++i) cols[i].setAttribute("data-focus", "false");
            for(let i=0; i<audios.length; ++i) {audios[i].pause(); audios[i].currentTime = 0;}

            audios[index].play();
            noElementFocused = false;
            cols[index].setAttribute("data-focus", "true");
        }
    });

    col.addEventListener("click", e => { // clickingn function
        // if(noElementFocused){
            for(let i=0; i<cols.length; ++i) cols[i].setAttribute("data-focus", "false");
            for(let i=0; i<audios.length; ++i) {audios[i].pause(); audios[i].currentTime = 0;}

            audios[index].play();
            noElementFocused = false;
            cols[index].setAttribute("data-focus", "true");
        // }
    });

    audio.addEventListener("ended", e => {
        noElementFocused = true;
        cols[index].setAttribute("data-focus", "false");
    });
}