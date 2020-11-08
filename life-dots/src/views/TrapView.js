import React from "react";

export default class TrapView extends React.Component
{    
    render()
    {
        let scaled_size = this.props.trap_max === this.props.trap_min ? 
                            this.props.cell_size : 
                           (this.props.trap_size - this.props.trap_min) / 
                           (this.props.trap_max - this.props.trap_min) * 
                            this.props.cell_size * 0.5 + 
                            this.props.cell_size * 0.5;
        scaled_size = Math.min(Math.max(scaled_size, this.props.cell_size / 2), this.props.cell_size);
        const scaled_offset = (this.props.cell_size - scaled_size) / 2;
        const cell_style = 
        {
            top: (this.props.row * this.props.cell_size + scaled_offset) + "px",
            left: (this.props.col * this.props.cell_size + scaled_offset) + "px",
            height: scaled_size + "px",
            width: scaled_size + "px",
            backgroundColor: "rgb(55, 0, 0)",
            position: "absolute"
        }

        return (<div style={cell_style}></div>);
    }
}