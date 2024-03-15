const iris = document.getElementById("iris");
const eye = document.getElementById("eye");

let windowW, windowH;
let eyeCenterX, eyeCenterY;
let attention = true;

window.onload = window.onresize = () => {
    windowW = window.innerWidth;
    windowH = window.innerHeight;

    eyeCenterX = 0.49 * windowW;
    eyeCenterY = 0.48 * windowH - 0.11 * windowW;
};


function set_eye(e) {
    let x_pos;
    let y_pos;

    if ( e == null || attention == false ) {
        x_pos = windowW;
        y_pos = windowH;
    } else {
        x_pos = e.x;
        y_pos = e.y;
    }
    iris.style.marginLeft = -(eyeCenterX - x_pos) / 12 + "px";
    iris.style.marginTop = -(eyeCenterY - y_pos) / 12 + "px";
    
    eye.style.marginLeft = -(eyeCenterX - x_pos) / 80 + "px";
    eye.style.marginTop = -(eyeCenterY - y_pos) / 80 + "px";

}

document.getElementById("body").onmousemove = set_eye;

const toastLiveExample = document.getElementById("liveToast");
const toastBody = document.getElementById("toast-body");
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
iris.onclick = (e) => {
    toastBody.innerText = dragonMessages[rand(dragonMessages.length)];
    toastBootstrap.show();
};

let butt = document.getElementById("start-button");
const tc = document.getElementById("text-container");
let questionP;

const dragonMessages = [
    "To test mine eye is quite a daring feat.",
    "Testing one's patience is not the wisest of diversions.",
    "Test me not for jests will not bid you well.",
];

let questions = [
    "A crooked hat and a crooked grin, someone who can make another's eyes spin. Power, hunger, and all the rest... but few manage to master this quest.",
    "What description rings true for both the youngest infants and the most learned scholars?",
    "What, pray tell, is the best Python package?",
    "If I claimed you sent waves in the rivers of my mind from you unto me, what have I done in turn?",
    "Because I may seem somewhat silly, staring at myself so pretty, they often call me...",
    "The last thing a king wants for himself, but the first thing for a peasant to offer.",
    "It cannot be helped but to say that this vexatious guest remains unwelcome at the table of any respectable soirée.",
    "It truly is vital to remain up to date with current events.",
    "My manxome teeth were feared many-a-year, but a ruinous sword made my end draw near.",
    "What is the object that you dread most needing?",
    "I want this to be very extra.",
    "I dwell in realms of quietude, In words and stanzas, I'm imbued. With dashes, I punctuate my line, A recluse, by my own design.",
    "Many of these line the streets of the world's largest orchard. They are said to be flat but they are almost certainly not.",
    "My wings are broad and bright yet cannot fly, as if caught by a snare I prettify.",
    "Kings each chase my Tyrian blood, and although I flee at the same speed as my brothers I do so in shorter steps.",
    "Though to many people my lanes serve as a port, our language isolate remains a unique sort.",
    "I don't want it to be too extra.",
    "What does one call those welcome echoes of the past that return from whence they came?",
    "One well refined is one that indulges in a little bodily motion from time to time. Do tell, what dances do you fall back on in times of turmoil?",
];

const finalQuestion = "And finally, dear human, what is your Cat's name?";
let submittedAnswers = [];
let order = [];


butt.onclick = (e) => {
    tc.style.opacity = "0";
    let idx;
    do{
        idx = rand(questions.length);
    } while(order.includes(idx));
    order.push(idx);
    let question = questions[idx];
    // questions = removeItemOnce(questions, question);

    setTimeout(() => {
        tc.innerHTML = `
        <p id="question-p">
        ${question}
        </p>
        <form id="dragon-form" class="form-floating needs-validation" autocomplete="off">
            <div class="form-floating mb-3">
                <input pattern="[a-zA-Z]*"
                    title="Letters only, please! No spaces, numbers, or special characters." type="text"
                    class="form-control" id="answer" value="" placeholder="Puzzle Answer" required>
                <label for="answer">What say thee?</label>
            </div>
            <button type="submit" class="btn btn-primary answer-button" id="answer-button">Next Question</button>
        </form>
        `;

        setTimeout(() => {
            tc.style.opacity = "1";
        }, 250);
    }, 500);

    setTimeout(() => {
        document.getElementById("dragon-form").onsubmit = nextQuestion;
        questionP = document.getElementById("question-p");
    }, 1000);
};

function nextQuestion(e) {
    e.preventDefault();
    goToFinalFinalFinalAnswer();
    return;

    const answerInput = document.getElementById("answer");
    if (!answerInput.checkValidity()) return;

    submittedAnswers.push(answerInput.value);
    tc.style.opacity = "0";

    if (questions.length != order.length) {
        let idx;
        do{
            idx = rand(questions.length);
        } while(order.includes(idx));
        order.push(idx);
        let question = questions[idx];

        setTimeout(() => {
            questionP.innerText = question;
            answerInput.value = "";

            setTimeout(() => {
                tc.style.opacity = "1";
            }, 250);
        }, 500);
    } else {
        // final question
        // Show whether they got it right or not
        const answerDiv = document.getElementById("answer-check");

        let finalAnswers = [];
        for (let i = 0; i < order.length; ++i)
            finalAnswers.push([order[i], submittedAnswers[i]]);

        finalAnswers.sort((a, b) => a[0] - b[0]);
        const finalFinalAnswers = [];
        for (let i = 0; i < order.length; ++i) {
            finalFinalAnswers.push(finalAnswers[i][1].toLowerCase());
        }

        checkAnswer(finalFinalAnswers, answerDiv.querySelector("p"));

        setTimeout(() => {
            answerDiv.style.display = "flex";

            setTimeout(() => {
                answerDiv.style.opacity = "1";
                tc.style.display = "none";
            }, 250);
        }, 500);
    }
}


