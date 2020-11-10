import React from "react";

import World from "../models/World"
import RandomDots from "../models/placers/RandomDots"
import RandomFood from "../models/placers/RandomFood"
import RandomTrap from "../models/placers/RandomTrap"
import RandomWall from "../models/placers/RandomWall"
import Dot from "../models/Dot"
import Genome from "../models/Genome"
var ndarray = require("ndarray");
var LZString = require("lz-string")
var localforage = require("localforage")

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
    constructor(props)
    {
        super(props);
        this.state = 
        {
            loading: "init", 
            tick_time: -1,
            cell_size: -1,
            world: "",
        };
        this.load_world = this.load_world.bind(this);
    }
    
    load_world(err, value)
    {
        try
        {
            let saved_state = JSON.parse(LZString.decompressFromUTF16(value));
            let world = Object.assign(new World(), saved_state.world);
            world.dot_placer = Object.assign(new RandomDots(), world.dot_placer);
            world.food_placer = Object.assign(new RandomFood(), world.food_placer);
            world.trap_placer = Object.assign(new RandomTrap(), world.trap_placer);
            world.wall_placer = Object.assign(new RandomWall(), world.wall_placer);
            for (let pos in world.dot_map)
            {
                world.dot_map[pos] = Object.assign(new Dot(), world.dot_map[pos]);
                world.dot_map[pos].genome = Object.assign(new Genome(), world.dot_map[pos].genome);
                world.dot_map[pos].genome.weights = ndarray(new Float64Array(Object.values(world.dot_map[pos].genome.weights.data)), world.dot_map[pos].genome.weights.shape);
            }
            this.setState({loading: "complete",
                           tick_time: saved_state.tick_time, 
                           cell_size: saved_state.cell_size,               
                           world: world,});
        }
        catch
        {
            this.setState({loading: "failed",});
        }
    }

    componentDidMount()
    {
        this.setState({loading: "true"})
        localforage.getItem('world', this.load_world);
    }
    
    render()
    {
        if (this.state.loading === "complete")
        {
            return(
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
                    <button style={button_style} onClick={() => this.props.setPage("Start", this.state.tick_time, this.state.cell_size, this.state.world)}>
                        Resume
                    </button>
                </div>
            );
        }
        else
        {
            return(
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
}