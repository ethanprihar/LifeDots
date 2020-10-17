var ndarray = require("ndarray");

export default class Border
{
    constructor(){}

    init(rows, cols, dot_grid, trap_grid, food_grid)
    {
        let wall_grid = ndarray(new Float64Array(rows * cols), [rows, cols]);
        for (let r = 0; r < rows; r++)
        {
            wall_grid.set(r, 0, 1);
            wall_grid.set(r, cols - 1, 1);
            food_grid.set(r, 0, 0);
            food_grid.set(r, cols - 1, 0);
            trap_grid.set(r, 0, 0);
            trap_grid.set(r, cols - 1, 0);
            dot_grid[r][0] = [];
            dot_grid[r][cols - 1] = [];
        }
        for (let c = 0; c < cols; c++)
        {
            wall_grid.set(0, c, 1);
            wall_grid.set(rows - 1, c, 1);
            food_grid.set(0, c, 0);
            food_grid.set(rows - 1, c, 0);
            trap_grid.set(0, c, 0);
            trap_grid.set(rows - 1, c, 0);
            dot_grid[0][c] = []
            dot_grid[rows - 1][c] = []
        }
        return wall_grid;
    }

    update(wall_grid, dot_grid, trap_grid, food_grid)
    {
        for (let r = 0; r < wall_grid.shape[0]; r++)
        {
            food_grid.set(r, 0, 0)
            food_grid.set(r, wall_grid.shape[1] - 1, 0)
            trap_grid.set(r, 0, 0)
            trap_grid.set(r, wall_grid.shape[1] - 1, 0)
            dot_grid[r][0] = [];
            dot_grid[r][wall_grid.shape[1] - 1] = [];
        }
        for (let c = 0; c < wall_grid.shape[1]; c++)
        {
            food_grid.set(0, c, 0)
            food_grid.set(wall_grid.shape[0] - 1, c, 0)
            trap_grid.set(0, c, 0)
            trap_grid.set(wall_grid.shape[0] - 1, c, 0)
            dot_grid[0][c] = []
            dot_grid[wall_grid.shape[0] - 1][c] = []
        }
    }
}