import React from "react";

import DotView from "./DotView";
import FoodView from "./FoodView";
import TrapView from "./TrapView";
import WallView from "./WallView";

import RandomDots from "../models/placers/RandomDots"
import RandomFood from "../models/placers/RandomFood"
import RandomTrap from "../models/placers/RandomTrap"
import RandomWall from "../models/placers/RandomWall"
import World from "../models/World"

export default class WorldView extends React.Component
{   
    constructor(props)
    {
        super(props)
        let dot_num = 100;
        let min_max_size = 10;
        let max_max_size = 100;
        let min_split_frac = 0.1;
        let max_split_frac = 0.9;
        let min_eat_ratio = 0;
        let max_eat_ratio = 1;
        let min_speed = 0;
        let max_speed = 10;
        let min_view = 1;
        let max_view = 5;
        let min_max_mut_pct = 0.01;
        let max_max_mut_pct = 0.1;
        let reset_on_extinction = true;
        let dot_placer = new RandomDots(dot_num,  
                                        min_max_size, max_max_size, 
                                        min_split_frac, max_split_frac, 
                                        min_eat_ratio, max_eat_ratio, 
                                        min_speed, max_speed, 
                                        min_view, max_view, 
                                        min_max_mut_pct, max_max_mut_pct, 
                                        reset_on_extinction);
        let funiform = true;
        let ticks_between_rain = 25;
        let drops_per_rain = 50;
        let min_drop_size = 0;
        let max_drop_size = 1;
        let min_food_per_drop = 10;
        let max_food_per_drop = 50;
        let delta_ticks_between_rain = 10;
        let delta_drops_per_rain = -0.9;
        let delta_min_drop_size = 0.1;
        let delta_max_drop_size = 0.2;
        let delta_min_food_per_drop = 0.25
        let delta_max_food_per_drop = 2
        let phase_length = 50;
        let will_cycle = true;
        let food_placer = new RandomFood(funiform,
                                         ticks_between_rain, 
                                         drops_per_rain, 
                                         min_drop_size, 
                                         max_drop_size,
                                         min_food_per_drop, 
                                         max_food_per_drop, 
                                         delta_ticks_between_rain, 
                                         delta_drops_per_rain, 
                                         delta_min_drop_size, 
                                         delta_max_drop_size, 
                                         delta_min_food_per_drop, 
                                         delta_max_food_per_drop, 
                                         phase_length, 
                                         will_cycle);
        let tuniform = true;
        let trap_num = 30;
        let min_trap_size = 0;
        let max_trap_size = 3;
        let min_trap_damage = 1;
        let max_trap_damage = 25;
        let trap_placer = new RandomTrap(tuniform, 
                                         trap_num, 
                                         min_trap_size, 
                                         max_trap_size, 
                                         min_trap_damage, 
                                         max_trap_damage)
        let section_rows = 2;
        let section_cols = 2;
        let density = 0.75;
        let wall_placer = new RandomWall(section_rows, 
                                         section_cols, 
                                         density);
        let rows = 66;
        let cols = 66;
        let world = new World(rows, cols, dot_placer, food_placer, trap_placer, wall_placer)
        this.state = 
        {
            world: world
        }
    }

    update_world()
    {
        this.state.world.update()
        return this.state.world
    }

    componentDidMount()
    {
        this.interval = setInterval(() => this.setState({world: this.update_world()}), 100);
    }

    componentWillUnmount()
    {
        clearInterval(this.interval);
    }
    
    render()
    {
        const cell_size = 15;

        let trap_min = Infinity;
        let trap_max = 0;
        let food_min = Infinity;
        let food_max = 0;
        let dot_min = Infinity;
        let dot_max = 0;
        for (let pos in this.state.world.trap_map)
        {
            if (this.state.world.trap_map[pos] < trap_min)
            {
                trap_min = this.state.world.trap_map[pos];
            }
            if (this.state.world.trap_map[pos] > trap_max)
            {
                trap_max = this.state.world.trap_map[pos];
            }
        }
        for (let pos in this.state.world.food_map)
        {
            if (this.state.world.food_map[pos] < food_min)
            {
                food_min = this.state.world.food_map[pos];
            }
            if (this.state.world.food_map[pos] > food_max)
            {
                food_max = this.state.world.food_map[pos];
            }
        }
        for (let pos in this.state.world.dot_map)
        {
            if (this.state.world.dot_map[pos].genome.max_size < dot_min)
            {
                dot_min = this.state.world.dot_map[pos].genome.max_size;
            }
            if (this.state.world.dot_map[pos].genome.max_size > dot_max)
            {
                dot_max = this.state.world.dot_map[pos].genome.max_size;
            }
        }
        
        let components = [];
        for (let pos in this.state.world.wall_map)
        {
            let [r, c] = pos.split(",").map(Number);
            components.push(<WallView row={r}
                                      col={c}
                                      cell_size={cell_size}
                                      key={"wall" + pos}/>);
        }
        for (let pos in this.state.world.trap_map)
        {
            let [r, c] = pos.split(",").map(Number);
            components.push(<TrapView row={r}
                                      col={c}
                                      trap_min={trap_min}
                                      trap_max={trap_max}
                                      trap_size={this.state.world.trap_map[pos]}
                                      cell_size={cell_size}
                                      key={"trap" + pos}/>);
        }
        for (let pos in this.state.world.food_map)
        {
            let [r, c] = pos.split(",").map(Number);
            components.push(<FoodView row={r}
                                      col={c}
                                      food_min={food_min}
                                      food_max={food_max}
                                      food_size={this.state.world.food_map[pos]}
                                      cell_size={cell_size}
                                      key={"food" + pos}/>);
        }
        for (let pos in this.state.world.dot_map)
        {
            let [r, c] = pos.split(",").map(Number);
            let dot_color = this.state.world.dot_map[pos].genome.color;
            components.push(<DotView dot_color={dot_color}
                                        row={r}
                                        col={c}
                                        dot_min={dot_min}
                                        dot_max={dot_max}
                                        dot_size={this.state.world.dot_map[pos].genome.max_size}
                                        dot_signal={this.state.world.dot_map[pos].signal}
                                        cell_size={cell_size}
                                        key={"dot" + pos}/>);
        }
        return (<div>{components}</div>);
    }
}