import React from "react";

const HEXTABLE = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];

export default class CellView extends React.Component
{    
    render()
    {
        let color = "#";
        if (this.props.wall_value === 0)
        {
            let color_array = [0, 0, 0];
            if (this.props.food_value > 0)
            {
                color_array = [150, 150, 150];
            }
            if (this.props.trap_value > 0)
            {
                color_array[0] += 55;
            }
            for (let i = 0; i < 3; i++)
            {
                color += HEXTABLE[(color_array[i] / 16) | 0];
                color += HEXTABLE[(color_array[i] % 16) | 0];
            }
        }
        else
        {
            color += "353535"
        }
        
        const cell_style = 
        {
            top: (this.props.cell_row * this.props.cell_size) + "px",
            left: (this.props.cell_col * this.props.cell_size) + "px",
            height: this.props.cell_size + "px",
            width: this.props.cell_size + "px",
            backgroundColor: color,
            position: "absolute"
        }

        return (<div style={cell_style}></div>);
    }
}
