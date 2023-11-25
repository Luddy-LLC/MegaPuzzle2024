const tileMapWidth = 37;
const tileMapHeight = 24;
const tileWidth = 25;

let deaths = 0;
let types = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
    [0, 2, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, 0, ],
    [0, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 0, ],
    [0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 0, ],
    [0, 0, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, 0, ],
    [0, 0, 0, 0, 0, 0, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, -1, 0, ],
    [0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, ],
    [0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 0, ],
    [0, -1, -1, -1, -1, -1, 0, 0, -1, -1, -1, -1, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, -1, -1, -1, -1, -1, 4, 0, ],
    [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 0, ],
    [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 0, ],
    [0, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, ],
    [0, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, 0, ],
    [0, 2, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, -1, -1, 0, ],
    [0, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, ],
    [0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 0, 0, 0, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, ],
    [0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, 0, ],
    [0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, 0, 0, 0, -1, -1, 1, 0, 0, 0, 0, 0, 1, -1, -1, -1, 1, 0, 1, 1, 1, 1, 1, 1, 0, ],
    [0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
    [0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, ],
    [0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, ],
    [0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, ],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
];


class BaseLevel {

    colorScheme;
    gravity;
    maxXSpeed;
    maxJumpPower;
    pStartX;
    pStartY;
    pEndRect;
    player;
    bodies;
    completed;
    button;
    door;
    tileMap;
    stageNum;
    stageMsg;


    constructor(colorScheme, stageNum, stageMsg, gravity = 0.1, maxXSpeed = 3.1, maxJumpPower = 4.8, pStartX = tileWidth * 3.5, pStartY = tileWidth * 8) {
        this.colorScheme = colorScheme;
        this.gravity = gravity;
        this.maxXSpeed = maxXSpeed;
        this.maxJumpPower = maxJumpPower;

        this.pStartX = pStartX;
        this.pStartY = pStartY;

        this.player = new Player(pStartX, pStartY, 37, 40);
        this.button = new Button(20 * tileWidth, 10 * tileWidth + 5, 75, 20);
        this.bodies = [];
        this.tileMap = [];

        this.stageNum = stageNum;
        this.stageMsg = stageMsg;

        this.completed = false;

        if (pStartX === tileWidth * 3.5 && pStartY === tileWidth * 8) {
            this.pEndRect = new Rectangle(34.5 * tileWidth, 21.4 * tileWidth, 2.6 * tileWidth, 1.6 * tileWidth);
            this.door = new Door(29.15 * tileWidth, 19 * tileWidth, .7 * tileWidth, 4 * tileWidth);
        }

        this.initMap();
    }

    initMap() {
        for (let i = 0; i < tileMapHeight; ++i) {
            let row = [];
            for (let j = 0; j < tileMapWidth; ++j) {
                row.push(new Tile(j * tileWidth, i * tileWidth, tileWidth, tileWidth, types[i][j], this.colorScheme[1]));
            }
            this.tileMap.push(row);
        }
        // Ground
        for (let i = 0; i < tileMapWidth; ++i) {
            this.tileMap[tileMapHeight - 1][i].type = 0;
        }
    }

    renderGame(g, keyMap) {
        g.fillStyle = this.colorScheme[0];
        g.fillRect(0, 0, 10000, 10000);


        this.handleKeyInputs(keyMap);

        // Update player, button, and door
        this.player.update(this.tileMap, this.bodies, this.gravity, this.pStartX, this.pStartY, this.button, this.door, g);
        this.button.update(this.player);
        this.door.update();

        // Connect button to door
        if (this.button.wasPressed)
            this.door.opening = true;

        // Draw tile map and door
        this.door.draw(g);
        for (let i = 0; i < tileMapHeight; ++i) {
            for (let j = 0; j < tileMapWidth; ++j) {
                this.tileMap[i][j].draw(g);
            }
        }

        // Draw dead bodies
        for (let i = 0; i < this.bodies.length; ++i) {
            this.bodies[i].update(this.tileMap, this.gravity);
            this.bodies[i].draw(g)

            if (this.bodies[i].opacity <= 0) {
                this.bodies.splice(i--, 1);
            }
        }


        // Draw player, button
        this.button.draw(g);
        this.player.draw(g);

        // Draw end tube
        g.fillStyle = "#ff9b05";
        g.fillRect(33.4 * tileWidth, 21.4 * tileWidth, 2.6 * tileWidth, 1.6 * tileWidth);
        g.fillRect(33.4 * tileWidth, 21.1 * tileWidth, 0.5 * tileWidth, 2.2 * tileWidth);

        // Draw start tube
        g.fillRect(3.5 * tileWidth, 8 * tileWidth, 1.6 * tileWidth, 1.7 * tileWidth);
        g.fillRect(3.2 * tileWidth, 9.2 * tileWidth, 2.2 * tileWidth, 0.5 * tileWidth);

        if (this.pEndRect.detectCollision(this.player))
            this.completed = true;

        // Draw Bottom Black Bar
        this.drawBottomBar(g);

    }

    drawBottomBar(g) {
        // Draw Bottom Bar (Stage num, msg, and deaths)
        g.fillStyle = "black";
        g.fillRect(0, 600, 925, 120);
        g.fillStyle = "white";

        g.font = "bolder 27px Inter";
        g.fillText("Level 1", 70, 650);
        g.font = "27px Inter";
        g.fillText(`Stage ${this.stageNum}`, 170, 650);

        g.font = "22px Inter";
        g.fillText(`${this.stageMsg}`, 70, 685);

        g.font = "bold 70px Inter"
        g.fillText(`Deaths: ${deaths}`, 500, 680);
    }

