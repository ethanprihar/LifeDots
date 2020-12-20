import React from "react";
import ReactModal from 'react-modal';

const toggle_style = 
{
    color: "#b3b3b3",
    fontSize: "20px",
    margin: "0",
    marginBottom: "10px",
    padding: "0",
}

const title_style = 
{
    color: "#b3b3b3",
    fontSize: "30px",
    margin: "0",
    marginBottom: "10px",
    padding: "0",
}

const table_style = 
{
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "10px",
    textAlign: "center",
    fontSize: "20px",
    color: "#b3b3b3",
    border: "2px solid #b3b3b3",
    borderCollapse: "collapse",
}

const brush_style = 
{
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "10px",
    textAlign: "center",
    fontSize: "30px",
    color: "#b3b3b3",
    borderCollapse: "collapse",
}

const label_entry = 
{
    textAlign: "right",
    width: "50%",
    border: "1px solid #b3b3b3",
    paddingLeft: "5px",
    paddingRight: "5px",
}

const input_entry = 
{
    textAlign: "left",
    width: "50%",
    border: "1px solid #b3b3b3",
    paddingLeft: "5px",
    paddingRight: "5px",
}

const input_style = 
{
    color: '#b3b3b3',
    backgroundColor: "#000000",
    border: "2px solid #b3b3b3",
    borderRadius: "3px",
    fontSize: '30px'
}

const button_style = 
{
    borderRadius: "1vh",
    height: "7vh",
    width: "20vh",
    marginLeft: "1.25vh",
    marginRight: "1.25vh",
    marginTop: "1.25vh",
    marginBottom: "1.25vh",
    color: "#b3b3b3",
    backgroundColor: "#000000",
    fontSize: "4vh",
    border: "0.25vh solid #b3b3b3",
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
        top: '27%',
        left: '22%',
        right: '22%',
        bottom: 'auto',
        border: "0.25vh solid #b3b3b3",
        backgroundColor: "#000000",
        borderRadius: "2vh",
    },
}

export default class WorldOverlayView extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            show_confirm: false,
            confirmed: false,
        };
    }

    save = (event) =>
    {   
        event.preventDefault();
        this.setState({show_confirm: true});
    }

    confirm = (event) =>
    {
        event.preventDefault();
        this.props.save();
        this.setState({show_confirm: false});
    }

    no_confirm = (event) =>
    {
        this.setState({show_confirm: false});
    }

    componentDidMount()
    {
        document.addEventListener("keydown", this.props.close_overlay);
    }

    componentWillUnmount()
    {
        document.removeEventListener("keydown", this.props.close_overlay);
    }
    
    render()
    {
        return (
        <div>
            <ReactModal style={modal_style} isOpen={this.state.show_confirm} ariaHideApp={false}>
                <div style={title_style}>
                    Overwrite Existing World Save?
                </div>
                <button style={button_style} onClick={this.no_confirm}>
                    Back
                </button>
                <button style={button_style} onClick={this.confirm}>
                    Confirm
                </button>
            </ReactModal>
                <div style={toggle_style}>
                    Press the space bar or press close to toggle this overlay.
                </div>
                <div style={brush_style}>
                <span>Brush Select: </span>
                    <select style={input_style} onChange={this.props.set_brush} name="brush_type" value={this.props.brush_type}>
                        <option value={"none"}>None</option>
                        <option value={"wall"}>Wall</option>
                        <option value={"trap"}>Trap</option>
                        <option value={"food"}>Food</option>
                        <option value={"dot"}>Dot</option>
                        <option value={"erase"}>Erase</option>
                    </select>
                </div>
                <div style={title_style}>
                    Statistics:
                </div>
                <table style={table_style}><tbody>
                    <tr>
                        <td style={label_entry}>
                            Age of the World:
                        </td>
                        <td style={input_entry}>
                            {this.props.stats.ticks} Ticks
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Total Dots:
                        </td>
                        <td style={input_entry}>
                            {this.props.stats.dot_num}
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Average Dot Size:
                        </td>
                        <td style={input_entry}>
                            {this.props.stats.avg_size.toFixed(2)}
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Average Dot Split Percent:
                        </td>
                        <td style={input_entry}>
                            {(this.props.stats.avg_split * 100).toFixed(2)} Percent
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Average Dot Energy Efficiency:
                        </td>
                        <td style={input_entry}>
                            {(this.props.stats.avg_energy * 100).toFixed(2)} Percent
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Average Dot Rest Time:
                        </td>
                        <td style={input_entry}>
                            {this.props.stats.avg_rest.toFixed(2)} Ticks
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Average Dot Perception Radius:
                        </td>
                        <td style={input_entry}>
                            {this.props.stats.avg_perc.toFixed(2)} Cells
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Average Dot Mutation Rate:
                        </td>
                        <td style={input_entry}>
                            {(this.props.stats.avg_mut * 100).toFixed(2)} Percent
                        </td>
                    </tr>
                </tbody></table>
                <button style={button_style} onClick={this.save}>
                    Save
                </button>
                <button style={button_style} onClick={this.props.close_overlay_button}>
                    Close
                </button>
                <br></br>
                <button style={button_style} onClick={this.props.export}>
                    Export
                </button>
                <button style={button_style} onClick={() => this.props.setPage("MainMenu")}>
                    Menu
                </button>
        </div>
        );
    }
}