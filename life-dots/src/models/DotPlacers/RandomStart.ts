import DotPlacer from "../DotPlacer";
import Genome from "../Genome";
import Dot from "../Dot";

var ndarray = require("ndarray");
var ops = require("ndarray-ops");

export default class RandomStart extends DotPlacer
{
    // The number of dots generated at the start
    dot_num: number;
    // the minimum team number of the random dots.
    min_team_num: number;
    // the maximum team number of the random dots.
    max_team_num: number;
    // the minimum maximum size of the random dots.
    min_max_size: number;
    // the maximum maximum size of the random dots.
    max_max_size: number;
    // the minimum baby size fraction of the random dots.
    min_baby_frac: number;
    // the maximum baby size fraction of the random dots.
    max_baby_frac: number;
    // the minimum food to dot absorbtion ratio of the random dots.
    min_eat_ratio: number;
    // the maximum food to dot absorbtion ratio of the random dots.
    max_eat_ratio: number;
    // the minimum ticks between moves of the random dots.
    min_speed: number;
    // the maximum ticks between moves of the random dots.
    max_speed: number;
    // the minimum view of the random dots.
    min_view: number;
    // the maximum view of the random dots.
    max_view: number;
    // the minimum maximum mutation percentage of the random dots.
    min_max_mut_pct: number;
    // the maximum maximum mutation percentage of the random dots.
    max_max_mut_pct: number;
    
    constructor(dot_num: number, 
                min_team_num: number, 
                max_team_num: number, 
                min_max_size: number, 
                max_max_size: number, 
                min_baby_frac: number, 
                max_baby_frac: number, 
                min_eat_ratio: number, 
                max_eat_ratio: number, 
                min_speed: number, 
                max_speed: number, 
                min_view: number, 
                max_view: number, 
                min_max_mut_pct: number, 
                max_max_mut_pct: number)
    {
        super();
        this.dot_num = dot_num;
        this.min_team_num = min_team_num;
        this.max_team_num = max_team_num;
        this.min_max_size = min_max_size;
        this.max_max_size = max_max_size;
        this.min_baby_frac = min_baby_frac;
        this.max_baby_frac = max_baby_frac;
        this.min_eat_ratio = min_eat_ratio;
        this.max_eat_ratio = max_eat_ratio;
        this.min_speed = min_speed;
        this.max_speed = max_speed;
        this.min_view = min_view;
        this.max_view = max_view;
        this.min_max_mut_pct = min_max_mut_pct;
        this.max_max_mut_pct = max_max_mut_pct;
    }

    init(rows: number, cols: number): Dot[][][]
    {
        let dot_grid: Dot[][][] = [];
        for (let r: number = 0; r < rows; r++)
        {
            dot_grid[r] = [];
            for (let c: number = 0; c < cols; c++)
            {
                dot_grid[r][c] = [];
            }
        }
        for (let i: number = 0; i < this.dot_num; i++)
        {
            let genome: Genome = this.rand_genome();
            let r: number = Math.floor(Math.random() * rows);
            let c: number = Math.floor(Math.random() * cols);
            dot_grid[r][c].push(new Dot(genome.max_size, genome, null));
        }
        return dot_grid;
    }

    rand_genome(): Genome
    {
        let team_num: number = Math.random() * (this.max_team_num - this.min_team_num) + this.min_team_num;
        let max_size: number = Math.random() * (this.max_max_size - this.min_max_size) + this.min_max_size;
        let baby_frac: number = Math.random() * (this.max_baby_frac - this.min_baby_frac) + this.min_baby_frac;
        let eat_ratio: number = Math.random() * (this.max_eat_ratio - this.min_eat_ratio) + this.min_eat_ratio;
        let speed: number = Math.random() * (this.max_speed - this.min_speed) + this.min_speed;
        let view: number = Math.random() * (this.max_view - this.min_view) + this.min_view;
        let max_mut_pct: number = Math.random() * (this.max_max_mut_pct - this.min_max_mut_pct) + this.min_max_mut_pct;
        let view_dim: number = Math.floor(view) * 2 + 1;
        let weight_dim: number = view_dim * view_dim * 5;
        let weights: any = ndarray(new Float64Array(weight_dim * 10), [weight_dim, 10]);
        ops.random(weights);
        ops.subseq(weights, 0.5);
        ops.mulseq(weights, 2);
        return new Genome(team_num, max_size, baby_frac, eat_ratio, speed, view, weights, max_mut_pct);
    }
}