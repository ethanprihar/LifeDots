import React from "react";
import ReactModal from 'react-modal';

import SaveConfigView from "./SaveConfigView"
import LoadConfigView from "./LoadConfigView"

import RandomDots from "../models/placers/RandomDots"
import RandomFood from "../models/placers/RandomFood"
import RandomTrap from "../models/placers/RandomTrap"
import RandomWall from "../models/placers/RandomWall"
import World from "../models/World"

var JsonPorter = require('json-porter').default;

const setup_style = 
{
    textAlign: "center",
    width: "100%",
    height: "100%",
    margin: "0",
    padding: "0",
    overflowX: "hidden"
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

const header_style = 
{
    color: "#b3b3b3",
    backgroundColor: "#000000",
    borderBottom: "0.25vh solid #b3b3b3",
    position: "fixed",
    top: "0",
    width: "100%",
    height: "22.8vh",
    overflow: "auto",
}

const title_style = 
{
    fontSize: "9.75vh",
    marginBottom: "0",
    marginTop: "0",
}

const header_flex_style = 
{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
}

const header_button_style = 
{
    borderRadius: "1vh",
    height: "7vh",
    width: "20vh",
    marginLeft: "1.25vh",
    marginRight: "1.25vh",
    marginBottom: "2.5vh",
    color: "#b3b3b3",
    backgroundColor: "#000000",
    fontSize: "4vh",
    border: "0.25vh solid #b3b3b3",
}

const form_style = 
{
    position: "center",
    marginTop: "24vh",
    marginBottom: "14vh",
}

const subtitle_style = 
{
    fontSize: "5vh",
    marginTop: "3vh",
}

const description_style = 
{
    fontSize: "20px",
    marginLeft: "20%",
    marginRight: "20%",
    marginTop: "1%",
    marginBottom: "1%",
    textAlign: "justify",
}

const table_style = 
{
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    fontSize: "20px",
}

const label_entry = 
{
    textAlign: "right",
    width: "50%"
}

const input_entry = 
{
    textAlign: "left",
    width: "50%"
}

const input_style = 
{
    color: '#b3b3b3',
    backgroundColor: "#000000",
    border: "2px solid #b3b3b3",
    borderRadius: "3px",
    width: "10vw"
}

const footer_style = 
{
    color: "#b3b3b3",
    backgroundColor: "#000000",
    borderTop: "0.25vh solid #b3b3b3",
    position: "fixed",
    bottom: "0",
    width: "100%",
    overflow: "auto",
}

const footer_button_style = 
{
    borderRadius: "1vh",
    height: "7vh",
    width: "20vh",
    marginLeft: "1.25vh",
    marginRight: "1.25vh",
    marginTop: "2.5vh",
    marginBottom: "2.5vh",
    color: "#b3b3b3",
    backgroundColor: "#000000",
    fontSize: "4vh",
    border: "0.25vh solid #b3b3b3",
}

export default class SetupView extends React.Component
{   
    constructor(props)
    {
        super(props);
        let default_config = 
        {
            cell_size: 15,
                tick_time: 33,

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
                max_view: 3,
                min_max_mut_pct: 1,
                max_max_mut_pct: 10,
                reset_on_extinction: true,

                funiform: false,
                ticks_between_rain: 10,
                drops_per_rain: 300,
                min_drop_size: 1,
                max_drop_size: 1,
                min_food_per_drop: 10,
                max_food_per_drop: 100,
                delta_ticks_between_rain: 0,
                delta_drops_per_rain: -5,
                delta_min_drop_size: 0,
                delta_max_drop_size: 0,
                delta_min_food_per_drop: 0,
                delta_max_food_per_drop: 0,
                phase_length: 80,
                will_cycle: true,

                tuniform: true,
                trap_num: 0,
                min_trap_size: 3,
                max_trap_size: 3,
                min_trap_damage: 100,
                max_trap_damage: 100,

                section_rows: 1,
                section_cols: 1,
                density: 0,
        };
        this.state = 
        {
            config: default_config,
            pressed_button: "",
            show_save: false,
            show_load: false,
        };
    }

    set_save_button = () =>
    {
        this.setState({pressed_button: "save"})
    }

    set_start_button = () =>
    {
        this.setState({pressed_button: "start"})
    }

    save = () =>
    {
        this.setState({show_save: true});
    }

    close_save = () =>
    {
        this.setState({show_save: false});
    }

    load = () =>
    {
        this.setState({show_load: true});
    }

    close_load = (loaded_config) =>
    {
        if (loaded_config === undefined)
        {
            this.setState({show_load: false});
        }
        else
        {
            this.setState({config: loaded_config,
                           show_load: false});
        }
    }

    import = () =>
    {
        let jp = new JsonPorter();
        jp.import().then(this.set_config);
    }

    set_config = (c) =>
    {
        this.setState({config: c});
    }

    export = () =>
    {
        let jp = new JsonPorter();
        jp.export(this.state.config, "lifedots-config.json");
    }

    submit = (event) =>
    {
        event.preventDefault()
        if (this.state.pressed_button === "save")
        {
            this.save();
        }
        else if (this.state.pressed_button === "start")
        {
            const rows = Math.floor(window.innerHeight / this.state.config.cell_size);
            const cols = Math.floor(window.innerWidth / this.state.config.cell_size);
            let dot_placer = new RandomDots(this.state.config.dot_num,  
                                            this.state.config.min_max_size, 
                                            this.state.config.max_max_size, 
                                            this.state.config.min_split_frac / 100, 
                                            this.state.config.max_split_frac / 100, 
                                            this.state.config.min_eat_ratio / 100, 
                                            this.state.config.max_eat_ratio / 100, 
                                            this.state.config.min_speed, 
                                            this.state.config.max_speed, 
                                            this.state.config.min_view, 
                                            this.state.config.max_view, 
                                            this.state.config.min_max_mut_pct / 100, 
                                            this.state.config.max_max_mut_pct / 100, 
                                            this.state.config.reset_on_extinction);
            let food_placer = new RandomFood(this.state.config.funiform,
                                            this.state.config.ticks_between_rain, 
                                            this.state.config.drops_per_rain, 
                                            this.state.config.min_drop_size, 
                                            this.state.config.max_drop_size,
                                            this.state.config.min_food_per_drop, 
                                            this.state.config.max_food_per_drop, 
                                            this.state.config.delta_ticks_between_rain, 
                                            this.state.config.delta_drops_per_rain, 
                                            this.state.config.delta_min_drop_size, 
                                            this.state.config.delta_max_drop_size, 
                                            this.state.config.delta_min_food_per_drop, 
                                            this.state.config.delta_max_food_per_drop, 
                                            this.state.config.phase_length, 
                                            this.state.config.will_cycle);
            let trap_placer = new RandomTrap(this.state.config.tuniform, 
                                            this.state.config.trap_num, 
                                            this.state.config.min_trap_size, 
                                            this.state.config.max_trap_size, 
                                            this.state.config.min_trap_damage, 
                                            this.state.config.max_trap_damage)
            let wall_placer = new RandomWall(this.state.config.section_rows, 
                                            this.state.config.section_cols, 
                                            this.state.config.density / 100);
            let world = new World(rows, cols, dot_placer, food_placer, trap_placer, wall_placer);
            world.init()
            this.props.setPage("Start", this.state.config.tick_time, this.state.config.cell_size, world);
        }
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
        const name = event.target.name;
        const number_value = event.target.valueAsNumber;
        const string_value = event.target.value;
        let config = JSON.parse(JSON.stringify(this.state.config));
        if (number_value === undefined)
        {
            config[name] = string_value === "true";
        }
        else
        {
            config[name] = number_value;
            if (name.startsWith("min_") && (config["max" + name.substring(3)] < number_value))
            {
                config["max" + name.substring(3)] = number_value;
            }
            if (name.startsWith("max_") && (config["min" + name.substring(3)] > number_value))
            {
                config["min" + name.substring(3)] = number_value;
            }
        }
        this.setState({config: config});
    }
    
    render()
    {
        return (
        <div style={setup_style}>
            <ReactModal style={modal_style} isOpen={this.state.show_save} ariaHideApp={false}>
                <SaveConfigView close_save={this.close_save} config={JSON.parse(JSON.stringify(this.state.config))}/>
            </ReactModal>
            <ReactModal style={modal_style} isOpen={this.state.show_load} ariaHideApp={false}>
                <LoadConfigView close_load={this.close_load} config={JSON.parse(JSON.stringify(this.state.config))}/>
            </ReactModal>
            <div style={header_style}>
                <span style={title_style}>
                    World Builder
                </span>
                <div style={header_flex_style}>
                    <div>
                        <button style={header_button_style} onClick={this.load}>
                            Load
                        </button>
                        <button style={header_button_style} type="submit" form="config" onClick={this.set_save_button}>
                            Save
                        </button>
                    </div>
                    <div>
                        <button style={header_button_style} onClick={this.import}>
                            Import
                        </button>
                        <button style={header_button_style} onClick={this.export}>
                            Export
                        </button>
                    </div>
                </div>
            </div>

            <form id="config" style={form_style} onChange={this.change_input} onKeyPress={this.key_press} onSubmit={this.submit}>
                <div style={subtitle_style}>
                    World Configuration
                </div>
                <div style={description_style}>
                    The world will occupy the entire browser window when generated. "Cell Size" specifies the 
                    pixel height of each cell in the world. A larger cell size will result in fewer, larger cells. 
                    "Tick Time" determines how fast the cells will update, in milliseconds. Higher tick time 
                    will result in less frequent updates.
                </div>
                <table style={table_style}><tbody>
                    <tr>
                        <td style={label_entry}>
                            Cell Size:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} onChange={() => {}} 
                            name="cell_size" 
                            value={this.state.config.cell_size} 
                            type="number" min="5" max="99999" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Tick Time:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} onChange={() => {}} 
                            name="tick_time" 
                            value={this.state.config.tick_time} 
                            type="number" min="1" max="99999" required/>
                        </td>
                    </tr>
                </tbody></table>
                
                <div style={subtitle_style}>
                    Dot Configuration
                </div>
                <div style={description_style}>
                    When a new world is generated, new dots with random genomes will be created. "Starting 
                    Dots" determines how many random dots are generated. "Respawn If Extinct" will create 
                    the same number of dots if all the dots in the world die.
                </div>
                <table style={table_style}><tbody>
                    <tr>
                        <td style={label_entry}>
                            Starting Dots:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} onChange={() => {}} 
                            name="dot_num" 
                            value={this.state.config.dot_num} 
                            type="number" min="1" max="99999" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Respawn If Extinct:
                        </td>
                        <td style={input_entry}>
                            <select style={input_style} onChange={() => {}}
                            name="reset_on_extinction" 
                            value={this.state.config.reset_on_extinction}>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </select>
                        </td>
                    </tr>
                </tbody></table>
                <div style={description_style}>
                    The following minimum and maximum values bound the genomes of the 
                    randomly generated dots. The initial dots offspring will not be 
                    bounded by these limitations.
                    <ul>
                        <li>
                            A dot's size determines how much energy it costs to move, 
                            its chances of surviving an encouter with another dot, 
                            how much food it can eat in one tick, 
                            and how much energy it needs to accumulate before splitting.
                        </li>
                        <li>
                            A dot's split percentage determines the size of the child dot 
                            created when the parent dot splits relative to the parent dot's size.
                        </li>
                        <li>
                            A dot's energy efficiency determines the percent of food 
                            consumed by the dot that gets converted to energy. 
                            (100 - energy efficiency) determines the percent of other dots' size 
                            converted to energy when consumed.
                        </li>
                        <li>
                            A dot's rest time determines how many ticks between the dot's moves. 
                            A higher rest time means the dot will move less frequently.
                        </li>
                        <li>
                            A dot's perception determines how many cells past its current cell 
                            it can percieve. Whatever a dot can percieve can be used to determine 
                            where to move. A perception of 2 means the dot can percieve a 5x5 square 
                            of cells, with its own cell at the center of the square.
                        </li>
                        <li>
                            A dot's mutation rate determines how much a dot's offspring's genome will 
                            differ from its own, as a percentage of its own genetic values.
                        </li>
                    </ul>
                </div>
                <table style={table_style}><tbody>
                    <tr>
                        <td style={label_entry}>
                            Minimum Dot Size:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} onChange={() => {}} 
                            name="min_max_size" 
                            value={this.state.config.min_max_size} 
                            type="number" min="0" max="99999" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Maximum Dot Size:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} onChange={() => {}} 
                            name="max_max_size" 
                            value={this.state.config.max_max_size} 
                            type="number" min="0" max="99999" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Minimum Split Percent:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} onChange={() => {}} 
                            name="min_split_frac" 
                            value={this.state.config.min_split_frac} 
                            type="number" min="0" max="100" step="0.0001" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Maximum Split Percent:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} onChange={() => {}} 
                            name="max_split_frac" 
                            value={this.state.config.max_split_frac} 
                            type="number" min="0" max="100" step="0.0001" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Minimum Energy Efficiency:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} onChange={() => {}} 
                            name="min_eat_ratio" 
                            value={this.state.config.min_eat_ratio} 
                            type="number" min="0" max="100" step="0.0001" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Maximum Energy Efficiency:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} onChange={() => {}} 
                            name="max_eat_ratio" 
                            value={this.state.config.max_eat_ratio} 
                            type="number" min="0" max="100" step="0.0001" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Minimum Rest Time:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} onChange={() => {}} 
                            name="min_speed" 
                            value={this.state.config.min_speed} 
                            type="number" min="1" max="99999" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Maximum Rest Time:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} onChange={() => {}} 
                            name="max_speed" 
                            value={this.state.config.max_speed} 
                            type="number" min="1" max="99999" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Minimum Perception:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} onChange={() => {}} 
                            name="min_view" 
                            value={this.state.config.min_view} 
                            type="number" min="1" max="99999" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Maximum Perception:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} onChange={() => {}} 
                            name="max_view" 
                            value={this.state.config.max_view} 
                            type="number" min="1" max="99999" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Minimum Mutation Rate:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} onChange={() => {}} 
                            name="min_max_mut_pct" 
                            value={this.state.config.min_max_mut_pct} 
                            type="number" min="0" max="99999" step="0.0001" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Maximum Mutation Rate:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} onChange={() => {}} 
                            name="max_max_mut_pct" 
                            value={this.state.config.max_max_mut_pct} 
                            type="number"  min="0" max="99999" step="0.0001" required/>
                        </td>
                    </tr>
                </tbody></table>
                <div style={subtitle_style}>
                    Food Configuration
                </div>
                <div style={description_style}>
                    Food is added to the world in random locations and quantities on a fixed schedule. 
                    The following parameters are used to control this schedule.
                    <ul>
                        <li>
                            Distribution determines if food is added randomly using a uniform distribution 
                            or a normal (gaussian) distribution.
                        </li>
                        <li>
                            Food is added to the world in bursts. Ticks between bursts determines how many ticks 
                            pass before more food is added to the world.
                        </li>
                        <li>
                            Drops per burst determines how many clusters of food are added to the world during 
                            a burst.
                        </li>
                        <li>
                            Minimum and maximum drop size determines the range of sizes of the clusters of food 
                            added durring a burst. Each cluster's size is chosen randomly within the specified range. 
                            A drop size of 3 means that the drop will add food to a 3x3 square of cells in the world.
                        </li>
                        <li>
                            Minimum and maximum food per drop determines the range of quantity of food added to each cell 
                            of the world that was occupied by a drop. This quantity is the amount of food a dot will 
                            comsume when entering the world cell. Each drop's food quantity is chosen randomly within 
                            the specified range.
                        </li>
                    </ul>
                </div>
                <table style={table_style}><tbody>
                    <tr>
                        <td style={label_entry}>
                            Food Distribution:
                        </td>
                        <td style={input_entry}>
                            <select style={input_style} onChange={() => {}}
                            name="funiform" 
                            value={this.state.config.funiform}>
                                <option value={true}>Uniform</option>
                                <option value={false}>Normal</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Ticks Between Bursts:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} onChange={() => {}} 
                            name="ticks_between_rain" 
                            value={this.state.config.ticks_between_rain} 
                            type="number" min="0" max="99999" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Drops Per Burst:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} onChange={() => {}} 
                            name="drops_per_rain" 
                            value={this.state.config.drops_per_rain} 
                            type="number" min="0" max="99999" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Minimum Drop Size:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} onChange={() => {}} 
                            name="min_drop_size" 
                            value={this.state.config.min_drop_size} 
                            type="number" min="0" max="99999" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Maximum Drop Size:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} onChange={() => {}} 
                            name="max_drop_size" 
                            value={this.state.config.max_drop_size} 
                            type="number" min="0" max="99999" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Minimum Food Per Drop:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} onChange={() => {}} 
                            name="min_food_per_drop" 
                            value={this.state.config.min_food_per_drop} 
                            type="number" min="0" max="99999" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Maximum Food Per Drop:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} onChange={() => {}} 
                            name="max_food_per_drop" 
                            value={this.state.config.max_food_per_drop} 
                            type="number" min="0" max="99999" required/>
                        </td>
                    </tr>
                </tbody></table>
                <div style={description_style}>
                    The food distribution schedule has the ability to change over time. 
                    The length of time over which the food distribution schedule changes is called the phase. The phase 
                    length is measured in number of bursts. For example, a phase length of 100 bursts means that 
                    the food distribution schedule will change by a constant amount every burst for 100 bursts, 
                    then it will remain constant. If instead, one desires the food distribution schedule to return 
                    to its initial conditions after the end of the phase, then food distribution cycle can be 
                    turned on, which will, over one phase length, reverse the changes to the food distribution schedule. 
                    After the changes have been reversed, they will happen again, and continue to cycle for the duration 
                    of the world.
                </div>
                <table style={table_style}><tbody>
                    <tr>
                        <td style={label_entry}>
                            Phase Length:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} onChange={() => {}} 
                            name="phase_length" 
                            value={this.state.config.phase_length} 
                            type="number" min="0" max="99999" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Food Distribution Cycle:
                        </td>
                        <td style={input_entry}>
                            <select style={input_style} onChange={() => {}}
                            name="will_cycle" 
                            value={this.state.config.will_cycle}>
                                <option value={true}>On</option>
                                <option value={false}>Off</option>
                            </select>
                        </td>
                    </tr>
                </tbody></table>
                <div style={description_style}>
                    The following parameters control the amount that the food distribution 
                    schedule parameters change after each spawn during a phase.
                </div>
                <table style={table_style}><tbody>
                    <tr>
                        <td style={label_entry}>
                            Ticks Between Bursts Change:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} onChange={() => {}} 
                            name="delta_ticks_between_rain" 
                            value={this.state.config.delta_ticks_between_rain} 
                            type="number" min="-99999" max="99999" step="0.0001" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Drops Per Burst Change:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} onChange={() => {}} 
                            name="delta_drops_per_rain" 
                            value={this.state.config.delta_drops_per_rain} 
                            type="number" min="-99999" max="99999" step="0.0001" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Minimum Drop Size Change:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} onChange={() => {}} 
                            name="delta_min_drop_size" 
                            value={this.state.config.delta_min_drop_size} 
                            type="number" min="-99999" max="99999" step="0.0001" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Maximum Drop Size Change:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} onChange={() => {}} 
                            name="delta_max_drop_size" 
                            value={this.state.config.delta_max_drop_size} 
                            type="number" min="-99999" max="99999" step="0.0001" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Minimum Food Per Drop Change:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} onChange={() => {}} 
                            name="delta_min_food_per_drop" 
                            value={this.state.config.delta_min_food_per_drop} 
                            type="number" min="-99999" max="99999" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Maximum Food Per Drop Change:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} onChange={() => {}} 
                            name="delta_max_food_per_drop" 
                            value={this.state.config.delta_max_food_per_drop} 
                            type="number" min="-99999" max="99999" required/>
                        </td>
                    </tr>
                </tbody></table>
                <div style={subtitle_style}>
                    Trap Configuration
                </div>
                <div style={description_style}>
                    Traps are added to the world in random locations and quantities when the world is 
                    generated, and remain a permanent part of the world. The following parameters contol 
                    the generation of traps.
                    <ul>
                        <li>
                            Trap distribution determines whether or not the traps will be added to the world 
                            in a uniform distribution or a normal (gaussian) distribution.
                        </li>
                        <li>
                            Trap number determines the number of traps added to the world.
                        </li>
                        <li>
                            Minimum and maximum trap size determine the range of trap size that each trap's size 
                            will be randomly selected from. A trap size of 4 means that a 4x4 square of tiles 
                            will be trapped, and that all 16 of those tiles will be associated with a single trap.
                        </li>
                        <li>
                            Minimum and maximum trap damage determine the range of trap damage that each trap's 
                            damage will be randomly selected from. Trap damage is subtrated from a dot's energy 
                            every tick a dot is in a trapped cell. A high trap damage will more quickly kill a dot in 
                            the trapped cell.
                        </li>
                    </ul>
                </div>
                <table style={table_style}><tbody>
                    <tr>
                        <td style={label_entry}>
                            Trap Distribution:
                        </td>
                        <td style={input_entry}>
                            <select style={input_style} onChange={() => {}}
                            name="tuniform" 
                            value={this.state.config.tuniform}>
                                <option value={true}>Uniform</option>
                                <option value={false}>Normal</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Trap Number:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} onChange={() => {}} 
                            name="trap_num" 
                            value={this.state.config.trap_num} 
                            type="number" min="0" max="99999" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Minimum Trap Size:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} onChange={() => {}} 
                            name="min_trap_size" 
                            value={this.state.config.min_trap_size} 
                            type="number" min="1" max="99999" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Maximum Trap Size:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} onChange={() => {}} 
                            name="max_trap_size" 
                            value={this.state.config.max_trap_size} 
                            type="number" min="1" max="99999" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Minimum Trap Damage:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} onChange={() => {}} 
                            name="min_trap_damage" 
                            value={this.state.config.min_trap_damage} 
                            type="number" min="1" max="99999" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Maximum Trap Damage:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} onChange={() => {}} 
                            name="max_trap_damage" 
                            value={this.state.config.max_trap_damage} 
                            type="number" min="1" max="99999" required/>
                        </td>
                    </tr>
                </tbody></table>
                <div style={subtitle_style}>
                    Wall Configuration
                </div>
                <div style={description_style}>
                    Walls are added to the world in a grid. The wall percentage determines what 
                    percentage of the wall contains impassible world cells. A percentage of 0 means 
                    that there will be no walls in the world. A wall percentage of 100 means that 
                    the world will be walled into wall rows x wall columns areas that 
                    have no way of being traveled between. For example, a density of 100 and wall rows 
                    and columns of 1 means the world will have an impassable border around its 
                    edge. A density of 100 and wall rows and columns of 2 means the world will be evenly divided into 
                    four quandrants that dots cannot pass between. A density of 50 and wall rows and columns of 2 means 
                    that dots will be able to move between quadrants as half of the wall blocks will not be present.

                </div>
                <table style={table_style}><tbody>
                    <tr>
                        <td style={label_entry}>
                            Wall Percentage:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} onChange={() => {}} 
                            name="density" 
                            value={this.state.config.density} 
                            type="number" min="0" max="100" step="0.0001" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Wall Rows:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} onChange={() => {}} 
                            name="section_rows" 
                            value={this.state.config.section_rows} 
                            type="number" min="1" max="99999" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Wall Columns:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} onChange={() => {}} 
                            name="section_cols" 
                            value={this.state.config.section_cols} 
                            type="number" min="1" max="99999" required/>
                        </td>
                    </tr>
                </tbody></table>
            </form>

            <div style={footer_style}>
                <div>
                    <button style={footer_button_style} onClick={() => this.props.setPage("MainMenu")}>
                        Menu
                    </button>
                    <button style={footer_button_style} type="submit" form="config" onClick={this.set_start_button}>
                        Start
                    </button>
                </div>
            </div>
        </div>
        );
    }
}