    handleKeyInputs(keyMap) {
        if (keyMap["d"] || keyMap["D"] || keyMap["arrowright"]) {
            this.player.xVel = this.maxXSpeed;
            if (!keyMap["shift"])
                this.player.facingRight = true;
        } else if (keyMap["a"] || keyMap["A"] || keyMap["arrowleft"]) {
            this.player.xVel = -this.maxXSpeed;
            if (!keyMap["shift"])
                this.player.facingRight = false;
        }

        if (keyMap["w"] || keyMap["W"] || keyMap["arrowup"])
            this.player.jump(this.maxJumpPower);

        if (keyMap["r"] || keyMap["R"]) {
            this.bodies.push(new DeadPlayer(this.player.x, this.player.y, this.player.w, this.player.h, this.player.facingRight, this.player.xVel, this.player.yVel, this.player.canJump));
            this.player.kill(this.pStartX, this.pStartY, this.button, this.door);
        }
    }

}

class MultiButtonLevel extends BaseLevel {

    constructor(colorScheme, stageNum, stageMsg) {
        super(colorScheme, stageNum, stageMsg);
        this.button = [new Button(4.25 * tileWidth, 5 * tileWidth - 15, 37.5, 15), new Button(32.5 * tileWidth, 5 * tileWidth - 15, 37.5, 15),
            new Button(22.5 * tileWidth, 5 * tileWidth - 15, 37.5, 15), new Button(31.25 * tileWidth, 13 * tileWidth - 15, 37.5, 15),
            new Button(8.75 * tileWidth, 20 * tileWidth - 15, 37.5, 15), new Button(14.25 * tileWidth, 17 * tileWidth - 15, 37.5, 15),
            new Button(13.25 * tileWidth, 8 * tileWidth - 15, 37.5, 15)
        ];
    }


    renderGame(g, keyMap) {
        g.fillStyle = this.colorScheme[0];
        g.fillRect(0, 0, 10000, 10000);

        this.handleKeyInputs(keyMap);

        // Update player, button, and door
        this.player.update(this.tileMap, this.bodies, this.gravity, this.pStartX, this.pStartY, this.button, this.door);
        this.button.forEach(b => b.update(this.player));
        this.door.update();

        // Connect button to door
        if (this.allButtonsPressed(this.button))
            this.door.opening = true;

        // Draw tile map and door
        this.door.draw(g);
        for (let i = 0; i < tileMapHeight; ++i) {
            for (let j = 0; j < tileMapWidth; ++j) {
                this.tileMap[i][j].draw(g);
            }
        }

        // Draw dead bodies
        for (let i = 0; i < this.bodies.length; ++i) {
            this.bodies[i].update(this.tileMap, this.gravity);
            this.bodies[i].draw(g)

            if (this.bodies[i].opacity <= 0) {
                this.bodies.splice(i--, 1);
            }
        }

        // Draw player, button
        this.button.forEach(b => b.draw(g));
        this.player.draw(g);

        // Draw end tube
        g.fillStyle = "#ff9b05";
        g.fillRect(33.4 * tileWidth, 21.4 * tileWidth, 2.6 * tileWidth, 1.6 * tileWidth);
        g.fillRect(33.4 * tileWidth, 21.1 * tileWidth, 0.5 * tileWidth, 2.2 * tileWidth);

        // Draw start tube
        g.fillRect(3.5 * tileWidth, 8 * tileWidth, 1.6 * tileWidth, 1.7 * tileWidth);
        g.fillRect(3.2 * tileWidth, 9.2 * tileWidth, 2.2 * tileWidth, 0.5 * tileWidth);

        if (this.pEndRect.detectCollision(this.player))
            this.completed = true;

         // Draw Bottom Black Bar
        this.drawBottomBar(g);
    }

    handleKeyInputs(keyMap) {
        if (keyMap["d"] || keyMap["D"] || keyMap["arrowright"]) {
            this.player.xVel = this.maxXSpeed;
            if (!keyMap["shift"])
                this.player.facingRight = true;
        } else if (keyMap["a"] || keyMap["A"] || keyMap["arrowleft"]) {
            this.player.xVel = -this.maxXSpeed;
            if (!keyMap["shift"])
                this.player.facingRight = false;
        }
        if (keyMap["w"] || keyMap["W"] || keyMap["arrowup"])
            this.player.jump(this.maxJumpPower);

        if (keyMap["r"] || keyMap["R"]) {
            this.bodies.push(new DeadPlayer(this.player.x, this.player.y, this.player.w, this.player.h, this.player.facingRight, this.player.xVel, this.player.yVel, this.player.canJump));
            this.player.kill(this.pStartX, this.pStartY, this.button, this.door);
        }
    }

    allButtonsPressed(buttons) {
        for (let i = 0; i < buttons.length; ++i) {
            if (!buttons[i].wasPressed)
                return false;
        }
        return true;
    }

}

class ReverseControlsLevel extends BaseLevel {
    handleKeyInputs(keyMap) {
        if (keyMap["d"] || keyMap["D"] || keyMap["arrowright"]) {
            this.player.xVel = -this.maxXSpeed;
            if (!keyMap["shift"])
                this.player.facingRight = true;
        } else if (keyMap["a"] || keyMap["A"] || keyMap["arrowleft"]) {
            this.player.xVel = this.maxXSpeed;
            if (!keyMap["shift"])
                this.player.facingRight = false;
        }

        if (keyMap["s"] || keyMap["S"] || keyMap["arrowdown"])
            this.player.jump(this.maxJumpPower);

        if (keyMap["r"] || keyMap["R"]) {
            this.bodies.push(new DeadPlayer(this.player.x, this.player.y, this.player.w, this.player.h, this.player.facingRight, this.player.xVel, this.player.yVel, this.player.canJump));
            this.player.kill(this.pStartX, this.pStartY, this.button, this.door);
        }
    }
}

