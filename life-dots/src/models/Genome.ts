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
        if (new_max_size < 1)
        {
            return null;
        }
        let new_split_frac: number = this.pct_mut(this.split_frac);
        if ((new_split_frac <= 0) || (new_split_frac >= 1))
        {
            return null;
        }
        let new_speed: number = this.pct_mut(this.speed);
        if (new_speed <= 0)
        {
            return null;
        }
        let new_max_mut_pct: number = this.pct_mut(this.max_mut_pct);
        if ((new_max_mut_pct < -1) || (new_max_mut_pct > 1))
        {
            return null;
        }
        let new_weights: any;
        let new_view: number = this.fix_mut(this.view, 1);
        if (new_view < 1)
        {
            return null;
        }
        if (Math.floor(new_view) < Math.floor(this.view))
        {
            new_weights = this.remove_view();
        }
        else if (Math.floor(new_view) > Math.floor(this.view))
        {
            new_weights = this.add_view();
        }
        if (new_weights === undefined)
        {
            new_weights = ndarray(new Float64Array(this.weights.size), this.weights.shape);
        }
        let rand: any = ndarray(new Float64Array(new_weights.size), new_weights.shape);
        ops.assign(new_weights, new_weights);
        ops.random(rand);
        ops.subseq(rand, 0.5);
        ops.mulseq(rand, 2 * this.max_mut_pct);
        ops.addeq(new_weights, rand);
        let new_color: number[] = [];
        for (let c of this.color)
        {
            new_color.push(Math.min(Math.max(this.fix_mut(c, 205), 50), 255));
        }
        let new_eat_ratio: number = Math.min(Math.max(this.fix_mut(this.eat_ratio, 1), 0), 1);
        return new Genome(new_color,
                          new_max_size, 
                          new_split_frac, 
                          new_eat_ratio, 
                          new_speed, 
                          new_view, 
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

    remove_view(): void
    {
        const old_dim: number = Math.floor(this.view) * 2 + 1;
        let new_weights: number[] = []
        for(let r = 1; r < old_dim - 1; r++)
        {
            for(let c = 1; c < old_dim - 1; c++)
            {
                let starting_pos: number = (r * old_dim + c) * 50;
                for (let i = 0; i < 50; i++)
                {
                    new_weights.push(this.weights.data[starting_pos + i]);
                }
            }
        }
        return ndarray(new Float64Array(new_weights), [new_weights.length / 10, 10]);
    }

    add_view(): any
    {
        const old_dim: number = Math.floor(this.view) * 2 + 1
        const new_dim: number =  old_dim + 2;
        let new_weights: number[] = new Array(new_dim * 50).fill(0);
        for(let r = 0; r < old_dim; r++)
        {
            new_weights = new_weights.concat(new Array(50).fill(0))
            for(let c = 0; c < old_dim; c++)
            {
                let starting_pos: number = (r * old_dim + c) * 50;
                for (let i = 0; i < 50; i++)
                {
                    new_weights.push(this.weights.data[starting_pos + i]);
                }
            }
            new_weights = new_weights.concat(new Array(50).fill(0))
        }
        new_weights = new_weights.concat(new Array(new_dim * 50).fill(0));
        return ndarray(new Float64Array(new_weights), [new_weights.length / 10, 10]);
    }
}