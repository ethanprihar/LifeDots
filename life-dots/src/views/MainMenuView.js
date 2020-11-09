import React from "react";

import World from "../models/World"
import RandomDots from "../models/placers/RandomDots"
import RandomFood from "../models/placers/RandomFood"
import RandomTrap from "../models/placers/RandomTrap"
import RandomWall from "../models/placers/RandomWall"
import Dot from "../models/Dot"
import Genome from "../models/Genome"
var ndarray = require("ndarray");

const main_menu_style = 
{
    textAlign: "center",
}

const text_style = 
{
    fontSize: "20vh",
    marginTop: "10vh",
    marginBottom: "5vh",
}

const button_style = 
{
    borderRadius: "1vh",
    height: "15vh",
    width: "30vh",
    marginBottom: "5vh",
    marginLeft: "5vh",
    marginRight: "5vh",
    color: "#b3b3b3",
    backgroundColor: "#000000",
    fontSize: "5vh",
    border: "2px solid #b3b3b3",
}

const disabled_style = 
{
    borderRadius: "1vh",
    height: "15vh",
    width: "30vh",
    marginBottom: "5vh",
    marginLeft: "5vh",
    marginRight: "5vh",
    color: "#b3b3b3",
    backgroundColor: "#555555",
    fontSize: "5vh",
    border: "2px solid #b3b3b3",
}

export default class MainMenuView extends React.Component
{   
    render()
    {
        let local_storage = window.localStorage;
        let saved_state = local_storage.getItem("world_2.0");
        if (saved_state != null)
        {
            saved_state = JSON.parse(saved_state);
            let world = Object.assign(new World(), saved_state.world);
            world.dot_placer = Object.assign(new RandomDots(), world.dot_placer);
            world.food_placer = Object.assign(new RandomFood(), world.food_placer);
            world.trap_placer = Object.assign(new RandomTrap(), world.trap_placer);
            world.wall_placer = Object.assign(new RandomWall(), world.wall_placer);
            for (let pos in world.dot_map)
            {
                world.dot_map[pos] = Object.assign(new Dot(0, new Genome()), world.dot_map[pos]);
                world.dot_map[pos].genome = Object.assign(new Genome(), world.dot_map[pos].genome);
                world.dot_map[pos].genome.weights = ndarray(new Float64Array(Object.values(world.dot_map[pos].genome.weights.data)), world.dot_map[pos].genome.weights.shape);
            }
            return (
                <div style={main_menu_style}>
                    <p style={text_style}>Life Dots</p>
                    <br></br>
                    <button style={button_style} onClick={() => this.props.setPage("About")}>
                        About
                    </button>
                    <button style={button_style} onClick={() => this.props.setPage("Setup")}>
                        Setup
                    </button>
                    <br></br>
                    <button style={button_style} onClick={() => this.props.setPage("Start", saved_state.tick_time, saved_state.cell_size, world)}>
                        Resume
                    </button>
                </div>
            );
        }
        return (
        <div style={main_menu_style}>
            <p style={text_style}>Life Dots</p>
            <br></br>
            <button style={button_style} onClick={() => this.props.setPage("About")}>
                About
            </button>
            <button style={button_style} onClick={() => this.props.setPage("Setup")}>
                Setup
            </button>
            <br></br>
            <button style={disabled_style}>
                Resume
            </button>
        </div>
        );
    }
}