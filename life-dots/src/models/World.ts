import DotPlacer from "./DotPlacer";
import FoodPlacer from "./FoodPlacer";
import TrapPlacer from "./TrapPlacer";
import WallPlacer from "./WallPlacer";
import Dot from "./Dot"

var ndarray = require("ndarray");

export default class World
{
    // The number of rows in the world.
    rows: number;
    // The number of columns in the world.
    cols: number;
    // The dot placer for the world.
    dot_placer: DotPlacer;
    // The food placer for the world.
    food_placer: FoodPlacer;
    // The trap placer for the world.
    trap_placer: TrapPlacer;
    // The wall placer for the world.
    wall_placer: WallPlacer;
    // The dot grid for the world.
    dot_grid: Dot[][][];
    // The food grid for the world.
    food_grid: any;
    // The trap grid for the world.
    trap_grid: any;
    // The wall grid for the world.
    wall_grid: any;
    
    constructor(rows: number, 
                cols: number, 
                dot_placer: DotPlacer, 
                food_placer: FoodPlacer, 
                trap_placer: TrapPlacer, 
                wall_placer: WallPlacer)
    {
        this.rows = rows;
        this.cols = cols;
        this.dot_placer = dot_placer;
        this.food_placer = food_placer;
        this.trap_placer = trap_placer;
        this.wall_placer = wall_placer;
        this.dot_grid = this.dot_placer.init(this.rows, this.cols);
        this.food_grid = this.food_placer.init(this.rows, this.cols);
        this.trap_grid = this.trap_placer.init(this.rows, this.cols);
        this.wall_grid = this.wall_placer.init(this.rows, this.cols, this.dot_grid, this.food_grid, this.trap_grid);
    }

    update()
    {
        // Update the dot grid with the dot placer.
        this.dot_placer.update(this.dot_grid);
        // Update the food grid with the food placer.
        this.food_placer.update(this.food_grid);
        // Update the trap grid with the trap placer.
        this.trap_placer.update(this.trap_grid);
        // Update all the grids with the wall placer.
        this.wall_placer.update(this.dot_grid, this.food_grid, this.trap_grid, this.wall_grid);
        // Move all the dots, subtract size from trapped dots, and remove resulting dead dots.
        this.move_trap();
        // Simulate combat for all dots, reward the victors with nourishment, remove resulting dead dots, 
        // consume food, and split.
        this.fight_feed_split();
    }

    move_trap(): void
    {
        // The new dot grid for the results of moving and trapping.
        let new_dot_grid: Dot[][][] = [];
        // Create a max dot size grid and dot signal grid for creating the move input.
        let max_size_grid: any = ndarray(new Float64Array(this.rows * this.cols), [this.rows, this.cols]);
        let signal_grid: any = ndarray(new Float64Array(this.rows * this.cols), [this.rows, this.cols]);
        for (let r: number = 0; r < this.dot_grid.length; r++)
        {
            new_dot_grid[r] = [];
            for (let c: number = 0; c < this.dot_grid[0].length; c++)
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
        // Create the move input
        let grids: any[] = [max_size_grid, signal_grid, this.food_grid, this.trap_grid, this.wall_grid];
        var new_dot_count = 0;
        for (let r: number = 0; r < this.dot_grid.length; r++)
        {
            for (let c: number = 0; c < this.dot_grid[0].length; c++)
            {
                if (this.dot_grid[r][c].length != 0)
                {
                    for (let dot of this.dot_grid[r][c])
                    {
                        let view_dim: number = Math.floor(dot.genome.view);
                        let input_length: number = (view_dim * 2 + 1) * (view_dim * 2 + 1) * 5;
                        let input_shape: number[] = [1, input_length];
                        let input: any = ndarray(new Float64Array(input_length), input_shape);
                        let count: number = 0;
                        for (let dr: number = -Math.floor(dot.genome.view); dr <= Math.floor(dot.genome.view); dr++)
                        {
                            for (let dc: number = -Math.floor(dot.genome.view); dc <= Math.floor(dot.genome.view); dc++)
                            {
                                for (let grid of grids)
                                {
                                    input.set(1, count, grid.get(r + dr, c + dc));
                                    count++;
                                }
                            }
                        }
                        // Get the dots' moves
                        let move: number[] = dot.move(input);
                        // Trap the dots
                        dot.trap(this.trap_grid.get(r + move[0], c + move[1]))
                        // Move the dots to the new dot grid if they haven't died
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
                            new_dot_count++;
                        }
                    }
                }
            }
        }
        // Replace the old dot grid with the new dot grid
        this.dot_grid = new_dot_grid;
    }

    fight_feed_split(): void
    {
        // The new dot grid for the results of fighting, feeding, and splitting.
        let new_dot_grid: Dot[][][] = [];
        for (let r: number = 0; r < this.dot_grid.length; r++)
        {
            new_dot_grid[r] = [];
            for (let c: number = 0; c < this.dot_grid[0].length; c++)
            {
                new_dot_grid[r][c] = [];
                if (this.dot_grid[r][c].length > 1)
                {
                    // Determine the teams and their stats.
                    let total_size: number = 0;
                    let team_dots: Record<number, Dot[]> = {};
                    let team_size: Record<number, number> = {};
                    for (let dot of this.dot_grid[r][c])
                    {
                        let team: number = Math.floor(dot.genome.team_num);
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
                        }
                    }
                    // Determine which team won the fight.
                    let lottery: number = Math.random() * total_size;
                    let sum: number = 0;
                    for (let t in team_size)
                    {
                        if ((lottery >= sum) && (lottery < (sum + team_size[t])))
                        {
                            this.dot_grid[r][c] = team_dots[t];
                            for (let dot of this.dot_grid[r][c])
                            {
                                // Reward the victors with sustinance.
                                let food_spoils: number = this.food_grid.get(r,c) / this.dot_grid[r][c].length;
                                this.food_grid.set(r,c,0);
                                let dot_spoils: number = (total_size - team_size[t]) / this.dot_grid[r][c].length;
                                dot.size += food_spoils * (dot.genome.eat_ratio);
                                dot.size += dot_spoils * (1 - dot.genome.eat_ratio);
                                // Split the dots.
                                let baby_dots: Dot[] = dot.split();
                                // Add the dots to the new dot grid.
                                new_dot_grid[r][c].push(dot);
                                new_dot_grid[r][c].concat(baby_dots);
                            }
                            break;
                        }
                        sum += team_size[t];
                    }
                }
                else if (this.dot_grid[r][c].length == 1)
                {
                    // Feed the dot.
                    this.dot_grid[r][c][0].size += this.food_grid.get(r,c) * this.dot_grid[r][c][0].genome.eat_ratio;
                    this.food_grid.set(r,c,0);
                    // Split the dot.
                    let baby_dots: Dot[] = this.dot_grid[r][c][0].split();
                    // Add the dots to the new dot grid.
                    new_dot_grid[r][c].push(this.dot_grid[r][c][0]);
                    new_dot_grid[r][c].concat(baby_dots);
                }
            }
        }
        // Replace the old dot grid with the new dot grid
        this.dot_grid = new_dot_grid;
    }
}