class DoubleReverseControlsLevel extends ReverseControlsLevel {
    constructor(colorScheme, stageNum, stageMsg, gravity = 0.1, maxXSpeed = 3.1, maxJumpPower = 4.8, pStartX = 33 * tileWidth, pStartY = 21 * tileWidth) {
        super(colorScheme, stageNum, stageMsg);

        this.pStartX = pStartX;
        this.pStartY = pStartY;

        this.player = new Player(pStartX, pStartY, 37, 40);
        this.button = new Button(20 * tileWidth, 10 * tileWidth + 5, 75, 20);
        this.bodies = [];
        this.tileMap = [];

        this.pEndRect = new Rectangle(3.5 * tileWidth, 8 * tileWidth, 1.6 * tileWidth, 1.7 * tileWidth);
        this.door = new Door(6 * tileWidth, 9 * tileWidth, .7 * tileWidth, 9 * tileWidth);

        this.initMap();
    }
}

class UnderWaterLevel extends BaseLevel{
    
    jumpTimer;
    
    
    constructor(colorScheme, stageNum, stageMsg) {
        super(colorScheme, stageNum, stageMsg);

        this.gravity = .04;
        this.maxXSpeed = 2.2;
        this.maxJumpPower = 2;


        this.jumpTimer = 0;
    }

    renderGame(g, keyMap){
        super.renderGame(g, keyMap);

        this.player.canJump = true;
        if(this.jumpTimer > 0)
            this.jumpTimer--;
        
        g.fillStyle = "#11a2c655";
        g.fillRect(0, 0, 10000, 10000);

        this.drawBottomBar(g);
    }

    handleKeyInputs(keyMap) {
        if (keyMap["d"] || keyMap["D"] || keyMap["arrowright"]) {
            this.player.xVel = this.maxXSpeed;
            if (!keyMap["shift"])
                this.player.facingRight = true;
        } else if (keyMap["a"] || keyMap["A"] || keyMap["arrowleft"]) {
            this.player.xVel = -this.maxXSpeed;
            if (!keyMap["shift"])
                this.player.facingRight = false;
        }

        if ((keyMap["w"] || keyMap["W"] || keyMap["arrowup"]) && this.jumpTimer == 0){
            this.jumpTimer = 30;
            this.player.jump(this.maxJumpPower);
        }

        if (keyMap["r"] || keyMap["R"]) {
            this.bodies.push(new DeadPlayer(this.player.x, this.player.y, this.player.w, this.player.h, this.player.facingRight, this.player.xVel, this.player.yVel, this.player.canJump));
            this.player.kill(this.pStartX, this.pStartY, this.button, this.door);
        }
    }
}

class SuperJumpLevel extends BaseLevel{
    constructor(colorScheme, stageNum, stageMsg){
        super(colorScheme, stageNum, stageMsg);

        this.maxJumpPower = 40;
    }
}

class GravityLevel extends BaseLevel{
    constructor(colorScheme, stageNum, stageMsg){
        super(colorScheme, stageNum, stageMsg);

        this.tileMap[14][7] = new Tile(7 * tileWidth, 14 * tileWidth, tileWidth, tileWidth, -1, this.colorScheme[1]);
        this.tileMap[16][28] = new Tile(28 * tileWidth, 16 * tileWidth, tileWidth, tileWidth, 0, this.colorScheme[1]);
        this.tileMap[17][28] = new Tile(28 * tileWidth, 17 * tileWidth, tileWidth, tileWidth, -1, this.colorScheme[1]);
        this.tileMap[18][28] = new Tile(28 * tileWidth, 18 * tileWidth, tileWidth, tileWidth, -1, this.colorScheme[1]);

        this.maxJumpPower = -5;
        this.gravity = -0.1;

        this.player = new GravityPlayer(this.pStartX, this.pStartY, 37, 40);
    }
}

class SpecialSpikeLevel extends BaseLevel{

    numSpikes;
    numTouched;

    constructor(colorScheme, stageNum, stageMsg) {
        super(colorScheme, stageNum, stageMsg);

        this.numSpikes = 0;
        this.numTouched = [0]; // pass by reference!!!

        this.player = new TouchingPlayer(this.pStartX, this.pStartY, 37, 40, this.numTouched);

        this.initMap();
    }

    initMap() {
        for (let i = 0; i < tileMapHeight; ++i) {
            let row = [];
            for (let j = 0; j < tileMapWidth; ++j) {
                row.push(new TouchedTile(j * tileWidth, i * tileWidth, tileWidth, tileWidth, types[i][j], this.colorScheme[1]));
                if(types[i][j] >= 1 && types[i][j] <= 4){
                    this.numSpikes++;
                }
            }
            this.tileMap.push(row);
        }
        // Ground
        for (let i = 0; i < tileMapWidth; ++i) {
            this.tileMap[tileMapHeight - 1][i].type = 0;
        }
    }

    renderGame(g, keyMap) {
        super.renderGame(g, keyMap);

        if(this.numTouched < this.numSpikes){
            this.door.y = this.door.startY;
            this.door.h = this.door.startH;
            this.door.opening = false;
            this.button.wasPressed = false;
        } else {
            this.door.opening = true;
            this.button.wasPressed = true;
        }
    }


}

class BlindLevel extends BaseLevel{
    constructor(colorScheme, stageNum, stageMsg) {
        super(["white", "white"], stageNum, stageMsg);
    }

    initMap() {
        for (let i = 0; i < tileMapHeight; ++i) {
            let row = [];
            for (let j = 0; j < tileMapWidth; ++j) {
                row.push(new BlindTile(j * tileWidth, i * tileWidth, tileWidth, tileWidth, types[i][j], this.colorScheme[1]));
            }
            this.tileMap.push(row);
        }
        // Ground
        for (let i = 0; i < tileMapWidth; ++i) {
            this.tileMap[tileMapHeight - 1][i].type = 0;
        }
    }
}


