import Genome from "./Genome"

var ndarray = require("ndarray");
var ops = require("ndarray-ops");
var gemm = require("ndarray-gemm");

export default class Dot
{
    // The size of the dot.
    size: number;
    // The dot's genome.
    genome: Genome;
    // The color of the dot.
    color: number[];
    // The value of the dot's signal.
    signal: number;
    // The number of ticks until the dot can move.
    ticks_until_move: number;
    
    constructor(start_size: number, genome: Genome, color: number[] | null)
    {
        this.size = start_size;
        this.genome = genome;
        this.color = color == null ? this.initColor() : color;
        this.signal = 0;
        this.ticks_until_move = genome.speed;
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

    move(input: any): number[]
    {
        let output: any = ndarray(new Float64Array(10), [1, 10]);
        gemm(output, input, this.genome.weights);
        this.signal = output.get(0,9);
        if (this.ticks_until_move <= 0)
        {
            this.size -= this.genome.max_size * Math.floor(this.genome.view) / 100;
            this.ticks_until_move = this.genome.speed;
            output = ndarray(output.data.subarray(0,9), [9]);
            let max_pos: number = ops.argmax(output);
            return [Math.floor(max_pos / 3) - 1, (max_pos % 3) - 1];
        }
        else
        {
            this.ticks_until_move--;
            return [0, 0];
        }
    }

    trap(trap: number): void
    {
        this.size -= trap;
    }
    
    split(): Dot | null
    {
        let bs: number = this.genome.max_size * this.genome.split_frac;
        if (this.size >= this.genome.max_size)
        {
            this.size = Math.min(this.genome.max_size, this.size - bs);
            let g: Genome | null = this.genome.mutate();
            if (g != null)
            {
                return new Dot(bs, g, this.color);
            }
        }
        return null;
    }
}