const MIN_CELL_NEIGHBORS = 2;
const MAX_CELL_NEIGHBORS = 3;
const NEIGHBORS_FOR_REBIRTH = 3;
const CELL_SIZE = 25;

let canvas;
let ctx;
let grid;

let width = 100;
let height = 100;
let paused = false;

function nextGen() {
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let cell = grid[x][y];
            let state = cell.state || 0;
            let neighbors = cell.getNeighbors(grid);

            if (state == 0 && neighbors == NEIGHBORS_FOR_REBIRTH) {
                cell.state = 1;
            } else if (state = 1 && neighbors < MIN_CELL_NEIGHBORS || neighbors > MAX_CELL_NEIGHBORS) {
                cell.state = 0;
            }
        }
    }
}

function initGrid(cols, rows) {
    let arr = new Array(cols)
    for (let i = 0;  i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    randomize(arr);
    return arr;
}

function randomize(grid) {
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let cellState = Math.floor(Math.random() * Math.floor(2));
            grid[x][y] = new Cell(new Vector(x, y), new Vector(CELL_SIZE, CELL_SIZE), cellState);
        }
    }
}

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let cell = grid[x][y];  
            if (cell.state == 0) { continue; }
            cell.draw(ctx);
        }
    }   
}
function start() {
    let restartButton = document.getElementById("restart");
    let clearButton = document.getElementById("clear");
    let pauseButton = document.getElementById("pause")

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    grid = initGrid(width, height);

    restartButton.onclick = function() {
        randomize(grid);
    }

    clearButton.onclick = function() {
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                grid[x][y] = new Cell(new Vector(x, y), new Vector(25, 25), 0);
            }
        }
    }

    pauseButton.onclick = function() {
        paused = !paused;
        pauseButton.text = paused ? "Unpause" : "Pause" 
    }
    
    requestAnimationFrame(update);
}

async function update() {
    drawGrid();

    if (paused != true) { nextGen(); }

    setTimeout(function() { 
        requestAnimationFrame(update); 
    }, 75);
}

window.addEventListener("load", start);