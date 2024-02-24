const canvas = document.getElementById("gameCanvas");
const g = canvas.getContext("2d");

const transitionMessages = ["Alright, that's enough of that", "Wait what???", "Ok this is scaring me", "Is this a time loop?", "Please let me out!",
                            "Did I say my spell wrong?", "This is crazy!", "LET ME OUT LET ME OUT", "Is it over yet???"];
const transitionSubMessages = ["Time to leave the snowglobe", "Why am I still in here?", "I just want to leave :(", "Am I stuck in here???", "I just want to go home!!",
                                "This might have been a mistake...", "I didn't even know there was a time loop spell...", "LET ME OUT LET ME OUT", "Please please please"];

let mx, my = 0;

let outroFrameNo = 0;
let introFrameNo = 999990;

const speechCenter = 615;
const speechDelay = 350;

const canvasW = canvas.clientWidth;
const canvasH = canvas.clientHeight;

let keyMap = {};
let levelNum = 0;
let levels = [new BaseLevel(colorScheme = getRandColors(), stageNum = 1, stageMsg = "Use WASD or Arrow Keys"),
                new ReverseControlsLevel(colorScheme = getRandColors(), stageNum = 2, stageMsg = "Completely backwards!"),
                new DoubleReverseControlsLevel(colorScheme = getRandColors(), stageNum = 3, stageMsg = "Reverse Reverse!"),
                new UnderWaterLevel(colorScheme = getRandColors(), stageNum = 4, stageMsg = "Underwater"),
                new SuperJumpLevel(colorScheme = getRandColors(), stageNum = 5, stageMsg = "Never Skip Leg Day"),
                new GravityLevel(colorScheme = getRandColors(), stageNum = 6, stageMsg = "Now this is wacky"),
                new MultiButtonLevel(colorScheme = getRandColors(), stageNum = 7, stageMsg = "Lots of buttons!"),
                new SpecialSpikeLevel(colorScheme = getRandColors(), stageNum = 8, stageMsg = "How many ways can you die?"),
                new BlindLevel(colorScheme = getRandColors(), stageNum = 9, stageMsg = "How well do you remember your way?")
            ];
let extraLevel = new BaseLevel(colorScheme = getRandColors(), stageNum = levels.length + 1, stageMsg = "Keep Playing Just for Fun!");
let changeStage = false;

let keepPlaying = false;

function renderGame(){

    // console.clear();

    let level = levelNum < levels.length ? levels[levelNum] : extraLevel;
    
    if(drawIntro(g) != 1) return;

    if(level == extraLevel){
        drawOutro(g);
        return;
    }

    outroFrameNo = 0;

    level.renderGame(g, keyMap);
    renderTransition(g, level);

    if(level.completed && !changeStage){
        transitionTimer = 1200;
        changeStage = true;
    }

    if(transitionTimer == 0 && changeStage){
        level.player.kill(level.pStartX, level.pStartY, level.button, level.door);
        levelNum++;
        extraLevel = new BaseLevel(colorScheme = getRandColors(), stageNum = levelNum+1, stageMsg = "Keep Playing Just for Fun!");
        changeStage = false;
    }

}

onkeydown = onkeyup = function(e){
    keyMap[e.key.toLowerCase()] = e.type == 'keydown';

    if(e.key == "p" && e.type == 'keydown')
         printTileMap();
}

setInterval(renderGame, 10);

function getRandColors(){
    let hue = ~~(Math.random() * 70) + 170; // covert to int I hate js so much holy christ wtf
    return [`hsl(${hue}, ${70}%, ${85}%)`, `hsl(${hue}, ${70}%, ${30}%)`];
}

function printTileMap(){
    totalStr = "[";
    for(let i = 0; i<tileMapHeight; ++i){
        str = "["
        for(let j=0; j<tileMapWidth; ++j){
            str += tileMap[i][j].type+",";
        }
        str.substring(0, str.length - 1);
        str+="]";
        totalStr += str + ",";
    }
    totalStr.substring(0, str.length - 1);
    totalStr+="]";
    console.log(totalStr);
}


let transitionX = 925, transitionY = 100, transitionTimer = 0;

