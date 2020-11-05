import Placer from "../Placer";

export default class BorderWall extends Placer
{
    //The width of the border wall.
    border_size: number;
    
    constructor(border_size: number)
    {
        super();
        this.border_size = border_size;
    }

    init(rows: number, cols: number): Record<string, number>
    {
        let map: Record<string, number> = {};
        for (let r: number = 0; r < rows; r++)
        {
            for (let b: number = 0; b < this.border_size; b++)
            {
                map[r + "," + b] = 1;
                map[r + "," + (cols - 1 - b)] = 1
            }
        }
        for (let c: number = 0; c < cols; c++)
        {
            for (let b: number = 0; b < this.border_size; b++)
            {
                map[b + "," + c] = 1;
                map[(rows - 1 - b) + "," + c] = 1
            }
        }
        return map;
    }
}