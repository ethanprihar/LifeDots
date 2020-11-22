import React from "react";

const about_style = 
{
    textAlign: "center",
    paddingTop: "5vh",
    marginBottom: "20vh",
}

const title_style = 
{
    fontSize: "10vh",
}

const text_style = 
{
    textAlign: "left",
    fontSize: "20px",
    width: "80vw",
    margin: "auto",
}

const footer_style = 
{
    color: "#b3b3b3",
    backgroundColor: "#000000",
    borderTop: "2px solid #b3b3b3",
    position: "fixed",
    left: "0",
    bottom: "0",
    paddingTop: "2.5vh",
    width: "100vw",
    height: "12.5vh",
    overflow: "auto",
}

const button_style = 
{
    borderRadius: "1vh",
    height: "10vh",
    width: "30vh",
    marginLeft: "2.5vh",
    marginRight: "2.5vh",
    marginBottom: "2.5vh",
    color: "#b3b3b3",
    backgroundColor: "#000000",
    fontSize: "4vh",
    border: "2px solid #b3b3b3",
}

export default class AboutView extends React.Component
{   
    render()
    {
        return (
        <div style={about_style}>
            <div style={title_style}>About</div>
            <div style={text_style}>
                <h1>What is Life Dots?</h1>
                <p>Life Dots is an evolution simulator. Dots are independent entities that perceive and interact with their environment. Dots can move to adjacent cells, consume food, consume other dots, and asexually reproduce. Each dot produces a signal, which can be perceived by other dots. Each dot has a unique genetic code, which determines the dot’s color, how large the dot is, how large the dot’s offspring are upon creation, how frequently the dot moves, how far the dot can perceive, how efficiently the dot can consume food and other dots, the magnitude of the mutations in the dot’s offspring, and lastly, the set of values which are used to determine, based on what the dot perceives, the value of the dot’s signal and where the dot will move. Dots are rendered as circles, with a smaller circle in the middle, which changes in brightness according to the value of the dot’s signal.</p>
                <p>When a dot enters a cell containing food, which is rendered as a transparent grey square with rounded edges, the dot consumes the food, gaining energy. When a dot enters a cell containing other dots, all dots in the cell fight, and a winner is chosen randomly, with each dot’s chance of winning the fight proportional to its size. The winning dot gains energy proportional to the size of the defeated dots. As a dot consumes food and other dots, it gains energy, eventually reaching a threshold determined by its genetics, at which point it creates an offspring, which has a mutated set of its parent’s genetic code. When a dot creates an offspring, it transfers some its energy to its offspring. Each time a dot moves, it loses an amount of energy proportional to how much of its environment it can perceive. When a dot loses all its energy, it is removed from the environment.</p>
                <p>In addition to food and dots, the environment contains traps, which are rendered as dark red squares. When a dot enters a cell containing a trap, it loses a fixed amount of energy every tick in which it remains in the cell. The environment also contains walls, which are rendered as solid grey squares. Dots cannot move through walls, but can perceive past them.</p>
                <h1>How do Dots “Think”?</h1>
                <p>Each dot can perceive the size and signal values of all dots, the amount of food, the size of traps, and the presence of walls in a fixed radius around itself determined by its genetic code. All these values are sent as input to a multi-variate regression, the coefficients of which are determined by the dot’s genetic code. The regression produces ten outputs. Nine of the outputs correspond to the eight adjacent cells and the cell the dot is currently in. Of these nine outputs, the output with highest value determines which cell the dot moves to. The tenth output is bounded between negative one and one and is used as the dot’s signal value.</p>
            </div>
            <div>
                <div style={footer_style}>
                    <button style={button_style} onClick={() => this.props.setPage("MainMenu")}>
                        Menu
                    </button>
                </div>
            </div>
        </div>
        );
    }
}