function checkAnswer(answers, p) {
    p.innerText = "correct";
    butt = document.getElementById("start-button");
    butt.innerText = "Final Question";
    butt.onclick = goToFinalFinalFinalAnswer;
    return;

    fetch("https://megapuzzle.carbonizar-planetario03.workers.dev/dyrzai", {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({
            "team": getCookie("team"),
            "person": getCookie("name"),
            "puzzle": "dragon-drop",
            "answer": answers,
        }),
    }).then((response) => {
        try {
            response.json().then((obj) => {
                if (obj.result == "correct") {
                    p.innerText = "correct";
                    butt = document.getElementById("start-button");
                    butt.innerText = "Final Question";
                    butt.onclick = goToFinalFinalFinalAnswer;
                } else if (obj.result == "wrongOrder") {
                    p.innerText = "wrong Order";
                    butt = document.getElementById("start-button");
                    butt.innerText = "Retry";
                    butt.onclick = e => window.location.reload();
                } else if (obj.result == "incorrect") {
                    p.innerText = "Wrong LOL!";
                    butt = document.getElementById("start-button");
                    butt.innerText = "Retry";
                    butt.onclick = e => window.location.reload();
                } else {
                    p.innerText = "Whoops... there was a technical issue. Please try again later...";
                    butt = document.getElementById("start-button");
                    butt.innerText = "Retry";
                    butt.onclick = e => window.location.reload();
                }
            });
        } catch (e) {
            p.innerText = "Whoops... there was a technical issue. Please try again later...";
            butt = document.getElementById("start-button");
            butt.innerText = "Retry";
            butt.onclick = e => window.location.reload();
        }
    });
}


function goToFinalFinalFinalAnswer(e){
    

    const answerDiv = document.getElementById("answer-check");

    answerDiv.style.opacity = "0";
    setTimeout(() => {
        answerDiv.style.display = "none";
    }, 500);



    tc.style.opacity = "0";
    tc.style.display = "flex";

    setTimeout(() => {
        tc.innerHTML = `
        <p id="question-p">
        And finally, dear human, what is your Cat's name?
        </p>
        <form id="dragon-form" class="form-floating needs-validation" autocomplete="off">
            <div class="form-floating mb-3">
                <input pattern="[a-zA-Z]*"
                    title="Letters only, please! No spaces, numbers, or special characters." type="text"
                    class="form-control" id="answer" value="" placeholder="Puzzle Answer" required>
                <label for="answer">What say thee?</label>
            </div>
            <button type="submit" class="btn btn-primary answer-button" id="answer-button">Final Submit</button>
        </form>
        `;

        setTimeout(() => {
            tc.style.opacity = "1";
        }, 250);
    }, 500);

    setTimeout(() => {
        document.getElementById("dragon-form").onsubmit = submitFinalFinalFinalAnswer;
        questionP = document.getElementById("question-p");
    }, 1000);
}


function submitFinalFinalFinalAnswer(e){
    e.preventDefault();
    const answerInput = document.getElementById("answer");
    if (!answerInput.checkValidity()) return;

    const answerDiv = document.getElementById("answer-check");

    const p = answerDiv.querySelector("p");

    playEnd()


    return;


    //  check answer
    fetch("https://megapuzzle.carbonizar-planetario03.workers.dev/dyrzai-final", {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({
            "team": getCookie("team"),
            "person": getCookie("name"),
            "puzzle": "dragon-drop",
            "answer": answerInput.value.toLowerCase(),
        }),
    }).then((response) => {
        try {
            response.json().then((obj) => {
                if (obj.result == "correct") {
                    p.innerText = "Final Correct!!";
                    document.getElementById("start-button").style.display = "none";
                } else if (obj.result == "incorrect") {
                    p.innerText = "Wrong LOL!";
                    butt = document.getElementById("start-button");
                    butt.innerText = "Retry";
                    butt.onclick = e => window.location.reload();
                } else {
                    p.innerText = "Whoops... there was a technical issue. Please try again later...";
                    butt = document.getElementById("start-button");
                    butt.innerText = "Retry";
                    butt.onclick = e => window.location.reload();
                }
            });
        } catch (e) {
            p.innerText = "Whoops... there was a technical issue. Please try again later...";
            butt = document.getElementById("start-button");
            butt.innerText = "Retry";
            butt.onclick = e => window.location.reload();
        }
    });




    tc.style.opacity = "0";
    setTimeout(() => {
        answerDiv.style.display = "flex";

        setTimeout(() => {
            answerDiv.style.opacity = "1";
            tc.style.display = "none";
        }, 250);
    }, 500);
}



function playEnd() {
    const answerInput = document.getElementById("answer");
    if (!answerInput.checkValidity()) return;

    const answerDiv = document.getElementById("answer-check");

    const p = answerDiv.querySelector("p");

    p.innerText = "Final Correct!!";
    document.getElementById("start-button").style.display = "none";
    document.getElementById("text-container").remove();

    attention = false;
    set_eye(null);
    const final_items = document.getElementById("end-container");


    setTimeout(function() {

        final_items.innerHTML = 
        `<video id="intro-video" src="./assets/cat-show.webm" autoplay></video>`;
        // code to be executed after 1.5 seconds

        setTimeout(function() {

            final_items.innerHTML = 
            `<video id="intro-video" src="./assets/cat-show.webm" autoplay></video>`;
            // code to be executed after 1.5 seconds

        
        }, 3000)
      
      }, 1500)
    return;
    
        // code to be executed after 1.5 seconds
}


function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

function rand(i) {
    return Math.floor(Math.random() * i);
}