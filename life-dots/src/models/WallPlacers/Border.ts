import WallPlacer from "../WallPlacer";
import Dot from "../Dot";

var ndarray = require("ndarray");

export default class Border extends WallPlacer
{
    //The width of the border wall.
    border_size: number;
    
    constructor(border_size: number)
    {
        super();
        this.border_size = border_size;
    }

    init(rows: number, cols: number, dot_grid: Dot[][][], food_grid: any, trap_grid: any): any
    {
        let wall_grid: any = ndarray(new Float64Array(rows * cols), [rows, cols]);
        for (let r: number = 0; r < rows; r++)
        {
            for (let b: number = 0; b < this.border_size; b++)
            {
                wall_grid.set(r, 0 + b, 1);
                wall_grid.set(r, cols - 1 - b, 1);
                food_grid.set(r, 0 + b, 0);
                food_grid.set(r, cols - 1 - b, 0);
                trap_grid.set(r, 0 + b, 0);
                trap_grid.set(r, cols - 1 - b, 0);
                dot_grid[r][0 + b] = [];
                dot_grid[r][cols - 1 - b] = [];
            }
        }
        for (let c: number = 0; c < cols; c++)
        {
            for (let b: number = 0; b < this.border_size; b++)
            {
                wall_grid.set(0 + b, c, 1);
                wall_grid.set(rows - 1 - b, c, 1);
                food_grid.set(0 + b, c, 0);
                food_grid.set(rows - 1 - b, c, 0);
                trap_grid.set(0 + b, c, 0);
                trap_grid.set(rows - 1 - b, c, 0);
                dot_grid[0 + b][c] = []
                dot_grid[rows - 1 - b][c] = []
            }
        }
        return wall_grid;
    }

    update(dot_grid: Dot[][][], food_grid: any, trap_grid: any, wall_grid: any): void
    {
        for (let r: number = 0; r < wall_grid.shape[0]; r++)
        {
            for (let b: number = 0; b < this.border_size; b++)
            {
                food_grid.set(r, 0 + b, 0);
                food_grid.set(r, wall_grid.shape[1] - 1 - b, 0);
                trap_grid.set(r, 0 + b, 0);
                trap_grid.set(r, wall_grid.shape[1] - 1 - b, 0);
                dot_grid[r][0 + b] = [];
                dot_grid[r][wall_grid.shape[1] - 1 - b] = [];
            }
        }
        for (let c: number = 0; c < wall_grid.shape[1]; c++)
        {
            for (let b: number = 0; b < this.border_size; b++)
            {
                food_grid.set(0 + b, c, 0);
                food_grid.set(wall_grid.shape[0] - 1 - b, c, 0);
                trap_grid.set(0 + b, c, 0);
                trap_grid.set(wall_grid.shape[0] - 1 - b, c, 0);
                dot_grid[0 + b][c] = [];
                dot_grid[wall_grid.shape[0] - 1 - b][c] = [];
            }
        }
    }
}