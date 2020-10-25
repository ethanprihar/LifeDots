var ndarray = require("ndarray");
var ops = require("ndarray-ops");
var gemm = require("ndarray-gemm");

export default class World
{
    constructor(rows, cols, dot_placer, food_placer, trap_placer, wall_placer)
    {
        this.rows = rows;
        this.cols = cols;
        this.dot_placer = dot_placer;
        this.food_placer = food_placer;
        this.trap_placer = trap_placer;
        this.wall_placer = wall_placer;
    }

    init()
    {
        this.dot_grid = this.dot_placer.init(this.rows, this.cols);
        this.food_grid = this.food_placer.init(this.rows, this.cols);
        this.trap_grid = this.trap_placer.init(this.rows, this.cols);
        this.wall_grid = this.wall_placer.init(this.rows, this.cols, this.dot_grid, this.food_grid, this.trap_grid);
    }

    // (x)place_dots (x)place_food (x)place_traps (x)place_walls  (x)move (x)trap ()fight ()feed ()breed
    update()
    {      
        this.dot_placer.update(this.dot_grid);
        this.food_placer.update(this.food_grid);
        this.trap_placer.update(this.trap_grid);
        this.wall_placer.update(this.dot_grid, this.food_grid, this.trap_grid, this.wall_grid);
        this.move(this.dot_grid, this.food_grid, this.trap_grid, this.wall_grid);
    }

    move()
    {
        let new_dot_grid = [];
        let max_size_grid = ndarray(new Float64Array(this.rows * this.cols), [this.rows, this.cols]);
        let signal_grid = ndarray(new Float64Array(this.rows * this.cols), [this.rows, this.cols]);
        for (let r = 0; r < this.dot_grid.length; r++)
        {
            new_dot_grid[r] = [];
            for (let c = 0; c < this.dot_grid[0].length; c++)
            {
                new_dot_grid[r][c] = [];
                max_size_grid.set(r, c, 0);
                signal_grid.set(r, c, 0);
                for (let dot of this.dot_grid[r][c])
                {
                    max_size_grid.set(r, c, max_size_grid.get(r, c) + dot.genome.max_size);
                    signal_grid.set(r, c, signal_grid.get(r, c) + dot.signal);
                }
            }
        }

        let grids = [max_size_grid, signal_grid, this.food_grid, this.trap_grid, this.wall_grid];

        for (let r = 0; r < this.dot_grid.length; r++)
        {
            for (let c = 0; c < this.dot_grid[0].length; c++)
            {
                if (this.dot_grid[r][c].length != 0)
                {
                    for (let dot of this.dot_grid[r][c])
                    {
                        let view_dim = Math.floor(dot.genome.view);
                        let input_length = (view_dim * 2 + 1) * (view_dim * 2 + 1) * 5;
                        let input_shape = [1, input_length];
                        let input = ndarray(new Float64Array(input_length), input_shape);
                        let count = 0;
                        for (let dr = -Math.floor(dot.genome.view); dr <= Math.floor(dot.genome.view); dr++)
                        {
                            for (let dc = -Math.floor(dot.genome.view); dc <= Math.floor(dot.genome.view); dc++)
                            {
                                for (let grid of grids)
                                {
                                    input.set(1, count, grid.get(r + dr, c + dc));
                                    count++;
                                }
                            }
                        }
                        let move_cost = dot.genome.max_size * Math.floor(dot.genome.view) / 100
                        if ((dot.size - move_cost) > 0)
                        {
                            dot.size -= move_cost;
                            let move = dot.move(input);
                            dot.size -= this.trap_grid.get(r + move[0], c + move[1])
                            if (dot.size > 0)
                            {
                                if (this.wall_grid.get(r + move[0], c + move[1]) == 0)
                                {
                                    new_dot_grid[r + move[0]][c + move[1]].push(dot);
                                }
                                else
                                {
                                    new_dot_grid[r][c].push(dot);
                                }
                            }
                        }
                    }
                }
            }
        }
        this.dot_grid = new_dot_grid;
    }

    fight()
    {
        for (let r = 0; r < this.dot_grid.length; r++)
        {
            for (let c = 0; c < this.dot_grid[0].length; c++)
            {
                if (this.dot_grid[r][c].length >= 2)
                {
                    let num_teams = 0;
                    let total_size = 0;
                    let team_dots = {};
                    let team_size = {};
                    for (let dot of this.dot_grid[r][c])
                    {
                        let team = Math.floor(dot.genome.team_num);
                        total_size += dot.genome.max_size;
                        if (team in team_dots)
                        {
                            team_dots[team].push(dot);
                            team_size[team] += dot.genome.max_size;
                        }
                        else
                        {
                            team_dots[team] = [dot];
                            team_size[team] = dot.genome.max_size;
                            num_teams++;
                        }
                    }
                    // NOW WE PICK A RANDOM NUMBER AND SEE WHICH TEAM WINS
                }
            }
        }
    }


}