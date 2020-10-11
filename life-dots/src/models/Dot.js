var ndarray = require("ndarray");
var gemm = require("ndarray-gemm");

export default class Dot
{
    constructor(start_size, genome, color=null)
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
        return output;
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