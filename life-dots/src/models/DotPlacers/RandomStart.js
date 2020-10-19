import Genome from "../Genome";
import Dot from "../Dot";

var ndarray = require("ndarray");
var ops = require("ndarray-ops");

export default class RandomStart
{
    constructor(dot_num, min_ally_min, max_ally_min, min_ally_max, max_ally_max, min_max_size, max_max_size, min_baby_frac, max_baby_frac, min_eat_ratio, max_eat_ratio, min_speed, max_speed, min_view, max_view, min_max_mut_pct, max_max_mut_pct)
    {
        this.dot_num = dot_num;
        this.min_ally_min = min_ally_min;
        this.max_ally_min = max_ally_min;
        this.min_ally_max = min_ally_max;
        this.max_ally_max = max_ally_max;
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

    init(rows, cols)
    {
        let dot_grid = [];
        for (let r = 0; r < rows; r++)
        {
            dot_grid[r] = [];
            for (let c = 0; c < cols; c++)
            {
                dot_grid[r][c] = [];
            }
        }
        for (let i = 0; i < this.dot_num; i++)
        {
            let genome = this.rand_genome(rows, cols);
            let r = Math.floor(Math.random() * rows);
            let c = Math.floor(Math.random() * cols);
            dot_grid[r][c].push(new Dot(genome.max_size, genome));
        }
        return dot_grid;
    }

    rand_genome(rows, cols)
    {
        let ally_min = Math.random() * (this.max_ally_min - this.min_ally_min) + this.min_ally_min;
        let ally_max = Math.random() * (this.max_ally_max - this.min_ally_max) + this.min_ally_max;
        let max_size = Math.random() * (this.max_max_size - this.min_max_size) + this.min_max_size;
        let baby_frac = Math.random() * (this.max_baby_frac - this.min_baby_frac) + this.min_baby_frac;
        let eat_ratio = Math.random() * (this.max_eat_ratio - this.min_eat_ratio) + this.min_eat_ratio;
        let speed = Math.random() * (this.max_speed - this.min_speed) + this.min_speed;
        let view = Math.random() * (this.max_view - this.min_view) + this.min_view;
        let max_mut_pct = Math.random() * (this.max_max_mut_pct - this.min_max_mut_pct) + this.min_max_mut_pct;
        let view_dim = Math.floor(view) * 2 + 1;
        let weight_dim = view_dim * view_dim * 5;
        let weights = ndarray(new Float64Array(weight_dim * 10), [weight_dim, 10]);
        ops.random(weights);
        ops.subseq(weights, 0.5);
        ops.mulseq(weights, 2);
        return new Genome(ally_min, ally_max, max_size, baby_frac, eat_ratio, speed, view, weights, max_mut_pct)
    }

    update(dot_grid){}
}