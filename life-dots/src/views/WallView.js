import React from "react";

export default class WallView extends React.Component
{    
    render()
    {
        const cell_style = 
        {
            top: (this.props.row * this.props.cell_size) + "px",
            left: (this.props.col * this.props.cell_size) + "px",
            height: this.props.cell_size + "px",
            width: this.props.cell_size + "px",
            backgroundColor: "rgb(25, 25, 25)",
            position: "absolute"
        }

        return (<div style={cell_style}></div>);
    }
}