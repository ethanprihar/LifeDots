import Dot from "./Dot";

export default abstract class DotPlacer
{    
    abstract init(rows: number, cols: number): Dot[][][];

    update(dot_grid: Dot[][][]): void {}
}