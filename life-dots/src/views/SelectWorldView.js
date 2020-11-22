import React from "react";
import ReactModal from 'react-modal';

import RandomDots from "../models/placers/RandomDots"
import RandomFood from "../models/placers/RandomFood"
import RandomTrap from "../models/placers/RandomTrap"
import RandomWall from "../models/placers/RandomWall"
import World from "../models/World"
import Dot from "../models/Dot";
import Genome from "../models/Genome";

var ndarray = require("ndarray");
var JsonPorter = require('json-porter').default;

const form_style = 
{
    position: "center",
    textAlign: "center",
    color: "#b3b3b3",
    margin: "2%"
}

const title_style = 
{
    color: "#b3b3b3",
    fontSize: "30px",
    margin: "0",
    marginBottom: "10px",
    padding: "0",
}

const input_style = 
{
    color: '#b3b3b3',
    backgroundColor: "#000000",
    border: "2px solid #b3b3b3",
    borderRadius: "3px",
    width: "80%",
    fontSize: "20px",
}

const button_style = 
{
    borderRadius: "1vh",
    height: "7vh",
    width: "20vh",
    marginLeft: "1.25vh",
    marginRight: "1.25vh",
    marginTop: "2.5vh",
    color: "#b3b3b3",
    backgroundColor: "#000000",
    fontSize: "4vh",
    border: "0.25vh solid #b3b3b3",
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
        top: '27%',
        left: '22%',
        right: '22%',
        bottom: 'auto',
        border: "0.25vh solid #b3b3b3",
        backgroundColor: "#000000",
        borderRadius: "2vh",
    },
}

export default class SelectWorldView extends React.Component
{
    constructor(props)
    {
        super(props);
        let saves = localStorage.getItem("config_saves");
        saves = saves === null ? {} : JSON.parse(saves);
        this.state = 
        {
            selection: Object.keys(saves)[0],
            show_confirm: false,
            confirmed: false,
            saves: saves,
            pressed: ""
        };
    }

    key_press = (event) =>
    {
        // Do nothing when enter is pressed.
        if (event.which === 13)
        {
            event.preventDefault();
        }
    }

    change_input = (event) =>
    {
        this.setState({selection: event.target.value});
    }

    start = (event) =>
    {   
        event.preventDefault();
        this.setState({pressed: "start", show_confirm: true});
    }

    import = (event) =>
    {
        event.preventDefault();
        this.setState({pressed: "import", show_confirm: true});
    }

    set_world = (saved_state) =>
    {
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
        this.props.setPage("Start", saved_state.tick_time, saved_state.cell_size, world);
    }

    confirm = (event) =>
    {
        event.preventDefault()
        if (this.state.pressed === "start")
        {
            let config = this.state.saves[this.state.selection];
            const rows = Math.floor(window.innerHeight / config.cell_size);
            const cols = Math.floor(window.innerWidth / config.cell_size);
            let dot_placer = new RandomDots(config.dot_num,  
                                            config.min_max_size, 
                                            config.max_max_size, 
                                            config.min_split_frac / 100, 
                                            config.max_split_frac / 100, 
                                            config.min_eat_ratio / 100, 
                                            config.max_eat_ratio / 100, 
                                            config.min_speed, 
                                            config.max_speed, 
                                            config.min_view, 
                                            config.max_view, 
                                            config.min_max_mut_pct / 100, 
                                            config.max_max_mut_pct / 100, 
                                            config.reset_on_extinction);
            let food_placer = new RandomFood(config.funiform,
                                            config.ticks_between_rain, 
                                            config.drops_per_rain, 
                                            config.min_drop_size, 
                                            config.max_drop_size,
                                            config.min_food_per_drop, 
                                            config.max_food_per_drop, 
                                            config.delta_ticks_between_rain, 
                                            config.delta_drops_per_rain, 
                                            config.delta_min_drop_size, 
                                            config.delta_max_drop_size, 
                                            config.delta_min_food_per_drop, 
                                            config.delta_max_food_per_drop, 
                                            config.phase_length, 
                                            config.will_cycle);
            let trap_placer = new RandomTrap(config.tuniform, 
                                            config.trap_num, 
                                            config.min_trap_size, 
                                            config.max_trap_size, 
                                            config.min_trap_damage, 
                                            config.max_trap_damage)
            let wall_placer = new RandomWall(config.section_rows, 
                                            config.section_cols, 
                                            config.density / 100);
            let world = new World(rows, cols, dot_placer, food_placer, trap_placer, wall_placer);
            world.init()
            this.props.setPage("Start", config.tick_time, config.cell_size, world);
        }
        else if (this.state.pressed === "import")
        {
            let jp = new JsonPorter();
            jp.import().then(this.set_world);
        }
    }

    no_confirm = (event) =>
    {
        event.preventDefault()
        this.setState({show_confirm: false});
    }

    make_options(x)
    {
        return <option key={x}>{x}</option>;
    }
    
    render()
    {
        return(
        <div>
            <ReactModal style={modal_style} isOpen={this.state.show_confirm} ariaHideApp={false}>
                <div style={title_style}>
                    Overwrite Existing World Save?
                </div>
                <button style={button_style} onClick={this.no_confirm}>
                    Go Back
                </button>
                <button style={button_style} onClick={this.confirm}>
                    Confirm
                </button>
            </ReactModal>
            <form style={form_style} onChange={this.change_input} onKeyPress={this.key_press}>
                <div style={title_style}>
                    Select A World Configuration:
                </div>
                <select style={input_style} onChange={() => {}} name="selection" value={this.state.selection}>
                    {Object.keys(this.state.saves).map(this.make_options)}
                </select>
                <br></br>
                <button style={button_style} onClick={this.props.close_overlay}>
                    Go Back
                </button>
                <button style={button_style} onClick={this.start}>
                    Start
                </button>
                <button style={button_style} onClick={this.import}>
                    Import
                </button>
            </form>
        </div>
        );
    }
}