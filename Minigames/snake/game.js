/*
    Author: Calvin Josenhans
    Date: September 2023
    Description: A Program to Play Snake
*/

// TODO: Better Death Message formatting
// TODO: Snake assets and/or LERP?

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const boardSize = 15;
let cellSize = 32;
let apple = [13, 13];
let snake = [[0, 2], [0, 1], [0, 0]];
let snakeDir = [0, 1]
let snakeDirections = {
    "left": [-1, 0],
    "right": [1, 0],
    "up": [0, -1],
    "down": [0, 1]
}
let isDead = false;
let directionQueue = []

let clueInterval = 5
let clue = ["Y", "R", "A", "N", "I", "D", "R", "O"]
let cluedClues = 0

function resetGame() {
    apple = [13, 13];
    snake = [[0, 2], [0, 1], [0, 0]];
    snakeDir = [1, 0];
    isDead = false;

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
                possiblePositions.push([x, y])
            }
        }
    }

    return possiblePositions[Math.floor(Math.random() * possiblePositions.length)]
}


function setSnakeDir() {
    if (directionQueue.length === 0) return;

    let dir = directionQueue.shift()
    newDir = snakeDirections[dir]
    if (!(newDir[0] === -snakeDir[0] && newDir[1] === -snakeDir[1]))
        snakeDir = newDir

}

function moveSnake() {
    let head = snake[0];
    let newHead = [head[0] + snakeDir[0], head[1] + snakeDir[1]];
    if (newHead[0] < 0 || newHead[0] >= boardSize || newHead[1] < 0 || newHead[1] >= boardSize
        || !snake.every(p => p[0] != newHead[0] || p[1] != newHead[1])) {
        killSnake()
    } else {
        if ((newHead[0] === apple[0] && newHead[1] == apple[1])) {
            if (snake.length % clueInterval == 0) {cluedClues++}
            apple = getEmptyCoords();
        } else {
            snake.pop();
        }
        snake.unshift(newHead)
    }
}

function drawSnake() {
    ctx.beginPath();
    ctx.fillStyle = isDead ? "#99999" : "#FF0000";
    snake.forEach(p => {
        ctx.fillRect(p[0] * cellSize + 1, p[1] * cellSize + 1, cellSize - 2, cellSize - 2);
    });
    ctx.closePath();
}

function drawApple() {
    if (snake.length % clueInterval == 0 && cluedClues < clue.length) {
        ctx.beginPath();
        ctx.fillStyle = "#FF00FF";
        ctx.fillText(clue[cluedClues], apple[0] * cellSize, apple[1] * cellSize);
        ctx.closePath();
    } else {
        ctx.beginPath();
        ctx.fillStyle = "#FF00FF";
        ctx.fillRect(apple[0] * cellSize, apple[1] * cellSize, cellSize, cellSize)
        ctx.closePath();
    }
}

function draw() {
    if (!isDead) {
        setSnakeDir();
        moveSnake();
    }

    // drawing code
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, boardSize * cellSize, boardSize * cellSize);
    ctx.closePath();

    drawApple();
    drawSnake();

    if (isDead) {
        ctx.font = "48px serif";
        ctx.fillStyle = "#0F0"
        ctx.fillText("niaga yrT", 10, 50);
    }

}

setInterval(draw, 100);

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

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