var ndarray = require("ndarray");
var ops = require("ndarray-ops");
var gemm = require("ndarray-gemm");

import RandomRain from './models/FoodPlacers/RandomRain';
import Border from './models/WallPlacers/Border';
import CenterPit from './models/TrapPlacers/CenterPit';

export default class World
{
    constructor(rows, cols, dot_placer, food_placer, trap_placer, wall_placer)
    {
        this.dot_placer = dot_placer;
        this.food_placer = food_placer;
        this.trap_placer = trap_placer;
        this.wall_placer = wall_placer;
    }

    init()
    {
        this.dot_grid = this.dot_placer.init(rows, cols);
        this.food_grid = this.food_placer.init(rows, cols);
        this.trap_grid = this.trap_placer.init(rows, cols);
        this.wall_grid = this.wall_placer.init(rows, cols, dot_grid, trap_grid, food_grid);
    }

    // (x)place_dots (x)place_traps (x)place_food (x)place_walls (x)move ()trap ()fight ()feed ()split 
    update()
    {      
        this.dot_placer.update(this.dot_grid);
        this.trap_placer.update(this.trap_grid);
        this.food_placer.update(this.food_grid);
        this.wall_placer.update(this.wall_grid, this.dot_grid, this.trap_grid, this.food_grid);
        this.move(this.dot_grid, this.wall_grid, this.trap_grid, this.food_grid);
    }

    move(dot_grid, wall_grid, trap_grid, food_grid)
    {
        let new_dot_grid = [];
        let max_size_grid = [];
        let signal_grid = [];
        for (let r = 0; r < dot_grid.length; r++)
        {
            new_dot_grid[r] = [];
            max_size_grid[r] = [];
            signal_grid[r] = [];
            for (let c = 0; c < dot_grid[0].length; c++)
            {
                new_dot_grid[r][c] = [];
                max_size_grid[r][c] = 0;
                signal_grid[r][c] = 0;
                for (let dot of dot_grid[r][c])
                {
                    max_size_grid[r][c] += dot.genome.max_size;
                    signal_grid[r][c] += dot.signal;
                }
            }
        }

        let grids = [max_size_grid, signal_grid, food_grid, trap_grid, wall_grid];

        for (let r = 0; r < dot_grid.length; r++)
        {
            for (let c = 0; c < dot_grid[0].length; c++)
            {
                if (dot_grid[r][c].length == 0)
                {
                    for (let dot of dot_grid[r][c])
                    {
                        let input_length = (dot.genome.view * 2 + 1) * (dot.genome.view * 2 + 1) * 5;
                        let input_shape = [1, input_length];
                        let input = ndarray(new Float64Array(input_length), input_shape);
                        let count = 0;
                        for (let dr = -dot.genome.view; dr <= dot.genome.view; dr++)
                        {
                            for (let dc = -dot.genome.view; dc <= dot.genome.view; dc++)
                            {
                                for (let grid of grids)
                                {
                                    input.set(1, count, grid[r + dr][c + dc]);
                                    count++;
                                }
                            }
                        }
                        let move = dot.move(input);
                        new_dot_grid[r + move[0]][c + move[1]].push(dot);
                    }
                }
            }
        }
        dot_grid = new_dot_grid;
    }
}