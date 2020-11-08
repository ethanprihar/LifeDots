import React from "react";

const HEXTABLE = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];

export default class DotView extends React.Component
{
    render()
    {
        let color = "#";
        let signal_color = "#";
        for (let i = 0; i < 3; i++)
        {
            color += HEXTABLE[(this.props.dot_color[i] / 16) | 0];
            color += HEXTABLE[(this.props.dot_color[i] % 16) | 0];
            const sig_col_val = Math.min(Math.max(this.props.dot_color[i] + this.props.dot_signal * 75, 0), 255);
            signal_color += HEXTABLE[(sig_col_val / 16) | 0];
            signal_color += HEXTABLE[(sig_col_val % 16) | 0];
        }
        let scaled_size = this.props.dot_max === this.props.dot_min ? 
                            this.props.cell_size : 
                           (this.props.dot_size - this.props.dot_min) / 
                           (this.props.dot_max - this.props.dot_min) * 
                            this.props.cell_size * 0.5 + 
                            this.props.cell_size * 0.5;
        scaled_size = Math.min(Math.max(scaled_size, this.props.cell_size / 2), this.props.cell_size);
        const scaled_offset = (this.props.cell_size - scaled_size) / 2;
        const dot_style = 
        {
            top: (this.props.row * this.props.cell_size + scaled_offset) + "px",
            left: (this.props.col * this.props.cell_size + scaled_offset) + "px",
            height: scaled_size + "px",
            width: scaled_size + "px",
            backgroundColor: color,
            borderRadius: "50%",
            position: "absolute",
        }
        const signal_style = 
        {
            top: (this.props.row * this.props.cell_size + this.props.cell_size * 0.375) + "px",
            left: (this.props.col * this.props.cell_size + this.props.cell_size * 0.375) + "px",
            height: this.props.cell_size * 0.25 + "px",
            width: this.props.cell_size * 0.25 + "px",
            backgroundColor: signal_color,
            borderRadius: "50%",
            position: "absolute",
        }

        return (<div><div style={dot_style}></div>
                <div style={signal_style}></div></div>);
    }
}