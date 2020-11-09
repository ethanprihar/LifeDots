import React from "react";

import RandomDots from "../models/placers/RandomDots"
import RandomFood from "../models/placers/RandomFood"
import RandomTrap from "../models/placers/RandomTrap"
import RandomWall from "../models/placers/RandomWall"
import World from "../models/World"

const setup_style = 
{
    textAlign: "center",
    paddingTop: "5vh",
    marginBottom: "25vh",
}

const title_style = 
{
    fontSize: "10vh",
}

const subtitle_style = 
{
    fontSize: "5vh",
    marginBottom: "3vh",
}

const form_style = 
{
    marginBottom: "7vh",
}

const config_button_style = 
{
    borderRadius: "1vh",
    height: "10vh",
    width: "30vh",
    marginLeft: "2vh",
    marginRight: "2vh",
    marginTop: "2vh",
    color: "#b3b3b3",
    backgroundColor: "#000000",
    fontSize: "4vh",
    border: "2px solid #b3b3b3",
}

const table_style = 
{
    width: "90vw",
    margin: "auto",
    fontSize: "20px",
}

const label_entry = 
{
    textAlign: "right",
    width: "25%",

}

const input_entry = 
{
    textAlign: "left",
    width: "25%",

}

const input_style = 
{
    color: '#b3b3b3',
    backgroundColor: "#000000",
    border: "2px solid #b3b3b3",
    borderRadius: "3px",
    width: "10vw"
}

const button_style = 
{
    borderRadius: "1vh",
    height: "10vh",
    width: "30vh",
    marginLeft: "2.5vh",
    marginRight: "2.5vh",
    marginBottom: "2.5vh",
    color: "#b3b3b3",
    backgroundColor: "#000000",
    fontSize: "4vh",
    border: "2px solid #b3b3b3",
}

const footer_style = 
{
    color: "#b3b3b3",
    backgroundColor: "#000000",
    borderTop: "2px solid #b3b3b3",
    position: "fixed",
    left: "0",
    bottom: "0",
    paddingTop: "1vh",
    width: "100vw",
    height: "18vh",
    overflowY: "scroll",
    overflowX: "auto",
}

const warning_style = 
{
    color: "#b3b3b3",
    backgroundColor: "#000000",
    fontSize: "3vh",
    textAlign: "center",
    paddingBottom: "1.5vh",
}

export default class SetupView extends React.Component
{   
    constructor(props)
    {
        super(props);
        this.state = 
        {
            cell_size: 15,
            tick_time: 100,
            
            dot_num: 100, 
            min_max_size: 50, 
            max_max_size: 200, 
            min_split_frac: 0, 
            max_split_frac: 1, 
            min_eat_ratio: 0, 
            max_eat_ratio: 1, 
            min_speed: 1, 
            max_speed: 10, 
            min_view: 1, 
            max_view: 1, 
            min_max_mut_pct: 0.01, 
            max_max_mut_pct: 0.1, 
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
        }

        this.change_input = this.change_input.bind(this);
    }

    change_input(event)
    {
        const name = event.target.name;
        let value = event.target.valueAsNumber;
        if(value === undefined)
        {
            this.setState({[name]: event.target.value === "true"});
        }
        else
        {
            this.setState({[name]: value});
            if (name.startsWith("min_") && (this.state["max" + name.substring(3)] < value))
            {
                this.setState({["max" + name.substring(3)]: value});
            }
            if (name.startsWith("max_") && (this.state["min" + name.substring(3)] > value))
            {
                this.setState({["min" + name.substring(3)]: value});
            }
        }
    }

    key_press(event)
    {
        // Do nothing when enter is pressed.
        if (event.which === 13)
        {
            event.preventDefault();
        }
    }

    gentle_rain = (event) =>
    {
        event.preventDefault()
        this.setState(
            {
                dot_num: 100, 
                min_max_size: 50, 
                max_max_size: 200, 
                min_split_frac: 0, 
                max_split_frac: 1, 
                min_eat_ratio: 0, 
                max_eat_ratio: 1, 
                min_speed: 1, 
                max_speed: 10, 
                min_view: 1, 
                max_view: 1, 
                min_max_mut_pct: 0.01, 
                max_max_mut_pct: 0.1, 
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
            }
        );
    }

