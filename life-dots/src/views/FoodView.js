import React from "react";

export default class FoodView extends React.Component
{    
    render()
    {
        const scaled_size = this.props.food_max === this.props.food_min ? 
                            this.props.cell_size : 
                           (this.props.food_size - this.props.food_min) / 
                           (this.props.food_max - this.props.food_min) * 
                            this.props.cell_size * 0.5 + 
                            this.props.cell_size * 0.5;
        const scaled_offset = (this.props.cell_size - scaled_size) / 2;
        const cell_style = 
        {
            top: (this.props.row * this.props.cell_size + scaled_offset) + "px",
            left: (this.props.col * this.props.cell_size + scaled_offset) + "px",
            height: scaled_size + "px",
            width: scaled_size + "px",
            backgroundColor: "rgba(255, 255, 255, 0.25)",
            borderRadius: "25%",
            position: "absolute"
        }

        return (<div style={cell_style}></div>);
    }
}