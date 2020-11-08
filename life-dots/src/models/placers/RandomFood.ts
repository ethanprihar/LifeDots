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
    // The minimum size of each food drop.
    min_drop_size: number;
    // The maximum size of each food drop.
    max_drop_size: number;
    // The minimum amount of food in each food piece.
    min_food_per_drop: number;
    // The maximum amount of food in each food piece.
    max_food_per_drop: number;
    // The change in ticks between rain after every rain in a phase.
    delta_ticks_between_rain: number;
    // The change in drops per rain after every rain in a phase.
    delta_drops_per_rain: number;
    // The change in minimum size of each food drop after every rain in a phase.
    delta_min_drop_size: number;
    // The change in maximum size of each food drop after every rain in a phase.
    delta_max_drop_size: number;
    // The change in minimum food per drop after every rain in a phase.
    delta_min_food_per_drop: number;
    // The change in maximum food per drop after every rain in a phase.
    delta_max_food_per_drop: number;
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
                min_drop_size: number, 
                max_drop_size: number,
                min_food_per_drop: number, 
                max_food_per_drop: number, 
                delta_ticks_between_rain: number, 
                delta_drops_per_rain: number, 
                delta_min_drop_size: number, 
                delta_max_drop_size: number, 
                delta_min_food_per_drop: number, 
                delta_max_food_per_drop: number, 
                phase_length: number, 
                will_cycle: boolean)
    {
        super();
        this.uniform = uniform;
        this.ticks_between_rain = ticks_between_rain;
        this.drops_per_rain = drops_per_rain;
        this.min_drop_size = min_drop_size; 
        this.max_drop_size = max_drop_size;
        this.min_food_per_drop = min_food_per_drop;
        this.max_food_per_drop = max_food_per_drop;
        this.delta_ticks_between_rain = delta_ticks_between_rain;
        this.delta_drops_per_rain = delta_drops_per_rain;
        this.delta_min_drop_size = delta_min_drop_size;
        this.delta_max_drop_size = delta_max_drop_size;
        this.delta_min_food_per_drop = delta_min_food_per_drop;
        this.delta_max_food_per_drop = delta_max_food_per_drop;
        this.phase_length = phase_length;
        this.will_cycle = will_cycle;
    }

    init(rows: number, cols: number): Record<string, number>
    {
        this.rows = rows;
        this.cols = cols;
        let map: Record<string, number> = {};
        this.update(map);
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
                let drop_size: number = Math.random() * (this.max_drop_size - this.min_drop_size) + this.min_drop_size;
                for (let dr: number = 0; dr < drop_size; dr++)
                {
                    for (let dc: number = 0; dc < drop_size; dc++)
                    {
                        const pos: string = this.get_new_pos(r + dr, c + dc);
                        const food_amount: number = Math.random() * (this.max_food_per_drop - this.min_food_per_drop) + this.min_food_per_drop;
                        map[pos] = pos in map ? map[pos] + food_amount : food_amount;
                    }
                }
            }
            // Adjust the cycle if the end of the phase is reached
            if (this.phase_count === this.phase_length)
            {
                this.phase_count = 0;
                if (this.phase_side === 1 || this.will_cycle)
                {
                    this.phase_side *= -1;
                }
            }
            else
            {
                this.phase_count++;
            }
            // Adjust rain quantities based on phase
            if (this.phase_side === 1)
            {
                this.ticks_between_rain += this.delta_ticks_between_rain;
                this.drops_per_rain += this.delta_drops_per_rain;
                this.min_drop_size += this.delta_min_drop_size; 
                this.max_drop_size += this.delta_max_drop_size;
                this.min_food_per_drop += this.delta_min_food_per_drop;
                this.max_food_per_drop += this.delta_max_food_per_drop;
            }
            else if (this.will_cycle)
            {
                this.ticks_between_rain -= this.delta_ticks_between_rain;
                this.drops_per_rain -= this.delta_drops_per_rain;
                this.min_drop_size -= this.delta_min_drop_size; 
                this.max_drop_size -= this.delta_max_drop_size;
                this.min_food_per_drop -= this.delta_min_food_per_drop;
                this.max_food_per_drop -= this.delta_max_food_per_drop;
            }
            // Reset the rain tick count and increment the phase
            this.ticks_until_rain = this.ticks_between_rain;
        }
    }

    get_new_pos(r: number, c: number): string
    {
        if (r < 0)
        {
            r = this.rows - (-r % this.rows);
        }
        else if (r >= this.rows)
        {
            r = r % this.rows;
        }
        if (c < 0)
        {
            c = this.cols - (-c % this.cols);
        }
        else if (c >= this.cols)
        {
            c = c % this.cols;
        }
        return(r + "," + c);
    }
}