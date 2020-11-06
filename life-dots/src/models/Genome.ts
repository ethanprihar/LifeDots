var ndarray = require("ndarray");
var ops = require("ndarray-ops");

export default class Genome
{
    // The color of the dot
    color: number[];
    // The maximum size a dot can become, at which point it will split.
    max_size: number;
    // The fraction of a dot's max size it will split off of itself.
    split_frac: number;
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

    constructor(color: number[] | null, 
                max_size: number, 
                split_frac: number, 
                eat_ratio: number, 
                speed: number, 
                view: number, 
                weights: any, 
                max_mut_pct: number)
    {
        this.color = color == null ? this.initColor() : color;
        this.max_size = max_size;
        this.split_frac = split_frac;
        this.eat_ratio = eat_ratio;
        this.speed = speed;
        this.view = view;
        this.weights = weights;
        this.max_mut_pct = max_mut_pct;
    }

    initColor(): number[]
    {
        const SATURATION: number = 100;
        let color: number[] = [];
        for (let i: number = 0; i < 3; i++)
        {
            color.push(Math.floor(Math.random() * (255-SATURATION)) + SATURATION);
        }
        return color;
    }
    
    mutate(): Genome | null
    {
        let new_max_size: number = this.pct_mut(this.max_size);
        if (new_max_size <= 0) {return null;}
        let new_split_frac: number = this.pct_mut(this.split_frac);
        if ((new_split_frac <= 0) || (new_split_frac >= 1)) {return null;}
        let new_speed: number = this.pct_mut(this.speed);
        if (new_speed <= 0) {return null;}
        let new_color: number[] = [];
        for (let c of this.color)
        {
            new_color.push(Math.min(Math.max(this.fix_mut(c, 205), 50), 255));
        }
        let new_max_mut_pct: number = this.pct_mut(this.max_mut_pct);
        let new_eat_ratio: number = Math.min(Math.max(this.fix_mut(this.eat_ratio, 1), 0), 1);
        let new_weights: any = ndarray(new Float64Array(this.weights.size), this.weights.shape);
        let rand: any = ndarray(new Float64Array(this.weights.size), this.weights.shape);
        ops.assign(new_weights, this.weights);
        ops.random(rand);
        ops.subseq(rand, 0.5);
        ops.mulseq(rand, 2 * this.max_mut_pct);
        ops.addeq(new_weights, rand);
        return new Genome(new_color,
                          new_max_size, 
                          new_split_frac, 
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

    fix_mut(gene: number, range: number): number
    {
        let rand: number = Math.random() * 2 - 1;
        return gene + rand * this.max_mut_pct * range;
    }
}
