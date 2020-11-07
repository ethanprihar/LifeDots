import React from "react";

const setup_style = 
{
    textAlign: "center",
    paddingTop: "5vh",
}

const title_style = 
{
    fontSize: "10vh",
}

const subtitle_style = 
{
    fontSize: "5vh",
    marginBottom: "3vh",
}

const table_style = 
{
    width: "90vw",
    margin: "auto",
    fontSize: "2vh",
}

const label_entry = 
{
    textAlign: "right",
    width: "25vw"
}

const input_entry = 
{
    textAlign: "left",
}

const input_style = 
{
    color: '#b3b3b3',
    backgroundColor: "#000000",
    border: "2px solid #b3b3b3",
    borderRadius: "3px",
    width: "10vw"
}

const button_style = 
{
    borderRadius: "1vh",
    height: "15vh",
    width: "30vh",
    marginTop: "7vh",
    marginLeft: "5vh",
    marginRight: "5vh",
    color: "#b3b3b3",
    backgroundColor: "#000000",
    fontSize: "5vh",
    border: "2px solid #b3b3b3",
}

export default class SetupView extends React.Component
{   
    render()
    {
        return (
        <div style={setup_style}>
            <span style={title_style}>World Setup</span>
            <br></br>
            <form>
                <p style={subtitle_style}>World Configuration</p>
                <table style={table_style}>
                    <tr>
                        <td style={label_entry}>Cell Size (Pixel Width):</td>
                        <td style={input_entry}><input style={input_style} type="number" min="5" required/></td>
                        <td style={label_entry}>Minimum Tick Time (Milliseconds):</td>
                        <td style={input_entry}><input style={input_style} type="number" min="1" required/></td>
                    </tr>
                </table>
                
                <p style={subtitle_style}>Dot Configuration</p>
                <table style={table_style}>
                    <tr>
                        <td style={label_entry}>Starting Dots:</td>
                        <td style={input_entry}><input style={input_style} type="number" min="1" required/></td>
                        <td style={label_entry}>Spawn More Dots Upon Extinction:</td>
                        <datalist id="boolean">
                            <option value="Yes"/>
                            <option value="No"/>
                        </datalist>
                        <td style={input_entry}>
                            <select style={input_style}>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>Minimum Dot Size:</td>
                        <td style={input_entry}><input style={input_style} type="number" min="0" required/></td>
                        <td style={label_entry}>Maximum Dot Size:</td>
                        <td style={input_entry}><input style={input_style} type="number" min="0" required/></td>
                    </tr>
                    <tr>
                        <td style={label_entry}>Minimum Split Fraction:</td>
                        <td style={input_entry}><input style={input_style} type="number" min="0" max="1" step="0.1" required/></td>
                        <td style={label_entry}>Maximum Split Fraction:</td>
                        <td style={input_entry}><input style={input_style} type="number" min="0" max="1" step="0.1" required/></td>
                    </tr>
                    <tr>
                        <td style={label_entry}>Minimum Food Absorbtion:</td>
                        <td style={input_entry}><input style={input_style} type="number" min="0" max="1" step="0.1" required/></td>
                        <td style={label_entry}>Maximum Food Absorbtion:</td>
                        <td style={input_entry}><input style={input_style} type="number" min="0" max="1" step="0.1" required/></td>
                    </tr>
                    <tr>
                        <td style={label_entry}>Minimum Speed:</td>
                        <td style={input_entry}><input style={input_style} type="number" min="0" required/></td>
                        <td style={label_entry}>Maximum Speed:</td>
                        <td style={input_entry}><input style={input_style} type="number" min="0" required/></td>
                    </tr>
                    <tr>
                        <td style={label_entry}>Minimum Perception:</td>
                        <td style={input_entry}><input style={input_style} type="number" min="1" required/></td>
                        <td style={label_entry}>Maximum Perception:</td>
                        <td style={input_entry}><input style={input_style} type="number" min="1" required/></td>
                    </tr>
                    <tr>
                        <td style={label_entry}>Minimum Mutation Rate:</td>
                        <td style={input_entry}><input style={input_style} type="number"  min="0" step="0.1" required/></td>
                        <td style={label_entry}>Maximum Mutation Rate:</td>
                        <td style={input_entry}><input style={input_style} type="number"  min="0" step="0.1" required/></td>
                    </tr>
                </table>

                <p style={subtitle_style}>Food Configuration</p>
                <table style={table_style}>
                    <tr>
                        <td style={label_entry}>Distribution:</td>
                        <td style={input_entry}>
                            <select style={input_style}>
                                <option value={true}>Uniform</option>
                                <option value={false}>Normal</option>
                            </select>
                        </td>
                        <td style={label_entry}>Food Distribution Cycle:</td>
                        <td style={input_entry}>
                            <select style={input_style}>
                                <option value={true}>On</option>
                                <option value={false}>Off</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>Ticks Between Spawn:</td>
                        <td style={input_entry}><input style={input_style} type="number" min="0" required/></td>
                        <td style={label_entry}>Drops Per Spawn:</td>
                        <td style={input_entry}><input style={input_style} type="number" min="0" required/></td>
                    </tr>
                    <tr>
                        <td style={label_entry}>Minimum Spawn Size:</td>
                        <td style={input_entry}><input style={input_style} type="number" min="0" required/></td>
                        <td style={label_entry}>Minimum Spawn Size:</td>
                        <td style={input_entry}><input style={input_style} type="number" min="0" required/></td>
                    </tr>
                    <tr>
                        <td style={label_entry}>Minimum Food Per Spawn:</td>
                        <td style={input_entry}><input style={input_style} type="number" min="0" required/></td>
                        <td style={label_entry}>Maximum Food Per Spawn:</td>
                        <td style={input_entry}><input style={input_style} type="number" min="0" required/></td>
                    </tr>
                    <tr>
                        <td style={label_entry}>Spawns Per Phase:</td>
                        <td style={input_entry}><input style={input_style} type="number" min="0" required/></td>
                    </tr>
                    <tr>
                        <td style={label_entry}>Ticks Between Spawn Change:</td>
                        <td style={input_entry}><input style={input_style} type="number" required/></td>
                        <td style={label_entry}>Drops Per Spawn Change:</td>
                        <td style={input_entry}><input style={input_style} type="number" required/></td>
                    </tr>
                    <tr>
                        <td style={label_entry}>Minimum Spawn Size Change:</td>
                        <td style={input_entry}><input style={input_style} type="number" required/></td>
                        <td style={label_entry}>Minimum Spawn Size Change:</td>
                        <td style={input_entry}><input style={input_style} type="number" required/></td>
                    </tr>
                    <tr>
                        <td style={label_entry}>Minimum Food Per Spawn Change:</td>
                        <td style={input_entry}><input style={input_style} type="number" required/></td>
                        <td style={label_entry}>Maximum Food Per Spawn Change:</td>
                        <td style={input_entry}><input style={input_style} type="number" required/></td>
                    </tr>
                </table>

                <p style={subtitle_style}>Trap Configuration</p>
                <table style={table_style}>
                    <tr>
                        <td style={label_entry}>Trap Number:</td>
                        <td style={input_entry}><input style={input_style} type="number" min="0" required/></td>
                        <td style={label_entry}>Distribution:</td>
                        <td style={input_entry}>
                            <select style={input_style}>
                                <option value={true}>Uniform</option>
                                <option value={false}>Normal</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>Minimum Trap Size:</td>
                        <td style={input_entry}><input style={input_style} type="number" min="0" required/></td>
                        <td style={label_entry}>Maximum Trap Size:</td>
                        <td style={input_entry}><input style={input_style} type="number" min="0" required/></td>
                    </tr>
                    <tr>
                        <td style={label_entry}>Minimum Trap Damage:</td>
                        <td style={input_entry}><input style={input_style} type="number" min="0" required/></td>
                        <td style={label_entry}>Maximum Trap Damage:</td>
                        <td style={input_entry}><input style={input_style} type="number" min="0" required/></td>
                    </tr>
                </table>

                <p style={subtitle_style}>Wall Configuration</p>
                <table style={table_style}>
                    <tr>
                        <td style={label_entry}>Wall Density:</td>
                        <td style={input_entry}><input style={input_style} type="number" min="0" max="1" step="0.1" required/></td>
                    </tr>
                    <tr>
                        <td style={label_entry}>Partition Rows:</td>
                        <td style={input_entry}><input style={input_style} type="number" min="1" required/></td>
                        <td style={label_entry}>Partition Columns:</td>
                        <td style={input_entry}><input style={input_style} type="number" min="1" required/></td>
                    </tr>
                </table>

                <button style={button_style} onClick={() => this.props.setPage("About")}>
                    About
                </button>
                <button style={button_style} onClick={() => this.props.setPage("Start")}>
                    Start
                </button>
            </form>
        </div>
        );
    }
}