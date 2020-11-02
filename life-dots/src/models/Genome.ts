var ndarray = require("ndarray");
var ops = require("ndarray-ops");

export default class Genome
{
    // The team number of the dot when fighting.
    team_num: number;
    // The maximum size a dot can become, at which point it will split.
    max_size: number;
    // The fraction of a dot's max size it will split off of itself.
    baby_frac: number;
    // The efficiency of food consumption; the inverse of dot consumption efficiency.
    eat_ratio: number;
    // The number of ticks between dot moves.
    speed: number;
    // The view radius a dot has of its surroundings.
    view: number;
    // The weight matrix used of the multi-regression.
    weights: any;
    // The max mutation percentage for the genes.
    max_mut_pct: number;

    constructor(team_num: number, 
                max_size: number, 
                baby_frac: number, 
                eat_ratio: number, 
                speed: number, 
                view: number, 
                weights: any, 
                max_mut_pct: number)
    {
        this.team_num = team_num;
        this.max_size = max_size;
        this.baby_frac = baby_frac;
        this.eat_ratio = eat_ratio;
        this.speed = speed;
        this.view = view;
        this.weights = weights;
        this.max_mut_pct = max_mut_pct;
    }

    mutate(): Genome | null
    {
        let new_max_size: number = this.pct_mut(this.max_size);
        if (new_max_size <= 0) {return null;}
        let new_baby_frac: number = this.pct_mut(this.baby_frac);
        if ((new_baby_frac <= 0) || (new_baby_frac >= 1)) {return null;}
        let new_speed: number = this.pct_mut(this.speed);
        if (new_speed <= 0) {return null;}
        let new_team_num: number = this.fix_mut(this.team_num);
        let new_max_mut_pct: number = this.pct_mut(this.max_mut_pct);
        let new_eat_ratio: number = Math.min(Math.max(this.fix_mut(this.eat_ratio), 0), 1);
        let new_weights: any = ndarray(new Float64Array(this.weights.size), this.weights.shape);
        let rand: any = ndarray(new Float64Array(this.weights.size), this.weights.shape);
        ops.assign(new_weights, this.weights);
        ops.random(rand);
        ops.subseq(rand, 0.5);
        ops.mulseq(rand, 2 * this.max_mut_pct);
        ops.addeq(new_weights, rand);
        return new Genome(new_team_num, 
                          new_max_size, 
                          new_baby_frac, 
                          new_eat_ratio, 
                          new_speed, 
                          this.view, 
                          new_weights, 
                          new_max_mut_pct);
    }

    pct_mut(gene: number): number
    {
        let rand: number = Math.random() * 2 - 1;
        return gene + rand * gene * this.max_mut_pct;
    }

    fix_mut(gene: number): number
    {
        let rand: number = Math.random() * 2 - 1;
        return gene + rand * this.max_mut_pct;
    }
}
