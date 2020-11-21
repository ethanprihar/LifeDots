import React from "react";
import ReactModal from 'react-modal';

const form_style = 
{
    position: "center",
    textAlign: "center",
    color: "#b3b3b3",
    margin: "2%"
}

const title_style = 
{
    color: "#b3b3b3",
    fontSize: "30px",
    margin: "0",
    marginBottom: "10px",
    padding: "0",
}

const input_style = 
{
    color: '#b3b3b3',
    backgroundColor: "#000000",
    border: "2px solid #b3b3b3",
    borderRadius: "3px",
    width: "80%",
    fontSize: "20px",
}

const button_style = 
{
    borderRadius: "1vh",
    height: "7vh",
    width: "20vh",
    marginLeft: "1.25vh",
    marginRight: "1.25vh",
    marginTop: "2.5vh",
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

export default class SaveConfigView extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            config_name: "Untitled",
            show_confirm: false,
            confirmed: false,
        };
        this.change_input = this.change_input.bind(this);
    }

    key_press(event)
    {
        // Do nothing when enter is pressed.
        if (event.which === 13)
        {
            event.preventDefault();
        }
    }

    change_input(event)
    {
        this.setState({config_name: event.target.value});
    }

    save = (event) =>
    {   
        event.preventDefault();
        let saves = localStorage.getItem("config_saves");
        saves = saves === null ? {} : JSON.parse(saves);
        if (this.state.config_name in saves)
        {
            this.setState({show_confirm: true});
        }
        else
        {
            saves[this.state.config_name] = this.props.config;
            localStorage.setItem("config_saves", JSON.stringify(saves))
            this.props.close_save();
        }
    }

    confirm = (event) =>
    {
        event.preventDefault();
        let saves = localStorage.getItem("config_saves");
        saves = saves === null ? {} : JSON.parse(saves);
        saves[this.state.config_name] = this.props.config;
        localStorage.setItem("config_saves", JSON.stringify(saves));
        this.props.close_save();
    }

    no_confirm = (event) =>
    {
        this.setState({show_confirm: false});
    }
    
    render()
    {
        return (
        <div>
            <ReactModal style={modal_style} isOpen={this.state.show_confirm} ariaHideApp={false}>
                <div style={title_style}>
                    Overwrite Existing Save?
                </div>
                <button style={button_style} onClick={this.no_confirm}>
                    Go Back
                </button>
                <button style={button_style} onClick={this.confirm}>
                    Confirm
                </button>
            </ReactModal>
            <form style={form_style} onChange={this.change_input} onKeyPress={this.key_press}>
                <div style={title_style}>
                    Configuration Name:
                </div>
                <input style={input_style} config_name="config_name" value={this.state.config_name} type="text" required/>
                <br></br>
                <button style={button_style} onClick={this.props.close_save}>
                    Close
                </button>
                <button style={button_style} onClick={this.save}>
                    Save
                </button>
            </form>
        </div>
        );
    }
}