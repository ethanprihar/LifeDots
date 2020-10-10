const math = require('mathjs');

const SATURATION = 100;

export default class Dot
{
    constructor(mutable, genome, color=null)
    {
        this.mutable = mutable;
        this.genome = genome;
        this.sex = this.initSex(genome.sexOdds);
        this.size = this.initSex(genome.maxSize[this.sex], genome.babySize[this.sex]);
        this.ticksUntilMove = genome.speed[this.sex];
        this.signals = new Array(genome.signalNum[this.sex]).fill(0);
        this.color = color == null ? this.initColor() : color;
    }

    initSex(sexOdds)
    {
        let prodSexOdds = new Array(Math.floor(this.genome.sexNum)).fill(0);
        
        for (let odds of sexOdds)
        {
            prodSexOdds = math.dotMultiply(prodSexOdds, odds);
        }
        var rand = Math.random() * math.sum(prodSexOdds);
        var min = 0;
        var max = sexOdds[0];
        for (var i = 0; i < sexOdds.length; i++)
        {
            if (rand >= min && rand < max)
            {
                return i;
            }
            min += sexOdds[i];
            max += sexOdds[i+1];
        }
    }

    initSize(maxSize, babySize)
    {
        var minSize = maxSize * babySize;
        return Math.random() * (maxSize - minSize) + minSize;
    }

    initColor()
    {
        var color = []
        for (var i = 0; i < 3; i++)
        {
            color.push(Math.floor(Math.random() * (256-SATURATION)) + SATURATION);
        }
        return color;
    }

    move(row, col, grids)
    {
        //var views = grids.map(x => this.getViews(row, col, this.genome.perception, x))
        //this.signals = output.slice(9).map(x => x > 0);
        //var choice = output.slice(0, 9).map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
        //var newRow = (row - 1) + Math.floor(choice / 3);
        //var newCol = (col - 1) + (choice % 3);
        //return [newRow, newCol];
        
    }

    getView(row, col, pad, grid)
    {

    }

}