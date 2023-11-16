const canvas = document.getElementById("gameCanvas");
const g = canvas.getContext("2d");

let mx, my = 0;


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

    console.clear();

    let level = levelNum < levels.length ? levels[levelNum] : extraLevel;
    
    if(level == extraLevel){
        g.fillStyle = "white";
        g.fillRect(0,0,10000, 10000);

        drawOutro(g);

        return;
    }

    outroFrameNo = 0;

    level.renderGame(g, keyMap);
    renderTransition(g, level);

    if(level.completed && !changeStage){
        transitionTimer = 1000;
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
    let hue = ~~(Math.random() * 360); // covert to int I hate js so much holy christ wtf
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

    if(transitionTimer > 800){ // 1000 - 800
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
    g.font = "bold 75px Arial";
    g.fillText("You beat the level!!", transitionX + 160, transitionY + 170);
    g.font = "60px Arial";
    g.fillText("But did you really?...", transitionX + 210, transitionY + 270);
}

onmousemove = function(e){
    mx = e.x - canvas.offsetLeft;
    my = e.y - canvas.offsetTop;

    // levels[levelNum].player.x = e.x - canvas.offsetLeft;
    // levels[levelNum].player.y = e.y - canvas.offsetTop;
}


let shatteredGlass = new Image();
let trophy = new Image();
let speechBubble = new Image();
shatteredGlass.src = "./assets/glass.png";
trophy.src = "./assets/trophy.webp";
speechBubble.src = "./assets/bubble.webp";
cutScenePlayer = new CutScenePlayer(-100,500, 37,40);

let outroFrameNo = 0;

function drawOutro(g){

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
            g.font = "bold 40px Arial"

            g.drawImage(speechBubble, 360, 100, 450, 250);
            if(outroFrameNo < 1250){
                g.fillText("Ta daaaa", 530, 190);
                g.fillText("How'd you like", 475, 240);
                g.fillText("my magic trick?", 465, 290);
            } else if(outroFrameNo < 1500){
                g.fillText("Everything was", 470, 190);
                g.fillText("completely", 510, 240);
                g.fillText("intentional...", 500, 290);
            } else if(outroFrameNo < 1750) {
                g.fillText("...", 600, 240);
            } else if(outroFrameNo < 2000) {
                g.fillText("Ok fine I", 535, 190);
                g.fillText("guess you were", 470, 240);
                g.fillText("kinda helpful", 495, 290);
            } else if(outroFrameNo < 2250) {
                g.fillText("...", 600, 240);
            } else if(outroFrameNo < 2500) {
                g.fillText("What are", 525, 190);
                g.fillText("you still", 535, 240);
                g.fillText("doing here?", 500, 290);
            } else if(outroFrameNo < 2750) {
                g.fillText("Oh!", 580, 190);
                g.fillText("you want some", 475, 240);
                g.fillText("sort of reward?", 475, 290);
            } else if(outroFrameNo < 3000) {
                g.fillText("Hmmm...", 525, 190);
                g.fillText("I guess I could", 475, 240);
                g.fillText("give you this", 500, 290);
            } else {
                cutScenePlayer.img.src = "./assets/Hatless_Untitled.webp";
                g.fillText("It's my hat,", 515, 190);
                g.fillStyle = "#4b10ac";
                g.fillText("SuperCoolio", 450, 240);
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
        g.drawImage(shatteredGlass, 0, 0, canvas.clientWidth, canvas.clientHeight);
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