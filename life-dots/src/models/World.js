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

    update()
    {
        this.wall_placer.update(this.wall_grid, this.dot_grid, this.trap_grid, this.food_grid);
        this.trap_placer.update(this.trap_grid);
        this.food_placer.update(this.food_grid);
        this.dot_placer.update(this.dot_grid, this.wall_grid, this.trap_grid, this.food_grid);
    }

    // (x)walls (x)traps (x)food ()move ()trap ()fight ()feed ()split 
    
}