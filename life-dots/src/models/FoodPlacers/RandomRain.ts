import FoodPlacer from "../FoodPlacer";

var ndarray = require("ndarray");

export default class RandomRain extends FoodPlacer
{
    // The number of ticks between rains of food.
    ticks_between_rain: number;
    // The number of food pieces that drop per rain.
    drops_per_rain: number;
    // The amount of food in each food piece.
    food_per_drop: number;
    // The number of ticks until the next rain.
    ticks_until_rain: number = 0;

    constructor(tbr: number, dpr: number, fpd: number)
    {
        super();
        this.ticks_between_rain = tbr;
        this.drops_per_rain = dpr;
        this.food_per_drop = fpd;
    }

    init(rows: number, cols: number): any
    {
        let food_grid: any = ndarray(new Float64Array(rows * cols), [rows, cols]);
        this.rain(rows, cols, food_grid);
        return food_grid;
    }

    update(food_grid: any): void
    {
        if (this.ticks_until_rain > 0)
        {
            this.ticks_until_rain--;
        }
        else
        {
            this.rain(food_grid.shape[0], food_grid.shape[1], food_grid);
        }
    }

    rain(rows: number, cols: number, food_grid: any): void
    {
        for (let i: number = 0; i < this.drops_per_rain; i++)
        {
            let r: number = Math.floor(Math.random() * rows);
            let c: number = Math.floor(Math.random() * cols);
            food_grid.set(r, c, food_grid.get(r, c) + this.food_per_drop);
        }
        this.ticks_until_rain = this.ticks_between_rain;
    }
}