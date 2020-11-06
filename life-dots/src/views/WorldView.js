import React from "react";

import DotView from "./DotView";
import FoodView from "./FoodView";
import TrapView from "./TrapView";
import WallView from "./WallView";

import RandomDots from "../models/placers/RandomDots"
import RandomFood from "../models/placers/RandomFood"
import CenterTrap from "../models/placers/CenterTrap"
import BorderWall from "../models/placers/BorderWall"
import World from "../models/World"
import Placer from "../models/Placer";

export default class WorldView extends React.Component
{   
    constructor(props)
    {
        super(props)
        let rows = 66;
        let cols = 170;
        let dot_num = 20;
        let min_max_size = 10;
        let max_max_size = 100;
        let min_split_frac = 0.1;
        let max_split_frac = 0.9;
        let min_eat_ratio = 0;
        let max_eat_ratio = 1;
        let min_speed = 0;
        let max_speed = 10;
        let min_view = 5;
        let max_view = 5;
        let min_max_mut_pct = 0.01;
        let max_max_mut_pct = 0.1;
        let dot_placer = new RandomDots(dot_num,  
                                        min_max_size, max_max_size, 
                                        min_split_frac, max_split_frac, 
                                        min_eat_ratio, max_eat_ratio, 
                                        min_speed, max_speed, 
                                        min_view, max_view, 
                                        min_max_mut_pct, max_max_mut_pct);
        let food_placer = new RandomFood(25, 200, 50);
        let trap_placer = new Placer() //new CenterTrap(Math.floor(Math.min(rows, cols) * 0.45), 10);
        let wall_placer = new Placer() //BorderWall(1);
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
        this.interval = setInterval(() => this.setState({world: this.update_world()}), 1);
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