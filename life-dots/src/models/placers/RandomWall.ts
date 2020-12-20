import Placer from "../Placer";

export default class RandomWall extends Placer
{
    // The number of section rows.
    section_rows: number;
    // The number of section columns.
    section_cols: number;
    // The width of the border wall.
    density: number;

    constructor(section_rows: number, 
                section_cols: number, 
                density: number)
    {
        super();
        this.section_rows = section_rows;
        this.section_cols = section_cols;
        this.density = density;
    }

    init(rows: number, cols: number): Record<string, number>
    {
        let map: Record<string, number> = {};
        // Add the horizontal bars.
        for (let c: number = 0; c < cols; c++)
        {
            let r: number = 0
            while (r < rows-1)
            {
                if (Math.random() < this.density)
                {
                    map[Math.floor(r) + "," + c] = 1;
                    if (r === 0)
                    {
                        map[(rows-1) + "," + c] = 1;
                    }
                }
                r += rows / this.section_rows;
            }
        }
        // Add the vertical bars.
        for (let r: number = 0; r < rows; r++)
        {
            let c: number = 0
            while (c < cols-1)
            {
                if (Math.random() < this.density)
                {
                    map[r + "," + Math.floor(c)] = 1;
                    if (c === 0)
                    {
                        map[r + "," + (cols-1)] = 1;
                    }
                }
                c += cols / this.section_cols;
            }
        }
        return map;
    }

    brush(map: Record<string, any>, row: number, col: number): void
    {
        map[row + "," + col] = 1;
    }
}