const math = require('mathjs');

export default class Dot
{
    constructor(mutable, genome, color=null)
    {
        this.mutable = mutable;
        this.genome = genome;
        this.size = this.initSize(genome.max_size, genome.baby_frac);
        this.ticks_until_move = genome.speed;
        this.signal = 0
        this.color = color == null ? this.initColor() : color;
    }

    initSize(max_size, baby_frac)
    {
        let min_size = max_size * baby_frac;
        return Math.random() * (max_size - minSize) + min_size;
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

    move(row, col, grids)
    {
        //let views = grids.map(x => this.getViews(row, col, this.genome.perception, x))
        //this.signals = output.slice(9).map(x => x > 0);
        //let choice = output.slice(0, 9).map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
        //let newRow = (row - 1) + Math.floor(choice / 3);
        //let newCol = (col - 1) + (choice % 3);
        //return [newRow, newCol];
        
    }

    split()
    {

    }

}