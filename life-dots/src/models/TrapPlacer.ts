export default abstract class TrapPlacer
{
    constructor() {}

    abstract init(rows: number, cols: number): any;

    update(trap_grid: any): void {}
}