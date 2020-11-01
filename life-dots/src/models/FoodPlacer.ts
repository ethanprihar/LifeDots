export default abstract class FoodPlacer
{
    constructor() {}

    abstract init(rows: number, cols: number): any;

    update(food_grid: any): void {}
}