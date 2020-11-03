import React from "react";

import CellView from "./CellView";
import DotView from "./DotView";

export default class WorldView extends React.Component
{
    render()
    {
        cells = []
        dots = []
        for (let r = 0; r < this.props.world.rows; r++)
        {
            for (let c = 0; c < this.props.world.cols; c++)
            wall_value = this.props.world.wall_grid.get(r,c)
            trap_value = this.props.world.trap_grid.get(r,c)    
            food_value = this.props.world.food_grid.get(r,c)
            cells.push(<CellView wall_value={wall_value} 
                                 trap_value={trap_value} 
                                 food_value={food_value}
                                 cell_row={r}
                                 cell_col={c}
                                 cell_size={10}/>)
        }
        
        return (<React.Fragment>cells</React.Fragment>);
    }
}
