var ndarray = require("ndarray");
var ops = require("ndarray-ops");

export default class Border
{
    constructor(edge, size)
    {
        this.edge = edge;
        this.size = size;
    }

    init(rows, cols)
    {
        let trap_grid = ndarray(new Float64Array(rows * cols), [rows, cols]);
        for (let r = this.edge; r < rows - this.edge; r++)
        {
            for (let c = this.edge; c < cols - this.edge; c++)
            {
                trap_grid.set(r, c, this.size);
            }
        }
        return trap_grid;
    }

    update(trap_grid){}
}