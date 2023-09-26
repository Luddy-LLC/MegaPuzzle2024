const canvas = document.getElementById("gameCanvas");
const g = canvas.getContext("2d");

let mx, my = 0;


let keyMap = {};
let levelNum = 7;
let levels = [new BaseLevel(colorScheme = getRandColors(), stageNum = 1, stageMsg = "Use WASD or Arrow Keys"),
                new ReverseControlsLevel(colorScheme = getRandColors(), stageNum = 2, stageMsg = "Completely backwards!"),
                new DoubleReverseControlsLevel(colorScheme = getRandColors(), stageNum = 3, stageMsg = "Reverse Reverse!"),
                new UnderWaterLevel(colorScheme = getRandColors(), stageNum = 4, stageMsg = "Underwater"),
                new SuperJumpLevel(colorScheme = getRandColors(), stageNum = 5, stageMsg = "Never Skip Leg Day"),
                new GravityLevel(colorScheme = getRandColors(), stageNum = 6, stageMsg = "Now this is wacky"),
                new MultiButtonLevel(colorScheme = getRandColors(), stageNum = 7, stageMsg = "Lots of buttons!"),
                new SpecialSpikeLevel(colorScheme = getRandColors(), stageNum = 8, stageMsg = "How many ways can you die?")
            ];
let extraLevel = new BaseLevel(colorScheme = getRandColors(), stageNum = levels.length + 1, stageMsg = "Keep Playing Just for Fun!");
let changeStage = false;

function renderGame(){
    let level = levelNum < levels.length ? levels[levelNum] : extraLevel;
    
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

    g.fillStyle="black";
    g.font="10px Arial";
    g.fillText("X: "+mx+", Y:"+my+", TX: "+mx/tileWidth+", TY:"+my/tileWidth, 100,70);
    g.fillText("pX: "+Math.floor(level.player.x)+", pY:"+Math.floor(level.player.y), 100,90);
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