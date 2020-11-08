import React from "react";

import DotView from "./DotView";
import FoodView from "./FoodView";
import TrapView from "./TrapView";
import WallView from "./WallView";

export default class WorldView extends React.Component
{   
    constructor(props)
    {
        super(props)
        this.state = 
        {
            tick_time: props.tick_time,
            cell_size: props.cell_size,
            world: props.world,
        }
    }

    update_world()
    {
        this.state.world.update()
        return this.state.world
    }

    componentDidMount()
    {
        this.interval = setInterval(() => this.setState({world: this.update_world()}), this.state.tick_time);
    }

    componentWillUnmount()
    {
        clearInterval(this.interval);
    }
    
    render()
    {
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
                                      cell_size={this.state.cell_size}
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
                                      cell_size={this.state.cell_size}
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
                                      cell_size={this.state.cell_size}
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
                                        cell_size={this.state.cell_size}
                                        key={"dot" + pos}/>);
        }
        return (<div>{components}</div>);
    }
}