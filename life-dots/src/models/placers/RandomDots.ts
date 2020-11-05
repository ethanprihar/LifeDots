import Placer from "../Placer";
import Genome from "../Genome";
import Dot from "../Dot";

var ndarray = require("ndarray");
var ops = require("ndarray-ops");

export default class RandomDots extends Placer
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
    // the minimum split size fraction of the random dots.
    min_split_frac: number;
    // the maximum split size fraction of the random dots.
    max_split_frac: number;
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
                min_split_frac: number, 
                max_split_frac: number, 
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
        this.min_split_frac = min_split_frac;
        this.max_split_frac = max_split_frac;
        this.min_eat_ratio = min_eat_ratio;
        this.max_eat_ratio = max_eat_ratio;
        this.min_speed = min_speed;
        this.max_speed = max_speed;
        this.min_view = min_view;
        this.max_view = max_view;
        this.min_max_mut_pct = min_max_mut_pct;
        this.max_max_mut_pct = max_max_mut_pct;
    }

    init(rows: number, cols: number): Record<string, Dot>
    {
        let map: Record<string, Dot> = {};
        for (let i: number = 0; i < this.dot_num; i++)
        {
            let genome: Genome = this.rand_genome();
            const r: number = Math.floor(Math.random() * rows);
            const c: number = Math.floor(Math.random() * cols);
            map[r + "," + c] = new Dot(genome.max_size, genome, null);
        }
        return map;
    }

    rand_genome(): Genome
    {
        let team_num: number = Math.random() * (this.max_team_num - this.min_team_num) + this.min_team_num;
        let max_size: number = Math.random() * (this.max_max_size - this.min_max_size) + this.min_max_size;
        let split_frac: number = Math.random() * (this.max_split_frac - this.min_split_frac) + this.min_split_frac;
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
        return new Genome(team_num, max_size, split_frac, eat_ratio, speed, view, weights, max_mut_pct);
    }
}