function renderTransition(g, level){

    if(transitionTimer > 1000){ // 1000 - 800
        transitionX -= 925/(200 / 5);
    }
    else if(transitionTimer < 200 && transitionTimer > 0){ //200 - 0
        transitionX -= 925/(200 / 5);
    }

    if(transitionTimer > 0){
        transitionTimer-=5;
        keyMap = {};
        level.player.xVel = 0;
        level.player.yVel = 0;
    }else{
        transitionTimer = 0;
        transitionX = 925;
    }

    g.fillStyle = "black";
    g.fillRect(transitionX, transitionY, 925, 400);

    g.fillStyle = level.colorScheme[0];
    g.fillRect(transitionX+20, transitionY+20, 885, 360);

    g.fillStyle = "black";
    g.font = "bold 55px Inter";
    // g.fillText("You beat the level!!", transitionX + 160, transitionY + 170);
    writeCenteredText(g, transitionMessages[levelNum], transitionX + canvasW/2, transitionY + 170);
    g.font = "45px Inter";
    if(levelNum == 6) g.font = "30px Inter";
    writeCenteredText(g, transitionSubMessages[levelNum], transitionX + canvasW/2, transitionY + 270);
    // g.fillText("But did you really?...", transitionX + 210, transitionY + 270);
}

onmousemove = function(e){
    mx = e.x - canvas.offsetLeft;
    my = e.y - canvas.offsetTop;
}


let shatteredGlass = new Image();
let trophy = new Image();
let speechBubble = new Image();
let snowglobe = new Image();
shatteredGlass.src = "./assets/glass.png";
trophy.src = "./assets/trophy.webp";
speechBubble.src = "./assets/bubble.webp";
snowglobe.src = "./assets/Untitled_Globe.webp";

let globeSize; let globeX; let globeY;

function drawOutro(g){

    g.fillStyle = "white";
    g.fillRect(0,0,10000, 10000);

    if(outroFrameNo === 0) cutScenePlayer = new CutScenePlayer(-100,500, 37,40);

    outroFrameNo++;

    // Draw BG
    g.fillStyle = "white";
    g.fillRect(0,0,1000000,1000000);

    //Outro is over and postgres thanks you
    if(outroFrameNo > 800){
        // Little bit of white before postgres shows up again

        if(outroFrameNo > 1000){
            cutScenePlayer.w = 310;
            cutScenePlayer.h = 350;
            cutScenePlayer.x = 0;

            cutScenePlayer.draw(g);

            g.fillStyle = "black";
            g.font = "bold 40px Inter"

            g.drawImage(speechBubble, 360, 100, 450, 250);
            if(outroFrameNo < 1000 + speechDelay * 1){
                writeCenteredText(g, "Ta daaaa", speechCenter, 190);
                writeCenteredText(g, "How'd you like", speechCenter, 240);
                writeCenteredText(g, "my magic trick?", speechCenter, 290);
            } else if(outroFrameNo < 1000 + speechDelay * 2){
                writeCenteredText(g, "Everything was", speechCenter, 190);
                writeCenteredText(g, "completely", speechCenter, 240);
                writeCenteredText(g, "intentional...", speechCenter, 290);
            } else if(outroFrameNo < 1000 + speechDelay * 3) {
                writeCenteredText(g, "...", speechCenter, 240);
            } else if(outroFrameNo < 1000 + speechDelay * 4) {
                writeCenteredText(g, "Ok fine I", speechCenter, 190);
                writeCenteredText(g, "guess you were", speechCenter, 240);
                writeCenteredText(g, "kinda helpful", speechCenter, 290);
            } else if(outroFrameNo < 1000 + speechDelay * 5) {
                writeCenteredText(g, "...", speechCenter, 240);
            } else if(outroFrameNo < 1000 + speechDelay * 6) {
                writeCenteredText(g, "What are", speechCenter, 190);
                writeCenteredText(g, "you still", speechCenter, 240);
                writeCenteredText(g, "doing here?", speechCenter, 290);
            } else if(outroFrameNo < 1000 + speechDelay * 7){
                writeCenteredText(g, "...", speechCenter, 240);
            } else if(outroFrameNo < 1000 + speechDelay * 8) {
                writeCenteredText(g, "Oh!", speechCenter, 190);
                writeCenteredText(g, "you want some", speechCenter, 240);
                writeCenteredText(g, "sort of reward?", speechCenter, 290);
            } else if(outroFrameNo < 1000 + speechDelay * 9) {
                writeCenteredText(g, "Hmmm...", speechCenter, 190);
                writeCenteredText(g, "I guess I could", speechCenter, 240);
                writeCenteredText(g, "give you this", speechCenter, 290);
            } else {
                cutScenePlayer.img.src = "./assets/Hatless_Untitled.webp";
                g.fillText("It's my hat,", 515, 190);
                g.fillStyle = "#4b10ac";
                g.fillText("SuperCoolio", 448, 240);
                g.fillStyle = "black";
                g.fillText(", take", 685, 240);
                g.fillText("good care of it", 475, 290);
            }
        }

        return   
    }

    cutScenePlayer.draw(g);
    cutScenePlayer.update();

    // Postgres moves into frame
    if(outroFrameNo < 450){
        cutScenePlayer.xVel = 1;
        g.drawImage(trophy, 350, 460, 80, 80);
    }
    // Crack suddenly shows up
    if(outroFrameNo > 550){
        g.drawImage(shatteredGlass, 0, 0, canvasW, canvasH);
    }
    //Draw Postgres growing
    if(outroFrameNo > 600){
        cutScenePlayer.x--;
        cutScenePlayer.y-=2;
        cutScenePlayer.w += 2;
        cutScenePlayer.h += 2;
    }


    g.lineWidth = 1;
}

