import Dot from "./Dot";

export default abstract class DotPlacer
{
    constructor() {}
    
    abstract init(rows: number, cols: number): Dot[][][];

    update(dot_grid: Dot[][][]): void {}
}