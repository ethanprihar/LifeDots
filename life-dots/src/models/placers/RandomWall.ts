import Placer from "../Placer";

export default class RandomWall extends Placer
{
    //The width of the border wall.
    density: number;
    
    constructor(density: number)
    {
        super();
        this.density = density;
    }

    init(rows: number, cols: number): Record<string, number>
    {
        let map: Record<string, number> = {};
        for (let r: number = 0; r < rows; r++)
        {
            if (Math.random() < this.density)
            {
                map[r + "," + 0] = 1;
                map[r + "," + (cols - 1)] = 1;
            }
        }
        for (let c: number = 0; c < cols; c++)
        {
            if (Math.random() < this.density)
            {
                map[0 + "," + c] = 1;
                map[(rows - 1) + "," + c] = 1;
            }
        }
        return map;
    }
}