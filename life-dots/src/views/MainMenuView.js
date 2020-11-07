import React from "react";

const main_menu_style = 
{
    textAlign: "center",
}

const text_style = 
{
    fontSize: "20vh",
    marginTop: "10vh",
    marginBottom: "5vh",
}

const button_style = 
{
    borderRadius: "1vh",
    height: "15vh",
    width: "30vh",
    marginBottom: "5vh",
    marginLeft: "5vh",
    marginRight: "5vh",
    color: "#b3b3b3",
    backgroundColor: "#000000",
    fontSize: "5vh",
    border: "2px solid #b3b3b3",
}

export default class MainMenuView extends React.Component
{   
    render()
    {
        return (
        <div style={main_menu_style}>
            <p style={text_style}>Life Dots</p>
            <br></br>
            <button style={button_style} onClick={() => this.props.setPage("About")}>
                About
            </button>
            <button style={button_style} onClick={() => this.props.setPage("Setup")}>
                Setup
            </button>
        </div>
        );
    }
}