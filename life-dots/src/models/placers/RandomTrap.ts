import Placer from "../Placer";

export default class RandomTrap extends Placer
{
    // The number of cells around the center that are not trapped.
    trap_num: number;
    // The amound of size removed every tick when in the trap.
    trap_size: number;

    constructor(trap_num: number, trap_size: number)
    {
        super();
        this.trap_num = trap_num;
        this.trap_size = trap_size;
    }

    init(rows: number, cols: number): Record<string, number>
    {
        let map: Record<string, number> = {};
        for (let i: number = 0; i < this.trap_num; i++)
        {
            const r: number = Math.floor(Math.random() * rows);
            const c: number = Math.floor(Math.random() * cols);
            const pos: string = r + "," + c;
            map[pos] = pos in map ? map[pos] + this.trap_size : this.trap_size;
        }
        return map;
    }
}