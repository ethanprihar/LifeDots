import Placer from "./Placer";
import Dot from "./Dot"

var ndarray = require("ndarray");

export default class World
{
    // The number of rows in the world.
    rows: number;
    // The number of columns in the world.
    cols: number;
    // The dot placer for the world.
    dot_placer: Placer;
    // The food placer for the world.
    food_placer: Placer;
    // The trap placer for the world.
    trap_placer: Placer;
    // The wall placer for the world.
    wall_placer: Placer;
    // The dot map for the world.
    dot_map: Record<string, Dot>;
    // The food map for the world.
    food_map: Record<string, number>;
    // The trap map for the world.
    trap_map: Record<string, number>;
    // The wall map for the world.
    wall_map: Record<string, number>;
    
    constructor(rows: number, 
                cols: number, 
                dot_placer: Placer, 
                food_placer: Placer, 
                trap_placer: Placer, 
                wall_placer: Placer)
    {
        this.rows = rows;
        this.cols = cols;
        this.dot_placer = dot_placer;
        this.food_placer = food_placer;
        this.trap_placer = trap_placer;
        this.wall_placer = wall_placer;
        this.dot_map = this.dot_placer.init(this.rows, this.cols);
        this.food_map = this.food_placer.init(this.rows, this.cols);
        this.trap_map = this.trap_placer.init(this.rows, this.cols);
        this.wall_map = this.wall_placer.init(this.rows, this.cols);
        this.remove_objects_in_walls();
    }

    update()
    {
        // Update the dot map with the dot placer.
        this.dot_placer.update(this.dot_map);
        // Update the food map with the food placer.
        this.food_placer.update(this.food_map);
        // Update the trap map with the trap placer.
        this.trap_placer.update(this.trap_map);
        // Update all the maps with the wall placer.
        this.wall_placer.update(this.wall_map);
        // Fix placer updates.
        this.remove_objects_in_walls();
        // Move all the dots, subtract size from trapped dots, and remove resulting dead dots.
        // Simulate combat for all dots, reward the victors with nourishment, remove resulting dead dots, 
        // consume food, and split.
        this.fight_feed(this.move_trap_split());
    }

    remove_objects_in_walls()
    {
        for (let pos in this.wall_map)
        {
            delete this.dot_map[pos];
            delete this.food_map[pos];
            delete this.trap_map[pos];
        }
    }

    get_new_pos(r: number, c: number): string
    {
        if (r < 0)
        {
            r += this.rows;
        }
        else if (r >= this.rows)
        {
            r -= this.rows;
        }
        if (c < 0)
        {
            c += this.cols;
        }
        else if (c >= this.cols)
        {
            c -= this.cols;
        }
        return(r + "," + c);
    }

    add_to_stack(dot: Dot, pos: string, 
                 stacks: Record<string, Dot[]>, 
                 max_sizes: Record<string, number>, 
                 sizes: Record<string, number>) : void
    {
        if (pos in stacks)
        {
            stacks[pos].push(dot);
            max_sizes[pos] += dot.genome.max_size;
            sizes[pos] += dot.size;
        }
        else
        {
            stacks[pos] = [dot];
            max_sizes[pos] = dot.genome.max_size;
            sizes[pos] = dot.size;
        }
    }

    move_trap_split(): [Record<string, Dot[]>, Record<string, number>, Record<string, number>]
    {
        // The dot stacks for the results of moving and trapping.
        let dot_stacks:Record<string, Dot[]> = {};
        let stack_max_sizes:Record<string, number> = {};
        let stack_sizes:Record<string, number> = {};
        // Move each dot.
        for (let pos in this.dot_map)
        {
            // Create the dot move input.
            let [r, c]: number[] = pos.split(",").map(Number);
            let dot: Dot = this.dot_map[pos];
            let view_dim: number = Math.floor(dot.genome.view);
            let input_length: number = (view_dim * 2 + 1) * (view_dim * 2 + 1) * 5;
            let input_shape: number[] = [1, input_length];
            let input: any = ndarray(new Float64Array(input_length), input_shape);
            let count: number = 0;
            for (let dr: number = -Math.floor(dot.genome.view); dr <= Math.floor(dot.genome.view); dr++)
            {
                for (let dc: number = -Math.floor(dot.genome.view); dc <= Math.floor(dot.genome.view); dc++)
                {
                    let new_pos: string = this.get_new_pos(r + dr, c + dc)
                    let values: (number | undefined)[] = [this.dot_map[new_pos].signal,
                                                          this.dot_map[new_pos].genome.max_size,
                                                          this.food_map[new_pos],
                                                          this.trap_map[new_pos],
                                                          this.wall_map[new_pos]]
                    for (let value of values)
                    {
                        input.set(1, count, value === undefined ? 0 : value);
                        count++;
                    }
                }
            }
            // Get the dot's move
            let [dr, dc]: number[] = dot.move(input);
            let new_pos = this.get_new_pos(r + dr, c + dc)
            // Check if the dot can move
            if (new_pos in this.wall_map)
            {
                new_pos = r + "," + c;
            }
            // Check if the dot can be damaged by a trap
            if (new_pos in this.trap_map)
            {
                dot.trap(this.trap_map[new_pos])
            }
            // Add the dot to the dot stacks.
            if (dot.size > 0)
            {
                this.add_to_stack(dot, new_pos, dot_stacks, stack_max_sizes, stack_sizes);
                // Split the dot and add it to the dot stacks.
                let split_dot: Dot | null = dot.split();
                if (split_dot != null)
                {
                    let options: string[] = []
                    for (let dr = -1; dr <= 1; dr++)
                    {
                        for (let dc = -1; dc <= 1; dc++)
                        {
                            let split_opt: string = this.get_new_pos(r + dr, c + dc);
                            options.push(split_opt)
                        }
                    }
                    let split_pos: string = options[Math.floor(Math.random() * options.length)];
                    this.add_to_stack(split_dot, split_pos, dot_stacks, stack_max_sizes, stack_sizes);
                }
                
            }
        }
        return [dot_stacks, stack_max_sizes, stack_sizes];
    }

    fight_feed([dot_stacks, stack_max_sizes, stack_sizes]: 
               [Record<string, Dot[]>, Record<string, number>, Record<string, number>]): void
    {
        // The new dot map for the results of fighting, feeding, and splitting.
        let new_dot_map: Record<string, Dot> = {};
        for (let pos in dot_stacks)
        {
            if (dot_stacks[pos].length > 1)
            {
                // Determine which dot wins the fight.
                let lottery: number = Math.random() * stack_max_sizes[pos];
                let sum: number = 0;
                for (let dot of dot_stacks[pos])
                {
                    if ((lottery >= sum) && (lottery < (sum + dot.genome.max_size)))
                    {
                        // Reward the victor with sustinance.
                        dot.size += (stack_sizes[pos] - dot.size) * (1 - dot.genome.eat_ratio);
                        dot_stacks[pos] = [dot];
                        break;
                    }
                    sum += dot.genome.max_size;
                }
            }
            let dot: Dot = dot_stacks[pos][0];
            // Feed the dot.
            if (pos in this.food_map)
            {
                dot.size += this.food_map[pos] * dot.genome.eat_ratio;
                delete this.food_map[pos];
            }
            // Add the dot to the new dot map.
            new_dot_map[pos] = dot;
        }
        // Replace the old dot map with the new dot map
        this.dot_map = new_dot_map;
    }
}