    flash_flood = (event) =>
    {
        event.preventDefault()
        this.setState(
            {
                dot_num: 100, 
                min_max_size: 50, 
                max_max_size: 200, 
                min_split_frac: 0, 
                max_split_frac: 1, 
                min_eat_ratio: 0, 
                max_eat_ratio: 1, 
                min_speed: 1, 
                max_speed: 10, 
                min_view: 1, 
                max_view: 1, 
                min_max_mut_pct: 0.01, 
                max_max_mut_pct: 0.1, 
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
                density: 1,
            }
        );
    }

    office_space = (event) =>
    {
        event.preventDefault()
        this.setState(
            {
                dot_num: 100, 
                min_max_size: 10, 
                max_max_size: 1000, 
                min_split_frac: 0, 
                max_split_frac: 1, 
                min_eat_ratio: 0, 
                max_eat_ratio: 1, 
                min_speed: 1, 
                max_speed: 10, 
                min_view: 1, 
                max_view: 5, 
                min_max_mut_pct: 0.01, 
                max_max_mut_pct: 0.1, 
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

                section_rows: 2, 
                section_cols: 2, 
                density: 0.9,
            }
        );
    }
    
    submit = (event) =>
    {   
        event.preventDefault();
        const rows = Math.floor(window.innerHeight / this.state.cell_size);
        const cols = Math.floor(window.innerWidth / this.state.cell_size);
        let dot_placer = new RandomDots(this.state.dot_num,  
                                        this.state.min_max_size, 
                                        this.state.max_max_size, 
                                        this.state.min_split_frac, 
                                        this.state.max_split_frac, 
                                        this.state.min_eat_ratio, 
                                        this.state.max_eat_ratio, 
                                        this.state.min_speed, 
                                        this.state.max_speed, 
                                        this.state.min_view, 
                                        this.state.max_view, 
                                        this.state.min_max_mut_pct, 
                                        this.state.max_max_mut_pct, 
                                        this.state.reset_on_extinction);
        let food_placer = new RandomFood(this.state.funiform,
                                         this.state.ticks_between_rain, 
                                         this.state.drops_per_rain, 
                                         this.state.min_drop_size, 
                                         this.state.max_drop_size,
                                         this.state.min_food_per_drop, 
                                         this.state.max_food_per_drop, 
                                         this.state.delta_ticks_between_rain, 
                                         this.state.delta_drops_per_rain, 
                                         this.state.delta_min_drop_size, 
                                         this.state.delta_max_drop_size, 
                                         this.state.delta_min_food_per_drop, 
                                         this.state.delta_max_food_per_drop, 
                                         this.state.phase_length, 
                                         this.state.will_cycle);
        let trap_placer = new RandomTrap(this.state.tuniform, 
                                         this.state.trap_num, 
                                         this.state.min_trap_size, 
                                         this.state.max_trap_size, 
                                         this.state.min_trap_damage, 
                                         this.state.max_trap_damage)
        let wall_placer = new RandomWall(this.state.section_rows, 
                                         this.state.section_cols, 
                                         this.state.density);
        let world = new World(rows, cols, dot_placer, food_placer, trap_placer, wall_placer);
        world.init();
        this.props.setPage("Start", this.state.tick_time, this.state.cell_size, world);
    }
    
