// Dating Sim
// Code by Calvin Josenhans and Mallory Miller
// Written by Mallory Miller and Samuel Mills
// Assets by Mallory Miller
// Date: February 2024

// TODO: If you get to the end, stop moving, so you don't get eated

function lerp(x1, x2, t) {
    return x1 + t * (x2 - x1)
}

const JIMOTHY = 1
const MALLORY_MILLER = -2
const BANANA = 0

let distance = 100
let score = 0

class Action {
    constructor(text, outcome) {
        this.text = text
        this.outcome = outcome
    }
}

const data = [
    // Are you ___?
    new Action("...besties with Scylla? Because I think this conversation is HEADing in the right direction.", JIMOTHY),
    new Action("...Poseidon? Because I can SEA your beauty from here.", BANANA),
    new Action("...Gaia? Because you are down to earth, girl.", BANANA),
    new Action("...an extra salty fish fillet? Because I can't get enough of you even though you can sometimes be extremely unhealthy for me.", MALLORY_MILLER),
    // Gift
    new Action("Chocolates", JIMOTHY),
    new Action("Poetry", BANANA),
    new Action("Flowers", BANANA),
    new Action("Model Ship", MALLORY_MILLER),
    // Promise
    new Action("Girl, stick with me and I'll lure in more tasty sailors for you than a siren.", JIMOTHY),
    new Action("Honey, if you give me a chance, I'll never charib-DISS you again.", BANANA),
    new Action("Sweetheart, come on a date with me and I'll have you HOOKED.", BANANA),
    new Action("Darlin' if you let me live through the night I'll give you a real good one in exchange.  ", MALLORY_MILLER),
    // Do you have a map?
    new Action("'Cause I get lost in your vast and powerful waves.", JIMOTHY),
    new Action("'Cause you're the only treasure I've found here so far.", BANANA),
    new Action("'Cause I'm struggling to find a reason NOT to like you.", BANANA),
    new Action("'Cause I get lost in your gaping maw.", MALLORY_MILLER),
    // I must be ___
    new Action("a salmon, 'cause I'd swim upstream for you anytime.", JIMOTHY),
    new Action("an urchin, 'cause you're revealing the soft heart I hide behind my spiky exterior.", BANANA),
    new Action("a sheep, 'cause I'd let you pull the wool over my eyes any day.", BANANA),
    new Action("an ox, 'cause I bet you think I look delicious.", MALLORY_MILLER),
    // If you were a ___
    new Action("singer, you'd be my Muse.", JIMOTHY),
    new Action("Titan, I'd be the vulture to your Prometheus.", BANANA),
    new Action("artist, you'd be Arachne.", BANANA),
    new Action("nymph, you'd be Thetis", MALLORY_MILLER),
    // Love language
    new Action("Yiv, and you're speaking it.", JIMOTHY),
    new Action("words of affirmation, and you're speaking it.", BANANA),
    new Action("quality time, and you're speaking it.", BANANA),
    new Action("whale sounds, and you're speaking it.", MALLORY_MILLER),
    // you're like ___
    new Action("Aphrodite, beautiful and from the sea.", JIMOTHY),
    new Action("Apollo, a ray of sunshine.", BANANA),
    new Action("Persephone, because I only see you a few months a year.", BANANA),
    new Action("Hercules, because you can accomplish any Herculean task.", MALLORY_MILLER),
    // I was wondering
    new Action("if I were a worm, would you still love me?", JIMOTHY),
    new Action("if I'm a sailor, will you put wind in my sails?", BANANA),
    new Action("if you're here, then who's steering the ship?", BANANA),
    new Action("if you're here, then who's ruling over Olympus?", MALLORY_MILLER),
    // I wouldn't mind
    new Action("being chained to the ocean floor if you were chained up next to me.", JIMOTHY),
    new Action("missing Saturnalia if I got to spend it with you instead.", BANANA),
    new Action("being a worm if it meant we had more in common.", BANANA),
    new Action("getting struck down by Zeus if you were there to share it with me.", MALLORY_MILLER),
]

const titles = [
    "Are you...",
    "Gift",
    "I Promise",
    "Do you have a map?...",
    "I must be...",
    "If you were a...",
    "My love language is...",
    "You're like...",
    "I was wondering...",
    "I wouldn't mind..."
]

let results = [null, null, null, null]

/*
    Game Phase:
    -1   : Introduction
    0 - 9: Questions
    10+  : Ending Screen 
*/
let gamePhase = -1

// Getting all of the things
const title = document.getElementById("ttl")
const desc = document.getElementById("text")
const opts = document.getElementById("options")
const result = document.getElementById("result")

