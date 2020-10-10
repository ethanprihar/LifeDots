const math = require('mathjs');

export default class Genome
{
    constructor(sexNum, sexMin, sexMax, sexOdds, 
                maxSize, sexSize, babySize, signalNum, 
                eatOdds, speed, view, moveWeights)
    {
        // The number of sexes of this dot's species
        this.sexNum = sexNum;
        // The min value to compare to other dot's when determining their chance to successfully reproduce
        this.sexMin = sexMin
        // The max value to compare to other dot's when determining their chance to successfully reproduce
        this.sexMax = sexMax

        // All the following variables are arrays with one element for each sex
        // The probability distribution for which sex an offspring will be
        this.sexOdds = sexOdds;
        // The maximum size a dot can become, past this it's size will not grow
        this.maxSize = maxSize;
        // The fraction of a dot's max size it must be before being able to reproduce
        this.sexSize = sexSize;
        // The fraction of a dot's sex size that will be taken from the dot and put into its offspring 
        this.babySize = babySize;
        // The number of signals a dot has
        this.signalNum = signalNum;
        // The food to dot odds of size trasfered to dot size
        this.eatOdds = eatOdds;
        // The number of ticks between dot moves
        this.speed = speed;
        // The square radius around the dot that the dot perceives
        this.view = view;
        // The weight matrix used of the multi-regression
        this.moveWeights = moveWeights;
    }

