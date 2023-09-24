const ele = document.getElementById("mapContainer");
// ele.scrollTop = 100;
// ele.scrollLeft = 150;

dragElement(ele);

function dragElement(elmnt) {

  let pos = {xi : 0, yi : 0, xf : 0, yf : 0};

  elmnt.onmousedown = dragMouseDown;
  

  function dragMouseDown(e) {
    e.preventDefault();

    ele.style.cursor = 'grabbing';
    ele.style.userSelect = 'none';

    // get the mouse cursor position at startup:
    pos.xf = e.clientX;
    pos.yf = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  } 

  function elementDrag(e) {
    e.preventDefault();
    // calculate the new cursor position:

    pos.xi = pos.xf;
    pos.yi = pos.yf;
    pos.xf = e.clientX;
    pos.yf = e.clientY;

    // set the element's new position:
    elmnt.scrollLeft = (elmnt.scrollLeft - (pos.xf - pos.xi));
    elmnt.scrollTop = (elmnt.scrollTop - (pos.yf - pos.yi));
  }

  function closeDragElement() {

    ele.style.cursor = 'grab';
    ele.style.removeProperty('user-select');
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
