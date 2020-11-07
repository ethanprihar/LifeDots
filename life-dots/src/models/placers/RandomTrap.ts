import Placer from "../Placer";

export default class RandomTrap extends Placer
{
    // Whether the traps are distributed uniformly or normally
    uniform: boolean;
    // The number of cells around the center that are not trapped.
    trap_num: number;
    // The minimum size of a trap.
    min_trap_size: number;
    // The maximum size of a trap.
    max_trap_size: number;
    // The minimum amound of size removed from a dot every tick when in the trap.
    min_trap_damage: number;
    // The maximum amound of size removed from a dot every tick when in the trap.
    max_trap_damage: number;

    constructor(uniform: boolean, 
                trap_num: number, 
                min_trap_size: number, 
                max_trap_size: number, 
                min_trap_damage: number, 
                max_trap_damage: number)
    {
        super();
        this.uniform = uniform;
        this.trap_num = trap_num;
        this.min_trap_size = min_trap_size;
        this.max_trap_size = max_trap_size;
        this.min_trap_damage = min_trap_damage;
        this.max_trap_damage = max_trap_damage;
    }

    init(rows: number, cols: number): Record<string, number>
    {
        
        let map: Record<string, number> = {};
        for (let i: number = 0; i < this.trap_num; i++)
        {
            let r: number;
            let c: number;
            if (this.uniform)
            {
                r = Math.floor(Math.random() * rows);
                c = Math.floor(Math.random() * cols);
            }
            else
            {
                r = Math.floor(((Math.random() + Math.random() + Math.random() + Math.random()) / 4) * rows);
                c = Math.floor(((Math.random() + Math.random() + Math.random() + Math.random()) / 4) * cols);
            }
            let trap_size: number = Math.random() * (this.max_trap_size - this.min_trap_size) + this.min_trap_size;
            for (let dr: number = 0; dr < trap_size; dr++)
            {
                for (let dc: number = 0; dc < trap_size; dc++)
                {
                    const pos: string = this.get_new_pos(rows, cols, r + dr, c + dc);
                    const food_amount: number = Math.random() * (this.max_trap_damage - this.min_trap_damage) + this.min_trap_damage;
                    map[pos] = pos in map ? map[pos] + food_amount : food_amount;
                }
            }
        }
        return map;
    }

    get_new_pos(rows: number, cols: number, r: number, c: number): string
    {
        if (r < 0)
        {
            r += rows;
        }
        else if (r >= rows)
        {
            r -= rows;
        }
        if (c < 0)
        {
            c += cols;
        }
        else if (c >= cols)
        {
            c -= cols;
        }
        return(r + "," + c);
    }
}