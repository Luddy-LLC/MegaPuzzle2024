
document.getElementById('ontro-video').play();
let prompts = document.getElementById('text');
let vid = document.getElementById('vid');


setTimeout(function() {

    prompts.innerHTML = 
    `
    <div id= "actual-info" class="text-container">
        Hmmn... What an... interesting name... So you are the one who lived in that house?
        <button class="btn btn-primary answer-button" id="answer-button" onclick="secondPart()">Continue</button>
    </div>`;

  
  }, 3100)



function secondPart() {
    vid.innerHTML= `<video id="ontro-video" src="assets/ending2.webm" autoplay muted> </video>`;

    prompts.innerHTML = 
    `
    <div id= "actual-info" class="text-container">
        I knew that whoever could live in the same place as a noble creature such as that must be worldly enough to solve my riddles. I should not want the creature to pass into untoward hands, so I found this test... necessary. Take care of your pet. I have grown fond of the creature, despite myself.
        <button class="btn btn-primary answer-button" id="answer-button" onclick="thirdPart()">Continue</button>
    </div>`;

}

function thirdPart() {
    vid.innerHTML= `<video id="ontro-video" src="assets/ending3.webm" autoplay muted> </video>`;

    prompts.innerHTML = 
    `
    <div id= "actual-info" class="text-container">
        Now, go, and hold no grudge.
        <button class="btn btn-primary answer-button" id="answer-button" onclick="fourthPart()">Continue</button>
    </div>`;

}

function fourthPart() {
    vid.innerHTML= `<image id="ontro-video" src="assets/ending4.png"> </image>`;

    prompts.innerHTML = 
    `
    <div id= "actual-info" class="text-container">
        <button class="btn btn-primary answer-button" id="answer-button" onclick="creditsPage()">Credits</button>
        <button class="btn btn-primary answer-button" id="home" onclick="homePage()">Home</button>
    </div>`;

}

function creditsPage() {
    window.location.assign("../credits/index.html")
}


function homePage() {
    window.location.assign("../index.html")
}