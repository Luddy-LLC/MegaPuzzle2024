// JS available in all puzzles


// COOKIE HELPERS
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
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


// SIGN IN/OUT
function signUserIn(data) {
    setCookie("team", document.getElementById('signin-team').value, "31 Dec 2024 12:00:00 UTC");
    setCookie("name", document.getElementById('signin-person').value, "31 Dec 2024 12:00:00 UTC");
    if (getCookie('team') != "" && getCookie('name') != "") {
        signin.hide();
    }
}

function signout() {
    setCookie("team", "", "31 Dec 2020 12:00:00 UTC");
    setCookie("name", "", "31 Dec 2020 12:00:00 UTC");
    answermodal.hide();
    signin.show();
}

// MODALS
var signin = new bootstrap.Modal(document.getElementById('signin-modal'), {});
var answermodal = new bootstrap.Modal(document.getElementById('answer-modal'), {});

// SIGN IN AND ANSWER CHECKING
if (getCookie('team') == "" || getCookie('name') == "") {
    signin.show();
}

function preventDefaultSub(event) {
    event.preventDefault();
}

function autofill() {
    document.getElementById('puzzle').value = document.getElementsByTagName('html')[0].getAttribute('data-puzzle');
    document.getElementById('team').value = getCookie("team");
    document.getElementById('person').value = getCookie("name");
    document.getElementById('personName').innerText = getCookie("name");
    document.getElementById('teamName').innerText = getCookie("team");
}

function clearAnswer() {
    if(document.getElementById('answer')) document.getElementById('answer').value = "";
    if(document.getElementById('puzzle')) document.getElementById('puzzle').value = "";
    if(document.getElementById('team')) document.getElementById('team').value = "";
    if(document.getElementById('person')) document.getElementById('person').value = "";
    if(document.getElementById('personName')) document.getElementById('personName').innerText = "UNKNOWN";
    if(document.getElementById('teamName')) document.getElementById('teamName').innerText = "UNKNOWN";
    if(document.getElementById('correct')) document.getElementById('correct').style.display = 'none';
    if(document.getElementById('incorrect')) document.getElementById('incorrect').style.display = 'none';
    if(document.getElementById('technical-error')) document.getElementById('technical-error').style.display = 'none';
}

if (document.getElementById('check-answer')) {
    function preventDefaultSubmission(event) {
        event.preventDefault();
        fetch("https://megapuzzle.carbonizar-planetario03.workers.dev/answer", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify({
                "team": document.getElementById('team').value,
                "person": document.getElementById('person').value,
                "puzzle": document.getElementById('puzzle').value,
                "answer": document.getElementById('answer').value.toLowerCase()
            })
        })
            .then((response) => {
                try {
                response.json()
                .then(obj => {
                    if (obj.result == 'correct') {
                        document.getElementById('correct').style.display = 'block';
                        document.getElementById('incorrect').style.display = 'none';
                        document.getElementById('technical-error').style.display = 'none';
                    } else if (obj.result == 'incorrect') {
                        document.getElementById('incorrect').style.display = 'block';
                        document.getElementById('correct').style.display = 'none';
                        document.getElementById('technical-error').style.display = 'none';
                    } else {
                        document.getElementById('technical-error').style.display = 'block';
                        document.getElementById('correct').style.display = 'none';
                        document.getElementById('incorrect').style.display = 'none';
                    }
                });
                } catch (e) {
                    document.getElementById('technical-error').style.display = 'block';
                    document.getElementById('technical-error').innerHTML = document.getElementById('technical-error').innerHTML + e;
                }
            });
    }
    document.getElementById('signin').addEventListener("submit", preventDefaultSub);
    document.getElementById('answer-modal').addEventListener("show.bs.modal", autofill);
    document.getElementById('answer-modal').addEventListener("hidden.bs.modal", clearAnswer);
    document.getElementById('check-answer').addEventListener("submit", preventDefaultSubmission);
}

// AUDIO
const audioplayer = document.getElementById('audio-player');
const nowplaying = document.getElementsByClassName('now-playing')[0];
const audioLibrary = {
    "rosetta" : ["coconutmall.mp3", "Coconut Mall", "Nintendo"]
}
function togglePlay() {
    const svg = document.querySelector('body > nav > div:nth-child(1) > button > svg > use');
    audioplayer.paused ? svg.setAttribute('href','/Common/icons.svg#ppi-unmuted') : svg.setAttribute('href','/Common/icons.svg#ppi-muted');
    return audioplayer.paused ? audioplayer.play() : audioplayer.pause();
}
function toggleNowPlaying() {
    return audioplayer.paused ? nowplaying.style.opacity = 0 : nowplaying.style.opacity = 1;
}
if (audioplayer) {
    const puzzle = document.getElementsByTagName('html')[0].getAttribute('data-puzzle');
    audioplayer.setAttribute('src','/Common/audio/'+audioLibrary[puzzle][0]);
    audioplayer.style.display = 'none';
    audioplayer.addEventListener("canplaythrough", () => {
        audioplayer.play().catch(e => {
        window.addEventListener('click', () => {
            document.getElementsByClassName('card-title')[0].innerText = audioLibrary[puzzle][1];
            document.getElementsByClassName('card-text')[0].innerText = audioLibrary[puzzle][2];
            audioplayer.play()
        }, { once: true })
        })
    });
    audioplayer.addEventListener('pause', toggleNowPlaying);
    audioplayer.addEventListener('play', toggleNowPlaying);
    
    document.querySelector('nav > div:nth-child(1) > button').addEventListener("click", togglePlay);
}