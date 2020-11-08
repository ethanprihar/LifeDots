import React from "react";
import {Helmet} from 'react-helmet';

import "./App.css";

import MainMenuView from "./views/MainMenuView";
import AboutView from "./views/AboutView";
import SetupView from "./views/SetupView";
import WorldView from "./views/WorldView";

const default_style = 
{
  //width: '100vw',
  //height: '100vh',
  color: '#b3b3b3',
  backgroundColor: '#000000',
  margin: 0,
  padding: 0,
  marginLeft  : 'auto',
  marginRight : 'auto',
}

export default class App extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = 
    {
      page: <MainMenuView setPage={this.setPage} />
    }
  }

  setPage = (page, tick_time=null, cell_size=null, world=null) => 
  {
    switch(page)
    {
      case "MainMenu":
        this.setState({page: <MainMenuView setPage={this.setPage} />});
      break;
      case "About":
        this.setState({page: <AboutView setPage={this.setPage} />});
      break;
      case "Setup":
        this.setState({page: <SetupView setPage={this.setPage} />});
      break;
      case "Start":
        this.setState({page: <WorldView setPage={this.setPage} 
                                        tick_time={tick_time} 
                                        cell_size={cell_size} 
                                        world={world}/>});
      break;
      default:
        alert("HOW DID YOU GET HERE");
    }
  }
  
  render()
  {  
    return (
      <div style={default_style}>
        <Helmet>
          <style>{'body {background-color: #000000;}'}</style>
        </Helmet>
        {this.state.page}
      </div>
    );
  }
}