const bottle = document.getElementById("bottle");
const letter = document.getElementById("letter");
const letterContent = document.getElementById("letter-content");
const puzzleDesc = document.getElementById("puzzle-desc");

document.onclick = e => {
    if(e.target == bottle){
        bottle.style.display="none";
        puzzleDesc.style.display = "none";

        letter.style.visibility="visible";
        letter.style.opacity="1";
    } else if(e.target != letter && e.target != letterContent){
        bottle.style.display="block";
        puzzleDesc.style.display = "block";

        letter.style.visibility="hidden";
        letter.style.opacity="0";
    }
}

document.onkeydown = e => {
    if(e.key === "Escape"){
        bottle.style.display="block";
        puzzleDesc.style.display = "block";

        letter.style.visibility="hidden";
        letter.style.opacity="0";
    }
}