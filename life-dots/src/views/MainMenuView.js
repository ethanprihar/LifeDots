import React from "react";
import ReactModal from 'react-modal';

import SelectWorldView from "./SelectWorldView";

import World from "../models/World";
import RandomDots from "../models/placers/RandomDots";
import RandomFood from "../models/placers/RandomFood";
import RandomTrap from "../models/placers/RandomTrap";
import RandomWall from "../models/placers/RandomWall";
import Dot from "../models/Dot";
import Genome from "../models/Genome";

var ndarray = require("ndarray");
var LZString = require("lz-string");
var localforage = require("localforage");

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
    width: "40vh",
    marginBottom: "5vh",
    marginLeft: "2.5vh",
    marginRight: "2.5vh",
    color: "#b3b3b3",
    backgroundColor: "#000000",
    fontSize: "5vh",
    border: "2px solid #b3b3b3",
}

const disabled_style = 
{
    borderRadius: "1vh",
    height: "15vh",
    width: "40vh",
    marginBottom: "5vh",
    marginLeft: "2.5vh",
    marginRight: "2.5vh",
    color: "#b3b3b3",
    backgroundColor: "#555555",
    fontSize: "5vh",
    border: "2px solid #b3b3b3",
}

const buffer =
{
    margin:"10vh"
}

const disclamer =
{
    position: "fixed",
    bottom: "0",
    width: "80%",
    backgroundColor: "#000000",
    color: "#b3b3b3",
    fontSize: "12px",
    paddingBottom: "6px",
    paddingLeft: "10%",
    paddingRight: "10%",
}

