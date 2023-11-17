/*
    Author: Calvin Josenhans, Mallory Miller
    Date: September 2023
    Description: A Program to Play Snake
*/

// TODO: Better Death Message formatting
// TODO: Start screen so people can get their footing before starting?
// TODO: On start screen show instructions? (or elsewhere in html file)

//Timing for interpol animation
let timer = 0;

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

// Images
const appleImg = document.getElementById("apple");
const snakeHead = document.getElementById("snake-head");
const snakeBody = document.getElementById("snake-body");
const snakeCorner = document.getElementById("snake-corner");
const snakeTail = document.getElementById("snake-tail");
const background = document.getElementById("background");

const timeStep = 10;

// Constants
const snakeDirections = {
    "left": [-1, 0],
    "right": [1, 0],
    "up": [0, -1],
    "down": [0, 1]
};
const boardSize = 16;
const cellSize = 32;

// Snake State
let apple = [12, 7, true]; // x, y, apples first turn?
let snake = [[3, 7], [2, 7], [1, 7]];
let snakeDir = snakeDirections.right;
let isDead = false;
let directionQueue = [];

//Clue Stuff
let clueInterval = 5;
let clue = ["Y", "R", "A", "N", "I", "D", "R", "O"];
let cluedClues = 0;


function increaseTime() {
    timer += 1;
    timer = timer % timeStep;
}

function arrayEquals(a, b) {
    return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((val, index) => val === b[index]);
}

function resetGame() {
    apple = [12, 7, true];
    snake = [[3, 7], [2, 7], [1, 7]];
    snakeDir = snakeDirections.right;
    isDead = false;
    cluedClues = 0;
}

async function killSnake() {
    isDead = true;
    await new Promise(r => setTimeout(r, 2000));
    resetGame();
}

function getEmptyCoords() {
    let possiblePositions = [];

    for (let x = 0; x < boardSize; ++x) {
        for (let y = 0; y < boardSize; ++y) {
            if (snake.every((p, i) => p[0] != x || p[1] != y)) {
                possiblePositions.push([x, y]);
            }
        }
    }
    return possiblePositions[Math.floor(Math.random() * possiblePositions.length)];
}

function setSnakeDir() {
    if (directionQueue.length === 0) return;

    let dir = directionQueue.shift();
    newDir = snakeDirections[dir];
    if (!(newDir[0] === -snakeDir[0] && newDir[1] === -snakeDir[1]))
        snakeDir = newDir;

}

function moveSnake() {
    let head = snake[0];
    let newHead = [head[0] + snakeDir[0], head[1] + snakeDir[1]];
    if (newHead[0] < 0 || newHead[0] >= boardSize || newHead[1] < 0 || newHead[1] >= boardSize
        || !snake.every((p, i) => i === snake.length - 1 || p[0] != newHead[0] || p[1] != newHead[1])) {
        killSnake()
    } else {
        if ((newHead[0] === apple[0] && newHead[1] == apple[1])) {
            if (snake.length % clueInterval == 0) { cluedClues++ }
            apple = getEmptyCoords();
            apple[3] = true;
        } else {
            snake.pop();
        }
        snake.unshift(newHead);
    }
}

function progress() {
    return timer;
}

function drawRotated(img, rads, x, y) {
    ctx.save();

    ctx.translate(x + cellSize / 2, y + cellSize / 2);
    ctx.rotate(rads);
    ctx.translate(-x - cellSize / 2, -y - cellSize / 2);
    ctx.drawImage(img, x, y);

    ctx.restore();
}


