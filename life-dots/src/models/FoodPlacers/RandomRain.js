var ndarray = require("ndarray");

export default class RandomRain
{
    constructor(tbr, dpr, fpd)
    {
        this.ticks_between_rain = tbr;
        this.drops_per_rain = dpr;
        this.food_per_drop = fpd;
        this.ticks_until_rain = 0;
    }

    init(rows, cols)
    {
        let grid = ndarray(new Float64Array(rows * cols), [rows, cols]);
        for (let i = 0; i < this.drops_per_rain; i++)
        {
            let r = Math.floor(Math.random() * (rows - 1));
            let c = Math.floor(Math.random() * (cols - 1));
            grid.set(r, c, grid.get(r, c) + this.food_per_drop);
        }
        this.ticks_until_rain = this.ticks_between_rain;
        return grid;
    }

    update(grid)
    {
        if (this.ticks_until_rain > 0)
        {
            this.ticks_until_rain--;
        }
        else
        {
            for (let i = 0; i < this.drops_per_rain; i++)
            {
                let r = Math.floor(Math.random() * (grid.shape[0] - 1));
                let c = Math.floor(Math.random() * (grid.shape[1] - 1));
                grid.set(r, c, grid.get(r, c) + this.food_per_drop);
            }
            this.ticks_until_rain = this.ticks_between_rain;
        }
    }
}