const btn1 = document.getElementById("opt1")
btn1.addEventListener("click", () => advanceGame(0))

const btn2 = document.getElementById("opt2")
btn2.addEventListener("click", () => advanceGame(1))

const btn3 = document.getElementById("opt3")
btn3.addEventListener("click", () => advanceGame(2))

const btn4 = document.getElementById("opt4")
btn4.addEventListener("click", () => advanceGame(3))

const start = document.getElementById("start")
start.addEventListener("click", () => advanceGame(false))

const reset = document.getElementById("reset")
reset.addEventListener("click", ()=>resetGame())

const stats = document.getElementById("stats")

const moods = {
    "angry": document.getElementById("char_angry"),
    "normal": document.getElementById("char_neuter"),
    "happier": document.getElementById("char_happy"),
    "winning": document.getElementById("char_win")
}

function chooseMood() {
    if (score < 0) {
        moods.angry.style.display = "block";
        moods.normal.style.display = "none";
        moods.happier.style.display = "none";
        moods.winning.style.display = "none";
    } else if (score < 4) {
        moods.angry.style.display = "none";
        moods.normal.style.display = "block";
        moods.happier.style.display = "none";
        moods.winning.style.display = "none";
    } else if (score < 9) {
        moods.angry.style.display = "none";
        moods.normal.style.display = "none";
        moods.happier.style.display = "block";
        moods.winning.style.display = "none";
    } else  {
        moods.angry.style.display = "none";
        moods.normal.style.display = "none";
        moods.happier.style.display = "none";
        moods.winning.style.display = "block";
    }
}


function advanceGame(opt) {
    gamePhase++
    
    desc.style.display = "none"

    if (Number.isInteger(opt)) {
        // Update the score!
        let res  = results[opt].outcome
        score += res

        chooseMood()
    }
    console.log("AS", gamePhase)

    // Update the set of answers
    if (gamePhase < 10) {
        opts.style.display = "flex"
        title.style.display = "block"
        stats.style.display = "flex"
        let answers = data.filter((e, i) => Math.floor(i / 4) == gamePhase).sort(() => Math.random() - 0.5)
        btn1.innerText = answers[0].text
        results[0] = answers[0]

        btn2.innerText = answers[1].text
        results[1] = answers[1]

        btn3.innerText = answers[2].text
        results[2] = answers[2]

        btn4.innerText = answers[3].text
        results[3] = answers[3]

        title.innerText = titles[gamePhase]
    }
    else{
        // Figure out whether we won or not
        console.log(gamePhase)
        opts.style.display = "none"
        result.style.display="flex"
        reset.style.display = "flex"
        title.style.display = "none"
        stats.style.display = "none"

        if (distance == 0) {
            // Lost
            result.innerText = "Charibdis consumes all."
        } else {
            // Won
            result.style.display = "flex"
            reset.style.display = "flex"
            if (score == 10) {
                // Perfect
                result.innerText = "That was a perfect date. \n [-9] [-4] [-21] [-10] [0] [-12] [1] [19] [-8] [36]"
            } else {
                result.innerText = "Charibdis strives for perfection. \n [-9] [-4] [-21] [-10] [0] [-12] [1] [19] [-8] [36]"
            }
        }
    }
}


function resetGame() {
    opts.style.display = "none"
    desc.style.display = "flex"
    reset.style.display = "none"
    result.style.display = "none"
    gamePhase = -1
    distance = 100

    score = 0
    chooseMood()
}

const ship = document.getElementById("dude")
let stepSize = 1

let step = 1000 // How many ms it takes to move one step
let timeFactor = 20 // Making frames smoother

// Moving the ship
function moveShip() {
    if (gamePhase == -1)
        return

    let speed = 0
    if (score >= 6) {
        speed = 0
    } else if (score >= 1) {
        speed = 1
    } else if (score >= -4) {
        speed = 3
    } else if (score >= -9) {
        speed = 10
    } else {
        speed = 100
    }

    if (gamePhase < 10) {
        distance = Math.max(distance - speed/timeFactor, 0)
    }

    stats.innerHTML="Distance: " + Math.round(distance) + " km&eacute; <br>Score: "+ score

    ship.style.left = String(10 + stepSize*(100 - distance)) + "px"   

    if (distance == 0) {
        // Go to lost phase
        gamePhase = 10
        advanceGame()
    }
}


const g = document.getElementById("graphics")

function setStepSize() {
    let a = window.innerWidth
    stepSize = ( (g.clientWidth - 300) / 100)
}

setStepSize()

window.addEventListener("resize", setStepSize)

setInterval(moveShip, 1000/timeFactor)