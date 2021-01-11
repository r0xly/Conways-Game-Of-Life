class Cell {
    constructor(position, size, cellState) {
        this.position = position;
        this.size = size;
        this.state = cellState;
    }

    draw(ctx) {
        let width = this.size.x;
        let height = this.size.y;
        ctx.beginPath();
        ctx.rect(this.position.x * width, this.position.y * height, width, height)
        ctx.fillStyle = "#2c3e50";
        ctx.stroke();
        ctx.fill();
    }

    getNeighbors(grid) {
        let neighbors = 0;

        for (let y = -1; y < 2; y++) {
            for (let x = -1; x < 2; x++) {
                if (grid[this.position.x + x] != null && grid[this.position.x + x][this.position.y + y] != null) {  
                    neighbors += grid[this.position.x + x][this.position.y + y].state;
                }
                
            }
        }
        return neighbors - this.state;
    }
}