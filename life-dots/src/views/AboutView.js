import React from "react";

const about_style = 
{
    textAlign: "center",
    paddingTop: "10vh",
}

const text_style = 
{
    fontSize: "5vh",
}

const button_style = 
{
    borderRadius: "1vh",
    height: "15vh",
    width: "30vh",
    marginTop: "5vh",
    marginLeft: "5vh",
    marginRight: "5vh",
    color: "#b3b3b3",
    backgroundColor: "#000000",
    fontSize: "5vh",
    border: "2px solid #b3b3b3",
}

export default class AboutView extends React.Component
{   
    render()
    {
        return (
        <div style={about_style}>
            <span style={text_style}>Life dots are life dots</span>
            <br></br>
            <button style={button_style} onClick={() => this.props.setPage("MainMenu")}>
                Main Menu
            </button>
            <button style={button_style} onClick={() => this.props.setPage("Start")}>
                Start
            </button>
        </div>
        );
    }
}