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