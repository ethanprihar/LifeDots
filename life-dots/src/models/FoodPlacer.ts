export default abstract class FoodPlacer
{
    abstract init(rows: number, cols: number): any;

    update(food_grid: any): void {}
}