    mutate(maxMutPct)
    {
        let newSexNum;
        let newSexMin;
        let newSexMax;
        let newSexOdds;
        let newMaxSize;
        let newSexSize;
        let newBabySize;
        let newSignalNum;
        let newEatOdds;
        let newSpeed;
        let newView;
        let newMoveWeights;

        // Mutate sexNum
        newSexNum = this.geneMut(this.sexNum, maxMutPct);
        // Check if newSexNum violates constraints
        if (Math.floor(newSexNum) == 0){return null;}
        // Adjust other values based on newSexNum
        else if (Math.floor(newSexNum) < Math.floor(this.sexNum))
        {
            newSexOdds = [];
            for (let odds of this.sexOdds.slice(0, -1))
            {
                newSexOdds.push(odds.slice());
            }
            newMaxSize = this.maxSize.slice(0, -1);
            newSexSize = this.sexSize.slice(0, -1);
            newBabySize = this.babySize.slice(0, -1);
            newEatOdds = [];
            for (let odds of this.eatOdds.slice(0, -1))
            {
                newEatOdds.push(odds.slice());
            }
            newSpeed = this.speed.slice(0, -1);
            newSignalNum = this.signalNum.slice(0, -1);
            newView = this.view.slice(0, -1);
            newMoveWeights = [];
            for (let weights of this.moveWeights.slice(0, -1))
            {
                newMoveWeights.push(math.clone(weights));
            }
        }
        else if (Math.floor(newSexNum) > Math.floor(this.sexNum))
        {
            let i = this.sexNum - 1;
            newSexOdds = [];
            for (let odds of this.sexOdds)
            {
                newSexOdds.push(odds.slice());
            }
            newSexOdds.push(this.sexOdds[i].slice());
            newMaxSize = this.maxSize.slice().push(this.maxSize[i]);
            newSexSize = this.sexSize.slice().push(this.sexSize[i]);
            newBabySize = this.babySize.slice().push(this.babySize[i]);
            newEatOdds = [];
            for (let odds of this.eatOdds)
            {
                newEatOdds.push(odds.slice());
            }
            newEatOdds.push(this.eatOdds[i].slice());
            newSpeed = this.speed.slice().push(this.speed[i]);
            newSignalNum = this.signalNum.slice().push(this.signalNum[i]);
            newView = this.view.slice().push(this.view[i]);
            newMoveWeights = [];
            for (let weights of this.moveWeights)
            {
                newMoveWeights.push(math.clone(weights));
            }
            newMoveWeights.push(math.clone(this.moveWeights[i]))
        }
        else
        {
            newSexOdds = [];
            for (let odds of this.sexOdds)
            {
                newSexOdds.push(odds.slice());
            }
            newMaxSize = this.maxSize.slice();
            newSexSize = this.sexSize.slice();
            newBabySize = this.babySize.slice();
            newEatOdds = [];
            for (let odds of this.eatOdds)
            {
                newEatOdds.push(odds.slice());
            }
            newSpeed = this.speed.slice();
            newSignalNum = this.signalNum.slice();
            newView = this.view.slice();
            newMoveWeights = [];
            for (let weights of this.moveWeights)
            {
                newMoveWeights.push(math.clone(weights));
            }
        }

        // Mutate sexMin
        newSexMin = this.geneMut(this.sexMin, maxMutPct);

        // Mutate sexMax
        newSexMax = this.geneMut(this.sexMax, maxMutPct);

        for (let i = 0; i < Math.floor(newSexNum); i++)
        {
            // Mutate sexOdds
            for (let o = 0; o < newSexOdds[i].length; o++)
            {
                newSexOdds[i][o] = this.geneMut(newSexOdds[i][o], maxMutPct);
                // Check if newSexOdds violates constrains
                if (newSexOdds[i][o] <= 0){return null;}
            }

            // Mutate maxSize
            newMaxSize[i] = this.geneMut(newMaxSize[i], maxMutPct);
            // Check if newMaxSize violates constraints
            if (newMaxSize[i] <= 0){return null;}

            // Mutate sexSize
            newSexSize[i] = this.geneMut(newSexSize[i], maxMutPct);
            // Check if newSexSize violates constraints
            if (newSexSize[i] <= 0 || newSexSize[i] >= 1){return null;}

            // Mutate babySize
            newBabySize[i] = this.geneMut(newBabySize[i], maxMutPct);
            // Check if newBabySize violates constraints
            if (newBabySize[i] <= 0 || newBabySize[i] >= 1){return null;}

            // Mutate eatOdds
            for (let o = 0; o < newEatOdds[i].length; o++)
            {
                newEatOdds[i][o] = this.geneMut(newEatOdds[i][o], maxMutPct);
                // Check if newEatOdds violates constrains
                if (newEatOdds[i][o] <= 0){return null;}
            }

            // Mutate speed
            newSpeed[i] = this.geneMut(newSpeed[i], maxMutPct);
            // Check if newSpeedSize violates constraints
            if (newSpeed[i] < 0){return null;}

            // Mutate signalNum
            newSignalNum[i] = this.geneMut(newSignalNum[i], maxMutPct);
            // Check if newSignalNum violates constraints
            if (newSignalNum[i] < 0){return null;}
            // Adjust other values based on newSignalNum
            if (Math.floor(newSignalNum[i]) > Math.floor(this.signalNum[i]))
            {
                newMoveWeights[i] = math.concat(newMoveWeights[i], math.zeros(newMoveWeights[i].size()[0], 1));
            }
            else if (Math.floor(newSignalNum[i]) < Math.floor(this.signalNum[i]))
            {
                let ri = new Array(newMoveWeights[i].size()[0]);
                let ci = new Array(newMoveWeights[i].size()[1] - 1);
                for (let r = 0; r < ri.length; r++) {ri[r] = r;}
                for (let c = 0; c < ci.length; c++) {ci[c] = c;}
                newMoveWeights[i] = newMoveWeights[i].subset(math.index(ri, ci));
            }

            // TODO Mutate view

            // TODO Mutate moveWeights
            
        }
        return new Genome(newSexNum, newSexMin, newSexMax, newSexOdds, 
                          newMaxSize, newSexSize, newBabySize, newSignalNum, 
                          newEatOdds, newSpeed, newView, newMoveWeights);
    }

    geneMut(gene, max)
    {
        let randNorm = (Math.random() + Math.random() - Math.random() - Math.random()) / 2;
        return gene + randNorm * gene * max;
    }
}
