import Genome from "./Genome"

import ndarray from "ndarray";
import ops from "ndarray-ops";
var gemm = require("ndarray-gemm");

export default class Dot
{
    size: number;
    genome: Genome;
    color: number[];
    signal: number;
    ticks_until_move: number;
    
    constructor(start_size: number, genome: Genome, color: number[] | null)
    {
        this.size = start_size;
        this.genome = genome;
        this.color = color == null ? this.initColor() : color;
        this.signal = 0;
        this.ticks_until_move = genome.speed;
    }

    initColor()
    {
        const SATURATION = 100;
        let color = []
        for (let i = 0; i < 3; i++)
        {
            color.push(Math.floor(Math.random() * (256-SATURATION)) + SATURATION);
        }
        return color;
    }

    move(input)
    {
        let output = ndarray(new Float64Array(10), [1, 10]);
        gemm(output, input, this.genome.weights);
        this.signal = output.get(0,9);
        output = ndarray(output.data.subarray(0,9), [9]);
        let max_pos = ops.argmax(output);
        return [Math.floor(max_pos / 3) - 1, (max_pos % 3) - 1];
    }
    
    split()
    {
        let spawn = []
        while(this.size > this.genome.max_size)
        {
            let ss = this.genome.max_size * this.genome.baby_frac;
            let g = this.genome.mutate();
            this.size -= ss;
            if (g != null) {spawn.push(new Dot(ss, g, this.color))};
        }
        return spawn;
    }

}