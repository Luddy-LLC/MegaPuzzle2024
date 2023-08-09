// Make the DIV element draggable:

const map = document.getElementById("draggableMap");



dragElement();
let maxTop = map.getBoundingClientRect().height - 20 - window.innerHeight;
let maxLeft = map.getBoundingClientRect().width - 20 - window.innerWidth;
let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

function dragElement() {

  map.onmouseleave = closeDragElement;
  document.onmouseleave = closeDragElement;

  map.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    map.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    map.onmousemove = elementDrag;
  }

  function elementDrag(e) {

    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    map.style.top = Math.max(-maxTop, Math.min(0,(map.offsetTop - pos2))) + "px";
    map.style.left = Math.max(-maxLeft, Math.min(0,(map.offsetLeft - pos1))) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    map.onmouseup = null;
    map.onmousemove = null;
  }
}

window.addEventListener("keydown", e => {

  if(e.shiftKey)
    e.preventDefault();

  if(e.ctrlKey && (e.key == "=" || e.key == "-")){
    console.log("zooming");
    e.preventDefault();
  }
});

window.addEventListener("resize", e => {
  maxTop = map.getBoundingClientRect().height - 20 - window.innerHeight;
  maxLeft = map.getBoundingClientRect().width - 20 - window.innerWidth;

  map.style.top = Math.max(-maxTop, Math.min(0,(map.offsetTop - pos2))) + "px";
  map.style.left = Math.max(-maxLeft, Math.min(0,(map.offsetLeft - pos1))) + "px";
});

function addMapDragability(){
  
}