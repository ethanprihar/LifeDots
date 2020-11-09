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
        this.local_storage = window.localStorage;
        this.warned = "no";
        this.auto_save()
    }

    update_world()
    {
        this.state.world.update()
        return this.state.world
    }

    componentDidMount()
    {
        this.world_interval = setInterval(() => this.setState({world: this.update_world()}), this.state.tick_time);
        this.save_interval = setInterval(() => this.auto_save(), 30000);
    }

    componentWillUnmount()
    {
        clearInterval(this.world_interval);
        clearInterval(this.save_interval);
    }

    auto_save()
    {
        let save_string = JSON.stringify(this.state);
        if (save_string.length < 5000000)
        {
            this.local_storage.setItem("world_2.0", JSON.stringify(this.state));
        }
        else if (this.warned === "no")
        {
            alert("This world is currently too large to save in local storage. Every 30 seconds another save will be attempted, but this will be your only alert.");
            this.warned = "yes";
        }
    }
    
    render()
    {
        const trap_min = this.state.world.trap_placer.min_trap_damage;
        const trap_max = this.state.world.trap_placer.max_trap_damage * 2;
        const food_min = this.state.world.food_placer.min_food_per_drop;
        const food_max = this.state.world.food_placer.max_food_per_drop * 2;
        const dot_min = this.state.world.dot_placer.min_max_size;
        const dot_max = this.state.world.dot_placer.max_max_size;
        
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