let hitBoxLeeWay = 5;
let triangleLeeWay = 0;


class Rectangle{
    x;
    y;
    w;
    h;
    type;

    constructor(x, y, w, h ,type){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.type = type;
    }

    detectCollision(rect){

        let xCollision = this.x < (rect.x+rect.w)-1 && rect.x < (this.x+this.w)-1;
        let yCollision = this.y < (rect.y+rect.h)-1 && rect.y < (this.y+this.h)-1;

        if(this.type >= 1 && this.type <= 4){ // Spike
            
            let rX = rect.x + hitBoxLeeWay;
            let rY = rect.y + hitBoxLeeWay;
            let rW = rect.w - 2 * hitBoxLeeWay;
            let rH = rect.h - 2 * hitBoxLeeWay;
            
            let spikePoints;
            switch(this.type){
                case 1 : spikePoints = [[this.x, this.y+this.h ], [this.x+this.w , this.y+this.h ], [this.x+this.w/2, this.y ]]; break; // Spike Up
                case 2 : spikePoints = [[this.x, this.y], [this.x, this.y+this.h], [this.x+this.w, this.y + this.h/2]]; break; // Spike Right
                case 3 : spikePoints = [[this.x, this.y], [this.x+this.w/2, this.y+this.h], [this.x+this.w, this.y]]; break; // Spike Down
                case 4 : spikePoints = [[this.x + this.w, this.y], [this.x, this.y+this.h/2], [this.x+this.w, this.y+this.h]]; break; // Spike Left
            }


            // Check if any triangle pt is in rect
            for(let i=0; i<spikePoints.length; ++i){
                let ptX = spikePoints[i][0]; let ptY = spikePoints[i][1];
                if(ptX > rX && ptX < rX + rW && ptY > rY && ptY < rY + rH){

                    return true;
                }
            }

            return false;


        }

        return xCollision && yCollision;
    }
}

class Tile extends Rectangle{
    colorBase;

    constructor(x, y, w, h, type, colorBase){
        super(x,y,w,h, type);
        this.colorBase = colorBase;
    }

    draw(g){
        if(this.type === 0){ // WALL
            g.fillStyle = this.colorBase;
            g.fillRect(this.x, this.y, this.w, this.h);
        } else if (this.type === 1){ // SPIKE Facing Up
            g.beginPath();
            g.moveTo(this.x, this.y+this.h);
            g.lineTo(this.x+this.w, this.y+this.h);
            g.lineTo(this.x+this.w/2, this.y);
            g.lineTo(this.x, this.y+this.h);
            g.fillStyle = "black";
            g.closePath();
            g.fill();
        } else if (this.type === 2){ // SPIKE Facing Right
            g.beginPath();
            g.moveTo(this.x, this.y);
            g.lineTo(this.x, this.y+this.h);
            g.lineTo(this.x+this.w, this.y + this.h/2);
            g.lineTo(this.x, this.y);
            g.fillStyle = "black";
            g.closePath();
            g.fill();
        } else if (this.type === 3){ // SPIKE Facing Down
            g.beginPath();
            g.moveTo(this.x, this.y);
            g.lineTo(this.x+this.w/2, this.y+this.h);
            g.lineTo(this.x+this.w, this.y);
            g.lineTo(this.x, this.y);
            g.fillStyle = "black";
            g.closePath();
            g.fill();
        } else if (this.type === 4){ // SPIKE Facing Left
            g.beginPath();
            g.moveTo(this.x+this.w, this.y);
            g.lineTo(this.x, this.y+this.h/2);
            g.lineTo(this.x+this.w, this.y+this.h);
            g.lineTo(this.x+this.w, this.y);
            g.fillStyle = "black";
            g.closePath();
            g.fill();
        }
    }
}

class Player extends Rectangle{
    bouncing;
    canJump;

    deathMovementTimer;
    jumpTurnOffTimer;
    justFellOff;

    xVel;
    yVel;
    img;

    facingRight;

    imgRot;
    cw;

    constructor(x, y, w,h){
        super(x, y,w,h, -999);
        this.xVel = 0;
        this.yVel = 0;
        this.img = new Image();
        this.img.src = "./assets/Untitled.webp";

        this.facingRight = true;

        this.imgRot = 0;
        this.cw = true;
    }

    draw(g){
        // g.fillStyle = "#FF0000";
        // g.font = "15px Arial"
        // g.fillText("Can Jump: "+this.canJump + " JumpTimer: "+ this.jumpTurnOffTimer + ", FellOff: "+this.justFellOff, 100, 100);
        g.save();
        if(Math.abs(this.xVel) > 0){
            g.translate(this.x + this.w/2, this.y + this.h/2); // change origin
            g.rotate(this.imgRot / 180.0 * Math.PI);
            g.translate(-(this.x + this.w/2), -(this.y + this.h/2)); // reset origin
        }
        if(!this.facingRight){
            g.translate(this.x + this.w/2, this.y + this.h/2); // change origin
            g.transform(-1,0,0,1,0,0);
            g.translate(-(this.x + this.w/2), -(this.y + this.h/2)); // reset origin
        }
        g.drawImage(this.img, this.x, this.y, this.w, this.h);
        g.restore()


        // Draw hit points
        // g.fillStyle = "red";
        // g.fillRect(this.x + hitBoxLeeWay, this.y + hitBoxLeeWay, 5, 5);
        // g.fillRect(this.x + this.w - 2 *hitBoxLeeWay, this.y + hitBoxLeeWay, 5, 5);
        // g.fillRect(this.x + hitBoxLeeWay, this.y + this.h - 2 * hitBoxLeeWay, 5, 5);
        // g.fillRect(this.x + + this.w - 2 * hitBoxLeeWay, this.y + this.h - 2 * hitBoxLeeWay, 5, 5);


    }

