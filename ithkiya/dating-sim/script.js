function lerp(x1, x2, t) {
    return x1 + t * (x2 - x1)
}

const POSITIVE = 1
const NEGATIVE = -2
const NEUTRAL = 0


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



const btn1 = document.getElementById("opt1")
const btn2 = document.getElementById("opt2")
const btn3 = document.getElementById("opt3")
const btn4 = document.getElementById("opt4")



class Question {

}


const introText = `The Pirate Captain Limberakis Fedallah of the ship Etna sailed the seas for many years, 
renowned for the ability to talk out of any situation and return from any venture.
At a port in Ithkiya one fateful night, a passing stranger raised a challenge that the Captain could not turn down...
"You claim to be able to charm anyone across the sea, yet you cower from the center of the Ithkiyan Bay just as any other sailor. 
Surely, then, someone as skilled as you would have no issue sailing over the Great Beast Charibdis?"
Fedallah fumed at this, scoffing that such a feat should be mere child's play. 
With the exchange ended, the captain gathered Etna's crew and set out to prove a most dangerous point.
The crew somberly sang songs of the beast in the water, 
a beautiful daughter of the earth and waves chained to the sea's floor by a vindictive god, 
cursed to take the form of a hideous sea monster...
They hush as the ship approaches her.`;


