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

export default class LoadConfigView extends React.Component
{
    constructor(props)
    {
        super(props);
        let saves = localStorage.getItem("config_saves");
        saves = saves === null ? {} : JSON.parse(saves);
        this.state = 
        {
            selection: Object.keys(saves)[0],
            show_confirm: false,
            confirmed: false,
            saves: saves,
        };
    }

    key_press = (event) =>
    {
        // Do nothing when enter is pressed.
        if (event.which === 13)
        {
            event.preventDefault();
        }
    }

    change_input = (event) =>
    {
        this.setState({selection: event.target.value});
    }

    load = (event) =>
    {   
        event.preventDefault();
        this.props.close_load(this.state.saves[this.state.selection]);
    }

    delete = (event) =>
    {
        event.preventDefault();
        this.setState({show_confirm: true});
    }

    confirm = (event) =>
    {
        event.preventDefault()
        let new_saves = JSON.parse(JSON.stringify(this.state.saves));
        delete new_saves[this.state.selection]
        localStorage.setItem("config_saves", JSON.stringify(new_saves))
        if (Object.keys(new_saves).length === 0)
        {
            this.props.close_load(undefined);
        }
        else
        {
            this.setState({selection: Object.keys(new_saves)[0], 
                           saves: new_saves, 
                           show_confirm: false});
        }
    }

    no_confirm = (event) =>
    {
        event.preventDefault()
        this.setState({show_confirm: false});
    }

    close = (event) =>
    {
        event.preventDefault()
        this.props.close_load(undefined)
    }

    make_options(x)
    {
        return <option key={x}>{x}</option>;
    }
    
    render()
    {
        if (Object.keys(this.state.saves).length > 0)
        {
            return(
            <div>
                <ReactModal style={modal_style} isOpen={this.state.show_confirm} ariaHideApp={false}>
                    <div style={title_style}>
                        Delete Configuration?
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
                    <select style={input_style} onChange={() => {}} name="selection" value={this.state.selection}>
                        {Object.keys(this.state.saves).map(this.make_options)}
                    </select>
                    <br></br>
                    <button style={button_style} onClick={this.close}>
                        Close
                    </button>
                    <button style={button_style} onClick={this.load}>
                        Load
                    </button>
                    <button style={button_style} onClick={this.delete}>
                        Delete
                    </button>
                </form>
            </div>
            );
        }
        else
        {
            return(
            <div>
                <div style={title_style}>
                    No Configurations To Load
                </div>
                <button style={button_style} onClick={this.close}>
                    Close
                </button>
            </div>
            );
        }
    }
}