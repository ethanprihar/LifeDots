import Dot from "./Dot";

export default abstract class WallPlacer
{
    constructor() {}

    abstract init(rows: number, cols: number, dot_grid: Dot[][][], food_grid: any, trap_grid: any): any;

    update(dot_grid: Dot[][][], food_grid: any, trap_grid: any, wall_grid: any): void {}
}