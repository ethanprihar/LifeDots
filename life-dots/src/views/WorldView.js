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

export default class WorldView extends React.Component
{   
    constructor(props)
    {
        super(props)
        let rows = 30;
        let cols = 30;
        let dot_num = 20;
        let min_ally_min = 0;
        let max_ally_min = 100;
        let min_ally_max = 0;
        let max_ally_max = 100;
        let min_team_num = 0;
        let max_team_num = 10;
        let min_max_size = 10;
        let max_max_size = 100;
        let min_baby_frac = 0.1;
        let max_baby_frac = 0.9;
        let min_eat_ratio = 0;
        let max_eat_ratio = 1;
        let min_speed = 0;
        let max_speed = 10;
        let min_view = 1;
        let max_view = 1;
        let min_max_mut_pct = 0.01;
        let max_max_mut_pct = 0.1;
        let dot_placer = new RandomDots(dot_num, 
                                        min_ally_min, max_ally_min, 
                                        min_ally_max, max_ally_max, 
                                        min_team_num, max_team_num, 
                                        min_max_size, max_max_size, 
                                        min_baby_frac, max_baby_frac, 
                                        min_eat_ratio, max_eat_ratio, 
                                        min_speed, max_speed, 
                                        min_view, max_view, 
                                        min_max_mut_pct, max_max_mut_pct);
        let food_placer = new RandomFood(20, 5, 50);
        let trap_placer = new CenterTrap(Math.floor(Math.min(rows, cols) * 0.45), 10);
        let wall_placer = new BorderWall(1);
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
        let components = [];
        for (let pos in this.state.world.wall_map)
        {
            let [r, c] = pos.split(",").map(Number);
            components.push(<WallView cell_row={r}
                                      cell_col={c}
                                      cell_size={30}/>);
        }
        for (let pos in this.state.world.trap_map)
        {
            let [r, c] = pos.split(",").map(Number);
            components.push(<TrapView cell_row={r}
                                      cell_col={c}
                                      cell_size={30}/>);
        }
        for (let pos in this.state.world.food_map)
        {
            let [r, c] = pos.split(",").map(Number);
            components.push(<FoodView cell_row={r}
                                      cell_col={c}
                                      cell_size={30}/>);
        }
        for (let pos in this.state.world.dot_map)
        {
            let [r, c] = pos.split(",").map(Number);
            let dot_color = this.state.world.dot_map[pos].color;
            components.push(<DotView dot_color={dot_color}
                                        dot_row={r}
                                        dot_col={c}
                                        dot_size={30}/>);
        }
        return (<div>{components}</div>);
    }
}