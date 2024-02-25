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