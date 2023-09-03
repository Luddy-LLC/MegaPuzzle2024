// const ele = document.getElementById("mapContainer");
const nw = document.getElementById("northwest");
const sw = document.getElementById("southwest");
const cnr = document.getElementById("central");
const se = document.getElementById("southeast");
const ne = document.getElementById("northeast");
const rt = document.getElementById("region-text");

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
    rt.innerText = "Northwest";
    rt.style.display = "block";
};

nw.onmouseleave = function () {
    rt.style.display = "none";
};


/* -------------------------------- */

sw.onmouseover = function () {
    rt.innerText = "Southwest";
    rt.style.display = "block";
};

sw.onmouseleave = function () {
    rt.style.display = "none";
};

/* -------------------------------- */

cnr.onmouseover = function () {
    rt.innerText = "Central";
    rt.style.display = "block";
};

cnr.onmouseleave = function () {
    rt.style.display = "none";
};

/* -------------------------------- */

ne.onmouseover = function () {
    rt.innerText = "Northeast";
    rt.style.display = "block";
};

ne.onmouseleave = function () {
    rt.style.display = "none";
};

/* -------------------------------- */

se.onmouseover = function () {
    rt.innerText = "Southeast";
    rt.style.display = "block";
};

se.onmouseleave = function () {
    rt.style.display = "none";
};

