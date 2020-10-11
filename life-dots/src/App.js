import React from 'react';
import logo from './logo.svg';
import './App.css';
import Genome from './models/Genome';

//import Genome from './models/Genome.js';
//import Dot from './models/Dot.js';

var math = require("mathjs");
var ndarray = require("ndarray");
var ops = require("ndarray-ops");

function App() {
  console.log('Genome Test')
  let ally_min = -10.6;
  let ally_max = 100.4;
  let max_size = 200.2;
  let baby_frac = 0.8;
  let eat_ratio = 0.5;
  let speed = 4.2;
  let weights = ndarray(new Float64Array(450), [45,10]);
  let g1 = new Genome(ally_min, ally_max, max_size, baby_frac, eat_ratio, speed, weights);
  let g2 = g1.mutate(0.1);
  console.log(g1);
  console.log(g2);
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
