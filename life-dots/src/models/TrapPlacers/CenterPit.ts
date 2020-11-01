import TrapPlacer from "../TrapPlacer";

var ndarray = require("ndarray");

export default class Border extends TrapPlacer
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

    init(rows: number, cols: number): any
    {
        let trap_grid: any = ndarray(new Float64Array(rows * cols), [rows, cols]);
        for (let r: number = this.edge; r < rows - this.edge; r++)
        {
            for (let c: number = this.edge; c < cols - this.edge; c++)
            {
                trap_grid.set(r, c, this.size);
            }
        }
        return trap_grid;
    }

    update(trap_grid: any): void
    {
        for (let r: number = this.edge; r < trap_grid.shape[0] - this.edge; r++)
        {
            for (let c: number = this.edge; c < trap_grid.shape[1] - this.edge; c++)
            {
                trap_grid.set(r, c, this.size);
            }
        }
    }
}