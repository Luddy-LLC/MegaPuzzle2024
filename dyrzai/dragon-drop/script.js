const iris = document.getElementById("iris");
const eye = document.getElementById("eye");


let windowW, windowH;
let eyeCenterX, eyeCenterY;

window.onload = window.onresize = () => {
    windowW = window.innerWidth;
    windowH = window.innerHeight;

    eyeCenterX = .38 * windowW;
    eyeCenterY = .48 * windowH - .11 * windowW; 
}


document.getElementById('body').onmousemove = e => {
    iris.style.marginLeft = -(eyeCenterX - e.x) / 10 +"px";
    iris.style.marginTop = -(eyeCenterY - e.y) / 10 +"px";

    eye.style.marginLeft = -(eyeCenterX - e.x) / 80 +"px";
    eye.style.marginTop = -(eyeCenterY - e.y) / 80 +"px";
}

const toastLiveExample = document.getElementById('liveToast')
const toastBody = document.getElementById("toast-body")
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
iris.onclick = e => {
    toastBody.innerText = dragonMessages[rand(dragonMessages.length)];
    toastBootstrap.show()
}


const butt = document.getElementById("start-button");
const tc = document.getElementById("text-container");
let questionP;

const dragonMessages = ["To test mine eye is quite a daring feat.", "Testing one's patience is not the wisest of diversions.", "Test me not for jests will not bid you well."];

let questions = [ "A crooked hat and a crooked grin, someone who can make another's eyes spin. Power, hunger, and all the rest... but few manage to master this quest.",
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
                    "One well refined is one that indulges in a little bodily motion from time to time. Do tell, what dances do you fall back on in times of turmoil?"];

const finalQuestion = "And finally, dear human, what is your Cat's name?";
let submittedAnswers = [];
let order = [];

butt.onclick = e => {
    tc.style.opacity = '0';

    let idx = rand(questions.length);
    order.push[idx];
    let question = questions[idx];
    questions = removeItemOnce(questions, question);

    setTimeout(() => {
        tc.innerHTML = `
        <p id="question-p">
        ${question}
        </p>
        <div class="form-floating mb-3">
            <input pattern="[a-zA-Z]*"
                title="Letters only, please! No spaces, numbers, or special characters." type="text"
                class="form-control" id="answer" value="" placeholder="Puzzle Answer" required>
            <label for="answer">What say thee?</label>
        </div>
        <button type="submit" class="btn btn-primary answer-button" id="answer-button">Submit Answer</button>
        `;

        setTimeout(() => {
            tc.style.opacity = '1';
        }, 250);
    }, 500);

    setTimeout(() => {
        document.getElementById("answer-button").onclick = nextQuestion;
        questionP = document.getElementById("question-p");
    }, 1000);
}

function nextQuestion(e){
    tc.style.opacity = '0';

    let idx = rand(questions.length);
    order.push[idx];
    let question = questions[idx];
    questions = removeItemOnce(questions, question);

    const answerInput = document.getElementById("answer")

    setTimeout(() => {
        questionP.innerText = question;
        answerInput.value = "";

        setTimeout(() => {
            tc.style.opacity = '1';
        }, 250);
    }, 500);
}




function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

function rand(i) {return Math.floor(Math.random() * i);}