    update(tileMap, bodies, gravity, pStartX, pStartY, button, door, g){

        // Gravity
        this.yVel += gravity;   

        // Death Movement Timer and jumpTurnOffTimer
        this.handleTimers();

        // Movement
        const numSteps = 50.0;
        let xVelStep = this.xVel / numSteps;
        let yVelStep = this.yVel / numSteps;


        for(let i=0; i!=numSteps; ++i){
            let oldX = this.x;
            this.x += xVelStep;
            if(this.collided(tileMap, bodies, pStartX, pStartY, button, door, g) || this.detectCollision(door)){
                this.x = oldX;
            }

            let oldY = this.y;
            this.y += yVelStep;
            if(this.collided(tileMap, bodies, pStartX, pStartY, button, door, g) || this.detectCollision(door)){

                // Bounce upon landing
                if(this.yVel > 0){
                    this.yVel = -this.yVel / 3;
                    this.canJump = true;
                    this.bouncing = true;
                    this.justFellOff = true;
                } else {
                    this.yVel *= .99;
                    this.canJump = true;
                    this.bouncing = true;
                    this.justFellOff = true;
                }

                // Prevent infinite bouncing
                if(Math.abs(this.yVel) < .1){
                    this.yVel = 0;
                    this.canJump = true;
                    this.bouncing = false;
                    this.justFellOff = true;
                }

                // Prevent Sticking to the ceiling
                if(this.collidedTop(tileMap)){
                    this.canJump = false;
                    this.jumpTurnOffTimer = 0;
                    this.justFellOff = false;
                }

                this.y = oldY;
            }
        }

        // Jumping
        if(Math.abs(this.yVel) > 0 && !this.bouncing){
            this.canJump = false;
        }

        // If you just fell off
        if(Math.abs(this.yVel) > 0 && !this.bouncing && this.justFellOff){
            this.jumpTurnOffTimer = 15;
            this.justFellOff = false;
        }

        // Friction
        if(Math.abs(this.xVel) > 1)
            this.xVel *= 0.5;
        else
            this.xVel = 0;

        //Image rotation
        this.handleImageRotation();
    }

    handleTimers(){
        if(this.deathMovementTimer > 0){
            this.deathMovementTimer--;
            this.xVel = 0;
        }else
            this.deathMovementTimer = 0;

        if(this.jumpTurnOffTimer > 0){
            this.jumpTurnOffTimer--;
        }else
            this.jumpTurnOffTimer = 0;
    }

    handleImageRotation(){
        //Image rotation
        if(this.imgRot >=  16)
            this.cw = false;
        else if(this.imgRot <= -16)
            this.cw = true;

        this.imgRot = this.cw ? this.imgRot + 4 : this.imgRot - 4;
    }

    collided(tileMap, bodies, pStartX, pStartY, button, door, g){
        let left_tile = Math.floor(this.x / tileWidth);
        let right_tile = Math.floor((this.x + this.w) / tileWidth);
        let top_tile = Math.floor(this.y / tileWidth);
        let bottom_tile = Math.floor((this.y + this.h) / tileWidth);

        left_tile = Math.max(0, left_tile);
        right_tile = Math.min(right_tile, tileMapWidth-1);
        top_tile = Math.max(0, top_tile);
        bottom_tile = Math.min(bottom_tile, tileMapHeight-1);

        let collision = false;

        for(let i=left_tile; i<=right_tile; ++i){
            for(let j=top_tile; j<=bottom_tile; ++j){
                let tile = tileMap[j][i];
                if(tile.type == 0 && tile.detectCollision(this))
                    collision = true;
                if(tile.type >= 1 && tile.type <= 4 && tile.detectCollision(this)){
                    bodies.push(new DeadPlayer(this.x, this.y, this.w, this.h, 
                        this.facingRight, this.xVel, this.yVel, this.canJump));
                    this.kill(pStartX, pStartY, button, door);
                    deaths++;
                }
            }
        }

        return collision;
    }

    collidedTop(tileMap){
        let left_tile = Math.floor(this.x / tileWidth);
        let right_tile = Math.floor((this.x + this.w) / tileWidth);
        let top_tile = Math.floor(this.y / tileWidth);

        top_tile = Math.max(0, top_tile);
        left_tile = Math.max(0, left_tile);
        right_tile = Math.min(right_tile, tileMapWidth-1);

        for(let i=left_tile; i<=right_tile; ++i){
            let tile = tileMap[top_tile][i];
            if(tile.type === 0 && tile.detectCollision(this))
                return true;
        }

        return false;
    }

    jump(maxJumpPower){
        if(this.canJump || this.jumpTurnOffTimer > 0){
            this.yVel = -maxJumpPower;
            this.canJump = false;
            this.bouncing = false;
            this.jumpTurnOffTimer = 0;
        }
    }

    kill(pStartX, pStartY, button, door){
        this.x = pStartX;
        this.y = pStartY;
        this.xVel = 0;
        this.yVel = 0;
        this.bouncing = false;
        this.deathMovementTimer = 40; // For Reece!!!

        if(button.constructor.name == "Array"){
            button.forEach(b => b.wasPressed = false);
        } else {
            button.wasPressed = false;
        }

        door.y = door.startY;
        door.h = door.startH;
        door.opening = false;
    }
}

class DeadPlayer extends Rectangle{
    facingRight;
    xVel; 
    yVel;
    opacity;