//TODO: This is very very repetetive!
function drawSnake(progress) {
    snake.forEach((p, i) => {

        if (i == snake.length - 1) {
            // Tail
            let tailDir = [snake[i - 1][0] - p[0], snake[i - 1][1] - p[1]]

            if (arrayEquals(tailDir, snakeDirections.right))
                drawRotated(snakeTail, 0, p[0] * cellSize + 1 + (timer * cellSize / timeStep), p[1] * cellSize + 1);
            else if (arrayEquals(tailDir, snakeDirections.left))
                drawRotated(snakeTail, Math.PI, p[0] * cellSize + 1 - (timer * cellSize / timeStep), p[1] * cellSize + 1);
            else if (arrayEquals(tailDir, snakeDirections.up))
                drawRotated(snakeTail, -Math.PI / 2, p[0] * cellSize + 1, p[1] * cellSize + 1 - (timer * cellSize / timeStep));
            else if (arrayEquals(tailDir, snakeDirections.down))
                drawRotated(snakeTail, Math.PI / 2, p[0] * cellSize + 1, p[1] * cellSize + 1 + (timer * cellSize / timeStep));
        } else if (i != 0) {

            //Body or Corner
            let segmentDir = [(snake[i - 1][0] - snake[i + 1][0]) / 2, (snake[i - 1][1] - snake[i + 1][1]) / 2];

            if (arrayEquals(segmentDir, snakeDirections.right))
                drawRotated(snakeBody, 0, p[0] * cellSize + 1, p[1] * cellSize + 1);
            else if (arrayEquals(segmentDir, snakeDirections.left))
                drawRotated(snakeBody, Math.PI, p[0] * cellSize + 1, p[1] * cellSize + 1);
            else if (arrayEquals(segmentDir, snakeDirections.up))
                drawRotated(snakeBody, -Math.PI / 2, p[0] * cellSize + 1, p[1] * cellSize + 1);
            else if (arrayEquals(segmentDir, snakeDirections.down))
                drawRotated(snakeBody, Math.PI / 2, p[0] * cellSize + 1, p[1] * cellSize + 1);
            else {
                // We have a corner
                let cornerDir1 = [snake[i - 1][0] - p[0], snake[i - 1][1] - p[1]];
                let cornerDir2 = [p[0] - snake[i + 1][0], p[1] - snake[i + 1][1]];

                if (arrayEquals(cornerDir1, snakeDirections.right))
                    if (arrayEquals(cornerDir2, snakeDirections.down))
                        drawRotated(snakeCorner, -Math.PI / 2, p[0] * cellSize + 1, p[1] * cellSize + 1);
                    else
                        drawRotated(snakeCorner, 0, p[0] * cellSize + 1, p[1] * cellSize + 1);
                else if (arrayEquals(cornerDir1, snakeDirections.left))
                    if (arrayEquals(cornerDir2, snakeDirections.down))
                        drawRotated(snakeCorner, Math.PI, p[0] * cellSize + 1, p[1] * cellSize + 1);
                    else
                        drawRotated(snakeCorner, Math.PI / 2, p[0] * cellSize + 1, p[1] * cellSize + 1);
                else if (arrayEquals(cornerDir1, snakeDirections.up))
                    if (arrayEquals(cornerDir2, snakeDirections.left))
                        drawRotated(snakeCorner, -Math.PI / 2, p[0] * cellSize + 1, p[1] * cellSize + 1);
                    else
                        drawRotated(snakeCorner, Math.PI, p[0] * cellSize + 1, p[1] * cellSize + 1);
                else if (arrayEquals(cornerDir1, snakeDirections.down))
                    if (arrayEquals(cornerDir2, snakeDirections.left))
                        drawRotated(snakeCorner, 0, p[0] * cellSize + 1, p[1] * cellSize + 1);
                    else
                        drawRotated(snakeCorner, Math.PI / 2, p[0] * cellSize + 1, p[1] * cellSize + 1);
            }
        }
    });
    var p = snake[0];

    let headDir = [snake[0][0] - snake[1][0], snake[0][1] - snake[1][1]]

    if (arrayEquals(headDir, snakeDirections.right))
        drawRotated(snakeHead, 0, p[0] * cellSize - (cellSize - (timer * cellSize / timeStep)), p[1] * cellSize + 1);
    else if (arrayEquals(headDir,  snakeDirections.left))
        drawRotated(snakeHead, Math.PI, p[0] * cellSize + (cellSize - (timer * cellSize / timeStep)), p[1] * cellSize + 1);
    else if (arrayEquals(headDir,  snakeDirections.up))
        drawRotated(snakeHead, -Math.PI / 2, p[0] * cellSize + 1, p[1] * cellSize + (cellSize -(timer * cellSize / timeStep)));
    else if (arrayEquals(headDir,  snakeDirections.down))
        drawRotated(snakeHead, Math.PI / 2, p[0] * cellSize + 1, p[1] * cellSize - (cellSize -(timer * cellSize / timeStep)));
}

//takes the time and turns it into which frame it should display
function appleFrame(tick) {
    if (tick == 0) return timer;
    if (tick < 2) return 1;
    if (tick < 5) return 2;
    if (tick < 7) return 3;
    return 4;
}

function drawApple() {
    if (snake.length % clueInterval == 0 && cluedClues < clue.length) {
        ctx.fillStyle = "#0F0"; //mallory wuz here hehe
        ctx.textAlign = "left";
        ctx.fillText(clue[cluedClues], apple[0] * cellSize, (apple[1] + 1) * cellSize);
    } else {
        var tick = timer;
        if (!apple[3]) tick = 9;
        //ctx.drawImage(appleImg, apple[0] * cellSize, apple[1] * cellSize);
        ctx.drawImage(appleImg, appleFrame(tick) * 32, 0, 32, 32, apple[0] * cellSize, apple[1] * cellSize, 32, 32);
    }
    if (apple[3] && timer == 9) {
        apple[3] = false;
    }
}

function draw() {

    if (!isDead && timer === 0) {
        setSnakeDir();
        moveSnake();
    }

    // drawing code
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    ctx.beginPath();
    ctx.drawImage(background, 0, 0);
    ctx.closePath();

    drawApple();
    drawSnake(timer);

    if (isDead) {
        timer = timeStep - 1;
        ctx.font = "48px serif";
        ctx.fillStyle = "#0F0";
        ctx.textAlign = "center";
        ctx.fillText("niaga yrT", 256, 100);
    } else {
        increaseTime();
    }
}

setInterval(draw, 10);

document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(e) {
    let last = null

    if (directionQueue.length > 0) {
        last = directionQueue[directionQueue.length - 1];
    }

    if (e.key === "Right" || e.key === "ArrowRight") {
        if (last !== "right" && last !== "left")
            directionQueue.push("right");
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        if (last !== "right" && last !== "left")
            directionQueue.push("left");
    } else if (e.key === "Up" || e.key === "ArrowUp") {
        if (last !== "up" && last !== "down")
            directionQueue.push("up");
    } else if (e.key === "Down" || e.key === "ArrowDown") {
        if (last !== "up" && last !== "down")
            directionQueue.push("down");
    }
}
