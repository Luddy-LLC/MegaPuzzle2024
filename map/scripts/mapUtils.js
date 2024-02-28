function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

var menu = new bootstrap.Modal(document.getElementById('main-menu'), {})
if (window.location.href.includes('?m=1') || getCookie('name') == "") {
    menu.toggle();
    window.history.replaceState(null, '', window.location.pathname);
    window.history.pushState({}, document.title, window.location.pathname);
} else {
    document.getElementById('slow-clouds').style.display = 'none';
}

if (getCookie('name') == "") {
    document.getElementById('continue').classList.toggle('btn-secondary');
    document.getElementById('new').classList.toggle('btn-secondary');
    document.getElementById('new').style.order = "-1";
}
  
function moveToPlayButton() {
    // document.getElementById('background-audio').play();
    document.getElementById('sound').classList.toggle('fade');
    document.getElementById('go-to-play-button').classList.toggle('fade');
    document.getElementById('play-buttons').classList.toggle('fade');
}



/* -------------------------------- */
/* Cloud animation stuff            */
/* -------------------------------- */

function start() {
    document.getElementById('slow-clouds').src = './map/assets/clouds_pixleated.webp';
    document.getElementById('slow-clouds').classList.add("clouds-animated");
    document.getElementById('slow-clouds').style.opacity = 0;
}

window.onload = () => {
    document.querySelector('body').style.opacity = 1;
    document.getElementsByClassName('clouds')[0].src = './map/assets/fast_clouds_pixleated.webp';
    document.getElementsByClassName('clouds')[0].style.opacity = 0;
}

window.onpageshow = () => {
    document.querySelector('body').style.opacity = 1;
    document.getElementsByClassName('clouds')[0].src = './map/assets/fast_clouds_pixleated.webp';
    document.getElementsByClassName('clouds')[0].style.opacity = 0;
}

window.transitionToPage = function(href) {
    document.getElementById('clouds').style.opacity = 1;
    document.getElementById('clouds').src = './map/assets/clouds_pixleated_reverse_fast.webp';
    setTimeout(function() {
        document.querySelector('body').style.opacity = 0;
        setTimeout(function() { 
            window.location.href = href
        }, 500)
    }, 1000) // timeout within timeout!!!!!!   
}

/* -------------------------------- */

// const ele = document.getElementById("mapContainer");
const nw = document.getElementById("aavikk");
const sw = document.getElementById("ithkiya");
const cnr = document.getElementById("et-wixt");
const se = document.getElementById("telius");
const ne = document.getElementById("zanyph");
const mtn = document.getElementById("mountain");
var rl = document.getElementById("region-label");


window.oncontextmenu = function () {
    return false;
}

// window.addEventListener("mousemove", e=> document.getElementById("mouseCoords").innerHTML = "X: "+ (e.clientX + ele.scrollLeft) + ", Y: "+ (e.clientY + ele.scrollTop));

onmousemove = (event) => {
    const move = document.getElementById('move');
    move.style.cssText = `
    top:  ${event.clientY - 50}px;
    left: ${event.clientX - 50}px;
  `;
};



/* -------------------------------- */

nw.onmouseover = function () {
    rl.src = "./map/assets/labels/aavikk.png";
    rl.alt = "Region of Aavikk";
    rl.style.display = "block";
};

nw.onmouseleave = function () {
    rl.alt = "";
    rl.style.display = "none";
};


/* -------------------------------- */

sw.onmouseover = function () {
    rl.src = "./map/assets/labels/ithkiya.png";
    rl.alt = "Region of Ithkiya";
    rl.style.display = "block";
};

sw.onmouseleave = function () {
    rl.alt = "";
    rl.style.display = "none";
};

/* -------------------------------- */

cnr.onmouseover = function () {
    rl.src = "./map/assets/labels/etwixt.png";
    rl.alt = "Region of Et'wixt";
    rl.style.display = "block";
};

cnr.onmouseleave = function () {
    rl.alt = "";
    rl.style.display = "none";
};

/* -------------------------------- */

ne.onmouseover = function () {
    rl.src = "./map/assets/labels/zanyph.png";
    rl.alt = "Region of Zanyph";
    rl.style.display = "block";
};

ne.onmouseleave = function () {
    rl.alt = "";
    rl.style.display = "none";
};

/* -------------------------------- */

se.onmouseover = function () {
    rl.src = "./map/assets/labels/telius.png";
    rl.alt = "Region of Telius";
    rl.style.display = "block";
};

se.onmouseleave = function () {
    rl.alt = "";
    rl.style.display = "none";
};

/* -------------------------------- */

mtn.onmouseover = function () {
    rl.src = "./map/assets/labels/mountain.png";
    rl.alt = "Mountain Region";
    rl.style.display = "block";
};

mtn.onmouseleave = function () {
    rl.alt = "";
    rl.style.display = "none";
};

const backaudio = document.getElementById('background-audio');
backaudio.addEventListener("canplaythrough", () => {
    backaudio.play().catch(e => {
    window.addEventListener('click', () => {
        backaudio.play()
    }, { once: true })
    })
});

