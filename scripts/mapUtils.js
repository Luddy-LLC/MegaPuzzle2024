// const ele = document.getElementById("mapContainer");

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