const layers = ["./assets/MazeSide1.png", "./assets/MazeSide2.png"]
let maze;
let button;
let background;

let top_layer = true;



  
window.onload = init;

function init() {

    maze = document.getElementById("maze");
    button = document.getElementById("swap");
    background = document.getElementsByTagName('main')[0];

}


function nextSide() {
    top_layer = !top_layer;
    if (top_layer) {

        maze.setAttribute("src", layers[0]);
        button.setAttribute("top_layer", top_layer);
        background.setAttribute("top_layer", top_layer);
    } else {
        maze.setAttribute("src", layers[1]);
        button.setAttribute("top_layer", top_layer);
        background.setAttribute("top_layer", top_layer);
    }
}