function drawIntro(g){

    if(introFrameNo === 0) {
        cutScenePlayer = new CutScenePlayer(0,500, 310,350);
        globeSize = 75;
        globeX = 480; globeY = 380;
    }

    introFrameNo++;
    // introFrameNo = 100;

    // Draw BG
    g.fillStyle = "white";
    g.fillRect(0,0,1000000,1000000);

    if(introFrameNo < speechDelay * 5){
        cutScenePlayer.w = 310;
        cutScenePlayer.h = 350;
        cutScenePlayer.x = 0;
        cutScenePlayer.y = 100;

        cutScenePlayer.draw(g);

        g.fillStyle = "black";
        g.font = "bold 40px Inter"
        g.drawImage(speechBubble, 360, 100, 450, 250);


        if(introFrameNo < speechDelay * 1){
            writeCenteredText(g, "Oh!", speechCenter, 190);
            writeCenteredText(g, "Hello there", speechCenter, 240);
            writeCenteredText(g, "traveler", speechCenter, 290);
        } else if(introFrameNo < speechDelay * 2){
            writeCenteredText(g, "Wanna", speechCenter, 190);
            writeCenteredText(g, "see a magic", speechCenter, 240);
            writeCenteredText(g, "trick :)", speechCenter, 290);
        } else if(introFrameNo < speechDelay * 3){
            writeCenteredText(g, "I'm going to", speechCenter, 190);
            writeCenteredText(g, "shrink down into", speechCenter, 240);
            writeCenteredText(g, "that snowglobe", speechCenter, 290);
        } else if(introFrameNo < speechDelay * 3.5){
            writeCenteredText(g, "Ready?", speechCenter, 240);
        }else if(introFrameNo < speechDelay * 3.8){
            writeCenteredText(g, "3...", speechCenter, 240);
        }else if(introFrameNo < speechDelay * 4.1){
            writeCenteredText(g, "2...", speechCenter, 240);
        } else if(introFrameNo < speechDelay * 4.4){
            writeCenteredText(g, "1...", speechCenter, 240);
        } else {
            writeCenteredText(g, "Now!", speechCenter, 240);
        }

        g.drawImage(snowglobe, globeX, globeY, globeSize, globeSize);

        return;
    } else if(introFrameNo < speechDelay * 5.475) { // Shrink
        cutScenePlayer.x++;
        cutScenePlayer.y+=2;
        cutScenePlayer.w -= 2 * 310 / 350;
        cutScenePlayer.h -= 2;

        cutScenePlayer.draw(g);

        g.drawImage(snowglobe, globeX, globeY, globeSize, globeSize);

        return;
    } else if(introFrameNo < speechDelay * 5.5) { // Pause
        cutScenePlayer.draw(g);
        g.drawImage(snowglobe, globeX, globeY, globeSize, globeSize);

        return;
    } else if(introFrameNo < speechDelay * 6.475) { // Move
        cutScenePlayer.xVel = 1;
        cutScenePlayer.update();
        cutScenePlayer.draw(g);
        g.drawImage(snowglobe, globeX, globeY, globeSize, globeSize);

        return;    
    } else if(introFrameNo < speechDelay * 7) { // Pause
        cutScenePlayer.imgRot = 0;
        cutScenePlayer.draw(g);
        g.drawImage(snowglobe, globeX, globeY, globeSize, globeSize);

        return;
    } else if(introFrameNo < speechDelay * 9) { // Zoom into snowglobe
        cutScenePlayer.draw(g);
        g.drawImage(snowglobe, globeX, globeY, globeSize, globeSize);

        globeX-=1.1;
        globeY-= 1.2;
        globeSize+=2;

        return;
    } else {
        return 1;
    }
}

function writeCenteredText(g, text, x, y){
    const textM = g.measureText(text);
    g.fillText(text, x-textM.width/2, y);
}