    constructor(x,y,w,h, facingRight, xVel, yVel, canJump){
        super(x, y,w,h, 999);
        this.xVel = 0;
        this.yVel = 0;
        this.img = new Image();
        this.img.src = "./assets/Untitled_Dead.webp";

        this.xVel = xVel;
        this.yVel = yVel;

        this.facingRight = facingRight;
        this.canJump = canJump;

        this.opacity = 8.0;
    }

    draw(g){
        // g.fillStyle = "#FF0000";
        // g.fillText("Opacity: "+this.opacity, this.x, this.y - 10);
        // g.globalAlpha = 1.0;
        g.save();
        if(!this.facingRight){
            g.translate(this.x + this.w/2, this.y + this.h/2); // change origin
            g.transform(-1,0,0,1,0,0);
            g.translate(-(this.x + this.w/2), -(this.y + this.h/2)); // reset origin
        }


        g.globalAlpha = Math.max(this.opacity, 0);
        g.drawImage(this.img, this.x, this.y, this.w, this.h);
        g.restore()
    }

    update(tileMap, gravity){

        // Gravity
        this.yVel += gravity;   

        // Movement
        const numSteps = 50.0;
        let xVelStep = this.xVel / numSteps;
        let yVelStep = this.yVel / numSteps;

        for(let i=0; i!=numSteps; ++i){
            let oldX = this.x;
            this.x += xVelStep;
            if(this.collided(tileMap)){
                this.x = oldX;
            }

            let oldY = this.y;
            this.y += yVelStep;
            if(this.collided(tileMap)){

                if(this.yVel > 0){
                    this.yVel = -this.yVel / 3;
                    this.canJump = true;
                } else {
                     this.yVel *= .99;
                    //  this.canJump = true;
                }

                // Prevent infinite bouncing
                if(Math.abs(this.yVel) < .1){
                    this.yVel = 0;
                    // this.canJump = true;
                }


                this.y = oldY;
            }
        }

        // Friction
        if(Math.abs(this.xVel) > 1 && this.canJump)
            this.xVel *= 0.95;
        else if (this.canJump)
            this.xVel = 0;

        this.opacity -= 0.035;
    }

    collided(tileMap){
        let left_tile = Math.floor(this.x / tileWidth);
        let right_tile = Math.floor((this.x + this.w) / tileWidth);
        let top_tile = Math.floor(this.y / tileWidth);
        let bottom_tile = Math.floor((this.y + this.h) / tileWidth);

        left_tile = Math.max(0, left_tile);
        right_tile = Math.min(right_tile, tileMapWidth-1);
        top_tile = Math.max(0, top_tile);
        bottom_tile = Math.min(bottom_tile, tileMapHeight-1);

        for(let i=left_tile; i<=right_tile; ++i){
            for(let j=top_tile; j<=bottom_tile; ++j){
                let tile = tileMap[j][i];
                if(tile.type == 0 && tile.detectCollision(this))
                    return true;
                if(tile.type >= 1 && tile.type <= 4 && tile.detectCollision(this)){
                    // this.kill();
                }
            }
        }

        return false;
    }

}

class Button extends Rectangle{
    wasPressed;
    isPressed;

    constructor(x, y, w, h){
        super(x,y,w,h);

        this.wasPressed = false;
        this.isPressed = false;
    }

    update(player){
        if(this.detectCollision(player)){
            this.isPressed = true;
            this.wasPressed = true;
        } else 
            this.isPressed = false;
    }

    draw(g){

        g.fillStyle = this.wasPressed ? "#114f19" : "#4f1511";
        g.fillRect(this.x,this.y+this.h/2, this.w, this.h/2);

        if(!this.isPressed){           
            g.fillStyle = this.wasPressed ? "#3edb13" : "#db2113";
            g.beginPath();
            g.ellipse(this.x+this.w/2, this.y+this.h/2, this.w/2, this.h/2, 0,  Math.PI,0);
            g.closePath();
            g.fill();
        } else {
            g.fillStyle = this.wasPressed ? "#3edb13" : "#db2113";
            g.beginPath();
            g.ellipse(this.x+this.w/2, this.y+this.h/2, this.w/2, this.h/6, 0,  Math.PI,0);
            g.closePath();
            g.fill();
        }

    }
}

class Door extends Rectangle{
    opening;
    startY;
    startH;

    constructor(x, y, w, h){
        super(x,y,w,h);
        this.opening = false;
        this.startY = y;
        this.startH = h;
    }

    update(){
        if(this.opening && this.y < this.startY + this.startH){
            this.y+=5;
            this.h-=5;
        }
    }

    draw(g){
        g.fillStyle = "#337722";
        g.fillRect(this.x, this.y, this.w, this.h);
    }
}

// For the reversed gravity level
class GravityPlayer extends Player{
    constructor(x,y,w,h){
        super(x,y,w,h);
    }


