var signin = new bootstrap.Modal(document.getElementById('signin-modal'), {});


document.getElementById('signin').onsubmit = e => {
    e.preventDefault();
    transitionToPage(`../index.html`);
}

function specialSignUserIn(data) {
    setCookie("team", document.getElementById('signin-team').value, "31 Dec 2024 12:00:00 UTC");
    setCookie("name", document.getElementById('signin-person').value, "31 Dec 2024 12:00:00 UTC");
    if (getCookie('team') != "" && getCookie('name') != "") {
        transitionToPage(`../index.html`);
    }
}




setInterval(() => {
    document.getElementById("clickText").style.opacity = "1";
    // document.getElementById("main").style.backgroundImage = `url('./assets/intro9.png')`;
    document.getElementById("body").style.cursor = "pointer";
    window.addEventListener("click", e => {
        if (getCookie('team') == "" || getCookie('name') == "") {
            signin.show();
        } else transitionToPage(`../index.html`);
    });
}, 20000);


window.onload = () => {
    document.querySelector('body').style.opacity = 1;
    document.getElementsByClassName('clouds')[0].src = '../map/assets/fast_clouds_pixleated.webp';
    document.getElementsByClassName('clouds')[0].style.opacity = 0;
}

window.onpageshow = () => {
    document.querySelector('body').style.opacity = 1;
    document.getElementsByClassName('clouds')[0].src = '../map/assets/fast_clouds_pixleated.webp';
    document.getElementsByClassName('clouds')[0].style.opacity = 0;
}

window.transitionToPage = function (href) {
    document.getElementById('clouds').style.opacity = 1;
    document.getElementById('clouds').src = '../map/assets/clouds_pixleated_reverse_fast.webp';
    setTimeout(function () {
        document.getElementById('body').style.opacity = 0;
        setTimeout(function () {
            window.location.href = href
        }, 500)
    }, 1000) // timeout within timeout!!!!!!   
}