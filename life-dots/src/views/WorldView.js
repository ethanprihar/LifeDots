import React from "react";

import CellView from "./CellView";
import DotView from "./DotView";

import RandomStart from "../models/DotPlacers/RandomStart"
import RandomRain from "../models/FoodPlacers/RandomRain"
import CenterPit from "../models/TrapPlacers/CenterPit"
import Border from "../models/WallPlacers/Border"
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
        let dot_placer = new RandomStart(dot_num, 
                                         min_ally_min, max_ally_min, 
                                         min_ally_max, max_ally_max, 
                                         min_team_num, max_team_num, 
                                         min_max_size, max_max_size, 
                                         min_baby_frac, max_baby_frac, 
                                         min_eat_ratio, max_eat_ratio, 
                                         min_speed, max_speed, 
                                         min_view, max_view, 
                                         min_max_mut_pct, max_max_mut_pct);
        let food_placer = new RandomRain(20, 5, 50);
        let trap_placer = new CenterPit(Math.floor(Math.min(rows, cols) * 0.45), 10);
        let wall_placer = new Border(1);
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
        for (let r = 0; r < this.state.world.rows; r++)
        {
            for (let c = 0; c < this.state.world.cols; c++)
            {
                let wall_value = this.state.world.wall_grid.get(r,c);
                let trap_value = this.state.world.trap_grid.get(r,c);
                let food_value = this.state.world.food_grid.get(r,c);
                components.push(<CellView wall_value={wall_value} 
                                    trap_value={trap_value} 
                                    food_value={food_value}
                                    cell_row={r}
                                    cell_col={c}
                                    cell_size={30}/>);
                for (let dot of this.state.world.dot_grid[r][c])
                {
                    let dot_color = dot.color;
                    components.push(<DotView dot_color={dot_color}
                                             dot_row={r}
                                             dot_col={c}
                                             dot_size={30}/>);
                }
            }
        }
        
        return (<div>{components}</div>);
    }
}
