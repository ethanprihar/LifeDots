import Placer from "../Placer";

export default class RandomFood extends Placer
{
    // The number of rows in the world
    rows: number = -1;
    // The number of columns in the world
    cols: number = -1;
    // Whether to distribute dots uniformly or normally.
    uniform: boolean;
    // The number of ticks between rains of food.
    ticks_between_rain: number;
    // The number of food pieces that drop per rain.
    drops_per_rain: number;
    // The amount of food in each food piece.
    food_per_drop: number;
    // The change in ticks between rain after every rain in a phase.
    delta_ticks_between_rain: number;
    // The change in drops per rain after every rain in a phase.
    delta_drops_per_rain: number;
    // The change in food per drop after every rain in a phase.
    delta_food_per_drop: number;
    // The length of a phase.
    phase_length: number;
    // Whether or not the rain cycles or plateaus.
    will_cycle: boolean;
    // The number of ticks until the next rain.
    ticks_until_rain: number = 0;
    // The current phase count
    phase_count: number = 0;
    // The current phase side
    phase_side: number = 1;

    constructor(uniform: boolean,
                ticks_between_rain: number, 
                drops_per_rain: number, 
                food_per_drop: number,
                delta_ticks_between_rain: number, 
                delta_drops_per_rain: number, 
                delta_food_per_drop: number, 
                phase_length: number, 
                will_cycle: boolean)
    {
        super();
        this.uniform = uniform;
        this.ticks_between_rain = ticks_between_rain;
        this.drops_per_rain = drops_per_rain;
        this.food_per_drop = food_per_drop;
        this.delta_ticks_between_rain = delta_ticks_between_rain;
        this.delta_drops_per_rain = delta_drops_per_rain;
        this.delta_food_per_drop = delta_food_per_drop;
        this.phase_length = phase_length;
        this.will_cycle = will_cycle;
    }

    init(rows: number, cols: number): Record<string, number>
    {
        this.rows = rows;
        this.cols = cols;
        let map: Record<string, number> = {};
        return map;
    }

    update(map: Record<string, any>): void
    {
        // Count down to rain.
        if (this.ticks_until_rain > 0)
        {
            this.ticks_until_rain--;
        }
        else
        {
            // Rain food on the map.
            for (let i: number = 0; i < this.drops_per_rain; i++)
            {
                let r: number;
                let c: number;
                if (this.uniform)
                {
                    r = Math.floor(Math.random() * this.rows);
                    c = Math.floor(Math.random() * this.cols);
                }
                else
                {
                    r = Math.floor(((Math.random() + Math.random() + Math.random() + Math.random()) / 4) * this.rows);
                    c = Math.floor(((Math.random() + Math.random() + Math.random() + Math.random()) / 4) * this.cols);
                }
                const pos: string = r + "," + c;
                map[pos] = pos in map ? map[pos] + this.food_per_drop : this.food_per_drop;
            }
            // Adjust rain quantities based on phase
            if (this.phase_side === 1)
            {
                this.ticks_between_rain += this.delta_ticks_between_rain;
                this.drops_per_rain += this.delta_drops_per_rain;
                this.food_per_drop += this.delta_food_per_drop;
            }
            else if (this.will_cycle == true)
            {
                this.ticks_between_rain -= this.delta_ticks_between_rain;
                this.drops_per_rain -= this.delta_drops_per_rain;
                this.food_per_drop -= this.delta_food_per_drop;
            }
            // Reset the rain tick count and increment the phase
            this.ticks_until_rain = this.ticks_between_rain;
            this.phase_count++;
            // Adjust the cycle if the end of the phase is reached
            if (this.phase_count === this.phase_length)
            {
                this.phase_count = 0;
                if (this.phase_side === 1 || this.will_cycle)
                {
                    this.phase_side *= -1;
                }
            }
        }
    }
}