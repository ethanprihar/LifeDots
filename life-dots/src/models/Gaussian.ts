export default class Gaussian
{
    // Whether there has already been a generated value
    generated: boolean = false;
    // The first generated value
    v1: number = 0
    // The second generated value
    v2: number = 0

    random(std: number): number
    {
        if (this.generated === true)
        {
            return this.v2;
        }
        else
        {
            let s = 1;
            while ((s >= 1) || (s === 0))
            {
                this.v1 = Math.random() * 2 - 1;
                this.v2 = Math.random() * 2 - 1;
                s  = (this.v1 * this.v1) + (this.v2 * this.v2);
            }
            s = Math.sqrt((Math.log(s) * -2) / s);
            this.v1 *= s;
            this.v2 *= s;
            return this.v1;
        }
    }


}