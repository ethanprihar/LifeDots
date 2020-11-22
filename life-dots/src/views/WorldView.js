import React from "react";
import ReactModal from 'react-modal';
import BounceLoader from "react-spinners/BounceLoader";

import WorldOverlayView from "./WorldOverlayView";

import DotView from "./DotView";
import FoodView from "./FoodView";
import TrapView from "./TrapView";
import WallView from "./WallView";

var LZString = require("lz-string")
var localforage = require("localforage")
var JsonPorter = require('json-porter').default;

const spinner_style =
{
    height: "100px",
    width: "100px",
    position: "fixed",
    left: "50%",
    marginLeft: "-15vh",
    top: "50%",
    marginTop: "-15vh",
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

export default class WorldView extends React.Component
{   
    constructor(props)
    {
        super(props);
        this.state = 
        {
            tick_time: props.tick_time,
            cell_size: props.cell_size,
            world: props.world,
            warned: false,
            waiting: false,
            overlay: true,
        };
        this.auto_save();
    }

    update_world()
    {
        if (!this.state.overlay)
        {
            this.state.world.update()
        }
        return this.state.world
    }

    componentDidMount()
    {
        this.world_interval = setInterval(() => this.setState({world: this.update_world()}), this.state.tick_time);
        this.save_interval = setInterval(() => this.auto_save(), 300000);
        document.addEventListener("keydown", this.open_overlay);
    }

    componentWillUnmount()
    {
        clearInterval(this.world_interval);
        clearInterval(this.save_interval);
        document.removeEventListener("keydown", this.open_overlay);
    }

    auto_save = () =>
    {
        this.setState({waiting: true})
        let save_string = LZString.compressToUTF16(JSON.stringify(this.state));
        if (save_string.length < 500000000)
        {
            localforage.setItem('world', save_string)
        }
        else if (!this.state.warned)
        {
            alert("This world is currently too large to save locally. Every 5 minutes another save will be attempted, but this will be your only alert.");
            this.setState({warned: true});
        }
        this.setState({waiting: false})
    }

    open_overlay = () =>
    {
        this.setState({overlay: true});
    }

    close_overlay = () =>
    {
        this.setState({overlay: false});
    }

    export = () =>
    {
        let jp = new JsonPorter();
        jp.export(this.state.world, "lifedots-world.json");
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
        return(
        <div>
            <div style={spinner_style}>
                <BounceLoader size={"30vh"} color={"#b3b3b3"} loading={this.state.waiting}/>
            </div>
            <ReactModal style={modal_style} isOpen={this.state.overlay} ariaHideApp={false}>
                <WorldOverlayView close_overlay={this.close_overlay} save={this.auto_save} export={this.export} setPage={this.props.setPage}/>
            </ReactModal>
            {components}
        </div>);
    }
}