const modal_style = 
{
    overlay: 
    {
        backgroundColor: 'rgba(255, 255, 255, 0.25)'
    },
    content: 
    {
        textAlign: "center",
        position: 'absolute',
        top: '25%',
        left: '20%',
        right: '20%',
        bottom: 'auto',
        border: "0.25vh solid #b3b3b3",
        backgroundColor: "#000000",
        borderRadius: "2vh",
    },
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
            overlay: false,
        };
        this.check_configs()
        this.load_world = this.load_world.bind(this);
    }

    check_configs()
    {
        let saves = localStorage.getItem("config_saves");
        saves = saves === null ? {} : JSON.parse(saves);
        if (Object.keys(saves).length === 0)
        {
            let gr_config = 
            {
                cell_size: 15,
                tick_time: 100,
                
                dot_num: 100, 
                min_max_size: 50, 
                max_max_size: 200, 
                min_split_frac: 0, 
                max_split_frac: 100, 
                min_eat_ratio: 0, 
                max_eat_ratio: 100, 
                min_speed: 1, 
                max_speed: 10, 
                min_view: 1, 
                max_view: 1, 
                min_max_mut_pct: 1, 
                max_max_mut_pct: 10, 
                reset_on_extinction: true,

                funiform: false,
                ticks_between_rain: 10, 
                drops_per_rain: 20, 
                min_drop_size: 1, 
                max_drop_size: 1,
                min_food_per_drop: 10, 
                max_food_per_drop: 100, 
                delta_ticks_between_rain: 0, 
                delta_drops_per_rain: 0, 
                delta_min_drop_size: 0, 
                delta_max_drop_size: 0, 
                delta_min_food_per_drop: 0, 
                delta_max_food_per_drop: 0, 
                phase_length: 0, 
                will_cycle: false,

                tuniform: true, 
                trap_num: 5, 
                min_trap_size: 3, 
                max_trap_size: 3, 
                min_trap_damage: 100, 
                max_trap_damage: 100,

                section_rows: 1, 
                section_cols: 1, 
                density: 0,
            };
            saves["Gentle Rain"] = gr_config;
            
            let ff_config =
            {
                cell_size: 15,
                tick_time: 100,
                
                dot_num: 100, 
                min_max_size: 50, 
                max_max_size: 200, 
                min_split_frac: 0, 
                max_split_frac: 100, 
                min_eat_ratio: 0, 
                max_eat_ratio: 100, 
                min_speed: 1, 
                max_speed: 10, 
                min_view: 1, 
                max_view: 1, 
                min_max_mut_pct: 1, 
                max_max_mut_pct: 10, 
                reset_on_extinction: true,

                funiform: true,
                ticks_between_rain: 500, 
                drops_per_rain: 1, 
                min_drop_size: 100, 
                max_drop_size: 100,
                min_food_per_drop: 100, 
                max_food_per_drop: 100, 
                delta_ticks_between_rain: 0, 
                delta_drops_per_rain: 0, 
                delta_min_drop_size: 0, 
                delta_max_drop_size: 0, 
                delta_min_food_per_drop: 0, 
                delta_max_food_per_drop: 0, 
                phase_length: 0, 
                will_cycle: false,

                tuniform: true, 
                trap_num: 5, 
                min_trap_size: 1, 
                max_trap_size: 5, 
                min_trap_damage: 100, 
                max_trap_damage: 100,

                section_rows: 1, 
                section_cols: 1, 
                density: 100,
            }
            saves["Flash Flood"] = ff_config;

            let os_config = 
            {
                cell_size: 15,
                tick_time: 100,
                
                dot_num: 100, 
                min_max_size: 10, 
                max_max_size: 1000, 
                min_split_frac: 0, 
                max_split_frac: 100, 
                min_eat_ratio: 0, 
                max_eat_ratio: 100, 
                min_speed: 1, 
                max_speed: 10, 
                min_view: 1, 
                max_view: 5, 
                min_max_mut_pct: 1, 
                max_max_mut_pct: 10, 
                reset_on_extinction: true,

                funiform: true,
                ticks_between_rain: 10, 
                drops_per_rain: 20, 
                min_drop_size: 1, 
                max_drop_size: 1,
                min_food_per_drop: 1, 
                max_food_per_drop: 10, 
                delta_ticks_between_rain: 1, 
                delta_drops_per_rain: -0.1, 
                delta_min_drop_size: 0.1, 
                delta_max_drop_size: 0.1, 
                delta_min_food_per_drop: 1, 
                delta_max_food_per_drop: 1, 
                phase_length: 1000, 
                will_cycle: false,

                tuniform: true, 
                trap_num: 10, 
                min_trap_size: 2, 
                max_trap_size: 5, 
                min_trap_damage: 1, 
                max_trap_damage: 1,

                section_rows: 4, 
                section_cols: 7, 
                density: 90,
            }
            saves["Office Space"] = os_config;
            localStorage.setItem("config_saves", JSON.stringify(saves))
        }
    }

    componentDidMount()
    {
        this.setState({loading: "true"})
        localforage.getItem('world', this.load_world);
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

    open_overlay = () =>
    {
        this.setState({overlay: true});
    }

    close_overlay = () =>
    {
        this.setState({overlay: false});
    }
    
    render()
    {
        return(
            <div style={main_menu_style}>
                <ReactModal style={modal_style} isOpen={this.state.overlay} ariaHideApp={false}>
                    <SelectWorldView close_overlay={this.close_overlay} setPage={this.props.setPage} import={this.import}/>
                </ReactModal>
                <div style={text_style}>
                    Life Dots
                </div>
                <button style={button_style} onClick={this.open_overlay}>
                    New World
                </button>
                <button style={button_style} onClick={() => this.props.setPage("Setup")}>
                    World Builder
                </button>
                <br></br>
                <button style={this.state.loading === "complete" ? button_style : disabled_style} 
                        onClick={this.state.loading === "complete" ? () => this.props.setPage("Start", this.state.tick_time, this.state.cell_size, this.state.world) : () => {}}>
                    Resume World
                </button>
                <button style={button_style} onClick={() => this.props.setPage("About")}>
                    About
                </button>
                <div style={buffer}></div>
                <div style={disclamer}>
                    By using lifedots.net you agree to allow lifedots.net to save world content in 
                    your browser, to not monetize content from lifedots.net without explicit permission 
                    from the creator of lifedots.net, and to not hold the creator of lifedots.net 
                    accountable for anything.
                </div>
            </div>
        );
    }
}