// const ele = document.getElementById("mapContainer");
const nw = document.getElementById("northwest");
const sw = document.getElementById("southwest");
const cnr = document.getElementById("central");
const se = document.getElementById("southeast");
const ne = document.getElementById("northeast");
var rl = document.getElementById("region-label");

window.addEventListener("keydown", e=>{
    if((e.key == "I" && e.ctrlKey && e.shiftKey) || (e.key == "J" && e.ctrlKey && e.shiftKey) 
    || (e.key == "C" && e.ctrlKey && e.shiftKey) || e.key == "F12"){
        alert("Ah ah ah... no");
        e.preventDefault();
    }
});

window.oncontextmenu = function () {
    return false;
}

window.addEventListener("mousemove", e=> document.getElementById("mouseCoords").innerHTML = "X: "+ (e.clientX + ele.scrollLeft) + ", Y: "+ (e.clientY + ele.scrollTop));

onmousemove = (event) => {
    const move = document.getElementById('move');
    move.style.cssText = `
    top:  ${event.clientY - 50}px;
    left: ${event.clientX - 50}px;
  `;
};



/* -------------------------------- */

nw.onmouseover = function () {
    rl.src = "imgs/labels/aavikk.png";
    rl.alt = "Region of Aavikk";
    rl.style.display = "block";
};

nw.onmouseleave = function () {
    rl.alt = "";
    rl.style.display = "none";
};


/* -------------------------------- */

sw.onmouseover = function () {
    rl.src = "imgs/labels/ithkiya.png";
    rl.alt = "Region of Ithkiya";
    rl.style.display = "block";
};

sw.onmouseleave = function () {
    rl.alt = "";
    rl.style.display = "none";
};

/* -------------------------------- */

cnr.onmouseover = function () {
    rl.src = "imgs/labels/etwixt.png";
    rl.alt = "Region of Et'Wixt";
    rl.style.display = "block";
};

cnr.onmouseleave = function () {
    rl.alt = "";
    rl.style.display = "none";
};

/* -------------------------------- */

ne.onmouseover = function () {
    rl.src = "imgs/labels/zanyph.png";
    rl.alt = "Region of Zanyph";
    rl.style.display = "block";
};

ne.onmouseleave = function () {
    rl.alt = "";
    rl.style.display = "none";
};

/* -------------------------------- */

se.onmouseover = function () {
    rl.src = "imgs/labels/telius.png";
    rl.alt = "Region of Telius";
    rl.style.display = "block";
};

se.onmouseleave = function () {
    rl.alt = "";
    rl.style.display = "none";
};

