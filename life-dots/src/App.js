import React from 'react';
import logo from './logo.svg';
import './App.css';

import Genome from './models/Genome.js';
import Dot from './models/Dot.js';

const math = require('mathjs')

function App() {
  let sexNum = 2.4;
  let sexMin = -10.3;
  let sexMax = 100.7;
  let sexOdds = [[1.3, 1.2], [3.1, 1.1]];
  let maxSize = [132.3, 13.2];
  let sexSize = [0.8, 0.86];
  let babySize = [0.8, 0.53];
  let signalNum = [1.2, 3.1];
  let eatOdds = [[3.1, 1.4], [1.1, 1.1]];
  let speed = [3.2, 2.2];
  let view = [3.1, 0.6];
  let moveWeights = [math.zeros(Math.pow(Math.floor(view[0]) * 2 + 1, 2), Math.floor(signalNum[0]) + 9), math.zeros(Math.pow(Math.floor(view[1]) * 2 + 1, 2), Math.floor(signalNum[1]) + 9)];
  let g = new Genome(sexNum, sexMin, sexMax, sexOdds, maxSize, sexSize, babySize, signalNum, eatOdds, speed, view, moveWeights);
  let new_g = g.mutate(0.01);
  let d = new Dot(true, new_g)
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