    render()
    {
        return (
        <div style={setup_style}>
            <span style={title_style}>World Setup</span>
            <br></br>
            <form id="config" style={form_style} onChange={this.change_input} onKeyPress={this.key_press} onSubmit={this.submit}>
                <p style={subtitle_style}>World Configuration</p>
                <table style={table_style}>
                    <tr>
                        <td style={label_entry}>
                            Cell Size (Pixel Width):
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="cell_size" 
                            value={this.state.cell_size} 
                            type="number" min="5" max="99999" required/>
                        </td>
                        <td style={label_entry}>
                            Minimum Tick Time (Milliseconds):
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="tick_time" 
                            value={this.state.tick_time} 
                            type="number" min="1" max="99999" required/>
                        </td>
                    </tr>
                </table>

                <p style={subtitle_style}>Preset Configurations</p>
                <button style={config_button_style} onClick={this.gentle_rain}>
                    Gentle Rain
                </button>
                <button style={config_button_style} onClick={this.flash_flood}>
                    Flash Flood
                </button>
                <button style={config_button_style} onClick={this.office_space}>
                    Office Space
                </button>
                
                <p style={subtitle_style}>Dot Configuration</p>
                <table style={table_style}>
                    <tr>
                        <td style={label_entry}>
                            Starting Dots:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="dot_num" 
                            value={this.state.dot_num} 
                            type="number" min="1" max="99999" required/>
                        </td>
                        <td style={label_entry}>
                            Spawn More Dots Upon Extinction:
                        </td>
                        <td style={input_entry}>
                            <select style={input_style}
                            name="reset_on_extinction" 
                            value={this.state.reset_on_extinction}>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Minimum Dot Size:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="min_max_size" 
                            value={this.state.min_max_size} 
                            type="number" min="0" max="99999" required/>
                        </td>
                        <td style={label_entry}>
                            Maximum Dot Size:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="max_max_size" 
                            value={this.state.max_max_size} 
                            type="number" min="0" max="99999" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Minimum Split Fraction:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="min_split_frac" 
                            value={this.state.min_split_frac} 
                            type="number" min="0" max="1" step="0.0001" required/>
                        </td>
                        <td style={label_entry}>
                            Maximum Split Fraction:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="max_split_frac" 
                            value={this.state.max_split_frac} 
                            type="number" min="0" max="1" step="0.0001" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Minimum Food Absorbtion:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="min_eat_ratio" 
                            value={this.state.min_eat_ratio} 
                            type="number" min="0" max="1" step="0.0001" required/>
                        </td>
                        <td style={label_entry}>
                            Maximum Food Absorbtion:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="max_eat_ratio" 
                            value={this.state.max_eat_ratio} 
                            type="number" min="0" max="1" step="0.0001" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Minimum Speed:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="min_speed" 
                            value={this.state.min_speed} 
                            type="number" min="1" max="99999" required/>
                        </td>
                        <td style={label_entry}>
                            Maximum Speed:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="max_speed" 
                            value={this.state.max_speed} 
                            type="number" min="0" max="99999" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Minimum Perception:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="min_view" 
                            value={this.state.min_view} 
                            type="number" min="1" max="99999" required/>
                        </td>
                        <td style={label_entry}>
                            Maximum Perception:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="max_view" 
                            value={this.state.max_view} 
                            type="number" min="1" max="99999" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Minimum Mutation Rate:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="min_max_mut_pct" 
                            value={this.state.min_max_mut_pct} 
                            type="number" min="0" max="99999" step="0.0001" required/>
                        </td>
                        <td style={label_entry}>
                            Maximum Mutation Rate:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="max_max_mut_pct" 
                            value={this.state.max_max_mut_pct} 
                            type="number"  min="0" max="99999" step="0.0001" required/>
                        </td>
                    </tr>
                </table>

                <p style={subtitle_style}>Food Configuration</p>
                <table style={table_style}>
                    <tr>
                        <td style={label_entry}>
                            Distribution:
                        </td>
                        <td style={input_entry}>
                            <select style={input_style}
                            name="funiform" 
                            value={this.state.funiform}>
                                <option value={true}>Uniform</option>
                                <option value={false}>Normal</option>
                            </select>
                        </td>
                        <td style={label_entry}>
                            Food Distribution Cycle:
                        </td>
                        <td style={input_entry}>
                            <select style={input_style}
                            name="will_cycle" 
                            value={this.state.will_cycle}>
                                <option value={true}>On</option>
                                <option value={false}>Off</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Ticks Between Spawn:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="ticks_between_rain" 
                            value={this.state.ticks_between_rain} 
                            type="number" min="0" max="99999" required/>
                        </td>
                        <td style={label_entry}>
                            Drops Per Spawn:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="drops_per_rain" 
                            value={this.state.drops_per_rain} 
                            type="number" min="0" max="99999" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Minimum Spawn Size:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="min_drop_size" 
                            value={this.state.min_drop_size} 
                            type="number" min="0" max="99999" required/>
                        </td>
                        <td style={label_entry}>
                            Maximum Spawn Size:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="max_drop_size" 
                            value={this.state.max_drop_size} 
                            type="number" min="0" max="99999" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Minimum Food Per Spawn:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="min_food_per_drop" 
                            value={this.state.min_food_per_drop} 
                            type="number" min="0" max="99999" required/>
                        </td>
                        <td style={label_entry}>
                            Maximum Food Per Spawn:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="max_food_per_drop" 
                            value={this.state.max_food_per_drop} 
                            type="number" min="0" max="99999" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Spawns Per Phase:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="phase_length" 
                            value={this.state.phase_length} 
                            type="number" min="0" max="99999" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Ticks Between Spawn Change:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="delta_ticks_between_rain" 
                            value={this.state.delta_ticks_between_rain} 
                            type="number" min="-99999" max="99999" step="0.0001" required/>
                        </td>
                        <td style={label_entry}>
                            Drops Per Spawn Change:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="delta_drops_per_rain" 
                            value={this.state.delta_drops_per_rain} 
                            type="number" min="-99999" max="99999" step="0.0001" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Minimum Spawn Size Change:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="delta_min_drop_size" 
                            value={this.state.delta_min_drop_size} 
                            type="number" min="-99999" max="99999" step="0.0001" required/>
                        </td>
                        <td style={label_entry}>
                            Maximum Spawn Size Change:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="delta_max_drop_size" 
                            value={this.state.delta_max_drop_size} 
                            type="number" min="-99999" max="99999" step="0.0001" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Minimum Food Per Spawn Change:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="delta_min_food_per_drop" 
                            value={this.state.delta_min_food_per_drop} 
                            type="number" min="-99999" max="99999" required/>
                        </td>
                        <td style={label_entry}>
                            Maximum Food Per Spawn Change:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="delta_max_food_per_drop" 
                            value={this.state.delta_max_food_per_drop} 
                            type="number" min="-99999" max="99999" required/>
                        </td>
                    </tr>
                </table>

                <p style={subtitle_style}>Trap Configuration</p>
                <table style={table_style}>
                    <tr>
                        <td style={label_entry}>
                            Trap Number:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="trap_num" 
                            value={this.state.trap_num} 
                            type="number" min="0" max="99999" required/>
                        </td>
                        <td style={label_entry}>
                            Distribution:
                        </td>
                        <td style={input_entry}>
                            <select style={input_style}
                            name="tuniform" 
                            value={this.state.tuniform}>
                                <option value={true}>Uniform</option>
                                <option value={false}>Normal</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Minimum Trap Size:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="min_trap_size" 
                            value={this.state.min_trap_size} 
                            type="number" min="0" max="99999" required/>
                        </td>
                        <td style={label_entry}>
                            Maximum Trap Size:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="max_trap_size" 
                            value={this.state.max_trap_size} 
                            type="number" min="0" max="99999" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Minimum Trap Damage:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="min_trap_damage" 
                            value={this.state.min_trap_damage} 
                            type="number" min="0" max="99999" required/>
                        </td>
                        <td style={label_entry}>
                            Maximum Trap Damage:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="max_trap_damage" 
                            value={this.state.max_trap_damage} 
                            type="number" min="0" max="99999" required/>
                        </td>
                    </tr>
                </table>

                <p style={subtitle_style}>Wall Configuration</p>
                <table style={table_style}>
                    <tr>
                        <td style={label_entry}>
                            Wall Density:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="density" 
                            value={this.state.density} 
                            type="number" min="0" max="1" step="0.0001" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Partition Rows:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="section_rows" 
                            value={this.state.section_rows} 
                            type="number" min="1" max="99999" required/>
                        </td>
                        <td style={label_entry}>
                            Partition Columns:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="section_cols" 
                            value={this.state.section_cols} 
                            type="number" min="1" max="99999" required/>
                        </td>
                    </tr>
                </table>
            </form>
            <div style={footer_style}>
                <div style={warning_style}>
                    Pressing start will overwrite any existing local world saves.
                </div>
                <button form="config" style={button_style} type="submit" value="Submit">
                    Start
                </button>
                <button style={button_style} onClick={() => this.props.setPage("About")}>
                    About
                </button>
                <button style={button_style} onClick={() => this.props.setPage("MainMenu")}>
                    Main Menu
                </button>
            </div>
        </div>
        );
    }
}