import React from "react";
import ReactModal from 'react-modal';

const title_style = 
{
    color: "#b3b3b3",
    fontSize: "30px",
    margin: "0",
    marginBottom: "10px",
    padding: "0",
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
                <div style={title_style}>
                    Press the space bar to toggle this overlay.
                </div>
                <button style={button_style} onClick={this.save}>
                    Save
                </button>
                <br></br>
                <button style={button_style} onClick={this.props.export}>
                    Export
                </button>
                <br></br>
                <button style={button_style} onClick={() => this.props.setPage("MainMenu")}>
                    Menu
                </button>
                <br></br>
                <button style={button_style} onClick={this.props.close_overlay}>
                    Close
                </button>
        </div>
        );
    }
}