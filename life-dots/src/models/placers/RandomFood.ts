import Placer from "../Placer";

export default class RandomFood extends Placer
{
    // The number of rows in the world
    rows: number;
    // The number of columns in the world
    cols: number;
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
        this.rows = -1;
        this.cols = -1;
        this.ticks_between_rain = tbr;
        this.drops_per_rain = dpr;
        this.food_per_drop = fpd;
    }

    init(rows: number, cols: number): Record<string, number>
    {
        this.rows = rows;
        this.cols = cols;
        let map: Record<string, number> = {};
        this.rain(rows, cols, map);
        return map;
    }

    update(map: Record<string, any>): void
    {
        if (this.ticks_until_rain > 0)
        {
            this.ticks_until_rain--;
        }
        else
        {
            this.rain(this.rows, this.cols, map);
        }
    }

    rain(rows: number, cols: number, map: Record<string, number>): void
    {
        for (let i: number = 0; i < this.drops_per_rain; i++)
        {
            const r: number = Math.floor(Math.random() * rows);
            const c: number = Math.floor(Math.random() * cols);
            const pos: string = r + "," + c;
            map[pos] = pos in map ? map[pos] + this.food_per_drop : this.food_per_drop;
        }
        this.ticks_until_rain = this.ticks_between_rain;
    }
}