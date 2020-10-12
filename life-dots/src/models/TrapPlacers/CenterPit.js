var ndarray = require("ndarray");
var ops = require("ndarray-ops");

export default class Border
{
    constructor(edge, size)
    {
        this.edge = edge;
        this.size = size;
    }

    init(rows, cols, food_grid)
    {
        let grid = ndarray(new Float64Array(rows * cols), [rows, cols]);
        for (let r = this.edge; r < rows - this.edge; r++)
        {
            for (let c = this.edge; c < cols - this.edge; c++)
            {
                grid.set(r, c, this.size);
                food_grid.set(r, c, 0);
            }
        }
        return grid;
    }

    update(grid, food_grid)
    {
        for (let r = this.edge; r < grid.shape[0] - this.edge; r++)
        {
            for (let c = this.edge; c < grid.shape[1] - this.edge; c++)
            {
                grid.set(r, c, this.size);
                food_grid.set(r, c, 0);
            }
        }
    }
}