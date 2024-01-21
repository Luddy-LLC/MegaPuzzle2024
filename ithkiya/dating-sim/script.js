function lerp(x1, x2, t) {
    return x1 + t * (x2 - x1)
}

const POSITIVE = 1
const NEGATIVE = -2
const NEUTRAL = 0

let distance = 100;

class Action {
    constructor(text, outcome) {
        this.text = text
        this.outcome = outcome
    }
}

const data = [
    // Are you ___?
    new Action("Are you besties with Scylla? Because I think this conversation is HEADing in the right direction.", POSITIVE),
    new Action("Are you Poseidon? Because I can SEA your beauty from here.", NEUTRAL),
    new Action("Are you Gaia? Because you are down to earth, girl.", NEUTRAL),
    new Action("Are you an extra salty fish fillet? Because I can't get enough of you even though you can sometimes be extremely unhealthy for me.", NEGATIVE),
    // Gift
    new Action("Chocolates", POSITIVE),
    new Action("Poetry", NEUTRAL),
    new Action("Flowers", NEUTRAL),
    new Action("Model Ship", NEGATIVE),
    // Promise
    new Action("Girl, stick with me and I'll lure in more tasty sailors for you than a siren.", POSITIVE),
    new Action("Honey, if you give me a chance, I'll never charib-DISS you again.", NEUTRAL),
    new Action("Sweetheart, come on a date with me and I'll have you HOOKED.", NEUTRAL),
    new Action("Darlin' if you let me live through the night I'll give you a real good one in exchange.  ", NEGATIVE),
    // Do you have a map?
    new Action("Do you have a map? 'Cause I get lost in your vast and powerful waves.", POSITIVE),
    new Action("Do you have a map? 'Cause you're the only treasure I've found here so far.", NEUTRAL),
    new Action("Do you have a map? 'Cause I'm struggling to find a reason NOT to like you.", NEUTRAL),
    new Action("Do you have a map? 'Cause I get lost in your gaping maw.", NEGATIVE),
    // I must be ___
    new Action("I must be a salmon, 'cause I'd swim upstream for you anytime.", POSITIVE),
    new Action("I must be an urchin, 'cause you're revealing the soft heart I hide behind my spiky exterior.", NEUTRAL),
    new Action("I must be a sheep, 'cause I'd let you pull the wool over my eyes any day.", NEUTRAL),
    new Action("I must be an ox, 'cause I bet you think I look delicious.", NEGATIVE),
    // If you were a ___
    new Action("If you were a singer, you'd be my Muse.", POSITIVE),
    new Action("If you were a Titan, I'd be the vulture to your Prometheus.", NEUTRAL),
    new Action("If you were an artist, you'd be Arachne.", NEUTRAL),
    new Action("If you were a nymph, you'd be Thetis", NEGATIVE),
    // Love language
    new Action("My love language is Yiv, and you're speaking it.", POSITIVE),
    new Action("My love language is words of affirmation, and you're speaking it.", NEUTRAL),
    new Action("My love language is quality time, and you're speaking it.", NEUTRAL),
    new Action("My love language is whale sounds, and you're speaking it.", NEGATIVE),
    // you're like ___
    new Action("You're like Aphrodite, beautiful and from the sea.", POSITIVE),
    new Action("You're like Apollo, a ray of sunshine.", NEUTRAL),
    new Action("You're like Persephone, because I only see you a few months a year.", NEUTRAL),
    new Action("You're like Hercules, because you can accomplish any Herculean task.", NEGATIVE),
    // I was wondering
    new Action("I was wondering... if I were a worm, would you still love me?", POSITIVE),
    new Action("I was wondering.... if I'm a sailor, will you put wind in my sails?", NEUTRAL),
    new Action("I was wondering... if you're here, then who's steering the ship?", NEUTRAL),
    new Action("I was wondering... if you're here, then who's ruling over Olympus?", NEGATIVE),
    // I wouldn't mind
    new Action("I wouldn't mind being chained to the ocean floor if you were chained up next to me.", POSITIVE),
    new Action("I wouldn't mind missing Saturnalia if I got to spend it with you instead.", NEUTRAL),
    new Action("I wouldn't mind being a worm if it meant we had more in common.", NEUTRAL),
    new Action("I wouldn't mind getting struck down by Zeus if you were there to share it with me.", NEGATIVE),
]

const titles = [
    "Are you ___?",
    "You feel like giving Charybdis a gift.",
    "You make a promise to Charybdis.",
    "You're starting to scrape the bottom of the barrel.",
    "I must be ___",
    "If you were a ___",
    "Personally my love language is telling people to leave me alone.",
    "You're like, totally running out of ideas, aren't you.",
    "I was wondering how much longer this agony will last.",
    "I do though, actually."
]

/*
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
reset.addEventListener("click", ()=>resetGame());




function advanceGame(opt) {
    gamePhase++;
    
    desc.style.display = "none";

    if (Number.isInteger(opt)) {
        // Update the score!
    }


    if (gamePhase < 10) {
        opts.style.display = "flex";
        let answers = data.filter((e, i) => Math.floor(i / 4) == gamePhase).sort(() => Math.random() - 0.5);
        btn1.innerText = answers[1].text;
        btn2.innerText = answers[2].text;
        btn3.innerText = answers[3].text;
        btn4.innerText = answers[0].text;

        title.innerText = titles[gamePhase]
    }
    else{
        // Figure out whether we won or not
        opts.style.display = "none";
        result.style.display="flex"
    }

}


function resetGame() {
    opts.style.display = "none"
    desc.style.display = "flex"
    gamePhase = -1;
    distance = 100;
}