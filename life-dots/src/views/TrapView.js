import React from "react";

export default class TrapView extends React.Component
{    
    render()
    {
        const cell_style = 
        {
            top: (this.props.cell_row * this.props.cell_size) + "px",
            left: (this.props.cell_col * this.props.cell_size) + "px",
            height: this.props.cell_size + "px",
            width: this.props.cell_size + "px",
            backgroundColor: "rgb(55, 0, 0)",
            position: "absolute"
        }

        return (<div style={cell_style}></div>);
    }
}