    update(tileMap, bodies, gravity, pStartX, pStartY, button, door, g){

        // Gravity
        this.yVel += gravity;   

        // Death Movement Timer and jumpTurnOffTimer
        this.handleTimers();

        // Movement
        const numSteps = 50.0;
        let xVelStep = this.xVel / numSteps;
        let yVelStep = this.yVel / numSteps;


        for(let i=0; i!=numSteps; ++i){
            let oldX = this.x;
            this.x += xVelStep;
            if(this.collided(tileMap, bodies, pStartX, pStartY, button, door, g) || this.detectCollision(door, g)){
                this.x = oldX;
            }

            let oldY = this.y;
            this.y += yVelStep;
            if(this.collided(tileMap, bodies, pStartX, pStartY, button, door, g) || this.detectCollision(door, g)){

                // Bounce upon landing
                if(this.yVel < 0){
                    this.yVel = this.yVel / 3;
                    this.canJump = true;
                    this.bouncing = true;
                    this.justFellOff = true;
                } else {
                    this.yVel *= .99;
                    this.canJump = true;
                    this.bouncing = true;
                    this.justFellOff = true;
                }

                // Prevent infinite bouncing
                if(Math.abs(this.yVel) < .1){
                    this.yVel = 0;
                    this.canJump = true;
                    this.bouncing = false;
                    this.justFellOff = true;
                }

                // Prevent Sticking to the ceiling
                if(this.collidedTop(tileMap)){
                    this.canJump = false;
                    this.jumpTurnOffTimer = 0;
                    this.justFellOff = false;
                }

                this.y = oldY;
            }
        }

        // Jumping
        if(Math.abs(this.yVel) > 0 && !this.bouncing){
            this.canJump = false;
        }

        // If you just fell off
        if(Math.abs(this.yVel) > 0 && !this.bouncing && this.justFellOff){
            this.jumpTurnOffTimer = 15;
            this.justFellOff = false;
        }

        // Friction
        if(Math.abs(this.xVel) > 1)
            this.xVel *= 0.5;
        else
            this.xVel = 0;

        //Image rotation
        this.handleImageRotation();
    }



    // Same as player except you check bottom tile instead of top tile
    collidedTop(tileMap){
        let left_tile = Math.floor(this.x / tileWidth);
        let right_tile = Math.floor((this.x + this.w) / tileWidth);
        let bottom_tile = Math.floor((this.y+this.h) / tileWidth);

        bottom_tile = Math.min(bottom_tile, tileMapHeight-1);
        left_tile = Math.max(0, left_tile);
        right_tile = Math.min(right_tile, tileMapWidth-1);

        for(let i=left_tile; i<=right_tile; ++i){
            let tile = tileMap[bottom_tile][i];
            if(tile.type === 0 && tile.detectCollision(this, g))
                return true;
        }

        return false;
    }

    draw(g){
        g.save();

        // Flip upside down for gravity elephant
        g.translate(this.x + this.w/2, this.y + this.h/2); // change origin
        g.transform(1,0,0,-1,0,0);
        g.translate(-(this.x + this.w/2), -(this.y + this.h/2)); // reset origin


        if(Math.abs(this.xVel) > 0){
            g.translate(this.x + this.w/2, this.y + this.h/2); // change origin
            g.rotate(this.imgRot / 180.0 * Math.PI);
            g.translate(-(this.x + this.w/2), -(this.y + this.h/2)); // reset origin
        }
        if(!this.facingRight){
            g.translate(this.x + this.w/2, this.y + this.h/2); // change origin
            g.transform(-1,0,0,1,0,0);
            g.translate(-(this.x + this.w/2), -(this.y + this.h/2)); // reset origin
        }
        g.drawImage(this.img, this.x, this.y, this.w, this.h);
        g.restore()
    }
}

// For the special spike level
class TouchedTile extends Tile{

    touched;

    constructor(x, y, w, h, type, colorBase){
        super(x, y, w, h, type, colorBase);
        this.touched = false;
    }

    draw(g){
        if(this.type === 0){ // WALL
            g.fillStyle = this.colorBase;
            g.fillRect(this.x, this.y, this.w, this.h);
        } else if (this.type === 1){ // SPIKE Facing Up
            g.beginPath();
            g.moveTo(this.x, this.y+this.h);
            g.lineTo(this.x+this.w, this.y+this.h);
            g.lineTo(this.x+this.w/2, this.y);
            g.lineTo(this.x, this.y+this.h);
            g.fillStyle = this.touched ? "#35f727" : "black";
            g.closePath();
            g.fill();
        } else if (this.type === 2){ // SPIKE Facing Right
            g.beginPath();
            g.moveTo(this.x, this.y);
            g.lineTo(this.x, this.y+this.h);
            g.lineTo(this.x+this.w, this.y + this.h/2);
            g.lineTo(this.x, this.y);
            g.fillStyle = this.touched ? "#35f727" : "black";
            g.closePath();
            g.fill();
        } else if (this.type === 3){ // SPIKE Facing Down
            g.beginPath();
            g.moveTo(this.x, this.y);
            g.lineTo(this.x+this.w/2, this.y+this.h);
            g.lineTo(this.x+this.w, this.y);
            g.lineTo(this.x, this.y);
            g.fillStyle = this.touched ? "#35f727" : "black";
            g.closePath();
            g.fill();
        } else if (this.type === 4){ // SPIKE Facing Left
            g.beginPath();
            g.moveTo(this.x+this.w, this.y);
            g.lineTo(this.x, this.y+this.h/2);
            g.lineTo(this.x+this.w, this.y+this.h);
            g.lineTo(this.x+this.w, this.y);
            g.fillStyle = this.touched ? "#35f727" : "black";
            g.closePath();
            g.fill();
        }
    }
}

class TouchingPlayer extends Player{
    constructor(x, y, w,h, numTouched){
        super(x, y,w,h);
        this.numTouched = numTouched;
    }


    collided(tileMap, bodies, pStartX, pStartY, button, door, g){
        let left_tile = Math.floor(this.x / tileWidth);
        let right_tile = Math.floor((this.x + this.w) / tileWidth);
        let top_tile = Math.floor(this.y / tileWidth);
        let bottom_tile = Math.floor((this.y + this.h) / tileWidth);

        left_tile = Math.max(0, left_tile);
        right_tile = Math.min(right_tile, tileMapWidth-1);
        top_tile = Math.max(0, top_tile);
        bottom_tile = Math.min(bottom_tile, tileMapHeight-1);

        let collision = false;

        for(let i=left_tile; i<=right_tile; ++i){
            for(let j=top_tile; j<=bottom_tile; ++j){
                let tile = tileMap[j][i];
                if(tile.type == 0 && tile.detectCollision(this))
                    collision = true;
                if(tile.type >= 1 && tile.type <= 4 && tile.detectCollision(this)){
                    bodies.push(new TouchingDeadPlayer(this.x, this.y, this.w, this.h, 
                        this.facingRight, this.xVel, this.yVel, this.canJump, this.numTouched));
                    this.kill(pStartX, pStartY, button, door);
                    deaths++;
                    if(!tile.touched) this.numTouched[0]++;
                    tile.touched = true;
                }
            }
        }

        return collision;
    }

