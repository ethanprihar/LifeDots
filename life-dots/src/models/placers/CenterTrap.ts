import Placer from "../Placer";

export default class CenterTrap extends Placer
{
    // The number of cells around the center that are not trapped.
    edge: number;
    // The amound of size removed every tick when in the trap.
    size: number;

    constructor(edge: number, size: number)
    {
        super();
        this.edge = edge;
        this.size = size;
    }

    init(rows: number, cols: number): Record<string, number>
    {
        let map: Record<string, number> = {};
        for (let r: number = this.edge; r < rows - this.edge; r++)
        {
            for (let c: number = this.edge; c < cols - this.edge; c++)
            {
                map[r + "," + c] = this.size;
            }
        }
        return map;
    }
}