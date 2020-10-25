var ndarray = require("ndarray");
var ops = require("ndarray-ops");

export default class Genome
{
    constructor(ally_min, ally_max, team_num, max_size, baby_frac, eat_ratio, speed, view, weights, max_mut_pct)
    {
        // The minimum value of the range which determines which dots are allies.
        this.ally_min = ally_min;
        // The maximum value of the range which determines which dots are allies.
        this.ally_max = ally_max;
        // The team number of the dot when fighting
        this.team_num = team_num;
        // The maximum size a dot can become, at which point it will split
        this.max_size = max_size;
        // The fraction of a dot's max size it will split off of itself
        this.baby_frac = baby_frac;
        // The odds of food consumption to dot consumption
        this.eat_ratio = eat_ratio;
        // The number of ticks between dot moves
        this.speed = speed;
        // The weight matrix used of the multi-regression
        this.weights = weights;
        // The max mutation percentage for the genes
        this.max_mut_pct = max_mut_pct;
        // The view radius a dot has of its surroundings
        this.view = view;
    }

    mutate()
    {
        let new_max_size = this.pct_mut(this.max_size, this.max_mut_pct);
        if (new_max_size <= 0) {return null;}
        let new_baby_frac = this.pct_mut(this.baby_frac, this.max_mut_pct);
        if ((new_baby_frac <= 0) || (new_baby_frac >= 1)) {return null;}
        let new_speed = this.pct_mut(this.speed, this.max_mut_pct);
        if (new_speed <= 0) {return null;}
        let new_ally_min = this.pct_mut(this.ally_min, this.max_mut_pct);
        let new_ally_max = this.pct_mut(this.ally_max, this.max_mut_pct);
        if (new_ally_min >= new_ally_max) {return null;}
        let new_eat_ratio = Math.min(Math.max(this.fix_mut(this.eat_ratio, this.max_mut_pct), 0), 1);
        let new_weights = ndarray(new Float64Array(this.weights.size), this.weights.shape);
        let rand = ndarray(new Float64Array(this.weights.size), this.weights.shape);
        ops.assign(new_weights, this.weights);
        ops.random(rand);
        ops.subseq(rand, 0.5);
        ops.mulseq(rand, 2 * this.max_mut_pct);
        ops.addeq(new_weights, rand);
        return new Genome(new_ally_min, new_ally_max, new_max_size, new_baby_frac, new_eat_ratio, new_speed, this.view, new_weights, this.max_mut_pct);
    }

    pct_mut(gene)
    {
        let rand = Math.random() * 2 - 1;
        return gene + rand * gene * this.max_mut_pct;
    }

    fix_mut(gene)
    {
        let rand = Math.random() * 2 - 1;
        return gene + rand * this.max_mut_pct;
    }
}