    specialSpikeCollision(spike){
        let xCollision = this.x < (spike.x+spike.w)-1 && spike.x < (this.x+this.w)-1;
        let yCollision = this.y < (spike.y+spike.h)-1 && spike.y < (this.y+this.h)-1;
        return xCollision && yCollision;
    }

}

class TouchingDeadPlayer extends DeadPlayer{

    constructor(x,y,w,h, facingRight, xVel, yVel, canJump, numTouched){
        super(x,y,w,h, facingRight, xVel, yVel, canJump);
        this.numTouched = numTouched;
    }

    collided(tileMap){
        let left_tile = Math.floor(this.x / tileWidth);
        let right_tile = Math.floor((this.x + this.w) / tileWidth);
        let top_tile = Math.floor(this.y / tileWidth);
        let bottom_tile = Math.floor((this.y + this.h) / tileWidth);

        left_tile = Math.max(0, left_tile);
        right_tile = Math.min(right_tile, tileMapWidth-1);
        top_tile = Math.max(0, top_tile);
        bottom_tile = Math.min(bottom_tile, tileMapHeight-1);

        for(let i=left_tile; i<=right_tile; ++i){
            for(let j=top_tile; j<=bottom_tile; ++j){
                let tile = tileMap[j][i];
                if(tile.type == 0 && tile.detectCollision(this))
                    return true;
                if(tile.type >= 1 && tile.type <= 4 && this.specialSpikeCollision(tile)){
                    if(!tile.touched) this.numTouched[0]++;
                    tile.touched = true;
                }
            }
        }

        return false;
    }

    specialSpikeCollision(spike){
        let xCollision = this.x < (spike.x+spike.w)-1 && spike.x < (this.x+this.w)-1;
        let yCollision = this.y < (spike.y+spike.h)-1 && spike.y < (this.y+this.h)-1;
        return xCollision && yCollision;
    }
}

class BlindTile extends Tile{   
    constructor(x, y, w, h, type, colorBase){
        super(x, y, w, h, type, colorBase);
    }

    draw(g){
        if(this.type === 0){ // WALL
            g.fillStyle = "white";
            g.fillRect(this.x, this.y, this.w, this.h);
        } else if (this.type === 1){ // SPIKE Facing Up
            g.beginPath();
            g.moveTo(this.x, this.y+this.h);
            g.lineTo(this.x+this.w, this.y+this.h);
            g.lineTo(this.x+this.w/2, this.y);
            g.lineTo(this.x, this.y+this.h);
            g.fillStyle = "white";
            g.closePath();
            g.fill();
        } else if (this.type === 2){ // SPIKE Facing Right
            g.beginPath();
            g.moveTo(this.x, this.y);
            g.lineTo(this.x, this.y+this.h);
            g.lineTo(this.x+this.w, this.y + this.h/2);
            g.lineTo(this.x, this.y);
            g.fillStyle = "white";
            g.closePath();
            g.fill();
        } else if (this.type === 3){ // SPIKE Facing Down
            g.beginPath();
            g.moveTo(this.x, this.y);
            g.lineTo(this.x+this.w/2, this.y+this.h);
            g.lineTo(this.x+this.w, this.y);
            g.lineTo(this.x, this.y);
            g.fillStyle = "white";
            g.closePath();
            g.fill();
        } else if (this.type === 4){ // SPIKE Facing Left
            g.beginPath();
            g.moveTo(this.x+this.w, this.y);
            g.lineTo(this.x, this.y+this.h/2);
            g.lineTo(this.x+this.w, this.y+this.h);
            g.lineTo(this.x+this.w, this.y);
            g.fillStyle = "white";
            g.closePath();
            g.fill();
        }
    }
}

class CutScenePlayer extends Player{
    constructor(x,y,w,h){
        super(x,y,w,h);

        this.img.src = "./assets/Untitled_Big.webp";
    }


    update(){

        // Movement
        const numSteps = 1.0;
        let xVelStep = this.xVel / numSteps;

        for(let i=0; i!=numSteps; ++i){
            this.x += xVelStep;
        }

        // Friction
        if(Math.abs(this.xVel) > .5)
            this.xVel *= 0.8;
        else
            this.xVel = 0;

        //Image rotation
        this.handleImageRotation();
    }

    handleImageRotation(){
        //Image rotation
        if(this.imgRot >=  16)
            this.cw = false;
        else if(this.imgRot <= -16)
            this.cw = true;

        this.imgRot = this.cw ? this.imgRot + 2 : this.imgRot - 2;
    }

}

const canvas = document.getElementById("gameCanvas");
const g = canvas.getContext("2d");

const transitionMessages = ["Alright, that's enough of that", "Wait what???", "Ok this is scaring me", "Is this a time loop?", "Please let me out!",
                            "Did I say my spell wrong?", "This is crazy!", "LET ME OUT LET ME OUT", "Is it over yet???"];
const transitionSubMessages = ["Time to leave the snowglobe", "Why am I still in here?", "I just want to leave :(", "Am I stuck in here???", "I just want to go home!!",
                                "This might have been a mistake...", "I didn't even know there was a time loop spell...", "LET ME OUT LET ME OUT", "Please please please"];

let mx, my = 0;

let outroFrameNo = 0;
let introFrameNo = 0;

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