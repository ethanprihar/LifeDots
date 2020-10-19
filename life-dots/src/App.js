import React from 'react';
import logo from './logo.svg';
import './App.css';

import RandomRain from './models/FoodPlacers/RandomRain';
import Border from './models/WallPlacers/Border';
import CenterPit from './models/TrapPlacers/CenterPit';
import RandomStart from './models/DotPlacers/RandomStart';
import World from './models/World';

var ndarray = require("ndarray");
var ops = require("ndarray-ops");
var gemm = require("ndarray-gemm");

function App() {

  console.log('World Test')
  let dot_placer = new RandomStart(500,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1);
  let food_placer = new RandomRain(1, 100, 1);
  let trap_placer = new CenterPit(2, 0.5);
  let wall_placer = new Border(5);
  let world = new World(100, 120, dot_placer, food_placer, trap_placer, wall_placer);
  world.init();
  let start_time = new Date().getTime();
  world.update();
  let end_time = new Date().getTime();
  console.log(end_time - start_time);
  console.log(world);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
