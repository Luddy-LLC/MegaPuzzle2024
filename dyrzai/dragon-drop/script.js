const iris = document.getElementById("iris");

let windowW, windowH;
let eyeCenterX, eyeCenterY;

window.onload = window.onresize = () => {
    windowW = window.innerWidth;
    windowH = window.innerHeight;

    eyeCenterX = .38 * windowW;
    eyeCenterY = .48 * windowH - .11 * windowW; 
}


document.getElementById('body').onmousemove = e => {
    iris.style.marginLeft = (eyeCenterX - e.x) / 15 +"px";
    iris.style.marginTop = -(eyeCenterY - e.y) / 15 +"px";
}


const butt = document.getElementById("start-button");

butt.onclick = e => alert("yo mama");