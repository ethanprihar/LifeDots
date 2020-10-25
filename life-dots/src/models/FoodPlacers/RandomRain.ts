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
        let food_grid = ndarray(new Float64Array(rows * cols), [rows, cols]);
        for (let i = 0; i < this.drops_per_rain; i++)
        {
            let r = Math.floor(Math.random() * rows);
            let c = Math.floor(Math.random() * cols);
            food_grid.set(r, c, food_grid.get(r, c) + this.food_per_drop);
        }
        this.ticks_until_rain = this.ticks_between_rain;
        return food_grid;
    }

    update(food_grid)
    {
        if (this.ticks_until_rain > 0)
        {
            this.ticks_until_rain--;
        }
        else
        {
            for (let i = 0; i < this.drops_per_rain; i++)
            {
                let r = Math.floor(Math.random() * food_grid.shape[0]);
                let c = Math.floor(Math.random() * food_grid.shape[1]);
                food_grid.set(r, c, food_grid.get(r, c) + this.food_per_drop);
            }
            this.ticks_until_rain = this.ticks_between_rain;
        }
    }
}