import React from "react";

const HEXTABLE = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];

export default class DotView extends React.Component
{
    render()
    {
        let color = "#";
        for (let i = 0; i < 3; i++)
        {
            color += HEXTABLE[(this.props.dot_color[i] / 16) | 0];
            color += HEXTABLE[(this.props.dot_color[i] % 16) | 0];
        }
        
        const dot_style = 
        {
            top: (this.props.dot_row * this.props.dot_size) + "px",
            left: (this.props.dot_col * this.props.dot_size) + "px",
            hieght: this.props.dot_size + "px",
            width: this.props.dot_size + "px",
            backgroundColor: color,
            borderRadius: "50%",
        }

        return (<div style={dot_style}></div>);
    }
}
