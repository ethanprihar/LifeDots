var ndarray = require("ndarray");

export default class Border
{
    constructor(){}

    init(rows, cols, trap_grid, food_grid)
    {
        let grid = ndarray(new Float64Array(rows * cols), [rows, cols]);
        for (let r = 0; r < rows; r++)
        {
            grid.set(r, 0, 1)
            grid.set(r, cols - 1, 1)
            food_grid.set(r, 0, 0)
            food_grid.set(r, cols - 1, 0)
            trap_grid.set(r, 0, 0)
            trap_grid.set(r, cols - 1, 0)
        }
        for (let c = 0; c < cols; c++)
        {
            grid.set(0, c, 1)
            grid.set(rows - 1, c, 1)
            food_grid.set(0, c, 0)
            food_grid.set(rows - 1, c, 0)
            trap_grid.set(0, c, 0)
            trap_grid.set(rows - 1, c, 0)
        }
        return grid;
    }

    update(grid, trap_grid, food_grid)
    {
        for (let r = 0; r < grid.shape[0]; r++)
        {
            grid.set(r, 0, 1)
            grid.set(r, grid.shape[1] - 1, 1)
            food_grid.set(r, 0, 0)
            food_grid.set(r, grid.shape[1] - 1, 0)
            trap_grid.set(r, 0, 0)
            trap_grid.set(r, grid.shape[1] - 1, 0)
        }
        for (let c = 0; c < grid.shape[1]; c++)
        {
            grid.set(0, c, 1)
            grid.set(grid.shape[0] - 1, c, 1)
            food_grid.set(0, c, 0)
            food_grid.set(grid.shape[0] - 1, c, 0)
            trap_grid.set(0, c, 0)
            trap_grid.set(grid.shape[0] - 1, c, 0)
        }
    }
}